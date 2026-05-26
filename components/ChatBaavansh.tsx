"use client";

import { useEffect, useRef, useState } from "react";
import { profile, suggestedQuestions } from "@/lib/profile";
import { retrieveAnswer } from "@/lib/retrieval";

interface Msg {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey — it's me (well, an AI trained on me). Ask anything: AgentMemry, my Velarro RAG pipeline, my systems and compiler work, or what kind of role I'm chasing. Answers come with sources.",
};

export default function ChatBaavansh() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [liveMode, setLiveMode] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => {
        if (active) setLiveMode(Boolean(d?.live));
      })
      .catch(() => {
        if (active) setLiveMode(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(history);
    setInput("");
    setLoading(true);

    const useFallback = async () => {
      await new Promise((r) => setTimeout(r, 380));
      const result = retrieveAnswer(q);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: result.answer, sources: result.sources },
      ]);
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (data?.reply) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: String(data.reply) },
        ]);
        setLiveMode(true);
      } else {
        if (data?.reason === "no_key") setLiveMode(false);
        await useFallback();
      }
    } catch {
      await useFallback();
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const badge =
    liveMode === null
      ? { dot: "bg-muted", label: "connecting", cls: "text-muted" }
      : liveMode
        ? { dot: "bg-lime", label: "Live AI · Claude", cls: "text-lime" }
        : { dot: "bg-muted", label: "Offline RAG", cls: "text-muted" };

  function clearChat() {
    setMessages([GREETING]);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <section id="chat" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      <div className="mx-auto max-w-site px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
          [ chat-with-baavansh ]
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
          Don't read my résumé.
          <br />
          <span className="text-lime">Interrogate</span> it.
        </h2>
        <p className="mt-5 max-w-2xl text-muted md:text-lg">
          This is a RAG agent over my projects and experience. Ask it anything a
          recruiter would — it answers from a structured knowledge base of my
          work, with sources.
        </p>

        <div className="mt-10 overflow-hidden border border-line bg-surface shadow-[0_0_60px_-20px_rgba(204,255,0,0.15)]">
          {/* terminal header */}
          <div className="flex items-center justify-between border-b border-line bg-ink/60 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear chat"
                className="h-2.5 w-2.5 rounded-full bg-line transition-colors hover:bg-paper/40"
              />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime" />
              <span className="ml-3 font-mono text-xs text-muted">
                ask-baavansh --interactive
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <button
                onClick={clearChat}
                className="text-muted transition-colors hover:text-lime"
                aria-label="Reset conversation"
              >
                clear
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${badge.dot} ${
                    liveMode ? "animate-pulse" : "opacity-70"
                  }`}
                />
                <span className={`uppercase tracking-wider ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
            </div>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className="scanlines h-[460px] space-y-5 overflow-y-auto px-4 py-6 md:px-6"
          >
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} className="flex gap-3 animate-fade-up">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center bg-lime font-mono text-xs font-bold text-ink">
                    {profile.initials}
                  </span>
                  <div className="max-w-[88%]">
                    <div className="border border-line bg-ink px-4 py-3 text-sm leading-relaxed text-paper md:text-[15px]">
                      {m.content}
                    </div>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <span
                            key={s}
                            className="border border-line/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                          >
                            <span className="text-lime">◆</span> {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end animate-fade-up">
                  <div className="max-w-[88%] bg-lime px-4 py-3 text-sm font-medium leading-relaxed text-ink md:text-[15px]">
                    {m.content}
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex gap-3 animate-fade-up">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center bg-lime font-mono text-xs font-bold text-ink">
                  {profile.initials}
                </span>
                <div className="flex items-center gap-1.5 border border-line bg-ink px-4 py-4">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot h-1.5 w-1.5 rounded-full bg-lime"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                  <span className="ml-2 font-mono text-[11px] text-muted">
                    thinking…
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* suggested questions */}
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3 md:px-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/60 self-center">
              try:
            </span>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-all hover:-translate-y-px hover:border-lime hover:text-lime disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-3 border-t border-line px-4 py-3 md:px-6"
          >
            <span className="font-mono text-sm text-lime">{">"}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AgentMemry, Velarro, why hire me…"
              className="flex-1 bg-transparent py-1.5 font-mono text-sm text-paper outline-none placeholder:text-muted/70"
              aria-label="Ask a question"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-lime px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:-translate-y-px disabled:translate-y-0 disabled:opacity-30"
            >
              Send ↵
            </button>
          </form>
        </div>

        <p className="mt-3 font-mono text-[11px] text-muted">
          Powered by Claude when an API key is configured — otherwise an
          in-browser retrieval engine answers, so the chat never breaks.
        </p>
      </div>
    </section>
  );
}
