// ============================================================================
//  /api/chat — the "live" chat engine.
//
//  - If ANTHROPIC_API_KEY is set, this calls Claude with the full knowledge
//    base as context and returns a generated answer.
//  - If the key is missing, the API errors, or the rate limit is hit, it
//    returns { fallback: true } and the client runs its in-browser engine.
//
//  GET /api/chat -> { live: boolean }   (used to show the mode badge)
// ============================================================================

import { buildSystemPrompt } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: string;
  content: string;
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

// --- Basic in-memory rate limiter ------------------------------------------
// Best-effort only: serverless instances reset, so this is a speed bump, not
// a wall. For real traffic, add a platform firewall and an Anthropic spend cap.
const RATE_LIMIT = 12; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function GET() {
  return Response.json({ live: Boolean(process.env.ANTHROPIC_API_KEY) });
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // No key configured -> the client should use its offline engine.
  if (!apiKey) {
    return Response.json({ fallback: true, reason: "no_key" });
  }

  if (isRateLimited(clientIp(req))) {
    return Response.json({ fallback: true, reason: "rate_limit" });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ fallback: true, reason: "bad_request" });
  }

  const cleaned = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== "user") {
    return Response.json({ fallback: true, reason: "bad_request" });
  }

  const model = process.env.CHAT_MODEL || "claude-haiku-4-5-20251001";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        system: buildSystemPrompt(),
        messages: cleaned,
      }),
    });

    if (!res.ok) {
      return Response.json({ fallback: true, reason: "api_error" });
    }

    const data = (await res.json()) as AnthropicResponse;
    const reply = (data.content ?? [])
      .filter((b) => b.type === "text" && typeof b.text === "string")
      .map((b) => b.text as string)
      .join("\n")
      .trim();

    if (!reply) {
      return Response.json({ fallback: true, reason: "empty" });
    }

    return Response.json({ reply, mode: "live" });
  } catch {
    return Response.json({ fallback: true, reason: "network_error" });
  }
}
