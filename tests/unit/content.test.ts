import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { REQUIRED_SECTIONS, caseStudies } from "@/lib/caseStudies";
import { caseStudyIndex, mlCards, mlSummary } from "@/lib/mlCards";
import { knowledgeChunks } from "@/lib/knowledge";
import { profile, projects, research, experience } from "@/lib/profile";
import { findClaimViolations } from "@/lib/guardrails";

const PUBLIC = path.resolve(__dirname, "../../public");

/** Tools actually implemented in each repository (checked against the repos). */
const IMPLEMENTED_TOOLS: Record<string, string[]> = {
  "mlops-deployment-lab": [
    "Python",
    "scikit-learn",
    "PyTorch",
    "ONNX Runtime",
    "Feast",
    "MLflow",
    "FastAPI",
    "Docker Compose",
    "Prometheus",
    "Evidently",
    "Locust",
    "pytest",
  ],
  "responsible-ai-evaluation": [
    "Python",
    "SHAP",
    "Fairlearn",
    "Evidently",
    "MLflow",
    "pandas",
    "pytest",
  ],
  "neural-network-training-benchmark": [
    "Python",
    "NumPy",
    "PyTorch",
    "TensorFlow/Keras",
    "ONNX Runtime",
    "pytest",
    "Docker",
  ],
};

function allCaseStudyText(): string[] {
  return caseStudies.flatMap((c) => [
    c.title,
    c.summary,
    c.seoDescription,
    c.evidenceNote,
    ...c.metrics.flatMap((m) => [m.label, m.value, m.context]),
    ...c.shots.flatMap((s) => [s.alt, s.caption]),
    ...c.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
    ]),
  ]);
}

describe("case studies", () => {
  it("exist for the three new ML projects", () => {
    expect(caseStudies.map((c) => c.slug)).toEqual([
      "mlops-deployment-lab",
      "responsible-ai-evaluation",
      "neural-network-training-benchmark",
    ]);
  });

  it.each(caseStudies.map((c) => [c.slug, c] as const))(
    "%s covers every required section, in order, with content",
    (_slug, c) => {
      expect(c.sections.map((s) => s.id)).toEqual(
        REQUIRED_SECTIONS.map((s) => s.id),
      );
      expect(c.sections.map((s) => s.heading)).toEqual(
        REQUIRED_SECTIONS.map((s) => s.heading),
      );
      for (const s of c.sections) {
        const body = [
          ...(s.paragraphs ?? []),
          ...(s.bullets ?? []),
          s.code ?? "",
        ]
          .join(" ")
          .trim();
        expect(body.length, s.id).toBeGreaterThan(40);
      }
    },
  );

  it.each(caseStudies.map((c) => [c.slug, c] as const))(
    "%s only tags tools implemented in its repository",
    (slug, c) => {
      for (const t of c.tags) expect(IMPLEMENTED_TOOLS[slug]).toContain(t);
    },
  );

  it.each(caseStudies.map((c) => [c.slug, c] as const))(
    "%s: every metric names its source file and every screenshot exists at its stated size",
    (_slug, c) => {
      expect(c.metrics.length).toBeGreaterThanOrEqual(4);
      for (const m of c.metrics) expect(m.source.length).toBeGreaterThan(5);
      for (const s of c.shots) {
        const file = path.join(PUBLIC, s.src);
        expect(existsSync(file), s.src).toBe(true);
        const buf = readFileSync(file);
        // WebP VP8/VP8L/VP8X header parsing for the canvas size.
        expect(buf.toString("ascii", 0, 4)).toBe("RIFF");
        expect(buf.toString("ascii", 8, 12)).toBe("WEBP");
        expect(buf.length).toBeLessThan(80_000);
        expect(s.alt.length).toBeGreaterThan(30);
      }
    },
  );

  it("states the local/CPU scope on every case study", () => {
    for (const c of caseStudies) {
      expect(c.evidenceNote).toMatch(/locally/);
      expect(c.evidenceNote).toMatch(/no GPU/);
      expect(c.evidenceNote).toMatch(/Not deployed to production/);
    }
  });
});

describe("home page ML content", () => {
  it("has cards for all five ML projects", () => {
    expect(mlCards.map((c) => c.title)).toEqual([
      "MLOps Deployment Lab",
      "Responsible AI Evaluation System",
      "Neural Network Training Benchmark",
      "LLM FactCheck",
      "AgentMemry",
    ]);
  });

  it("keeps the light index in sync with the full case studies", () => {
    expect(caseStudyIndex.map((c) => [c.slug, c.title])).toEqual(
      caseStudies.map((c) => [c.slug, c.title]),
    );
    for (const card of mlCards) {
      if (card.caseStudy)
        expect(caseStudies.map((c) => c.slug)).toContain(card.caseStudy);
    }
  });

  it("labels the ML summary as project experience", () => {
    expect(mlSummary.boundary).toMatch(/not production ML at an employer/i);
  });
});

describe("content quality rules", () => {
  const siteText = [
    ...allCaseStudyText(),
    ...mlCards.flatMap((c) => [c.title, c.kind, c.blurb, c.proof]),
    mlSummary.text,
    ...knowledgeChunks.flatMap((k) => [k.title, k.text]),
    profile.summary,
    ...projects.flatMap((p) => [
      p.name,
      p.blurb,
      p.description,
      ...p.highlights,
    ]),
    research.title,
    research.description,
    ...experience.flatMap((e) => [e.org, e.summary, ...e.points]),
  ];

  it("contains no em dashes (owner preference)", () => {
    const offenders = siteText.filter((t) => t.includes("—"));
    expect(offenders).toEqual([]);
  });

  it("makes no forbidden claims anywhere the site or offline chat can show", () => {
    const hits = siteText.flatMap((t) => findClaimViolations(t));
    expect(hits).toEqual([]);
  });

  it("no longer quotes the unreproducible 86.7% / 89.1% accuracy as a result", () => {
    for (const p of projects) {
      expect(p.description + p.highlights.join(" ")).not.toMatch(/86\.7|89\.1/);
    }
  });

  it("never describes the chat assistant as trained on the owner", () => {
    const chat = readFileSync(
      path.resolve(__dirname, "../../components/ChatBaavansh.tsx"),
      "utf8",
    );
    expect(chat).not.toMatch(/AI trained on me/);
    expect(chat).toMatch(/not a model trained on me/);
  });
});
