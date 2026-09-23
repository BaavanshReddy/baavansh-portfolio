// ============================================================================
//  Claim guardrails for the chat assistant.
//
//  The live engine (Claude) is instructed never to make these claims. This is
//  the second line of defence: every live reply is screened, and a reply that
//  makes a forbidden claim is discarded in favour of the offline retrieval
//  answer. Tests also run every knowledge-base chunk through the same check,
//  so the offline engine can never return one of these claims either.
//
//  A forbidden pattern is allowed only inside a sentence that negates it
//  ("I have NOT trained on GPUs" is fine; "I trained on GPUs" is not).
// ============================================================================

export interface ClaimRule {
  id: string;
  description: string;
  pattern: RegExp;
}

export const CLAIM_RULES: ClaimRule[] = [
  {
    id: "five-plus-years",
    description: "Claims five or more years of experience",
    pattern:
      /\b(5|five|6|six|7|seven|8|eight|9|nine|10|ten|1[1-9]|twenty)\s*\+?\s*(or more\s+)?years?\b/i,
  },
  {
    id: "production-ml-years",
    description: "Claims two or more years shipping production ML",
    pattern:
      /\b(2|two|3|three|4|four)\s*\+?\s*(or more\s+)?years?\b[^.!?]*\b(shipping|shipped|deploying|deployed|production)\b[^.!?]*\b(ml|machine[- ]learning|models?)\b/i,
  },
  {
    id: "enterprise-kubernetes",
    description: "Claims enterprise or production Kubernetes experience",
    pattern:
      /\b(enterprise|production)\b[^.!?]*\b(kubernetes|k8s)\b|\b(kubernetes|k8s)\b[^.!?]*\b(in production|production cluster|enterprise)\b/i,
  },
  {
    id: "regulatory-compliance",
    description: "Claims regulatory compliance or certification",
    pattern:
      /\b(compliant|complies with|compliance (?:with|achieved|certified|verified)|certified)\b/i,
  },
  {
    id: "fairness-verdict",
    description: "Claims a model is fair or unbiased",
    pattern:
      /\b(is|are|was|were)\s+(fair|unbiased)\b|\bbias[- ]free\b|\bfairness (is )?(guaranteed|proven|achieved)\b/i,
  },
  {
    id: "trained-chatbot",
    description: "Claims the assistant was trained or fine-tuned on the owner",
    pattern: /\b(trained|fine-?tuned)\s+on\s+(me|my|baavansh|his)\b/i,
  },
  {
    id: "gpu-training",
    description: "Claims GPU, CUDA, or multi-GPU training was actually done",
    pattern:
      /\b(trained|train|training|ran|run|benchmarked)\b[^.!?]*\bon\s+(a\s+|multiple\s+|several\s+)?(gpus?|cuda|a100s?|h100s?|nvidia)\b|\bmulti-?(gpu|node)\s+training\b/i,
  },
  {
    id: "project-at-employer",
    description: "Presents personal ML project work as employer work",
    pattern:
      /\b(at|for)\s+(tairc|kavach|viansec|lively|rnr|little red riding hood)\b[^.!?]*\b(mlflow|feast|evidently|fairlearn|shap|kubernetes|k8s|micro-?batching|mlops lab|deployment lab|model registry|drift monitoring)\b|\b(mlflow|feast|evidently|fairlearn|shap|kubernetes|k8s|mlops lab|deployment lab|model registry)\b[^.!?]*\b(at|for)\s+(tairc|kavach|viansec|lively|rnr|little red riding hood)\b/i,
  },
];

const NEGATION =
  /\b(not|never|no|none|nor|without|cannot|can't|don't|doesn't|didn't|haven't|hasn't|isn't|aren't|wasn't|weren't|won't)\b/i;

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface Violation {
  rule: string;
  sentence: string;
}

/** Sentences that make a forbidden claim without negating it. */
export function findClaimViolations(text: string): Violation[] {
  const out: Violation[] = [];
  for (const sentence of splitSentences(text)) {
    if (NEGATION.test(sentence)) continue;
    for (const rule of CLAIM_RULES) {
      if (rule.pattern.test(sentence)) {
        out.push({ rule: rule.id, sentence });
        break;
      }
    }
  }
  return out;
}
