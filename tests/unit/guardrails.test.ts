import { describe, expect, it } from "vitest";
import { findClaimViolations } from "@/lib/guardrails";

describe("claim guardrails", () => {
  it.each([
    ["I have 5+ years of engineering experience.", "five-plus-years"],
    ["I bring six years of backend work.", "five-plus-years"],
    ["I have 2+ years shipping production ML models.", "production-ml-years"],
    ["I ran enterprise Kubernetes clusters.", "enterprise-kubernetes"],
    [
      "The evaluation is compliant with the EU AI Act.",
      "regulatory-compliance",
    ],
    ["The model is fair across groups.", "fairness-verdict"],
    ["I'm an AI trained on my resume.", "trained-chatbot"],
    ["I trained the network on multiple GPUs.", "gpu-training"],
    ["At TAIRC I built the MLflow model registry.", "project-at-employer"],
    ["I set up Feast and MLflow for TAIRC.", "project-at-employer"],
  ])("blocks: %s", (text, rule) => {
    expect(findClaimViolations(text).map((v) => v.rule)).toContain(rule);
  });

  it.each([
    "I have about four years of internships and my current role.",
    "I have not trained on GPUs; the benchmark ran on CPU.",
    "I never claim the model is fair.",
    "It is not enterprise Kubernetes experience.",
    "Nothing here demonstrates regulatory compliance, and I am not claiming the model is compliant.",
    "None of these projects was done for TAIRC, and MLflow was only used in my personal lab.",
    "At TAIRC I integrate LLM components into backend services.",
    "This assistant is not trained or fine-tuned on me.",
  ])("allows: %s", (text) => {
    expect(findClaimViolations(text)).toEqual([]);
  });
});
