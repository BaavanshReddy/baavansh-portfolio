// ============================================================================
//  Light-weight ML content for the home page (cards and summary).
//  The full case-study content lives in lib/caseStudies.ts and is only loaded
//  by the /projects pages and the server-side chat prompt, which keeps the
//  home page bundle small. Tests keep these titles in sync with it.
// ============================================================================

export interface RepoLink {
  label: string;
  href: string;
}

const GH = "https://github.com/BaavanshReddy";
const LAB = `${GH}/mlops-deployment-lab`;
const NN = `${GH}/neural-net-from-scratch`;

/** Slugs and titles of the case-study pages, in display order. */
export const caseStudyIndex = [
  { slug: "mlops-deployment-lab", title: "MLOps Deployment Lab" },
  {
    slug: "responsible-ai-evaluation",
    title: "Responsible AI Evaluation System",
  },
  {
    slug: "neural-network-training-benchmark",
    title: "Neural Network Training Benchmark",
  },
] as const;

// ----------------------------------------------------------------------------
//  ML SYSTEMS SECTION: cards for the home page
// ----------------------------------------------------------------------------

export interface MLCard {
  id: string;
  title: string;
  kind: string;
  blurb: string;
  proof: string;
  tags: string[];
  caseStudy?: string;
  links: RepoLink[];
}

export const mlCards: MLCard[] = [
  {
    id: "mlops-deployment-lab",
    title: "MLOps Deployment Lab",
    kind: "Personal project · ML platform",
    blurb:
      "Contract-validated data, Feast features shared by training and serving, MLflow registry promotion and rollback, FastAPI micro-batching, Prometheus and Evidently monitoring.",
    proof:
      "1.95x throughput from micro-batching at 64 users; 93 automated tests",
    tags: ["Feast", "MLflow", "FastAPI", "Prometheus", "Evidently"],
    caseStudy: "mlops-deployment-lab",
    links: [{ label: "Repository", href: LAB }],
  },
  {
    id: "responsible-ai-evaluation",
    title: "Responsible AI Evaluation System",
    kind: "Personal project · ML evaluation",
    blurb:
      "SHAP explanations, Fairlearn subgroup diagnostics with bootstrap intervals and sample-size safeguards, threshold sweeps, model cards, and hashed release evidence for each registered model.",
    proof: "Diagnostics for 2 model versions; 7 of 7 release checks each",
    tags: ["SHAP", "Fairlearn", "Evidently", "MLflow"],
    caseStudy: "responsible-ai-evaluation",
    links: [{ label: "Code", href: `${LAB}/tree/main/responsible_ai` }],
  },
  {
    id: "neural-network-training-benchmark",
    title: "Neural Network Training Benchmark",
    kind: "Personal project · Training systems",
    blurb:
      "My from-scratch NumPy network rebuilt in PyTorch and Keras, plus gradient accumulation, checkpoint resume, CPU mixed precision, DDP, MirroredStrategy, and ONNX Runtime benchmarks.",
    proof: "Frameworks agree to < 1e-15 in float64; CPU only",
    tags: ["PyTorch", "TensorFlow/Keras", "ONNX Runtime", "NumPy"],
    caseStudy: "neural-network-training-benchmark",
    links: [{ label: "Repository", href: NN }],
  },
  {
    id: "llm-factcheck",
    title: "LLM FactCheck",
    kind: "Co-authored course research paper",
    blurb:
      "Direct LLM answering vs BM25 retrieval vs BM25-grounded RAG on a 100-question TriviaQA pilot, scored with exact match, token F1, a groundedness proxy, and an unsupported-answer proxy.",
    proof:
      "Direct vs RAG: normalized exact match 0.66 vs 0.69, token F1 0.784 vs 0.803",
    tags: ["Python", "BM25", "RAG", "TriviaQA"],
    links: [{ label: "Repository", href: `${GH}/LLM_factcheck` }],
  },
  {
    id: "agentmemry",
    title: "AgentMemry",
    kind: "Open-source library · PyPI",
    blurb:
      "Persistent memory for AI agents: local sentence-transformer embeddings, SQLite storage, cosine-similarity retrieval, MMR ranking, and per-agent namespaces.",
    proof: "Published on PyPI as agentmemry; 15 pytest tests",
    tags: ["Python", "SQLite", "sentence-transformers", "pytest"],
    links: [
      { label: "PyPI", href: "https://pypi.org/project/agentmemry/" },
      { label: "Source", href: `${GH}/agentmemry` },
    ],
  },
];

/** One-paragraph ML systems summary shown near the introduction. */
export const mlSummary = {
  heading: "ML systems, end to end",
  text: "Beyond my backend work, I build ML systems as personal projects and measure them: a local MLOps platform with a feature store, model registry, micro-batched serving, and drift monitoring; a Responsible AI evaluation that explains and slices every registered model; and a training benchmark that proves my from-scratch network matches PyTorch and Keras. Everything was run on CPU on one machine, and every headline number names the file it came from.",
  boundary: "Project experience, not production ML at an employer.",
};
