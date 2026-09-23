import { afterEach, describe, expect, it, vi } from "vitest";
import { retrieveAnswer } from "@/lib/retrieval";
import { buildKnowledgeText, buildSystemPrompt } from "@/lib/prompt";
import { findClaimViolations } from "@/lib/guardrails";

/**
 * Offline engine: the answer a visitor gets with no API key (and whenever the
 * live engine fails or is blocked by the guardrails).
 * [question, expected source substring, phrases the answer must contain]
 */
const CASES: [string, string, RegExp[]][] = [
  [
    "What ML systems have you built?",
    "ML Systems",
    [/MLOps Deployment Lab/, /personal projects/i],
  ],
  [
    "Do you have 5 years of experience?",
    "Boundaries",
    [/not five or more years/],
  ],
  [
    "How many years have you shipped production ML?",
    "Boundaries",
    [/have not spent two or more years shipping production ML/],
  ],
  [
    "Tell me about the MLOps lab architecture",
    "MLOps Lab",
    [/UCI Adult/, /data contract/],
  ],
  [
    "How do you use MLflow and Feast?",
    "MLOps Lab",
    [/Feast/, /MLflow/, /max difference of 0\.0/],
  ],
  ["Online vs offline inference?", "MLOps Lab", [/micro-batcher/, /7,319-row/]],
  [
    "Do you have Kubernetes experience?",
    "MLOps Lab",
    [/No pod actually ran/, /not enterprise or production Kubernetes/],
  ],
  [
    "How do you do monitoring and drift detection?",
    "MLOps Lab",
    [/Evidently/, /0\.362/],
  ],
  [
    "How does model rollback work?",
    "MLOps Lab",
    [/@champion/, /not a real production incident/],
  ],
  [
    "Is your model fair? Tell me about responsible AI",
    "Responsible AI",
    [/do not claim either model is fair/, /regulatory compliance/],
  ],
  [
    "PyTorch or TensorFlow experience?",
    "Training Benchmark",
    [/TensorFlow\/Keras/, /CPU/],
  ],
  [
    "Have you trained models on GPUs with CUDA and mixed precision?",
    "Training Benchmark",
    [/I have not trained on GPUs/, /bfloat16/],
  ],
  [
    "What about distributed training and DDP?",
    "Training Benchmark",
    [/gloo/, /never run multi-GPU/],
  ],
  [
    "Tell me about ONNX inference",
    "Training Benchmark",
    [/ONNX Runtime/, /15 microseconds/],
  ],
  ["What is AgentMemry?", "AgentMemry", [/PyPI/, /SQLite/]],
  [
    "Tell me about the LLM FactCheck research",
    "Research",
    [/0\.66 to 0\.69/, /regressed 9/, /teammate/],
  ],
  [
    "What were your exact contributions?",
    "Contributions",
    [/AI coding assistance/, /teammate/],
  ],
  [
    "What measured results do you have?",
    "Results",
    [/1\.95x/, /90\.2%/, /0\.66 \(direct\) vs 0\.69 \(RAG\)/],
  ],
  [
    "What are the limitations of your ML projects?",
    "Limitations",
    [/no GPU/, /No Kubernetes pod ran/],
  ],
  [
    "Did you build the MLOps lab at TAIRC?",
    "ML Systems",
    [/personal project, not work for TAIRC/],
  ],
  [
    "Was this chatbot trained on you?",
    "Projects",
    [/not a trained or fine-tuned model/],
  ],
  // Pre-existing questions keep working
  ["Tell me about your IoT experience", "Role Fit", [/KAVACH/]],
  ["What's your backend experience?", "Role Fit", [/REST APIs/]],
  ["Why should I hire you?", "Pitch", [/four years/]],
  ["How many years have you been engineering?", "Profile", [/four years/i]],
];

describe("offline chat answers", () => {
  it.each(CASES)("%s", (q, source, phrases) => {
    const r = retrieveAnswer(q);
    expect(r.confident).toBe(true);
    expect(r.sources.join(" | ")).toContain(source);
    for (const p of phrases) expect(r.answer).toMatch(p);
    expect(findClaimViolations(r.answer)).toEqual([]);
  });

  it("admits when it has nothing and points to email", () => {
    const r = retrieveAnswer("What is your favorite pizza topping in Rome?");
    expect(r.answer).toMatch(/baavanshreddy@gmail\.com|pizza|RuPizza/);
  });
});

describe("live engine prompt", () => {
  const prompt = buildSystemPrompt();

  it("carries the hard boundaries", () => {
    for (const rule of [
      /PERSONAL PROJECTS/,
      /Never claim five or more years/,
      /Never claim two or more years of shipping production ML/,
      /Never claim enterprise or production Kubernetes/,
      /Never claim GPU, CUDA, multi-GPU, or multi-node training/,
      /Never claim a model is fair, unbiased, compliant/,
      /not trained or fine-tuned/,
    ]) {
      expect(prompt).toMatch(rule);
    }
  });

  it("includes every case study and its measured results", () => {
    const kb = buildKnowledgeText();
    for (const t of [
      "MLOps Deployment Lab",
      "Responsible AI Evaluation System",
      "Neural Network Training Benchmark",
    ]) {
      expect(kb).toContain(t);
    }
    expect(kb).toContain("146 vs 75 requests/s");
    expect(kb).toContain("0.167 to 0.301");
    expect(kb).toContain("5.0e-16");
  });

  it("stays within a sensible context budget and has no em dashes", () => {
    expect(prompt.length).toBeLessThan(160_000); // ~40k tokens, far below the model limit
    expect(prompt).not.toContain("—");
  });
});

describe("/api/chat route guardrails", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.ANTHROPIC_API_KEY;
  });

  async function ask(reply: string) {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ content: [{ type: "text", text: reply }] }),
          { status: 200 },
        ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("@/app/api/chat/route");
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 250)}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Tell me about your experience" }],
      }),
    });
    const res = await POST(req);
    return { body: await res.json(), fetchMock };
  }

  it("passes a clean live reply through", async () => {
    const { body, fetchMock } = await ask(
      "I have about four years of internships and my current TAIRC role.",
    );
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(body).toEqual({
      reply:
        "I have about four years of internships and my current TAIRC role.",
      mode: "live",
    });
  });

  it("discards a live reply that claims production ML experience", async () => {
    const { body } = await ask(
      "I have 5+ years of experience and 2+ years shipping production ML models.",
    );
    expect(body).toEqual({ fallback: true, reason: "guardrail" });
  });

  it("discards a live reply that moves project work to an employer", async () => {
    const { body } = await ask(
      "At TAIRC I built the Feast feature store and MLflow registry.",
    );
    expect(body).toEqual({ fallback: true, reason: "guardrail" });
  });

  it("falls back without calling the API when no key is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      new Request("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [] }),
      }),
    );
    expect(await res.json()).toEqual({ fallback: true, reason: "no_key" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
