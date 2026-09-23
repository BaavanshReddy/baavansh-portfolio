// ============================================================================
//  ML SYSTEMS CASE STUDIES: structured content for /projects/[slug]
//
//  EVIDENCE RULE: every number on these pages comes from a machine-readable
//  results file or verification log in the project's repository. The `source` field on each
//  metric names that file so a reader (or a reviewer) can check it.
//  Environment for every measurement: one cloud VM, 2 vCPUs, 7.8 GB RAM,
//  no GPU. Nothing here was deployed to production or served real users.
//
//  Style rule: no em dashes in copy (owner preference).
// ============================================================================

export interface Metric {
  label: string;
  value: string;
  context: string;
  source: string;
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface CaseSection {
  id: SectionId;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
}

export interface RepoLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  seoDescription: string;
  evidenceNote: string;
  tags: string[];
  links: RepoLink[];
  metrics: Metric[];
  shots: Shot[];
  sections: CaseSection[];
}

/** Every case study must cover these, in this order. Enforced by tests. */
export const REQUIRED_SECTIONS = [
  { id: "problem", heading: "Problem" },
  { id: "intended-use", heading: "Intended use" },
  { id: "architecture", heading: "Architecture" },
  { id: "dataset", heading: "Dataset and limitations" },
  { id: "data-contracts", heading: "Data contracts" },
  { id: "training", heading: "Training and reproducibility" },
  { id: "registry", heading: "Model registry and versioning" },
  { id: "inference", heading: "Online and offline inference" },
  { id: "testing", heading: "Testing and CI/CD" },
  { id: "containers", heading: "Docker and Kubernetes" },
  { id: "monitoring", heading: "Monitoring" },
  { id: "drift", heading: "Drift detection" },
  { id: "rollback", heading: "Rollback" },
  { id: "responsible-ai", heading: "Responsible-AI findings" },
  { id: "performance", heading: "Performance measurements" },
  { id: "tradeoffs", heading: "Technical tradeoffs" },
  { id: "failure-modes", heading: "Failure modes" },
  { id: "repository", heading: "Repository and setup" },
] as const;

export type SectionId = (typeof REQUIRED_SECTIONS)[number]["id"];

const GH = "https://github.com/BaavanshReddy";
const LAB = `${GH}/mlops-deployment-lab`;
const NN = `${GH}/neural-net-from-scratch`;

const ENV_NOTE =
  "Personal project. Built and measured locally on one cloud VM (2 vCPUs, 7.8 GB RAM, no GPU). Not deployed to production and never used on real people.";

// ----------------------------------------------------------------------------
//  1. MLOps Deployment Lab
// ----------------------------------------------------------------------------

const mlopsLab: CaseStudy = {
  slug: "mlops-deployment-lab",
  title: "MLOps Deployment Lab",
  kicker: "ML systems · MLOps",
  summary:
    "An end-to-end local ML platform on the UCI Adult census dataset: contract-validated ingestion, a Feast feature store shared by training and serving, scikit-learn and PyTorch models tracked in MLflow with a promotion policy and rollback, a FastAPI service with async micro-batching, and Prometheus plus Evidently monitoring.",
  seoDescription:
    "Case study: a local end-to-end ML platform with data contracts, Feast, MLflow registry promotion and rollback, FastAPI micro-batching, Prometheus alerts, Evidently drift monitoring, and Kubernetes blue-green manifests.",
  evidenceNote: ENV_NOTE,
  tags: [
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
  links: [
    { label: "Repository", href: LAB },
    {
      label: "Verification report",
      href: `${LAB}/blob/main/docs/verification_report.md`,
    },
    { label: "Runbook", href: `${LAB}/blob/main/docs/runbook.md` },
  ],
  metrics: [
    {
      label: "Micro-batching throughput",
      value: "1.95x",
      context:
        "146 vs 75 requests/s at 64 concurrent Locust users, 1-CPU container, 0 errors",
      source: "reports/bench/single_batching_{on,off}_c64.json",
    },
    {
      label: "p95 latency at 64 users",
      value: "620 vs 1,000 ms",
      context: "batching on vs off; load generator shared the same 2 vCPUs",
      source: "reports/bench/single_batching_{on,off}_c64.json",
    },
    {
      label: "Models (test ROC AUC)",
      value: "0.913 / 0.919",
      context: "scikit-learn logistic regression / PyTorch MLP via ONNX",
      source: "reports/training/*.json",
    },
    {
      label: "Training-serving parity",
      value: "max diff 0.0",
      context:
        "Feast offline, Feast online, and request-time features and probabilities on 500 rows",
      source: "MLflow run artifacts; test_parity_check_catches_skew",
    },
    {
      label: "ONNX export fidelity",
      value: "6.5e-8",
      context: "max probability difference, PyTorch vs ONNX Runtime",
      source:
        "MLflow run metric onnx_max_abs_diff (run c0035323); reports/registry/audit_log.jsonl",
    },
    {
      label: "Automated tests",
      value: "93",
      context:
        "87 in the suite (90% line coverage) plus 6 live smoke tests against containers",
      source: "docs/verification_report.md",
    },
  ],
  shots: [
    {
      src: "/case-studies/mlops-deployment-lab/mlflow-registry.webp",
      alt: "MLflow model registry page for income-classifier showing version 2 with tags such as dataset_version, git_commit, threshold 0.392386, and approval_status rolled_back.",
      caption:
        "MLflow registry, captured from the running local stack: version 2 carries its evidence tags and the rolled-back status after the rollback drill.",
      width: 1110,
      height: 800,
    },
    {
      src: "/case-studies/mlops-deployment-lab/prometheus-alerts.webp",
      alt: "Prometheus alerts page with five income-api rules; PredictionPositiveRateShift is firing and the other four are inactive.",
      caption:
        "Prometheus alert rules while shifted traffic was replayed: PredictionPositiveRateShift fired (live positive rate 0.444 vs 0.325 expected).",
      width: 1200,
      height: 369,
    },
    {
      src: "/case-studies/mlops-deployment-lab/evidently-drift.webp",
      alt: "Evidently data drift report: 11 columns, 3 drifted (hours_per_week, age, occupation), drifted share 0.273.",
      caption:
        "Evidently input-drift report on the shifted scenario: 3 of 11 features drifted (share 0.273, below Evidently's 0.5 dataset threshold). The lab's alert is driven by prediction drift, which reached 0.362.",
      width: 1200,
      height: 754,
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem",
      paragraphs: [
        "Most model tutorials stop at a notebook score. I wanted a small, complete system where the hard parts of shipping a model are real and testable: features that cannot silently drift between training and serving, a registry that decides promotion by policy instead of by hand, a service that stays fast under concurrent load, and monitoring that actually fires when inputs shift.",
      ],
    },
    {
      id: "intended-use",
      heading: "Intended use",
      paragraphs: [
        "A reference implementation for learning and demonstrating ML deployment practice. The model predicts whether a 1994 US census respondent earned more than 50K USD. It must not be used to make decisions about real people (employment, credit, housing, insurance, or anything similar).",
      ],
    },
    {
      id: "architecture",
      heading: "Architecture",
      bullets: [
        "Ingestion: SHA-256-pinned raw file, data-contract checks, deduplication, stable ids, seeded stratified 70/15/15 split with a manifest and dataset version.",
        "Features: one shared transform feeds the Feast offline store (file) and, after materialization, the Feast online store (SQLite). Training reads point-in-time features with get_historical_features.",
        "Training: config-driven scikit-learn logistic regression and a PyTorch MLP exported to ONNX, both logged to MLflow as pyfunc models with the same input and output.",
        "Lifecycle: a promotion policy moves the @champion and @previous-champion aliases; rollback moves them back and writes an audit record.",
        "Serving: FastAPI with /v1/predict (micro-batched), /v1/predict/batch, /v1/predict/entity (Feast online lookup), /v1/model, /healthz, /readyz, /metrics, and a token-protected /admin/reload.",
        "Observability: Prometheus metrics and five alert rules, Evidently reports, JSON logs with X-Request-ID correlation, and a Grafana dashboard definition.",
      ],
    },
    {
      id: "dataset",
      heading: "Dataset and limitations",
      paragraphs: [
        "UCI Adult (Becker and Kohavi, 1996, CC BY 4.0): 48,842 raw rows, 52 exact duplicates removed, positive rate 0.239 in every split, dataset version a575b7eeb2fd reproduced across runs.",
        "Limitations: the data is a static 1994 US extract with a simulated event time, so it says nothing about current populations, and the drift scenario is synthetic and documented rather than observed.",
      ],
    },
    {
      id: "data-contracts",
      heading: "Data contracts",
      paragraphs: [
        "A YAML contract is the single source of truth for column types, ranges, allowed categories, null limits, and roles (feature, target, sensitive, excluded). Ingestion validates against it, the API request schema is generated from it, and a test fails if the two disagree. Invalid requests get HTTP 422 with the field and rule.",
        "Leakage checks gate every run: a single-feature ROC AUC ceiling of 0.95 for target leakage (highest observed 0.78) and an id-overlap check across splits. Tests inject a leaky column and shared ids and expect both checks to fail.",
      ],
    },
    {
      id: "training",
      heading: "Training and reproducibility",
      paragraphs: [
        "Training is driven by YAML configs with fixed seeds, deterministic PyTorch algorithms, and fixed thread counts. The decision threshold is chosen on the validation split (max F1); the test split is only reported. Every MLflow run records parameters, metrics, plots, the environment and pip freeze, the Git commit, the config hash, and the three dataset inputs.",
        "Reproducibility was checked, not assumed: identical weight hashes in a test, and the same dataset version and the same MLP validation AUC (0.909188) across two separate pipeline runs.",
      ],
    },
    {
      id: "registry",
      heading: "Model registry and versioning",
      paragraphs: [
        "Each run registers a new version of income-classifier tagged with the evidence the policy needs. Promotion requires validation ROC AUC of at least 0.85, validation Brier score of at most 0.15, ONNX fidelity within 1e-4 for PyTorch models, passed data-contract and parity tags, no regression against the current champion, and no earlier rollback of that version.",
        "Exercised on the Docker Compose stack: v1 (scikit-learn, val ROC AUC 0.9010) promoted, then v2 (PyTorch via ONNX, val ROC AUC 0.9092) promoted over it. Every decision is appended to an audit log.",
      ],
    },
    {
      id: "inference",
      heading: "Online and offline inference",
      paragraphs: [
        "Online: single records are validated against the contract and queued; an async micro-batcher groups requests for up to a few milliseconds so the model runs once per group (about 19 rows per call at 64 users). A batch endpoint takes up to 1,000 records, and an entity endpoint fetches features from the Feast online store by id.",
        "Offline: a batch CLI scores the 7,319-row test split through the same registry model; a test asserts its probabilities match the online API to within 1e-12.",
      ],
    },
    {
      id: "testing",
      heading: "Testing and CI/CD",
      paragraphs: [
        "93 automated tests: 87 in the suite (unit, integration, contract, parity, model, registry, rollback, drift, Kubernetes manifest structure, Responsible AI) with 90% line coverage, plus 6 smoke tests run live against the containers. Static checks: ruff, mypy, bandit, pip-audit, hadolint, kubeconform, promtool, and actionlint.",
        "A GitHub Actions workflow defines the same gates. Every job was run locally with make ci; the workflow itself has not yet run on GitHub.",
      ],
    },
    {
      id: "containers",
      heading: "Docker and Kubernetes",
      paragraphs: [
        "Docker Compose runs MLflow, the API, and Prometheus; the serving image is multi-stage, runs as a non-root user with a read-only root filesystem, and has a health check.",
        "Kubernetes: blue and green Deployments with startup, readiness, and liveness probes, resource requests and limits, an HPAs, and PodDisruptionBudgets. All 11 resources pass kubeconform in strict mode and a server-side dry run on a real Kubernetes 1.31 API server, and the blue-green selector switch was exercised there. No pod ran (a sandbox kernel restriction), so autoscaling and live traffic switching were never observed. This is local manifest work, not production Kubernetes experience.",
      ],
    },
    {
      id: "monitoring",
      heading: "Monitoring",
      paragraphs: [
        "Prometheus scrapes request counts, errors, latency histograms, batch sizes, the loaded model version, the prediction distribution, and a rolling positive rate compared with the model's own validation baseline. Five alert rules cover API down, model not loaded, error rate, p95 latency, and positive-rate shift.",
        "The Grafana dashboard's 17 panel queries were each executed against the live Prometheus (0 failed, 0 empty), but Grafana itself could not be installed in the sandbox, so the dashboard was never rendered.",
      ],
    },
    {
      id: "drift",
      heading: "Drift detection",
      paragraphs: [
        "Evidently produces data quality, input drift, prediction drift, and performance reports for a baseline and a documented shifted scenario. The baseline stays quiet; the shifted data raises an alert with prediction drift of 0.362 (Wasserstein). Replaying shifted traffic through the live API made the Prometheus positive rate climb to 0.444 against an expected 0.325 and fired PredictionPositiveRateShift.",
      ],
    },
    {
      id: "rollback",
      heading: "Rollback",
      paragraphs: [
        "Rollback moves @champion back to the most recent approved version, tags the current one rolled_back with a reason, and writes an audit event. In the drill, the running API reloaded from v1 to v2 through /admin/reload, smoke tests asserted v2, then rollback returned @champion to v1 with the reason recorded and the smoke tests asserted v1 again. A rolled-back version is refused by the promotion policy until a new version is registered.",
      ],
    },
    {
      id: "responsible-ai",
      heading: "Responsible-AI findings",
      paragraphs: [
        "The data contract keeps sex, race, and native country out of the model's inputs and retains them only for slicing. The full subgroup, SHAP, and threshold evaluation of both registered versions is its own case study.",
      ],
      bullets: [
        "See the Responsible AI Evaluation case study for the measured subgroup diagnostics.",
      ],
    },
    {
      id: "performance",
      heading: "Performance measurements",
      bullets: [
        "16 users: 133 vs 75 requests/s (1.76x), p95 160 vs 280 ms, batching on vs off.",
        "64 users: 146 vs 75 requests/s (1.95x), p95 620 vs 1,000 ms, 0 errors.",
        "At 1 user, batching adds about 6 ms (the collection window).",
        "Batch endpoint: about 6,200 rows/s (62 requests/s of 100 rows).",
        "These are relative numbers from a 1-CPU container with the load generator on the same 2 vCPUs, not capacity figures.",
      ],
    },
    {
      id: "tradeoffs",
      heading: "Technical tradeoffs",
      bullets: [
        "Micro-batching trades a few milliseconds of latency at low load for much better throughput under concurrency.",
        "Models are pyfunc models-from-code with skops and ONNX Runtime, so the serving image never unpickles arbitrary objects and never needs PyTorch.",
        "Feast with a file offline store and SQLite online store keeps everything local; a real deployment would use a managed online store such as Redis.",
        "Aliases instead of mutable versions make promotion and rollback cheap and auditable, at the cost of an explicit reload step for running services.",
      ],
    },
    {
      id: "failure-modes",
      heading: "Failure modes",
      bullets: [
        "No version holds @champion: /readyz returns 503 and the API retries until one is promoted.",
        "Feast data missing: readiness fails with a Feast error until features are materialized.",
        "Raw data changed: ingestion aborts on the checksum mismatch.",
        "An artifact contains types outside the skops allowlist: loading refuses it.",
        "A new champion's baseline differs from the old one: the positive-rate alert can fire briefly after promotion; the rule compares against the loaded model's own validation rate.",
      ],
    },
    {
      id: "repository",
      heading: "Repository and setup",
      code: "make setup\nmake pipeline          # ingest, features, train both models, promote\nmake serve             # API on :8000\nmake bench             # Locust, batching on vs off\nmake drift-demo        # shifted data must raise the alert\nmake ci                # lint, types, security, tests, manifests",
    },
  ],
};

// ----------------------------------------------------------------------------
//  2. Responsible AI Evaluation System
// ----------------------------------------------------------------------------

const rai: CaseStudy = {
  slug: "responsible-ai-evaluation",
  title: "Responsible AI Evaluation System",
  kicker: "ML evaluation · Responsible AI",
  summary:
    "An evaluation pipeline for every registered model version in the MLOps lab: SHAP explanations, Fairlearn subgroup diagnostics with bootstrap intervals and minimum sample sizes, threshold sweeps, Evidently monitoring with and without labels, a generated model card, and a hashed release-evidence record that never approves use on people.",
  seoDescription:
    "Case study: SHAP explanations, Fairlearn subgroup diagnostics with bootstrap confidence intervals and sample-size safeguards, threshold analysis, drift under a controlled shift, model cards, and provenance-linked release evidence.",
  evidenceNote: `${ENV_NOTE} The subgroup numbers are diagnostics; they do not show that either model treats any group fairly, and nothing here demonstrates regulatory compliance.`,
  tags: [
    "Python",
    "SHAP",
    "Fairlearn",
    "Evidently",
    "MLflow",
    "pandas",
    "pytest",
  ],
  links: [
    {
      label: "Evaluation code and reports",
      href: `${LAB}/tree/main/responsible_ai`,
    },
    {
      label: "Limitations",
      href: `${LAB}/blob/main/responsible_ai/docs/limitations.md`,
    },
    {
      label: "Model card (v1)",
      href: `${LAB}/blob/main/responsible_ai/reports/income-classifier-v1/model_card.md`,
    },
  ],
  metrics: [
    {
      label: "SHAP additivity error",
      value: "2.3e-15",
      context:
        "max |base + sum(SHAP) - output| on 600 test rows (v1); 2.4e-15 for v2",
      source: "reports/income-classifier-v1/results.json",
    },
    {
      label: "Selection rate, women vs men (v1)",
      value: "12.3% vs 40.6%",
      context:
        "at the model's threshold on the 7,319-row test split; a diagnostic, not a verdict",
      source: "reports/income-classifier-v1/fairness/subgroup_metrics.csv",
    },
    {
      label: "Groups held out of comparisons",
      value: "9",
      context:
        "below 100 rows, 20 positives, or 20 negatives; still reported with the reason",
      source: "reports/income-classifier-v1/results.json",
    },
    {
      label: "Sex equalized-odds gap under shift",
      value: "0.167 to 0.301",
      context: "v1, baseline vs controlled input shift with labels unchanged",
      source: "fairness/summary.json vs fairness/shifted_summary.json",
    },
    {
      label: "Release-evidence checks",
      value: "7 of 7",
      context:
        "for both v1 and v2; approved_for_consequential_use is always false",
      source: "reports/income-classifier-v{1,2}/release_evidence.json",
    },
    {
      label: "Automated tests",
      value: "22",
      context:
        "17 unit tests and 5 end-to-end tests on an isolated sampled registry",
      source: "tests/rai/",
    },
  ],
  shots: [
    {
      src: "/case-studies/responsible-ai-evaluation/shap-global.webp",
      alt: "Bar chart of mean absolute SHAP values for v1; marital_status is largest at about 0.12, followed by education_num and occupation.",
      caption:
        "Global SHAP importance for v1 in probability units. marital_status leads with 29.5% of total attribution.",
      width: 960,
      height: 840,
    },
    {
      src: "/case-studies/responsible-ai-evaluation/subgroups-race.webp",
      alt: "Selection rate and true positive rate by race with 95% bootstrap intervals; two small groups are grey and excluded from comparisons.",
      caption:
        "Selection rate and TPR by race with 95% bootstrap intervals. Grey bars are groups below the sample-size floor: shown, but never compared.",
      width: 1200,
      height: 440,
    },
    {
      src: "/case-studies/responsible-ai-evaluation/threshold-by-group.webp",
      alt: "Line charts of selection rate against decision threshold for sex and race groups, with the model threshold marked.",
      caption:
        "How each eligible group's selection rate moves with the decision threshold (v1, threshold 0.286 marked).",
      width: 1200,
      height: 415,
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem",
      paragraphs: [
        "A single accuracy number hides who a model gets wrong, and ad hoc fairness notebooks are easy to misquote. I wanted evaluation that is reproducible, tied to an exact model version and dataset, safe against noisy small-group comparisons, and hard to overclaim from.",
      ],
    },
    {
      id: "intended-use",
      heading: "Intended use",
      paragraphs: [
        "Educational evaluation of the lab's income classifier. The model is not approved for any decision about a real person. The registry tag approval_status=approved is an MLOps quality gate, and the model card says explicitly that it is not an ethics, fairness, or legal approval.",
      ],
    },
    {
      id: "architecture",
      heading: "Architecture",
      bullets: [
        "Input: any registry URI (for example models:/income-classifier@champion). The runner loads the model, the test split for evaluation, and the validation split as the monitoring reference.",
        "Explain: permutation SHAP with an independent masker over a 100-row background, 600 explained rows, categorical features integer-coded only for the explainer.",
        "Slice: Fairlearn MetricFrame for sex, race, age band, native-country group, and sex x race, with 300-resample bootstrap 95% intervals.",
        "Sweep thresholds 0.05 to 0.95 overall and per eligible group.",
        "Monitor: Evidently baseline, shifted (labels available), and shifted_no_labels scenarios, plus subgroup metrics recomputed on the shifted data.",
        "Record: model card (Markdown and JSON), a claims lint, and release_evidence.json with provenance and SHA-256 hashes of every artifact.",
      ],
    },
    {
      id: "dataset",
      heading: "Dataset and limitations",
      paragraphs: [
        "The same UCI Adult data as the lab: a 1994 US census extract whose sex and race columns are coarse census categories. Groupings such as age bands and US vs non-US are configuration choices that change the results. Excluding small groups makes comparisons stable and also means the evaluation says little about the groups often most at risk. Only sex x race intersections were evaluated.",
      ],
    },
    {
      id: "data-contracts",
      heading: "Data contracts",
      paragraphs: [
        "Protected attributes come only from real contract columns marked sensitive; they are never model inputs, and nothing is imputed or synthesized (missing values stay Unknown, which a unit test checks). The evaluation verifies that the evaluation data version matches the dataset version recorded on the model's training run.",
      ],
    },
    {
      id: "training",
      heading: "Training and reproducibility",
      paragraphs: [
        "No training happens here; the pipeline evaluates registered versions. Bootstrap and SHAP use fixed seeds, and a test confirms bootstrap intervals reproduce exactly. A full run took about 9 minutes per version on 2 vCPUs (530 s for v1, 526 s for v2), dominated by permutation SHAP; a smoke configuration runs in under a minute for CI.",
      ],
    },
    {
      id: "registry",
      heading: "Model registry and versioning",
      paragraphs: [
        "Each report is written per version (income-classifier-v1, -v2) and records the registered name, version, aliases at evaluation time, MLflow run id, flavor, threshold, the training commit and config hash, dataset version, per-split hashes, the evaluation code commit with a dirty flag, and package versions (SHAP 0.52.0, Fairlearn 0.14.0, Evidently 0.7.23).",
      ],
    },
    {
      id: "inference",
      heading: "Online and offline inference",
      paragraphs: [
        "Evaluation is offline batch scoring of the held-out test split through the same registry pyfunc the API serves, so the explained model is the served model. SHAP calls the model through the same interface on decoded, valid categories.",
      ],
    },
    {
      id: "testing",
      heading: "Testing and CI/CD",
      paragraphs: [
        "17 unit tests (size safeguard floors, exclusion from gap summaries, bootstrap bracketing and reproducibility, threshold sweep against a manual count, real-values-only slicing, exact SHAP recovery on a linear function, and a parametrized claims lint) plus 5 end-to-end tests that run the whole pipeline against an isolated sampled registry and re-verify every artifact hash. A dedicated rai-smoke CI job is defined; it has been run locally, not yet on GitHub.",
      ],
    },
    {
      id: "containers",
      heading: "Docker and Kubernetes",
      paragraphs: [
        "Not applicable to this component. It runs as a Python module against the same MLflow registry the lab's Docker Compose stack provides.",
      ],
    },
    {
      id: "monitoring",
      heading: "Monitoring",
      paragraphs: [
        "The shifted_no_labels scenario shows what can be monitored before labels arrive: data quality, input drift, and prediction drift only. Performance and subgroup error rates need labels, which in a real system arrive late and can be biased by the model's own decisions.",
      ],
    },
    {
      id: "drift",
      heading: "Drift detection",
      paragraphs: [
        "Under the controlled shift (3 of 11 features drifted), both versions raised the prediction-drift alert while the baseline stayed quiet. The subgroup effect was larger than the headline one: for v1, ROC AUC fell only from 0.913 to 0.892, but the sex equalized-odds difference rose from 0.167 to 0.301. Subgroup checks belong in the monitoring loop, not only at release.",
      ],
    },
    {
      id: "rollback",
      heading: "Rollback",
      paragraphs: [
        "The evaluation was run on both the current champion (v1) and the rolled-back v2, and each report records the aliases at evaluation time, so a reviewer can compare what was served with what was withdrawn.",
      ],
    },
    {
      id: "responsible-ai",
      heading: "Responsible-AI findings",
      bullets: [
        "v1 (scikit-learn): selection rate 12.3% for women vs 40.6% for men; equalized-odds difference 0.167 for sex and 0.132 for race (3 of 5 race groups eligible).",
        "v2 (PyTorch via ONNX): 9.8% vs 32.2%; equalized-odds difference 0.108 for sex but 0.218 for race. A model change moved two diagnostics in opposite directions, which is why no single fairness score is reported.",
        "Gaps mix base-rate differences in the 1994 data (30.7% vs 10.5% positives for men and women in the test split) with model behavior. No mitigation was applied.",
        "marital_status and relationship carry household information that correlates with sex, so they can act as proxies even though sex is not an input.",
        "A claims lint rejects unqualified fairness, compliance, or approval language in generated documents unless the sentence negates it.",
      ],
    },
    {
      id: "performance",
      heading: "Performance measurements",
      bullets: [
        "v1 test split: ROC AUC 0.913, selection rate 31.1% at threshold 0.286.",
        "v2 test split: ROC AUC 0.919, selection rate 24.7% at threshold 0.392.",
        "Top SHAP feature for both: marital_status (29.5% of attribution for v1, 19.8% for v2).",
      ],
    },
    {
      id: "tradeoffs",
      heading: "Technical tradeoffs",
      bullets: [
        "Permutation SHAP is model-agnostic and exactly additive, at the cost of runtime (about 9 minutes per version on 2 vCPUs).",
        "Size floors stabilize comparisons but silence the smallest groups; both effects are documented.",
        "Reporting several metrics side by side instead of one score is harder to summarize and much harder to misquote.",
        "Evidently HTML reports (about 4 MB each) stay out of Git; their hashes remain in the release record.",
      ],
    },
    {
      id: "failure-modes",
      heading: "Failure modes",
      bullets: [
        "The evaluation data version does not match the model's training data: the release check fails and the runner exits non-zero.",
        "Fewer than two groups clear the size floor: no disparity summary is produced, with a note explaining why.",
        "A generated card or the limitations document contains an unqualified fairness or approval claim: the lint check fails.",
        "Any of the 7 release checks fails: the command exits 1 so CI cannot pass silently.",
      ],
    },
    {
      id: "repository",
      heading: "Repository and setup",
      code: "make pipeline                           # if no model is registered yet\nmake rai                                # evaluate @champion\nmake rai-v2                             # evaluate registry version 2\nmake rai-smoke                          # small budgets, 2,500 rows\nmake rai-test                           # 17 unit + 5 end-to-end tests",
    },
  ],
};

// ----------------------------------------------------------------------------
//  3. Neural Network Training Benchmark
// ----------------------------------------------------------------------------

const nnBench: CaseStudy = {
  slug: "neural-network-training-benchmark",
  title: "Neural Network Training Benchmark",
  kicker: "Deep learning · Training systems",
  summary:
    "My from-scratch NumPy network (manual backpropagation) rebuilt in PyTorch and TensorFlow/Keras on identical data, weights, and batch order, then extended with DataLoader tuning, gradient accumulation, checkpoint resume, CPU mixed precision, DDP, MirroredStrategy, ONNX export, and training and inference benchmarks. CPU only.",
  seoDescription:
    "Case study: NumPy, PyTorch, and Keras implementations that agree to 5e-16 in float64, with gradient accumulation, checkpoint resume, CPU bfloat16 autocast, 2-process DDP, MirroredStrategy, ONNX Runtime, and measured CPU benchmarks.",
  evidenceNote: `${ENV_NOTE} No GPU was available: CUDA mixed precision, NCCL, and multi-GPU code paths are implemented but have never been executed, and no GPU numbers exist.`,
  tags: [
    "Python",
    "NumPy",
    "PyTorch",
    "TensorFlow/Keras",
    "ONNX Runtime",
    "pytest",
    "Docker",
  ],
  links: [
    { label: "Repository", href: NN },
    { label: "Benchmark folder", href: `${NN}/tree/main/benchmark` },
    {
      label: "Full results",
      href: `${NN}/blob/main/benchmark/results/full/SUMMARY.md`,
    },
  ],
  metrics: [
    {
      label: "Cross-framework agreement",
      value: "< 1e-15",
      context: "float64 weights: NumPy vs PyTorch 3.9e-16, vs Keras 5.0e-16",
      source: "benchmark/results/full/results.json (parity)",
    },
    {
      label: "Test accuracy (3 seeds)",
      value: "90.2% / 90.9%",
      context:
        "digits (1,000 images) / faces (150 images), identical across NumPy, PyTorch fp32, and Keras",
      source: "benchmark/results/full/training_summary.csv",
    },
    {
      label: "Checkpoint resume",
      value: "bitwise identical",
      context:
        "interrupted after epoch 6 of 15, resumed, compared with an uninterrupted run",
      source: "results.json (checkpoint_recovery)",
    },
    {
      label: "DDP vs single process",
      value: "5.0e-16",
      context: "2 processes, gloo backend, CPU; same update as one process",
      source: "results.json (ddp.exactness_float64)",
    },
    {
      label: "Single-record p50 latency",
      value: "15 vs 32 µs",
      context: "ONNX Runtime vs PyTorch eager on digits",
      source: "benchmark/results/full/inference_single_record.csv",
    },
    {
      label: "ONNX parity",
      value: "1.0e-6",
      context:
        "max probability difference vs PyTorch on the digits test set; 100% argmax agreement",
      source: "results.json (onnx)",
    },
  ],
  shots: [
    {
      src: "/case-studies/neural-network-training-benchmark/training-accuracy.webp",
      alt: "Bar charts of test accuracy for six framework variants on digits and faces; all bars are nearly equal, about 0.90 for both datasets.",
      caption:
        "Test accuracy by framework and variant, mean and spread over 3 seeds. Equal bars are the point: same data, weights, and batch order.",
      width: 1200,
      height: 388,
    },
    {
      src: "/case-studies/neural-network-training-benchmark/training-time.webp",
      alt: "Bar charts of training wall time; NumPy is fastest, DataLoader workers slowest on digits.",
      caption:
        "Training time on 2 vCPUs. NumPy is fastest at this model size, and workers and bf16 add overhead.",
      width: 1200,
      height: 388,
    },
    {
      src: "/case-studies/neural-network-training-benchmark/inference-latency.webp",
      alt: "Bar charts of single-record p50 and p95 latency; ONNX Runtime lowest, Keras tf.function highest.",
      caption:
        "Single-record latency in microseconds (p50 and p95) for NumPy, PyTorch, ONNX Runtime, and Keras.",
      width: 1200,
      height: 380,
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem",
      paragraphs: [
        "I had written a three-layer network with hand-coded backpropagation for class, with a PyTorch baseline next to it. I wanted to know whether the frameworks were really computing the same thing, and to learn the training-systems mechanics that matter at scale (data loading, accumulation, checkpoints, mixed precision, data parallelism, export) on a model small enough to verify exactly.",
      ],
    },
    {
      id: "intended-use",
      heading: "Intended use",
      paragraphs: [
        "A learning and verification benchmark. The digit and face classifiers are coursework-scale models on binarized images and are not intended for any real recognition task.",
      ],
    },
    {
      id: "architecture",
      heading: "Architecture",
      bullets: [
        "The original code/ folder and its results are untouched; a test compares them byte for byte with the first commit.",
        "Shared data: every framework receives the arrays produced by the original loader from the official train, validation, and test files, fingerprinted with SHA-256.",
        "Same model: 784 to 64 to 32 to 10 (digits) and 4200 to 32 to 16 to 2 (faces), sigmoid hidden layers, softmax cross-entropy, plain SGD at learning rate 0.5.",
        "Same start and order: PyTorch and Keras copy the NumPy network's initial weights and replay its exact per-epoch shuffle.",
        "Extensions: a PyTorch trainer (DataLoader, accumulation, AMP, checkpoints), a DDP launcher, a MirroredStrategy script, ONNX export, and a benchmark runner that writes JSON, CSV, plots, and a summary.",
      ],
    },
    {
      id: "dataset",
      heading: "Dataset and limitations",
      paragraphs: [
        "Digits: 5,000 training, 1,000 validation, 1,000 test images (28x28). Faces: 451 training, 301 validation, 150 test images (70x60). Pixels are binarized. The face test set is small, so a single image moves accuracy by 0.67 points.",
      ],
    },
    {
      id: "data-contracts",
      heading: "Data contracts",
      paragraphs: [
        "There is no formal data contract here. The equivalent guarantees are enforced by tests: the benchmark loader must match the original loader exactly, shapes and label sets are asserted, the shared arrays are read-only so one framework cannot mutate another's input, and split fingerprints must be stable.",
      ],
    },
    {
      id: "training",
      heading: "Training and reproducibility",
      paragraphs: [
        "Seeds are fixed and the environment is captured with every run (CPU model and flags, detected GPUs, package versions, Git commit and dirty flag). The original scripts never seeded their shuffle, which is why earlier reruns varied slightly; here every framework replays the same seeded order, and a resumed run matches an uninterrupted one bit for bit.",
        "Mechanics, each covered by a test: DataLoader workers, pin_memory, persistent workers, and prefetch (workers do not change results); gradient accumulation that equals the larger batch to 4.4e-16, including a short final group; CPU bfloat16 autocast; and atomic checkpoints with a config-hash check whose resume is bitwise identical.",
      ],
    },
    {
      id: "registry",
      heading: "Model registry and versioning",
      paragraphs: [
        "Not applicable: there is no model registry in this project. Versioning is by Git commit (the full results were produced on a clean commit, recorded in the results file), the training config hash stored in each checkpoint, and SHA-256 hashes of the exported ONNX models.",
      ],
    },
    {
      id: "inference",
      heading: "Online and offline inference",
      paragraphs: [
        "There is no deployed service. Inference is benchmarked in-process four ways (the original NumPy forward pass, PyTorch eager, ONNX Runtime, and a Keras tf.function) for single records, batches of 1 to 1,000, and 1 to 8 concurrent client threads.",
      ],
    },
    {
      id: "testing",
      heading: "Testing and CI/CD",
      paragraphs: [
        "22 pytest tests: 21 pass and 1 is skipped on this machine (the CUDA fp16 test, which runs only when a GPU is detected). A GitHub Actions workflow runs lint, the tests, and the smoke benchmark on a CPU runner; it passes actionlint but has not yet run on GitHub.",
      ],
    },
    {
      id: "containers",
      heading: "Docker and Kubernetes",
      paragraphs: [
        "A CPU Dockerfile installs the CPU PyTorch wheel and runs the benchmark as a non-root user; it passes hadolint but was not built in the sandbox because the PyTorch wheel index was unreachable. There is no Kubernetes component.",
      ],
    },
    {
      id: "monitoring",
      heading: "Monitoring",
      paragraphs: [
        "Not applicable: nothing is served. The closest equivalent is the execution-status table every run writes, listing each capability as implemented and executed, or implemented but not executed, based on detected hardware.",
      ],
    },
    {
      id: "drift",
      heading: "Drift detection",
      paragraphs: [
        "Not applicable to this project: the datasets are fixed benchmark splits.",
      ],
    },
    {
      id: "rollback",
      heading: "Rollback",
      paragraphs: [
        "Not applicable in the serving sense. Checkpoint recovery is the training-side equivalent: an interrupted run resumes from its last checkpoint and ends bitwise identical, and resume refuses a checkpoint written by a different configuration.",
      ],
    },
    {
      id: "responsible-ai",
      heading: "Responsible-AI findings",
      paragraphs: [
        "Not assessed: the tasks are coursework digit and face classification on binarized images with no demographic information, so no subgroup evaluation is possible or claimed.",
      ],
    },
    {
      id: "performance",
      heading: "Performance measurements",
      bullets: [
        "Digits accuracy 90.23% ± 0.53 and faces 90.89% ± 0.31 over 3 seeds, identical for NumPy, PyTorch fp32, and Keras; bf16 autocast 90.27% on digits.",
        "Training time on digits: NumPy 1.21 s, PyTorch 3.30 s, Keras 7.12 s.",
        "2-process DDP (gloo): 12.9 s per rank vs 3.4 s single-process, same accuracy. MirroredStrategy on 2 logical CPU devices: 20.6 s vs 8.0 s.",
        "Single-record p50 on digits: ONNX Runtime 15 µs, PyTorch 32 µs, NumPy 35 µs, Keras 421 µs. Batch of 1,000: ONNX Runtime 1.48M rows/s, PyTorch 1.23M rows/s.",
      ],
    },
    {
      id: "tradeoffs",
      heading: "Technical tradeoffs",
      bullets: [
        "At this model size, per-step framework overhead dominates, so NumPy trains fastest, bf16 is slower than fp32 (casts cost more than the tiny matmuls save), and DataLoader workers slow things down (the data is already in memory).",
        "Distributed training is slower here because every 8-row step pays an all-reduce on 2 vCPUs. DDP pays off when compute per step dominates communication, which this hardware cannot show.",
        "Testing in float64 makes framework differences provable (agreement to rounding error) rather than approximately equal.",
      ],
    },
    {
      id: "failure-modes",
      heading: "Failure modes",
      bullets: [
        "fp16 autocast requested without CUDA: refuses to run instead of silently emulating.",
        "A DDP rank occasionally aborted at start-up under pytest on 2 vCPUs: fixed with file-based rendezvous, a barrier before teardown, and one recorded relaunch (the committed run needed one attempt).",
        "Resume with a changed configuration: refused by the checkpoint's config hash.",
        "With 2 or more GPUs present, the launcher would select NCCL automatically; that path has never been exercised.",
      ],
    },
    {
      id: "repository",
      heading: "Repository and setup",
      code: "pip install torch==2.14.0 --index-url https://download.pytorch.org/whl/cpu\npip install -r benchmark/requirements.txt\npip install --no-deps -e benchmark\nnnbench env                      # detected hardware\npytest benchmark/tests\nnnbench run --profile smoke      # about 1 minute\nnnbench run --profile full       # about 4 minutes on 2 vCPUs",
    },
  ],
};

export const caseStudies: CaseStudy[] = [mlopsLab, rai, nnBench];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
