// ============================================================================
//  SINGLE SOURCE OF TRUTH
//  Everything the site renders AND everything the chat knows comes from here.
//  Voice: first person ("I / me / my"). The chat answers in first person too.
//
//  POSITIONING: This portfolio targets FIVE role families:
//    1. Backend Engineer — REST APIs, pipelines, auth, databases, system design
//    2. AI/ML Engineer — retrieval, embeddings, RAG, neural nets, LLM eval
//    3. Python Developer — automation, scripting, data processing, libraries
//    4. IoT / Connected Systems — device telemetry, IoT platforms, C/C++ systems
//    5. IT / Systems — troubleshooting, infrastructure, security, AWS, auth
//  The knowledge base is written so the chat can intelligently surface the
//  right experience for whichever role a recruiter is asking about.
//
//  Last synced with résumé: August 2026 (2-page version).
// ============================================================================

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  description: string;
  tech: string[];
  highlights: string[];
  links: ProfileLink[];
  flagship?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
  current?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Edge {
  title: string;
  detail: string;
}

export interface KnowledgeChunk {
  id: string;
  title: string;
  source: string;
  keywords: string[];
  text: string;
}

// ----------------------------------------------------------------------------
//  CORE PROFILE
// ----------------------------------------------------------------------------

export const profile = {
  name: "Baavansh Reddy Gundlapalli",
  shortName: "Baavansh",
  initials: "BG",
  headline: "Backend & AI Systems Engineer",
  tagline:
    "Four years of engineering across REST APIs and IoT platforms, and now LLM and ML integration.",
  status:
    "Backend & AI Systems Engineer at TAIRC · open to backend, AI/ML, Python, and IoT/connected-systems roles",
  location: "New Brunswick, NJ",
  university: "Rutgers University",
  major: "Computer Science",
  gradYear: "May 2026",
  email: "baavanshreddy@gmail.com",
  github: "https://github.com/BaavanshReddy",
  linkedin: "https://www.linkedin.com/in/baavansh-reddy-gundlapalli",
  pypi: "https://pypi.org/project/agentmemry/",
  resumeUrl: "/resume.pdf",
  availability: "Open to 2026 roles",
  summary:
    "I'm a backend and AI systems engineer with four years of engineering experience across REST APIs and IoT platforms, and now LLM and ML integration in backend services. My core stack is Python, Java, and C, and my work ranges from authentication systems and data pipelines to compilers, CPU simulators, and operating systems. I'm a Computer Science graduate from Rutgers University (Magna Cum Laude, 3.76 GPA), currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC). I'm the author of AgentMemry, an open-source memory library for AI agents published on PyPI, and co-author of a retrieval evaluation study benchmarking BM25 against RAG. As personal projects I've also built and measured ML systems end to end: an MLOps deployment lab, a Responsible AI evaluation system, and a neural network training benchmark. This site hosts an AI assistant you can chat with about any of it.",
};

// ----------------------------------------------------------------------------
//  HERO PROOF STRIP — the four numbers a recruiter scans for
// ----------------------------------------------------------------------------

export const heroStats: { label: string; value: string }[] = [
  { label: "Experience", value: "4 years" },
  { label: "Open source", value: "Live on PyPI" },
  { label: "IoT platform", value: "2 years" },
  { label: "Systems in C", value: "3 projects" },
];

// ----------------------------------------------------------------------------
//  WHAT MAKES ME DIFFERENT  (the "unfair edges")
// ----------------------------------------------------------------------------

export const edges: Edge[] = [
  {
    title: "Four years, already shipping",
    detail:
      "I've been doing engineering work since 2022: Java and Spring Boot business systems, two years on an IoT security platform at KAVACH, backend externships, and now production backend and AI services at TAIRC. Not a résumé of coursework.",
  },
  {
    title: "Published open source",
    detail:
      "AgentMemry is my memory library for AI agents: ~500 lines, a 15-test pytest suite, local-first, and published on PyPI where anyone can pip install it.",
  },
  {
    title: "Owns problems end-to-end",
    detail:
      "I don't hand problems up. I show up with the read, two or three options, and the plan to ship, and then I ship it.",
  },
  {
    title: "Rare systems depth",
    detail:
      "I built a full compiler (lexer, recursive-descent parser, AST, and code generation), a single-cycle RISC-V CPU in C, and a Unix-style filesystem with inodes and persistence. I reason about how code actually runs on real hardware, not just how to call an API.",
  },
  {
    title: "Hardware-to-cloud range",
    detail:
      "IoT telemetry and device-data flows on one end, PostgreSQL, REST APIs, authentication, AWS-deployed services, and React front ends on the other. I've worked at both ends of that line in production codebases.",
  },
  {
    title: "Tests what I build",
    detail:
      "15-test pytest suite on AgentMemry, JUnit coverage on RuPizza. I don't ship code I haven't verified.",
  },
];

// ----------------------------------------------------------------------------
//  PROJECTS
// ----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "agentmemry",
    name: "AgentMemry: Open-Source Memory for AI Agents",
    tag: "AI / Open Source · Published on PyPI",
    blurb:
      "My open-source, local-first memory library for AI agents: SQLite, on-device embeddings, no cloud. Published on PyPI.",
    description:
      "AgentMemry is a ~500-line Python library I built, open-sourced, and published to PyPI that gives AI agents persistent memory without a cloud database or any API keys. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity. I added a Maximal Marginal Relevance (MMR) diversity mode and per-agent namespacing so multiple agents can share one database safely. The public API is covered by 15 passing unit tests.",
    tech: [
      "Python",
      "SQLite",
      "sentence-transformers",
      "Semantic Search",
      "MMR",
      "pytest",
    ],
    highlights: [
      "Published on PyPI: pip install agentmemry",
      "Local-first: no cloud database, no API keys, works offline",
      "Semantic retrieval (cosine similarity) + MMR diversity mode",
      "Per-agent namespacing inside a single SQLite database",
      "Public API covered by 15 pytest tests",
      "~500 lines, no heavy dependencies, MIT licensed",
    ],
    links: [
      { label: "PyPI", href: "https://pypi.org/project/agentmemry/" },
      { label: "Source", href: "https://github.com/BaavanshReddy/agentmemry" },
    ],
    flagship: true,
  },
  {
    id: "portfolio",
    name: "Chat-with-Baavansh Portfolio",
    tag: "AI / Full-stack",
    blurb:
      "The site you're on: a Next.js portfolio with an embedded assistant that answers from a structured knowledge base.",
    description:
      "This site itself is a project. I paired a Next.js front end with an assistant grounded in one structured knowledge base. With an API key configured, a server route sends the whole knowledge base to Claude as context and screens the reply against claim guardrails; otherwise, or if the API fails, a keyword-retrieval engine ranks knowledge chunks in the browser and answers with their sources. Nothing was fine-tuned or trained. Recruiters don't just read my résumé; they can question it.",
    tech: ["Next.js", "TypeScript", "Claude API", "Retrieval", "Tailwind CSS"],
    highlights: [
      "Answers grounded in a structured knowledge base",
      "Live Claude API engine with an in-browser retrieval fallback",
      "Offline answers cite their knowledge-base sources",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/baavansh-portfolio",
      },
    ],
  },
  {
    id: "tinyl",
    name: "TinyL Compiler",
    tag: "Compilers",
    blurb:
      "A full compiler for the TinyL language: lexer, parser, AST, code generation.",
    description:
      "I built a complete compiler (lexer, recursive-descent parser, AST, intermediate representation, and code generation) translating the TinyL language from a formal grammar down to stack-based bytecode.",
    tech: ["Python", "Compilers", "Parsing", "ASTs", "Code Generation"],
    highlights: [
      "Lexer and recursive-descent parser with AST construction",
      "Intermediate representation and translation pipeline",
      "End-to-end: source text to generated target bytecode",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/tinyl-compiler",
      },
    ],
  },
  {
    id: "neuralnet",
    name: "Neural Network from Scratch",
    tag: "AI / Fundamentals",
    blurb:
      "Perceptron and 3-layer neural net implemented from scratch, with hand-coded forward pass and backprop.",
    description:
      "I implemented a perceptron and a 3-layer neural network with hand-coded forward propagation and backpropagation in NumPy. A later benchmark rebuilt the same network in PyTorch and Keras on identical data, weights, and batch order: all three agree to within 1e-15 in float64 and reach 90.2% digit and 90.9% face test accuracy over 3 seeds.",
    tech: ["Python", "NumPy", "PyTorch", "TensorFlow/Keras"],
    highlights: [
      "Hand-coded forward pass and backprop, no ML framework for the core",
      "90.2% digits, 90.9% faces (test, 3 seeds)",
      "Matches PyTorch and Keras to within 1e-15 in float64",
    ],
    links: [
      {
        label: "Case study",
        href: "/projects/neural-network-training-benchmark",
      },
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/neural-net-from-scratch",
      },
    ],
  },
  {
    id: "riscv",
    name: "RISC-V CPU Simulator",
    tag: "Systems / C",
    blurb:
      "A single-cycle RV32I processor in C: full instruction decode, datapath, and a 1 KiB direct-mapped cache.",
    description:
      "I wrote a single-cycle RISC-V RV32I CPU simulator in C: instruction fetch and decode, the datapath and register file, and a 1 KiB direct-mapped cache with the memory hierarchy modelled around it. This is the project that turned computer architecture from a lecture topic into something I can reason about while debugging real systems.",
    tech: ["C", "RISC-V", "Computer Architecture", "Caches"],
    highlights: [
      "Full RV32I instruction decode and single-cycle datapath",
      "1 KiB direct-mapped cache with hit/miss accounting",
      "Memory hierarchy simulation end to end",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/risc-v-simulator",
      },
    ],
  },
  {
    id: "filesystem",
    name: "Unix-Style Filesystem",
    tag: "Systems / C",
    blurb:
      "A Linux-like virtual filesystem in C: inodes, Unix permissions, persistence, and an interactive shell.",
    description:
      "I built a Linux-like virtual filesystem in C around a real inode architecture, with Unix-style permissions, serialization so the filesystem persists across runs, and an interactive shell to drive it. Writing it is why system calls, file descriptors, and permission bits stopped being abstractions.",
    tech: ["C", "Operating Systems", "Inodes", "Serialization"],
    highlights: [
      "Inode-based layout with directory and file allocation",
      "Unix permission model and ownership checks",
      "Persistent serialization plus an interactive shell",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/linux-filesystem",
      },
    ],
  },
  {
    id: "rupizza",
    name: "RuPizza: OOP Ordering App",
    tag: "OOP / Java",
    blurb:
      "JavaFX ordering app designed around OOP: inheritance, polymorphism, Factory pattern.",
    description:
      "I developed a JavaFX desktop ordering application designed around object-oriented principles (inheritance, polymorphism, and the Factory pattern), featuring an order builder, store-order management, and JUnit test coverage.",
    tech: ["Java", "JavaFX", "JUnit", "OOP"],
    highlights: [
      "Order builder + store-order management UI",
      "Factory pattern for pizza-type construction",
      "JUnit coverage across the domain layer",
    ],
    links: [
      { label: "Source", href: "https://github.com/BaavanshReddy/RUPizza" },
    ],
  },
  {
    id: "scraper",
    name: "Campus Event Scraper",
    tag: "Python / Automation",
    blurb:
      "Python scraping pipeline → indexed SQLite, with exponential-backoff retries and offline fallback.",
    description:
      "I built a Python web-scraping pipeline that collects and normalizes university event listings into an indexed SQLite database, staying reliable through exponential-backoff retries, URL-based deduplication, and graceful offline fallback when sources are unavailable.",
    tech: ["Python", "BeautifulSoup", "SQLite"],
    highlights: [
      "Normalized event listings into an indexed SQLite database",
      "Exponential-backoff retries and URL-based deduplication",
      "Graceful offline fallback when sources are unavailable",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/campus-event-scraper",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
//  RESEARCH
// ----------------------------------------------------------------------------

export const research = {
  title: "LLM FactCheck: Factual QA Evaluation Framework",
  tech: ["Python", "RAG", "BM25", "TriviaQA"],
  description:
    "I co-authored a two-person course research paper benchmarking LLM factual question-answering across direct prompting, BM25 retrieval, and RAG on a controlled 100-question TriviaQA evaluation set. BM25 surfaced supporting evidence for 90% of questions, yet moving from direct answering to RAG raised normalized exact match by only 3 points (0.66 to 0.69) and token F1 from 0.784 to 0.803, pointing to evidence use and answer generation, not retrieval, as the main bottleneck. The framework includes an 11-class error taxonomy from a manual review and a Streamlit dashboard for inspecting individual failures.",
  repo: "https://github.com/BaavanshReddy/LLM_factcheck",
};

// ----------------------------------------------------------------------------
//  EXPERIENCE  — reverse chronological, mirrors the résumé
// ----------------------------------------------------------------------------

export const experience: ExperienceItem[] = [
  {
    id: "tairc",
    role: "Backend & AI Systems Engineer",
    org: "TAIRC (The AI Research Center)",
    period: "June 2026 – Present",
    current: true,
    summary:
      "Building Python backend services, REST APIs, and the LLM/ML layer on top of them.",
    points: [
      "Build and maintain Python backend services and REST APIs, designing relational schemas and data-access layers that support AI-enabled research and production applications.",
      "Integrate LLM and machine-learning components into backend services, covering model invocation, prompt orchestration, retrieval, and output evaluation.",
      "Convert research prototypes into deployable, tested endpoints, owning features from requirements analysis through API design, implementation, testing, and deployment.",
      "Work with research and engineering staff to translate technical requirements into production systems, applying software engineering fundamentals across the full development lifecycle.",
    ],
  },
  {
    id: "lively",
    role: "Full-Stack Engineering Extern",
    org: "LIVELY (Jillcyn Enterprises, LLC), Rutgers MBS Externship Exchange",
    period: "Jan 2026 – May 2026",
    summary: "Co-built LIVEY, a full-stack event-discovery platform.",
    points: [
      "Co-built LIVEY, a full-stack event-discovery platform, developing React search and filtering components and engineering REST API routes across the front and back end.",
      "Integrated Supabase (PostgreSQL) for real-time data storage, user authentication, and event management across the platform.",
    ],
  },
  {
    id: "lrrh",
    role: "Software Engineering Extern",
    org: "Little Red Riding Hood Inc. (Rutgers MBS Externship Exchange)",
    period: "Sep 2025 – Dec 2025",
    summary:
      "Built secure authentication and real-time tracking for a safety-focused rideshare platform.",
    points: [
      "Engineered secure authentication for a safety-focused rideshare platform, implementing role-based login and credential management for separate rider and driver accounts.",
      "Built driver session tracking and real-time geolocation handling on cloud-deployed (AWS) services, supporting dispatch coordination and passenger-safety workflows.",
    ],
  },
  {
    id: "kavach-iot",
    role: "Backend & IoT Engineering Intern",
    org: "KAVACH (VIANSEC Solutions Pvt. Ltd.), Hyderabad, India",
    period: "Aug 2024 – Aug 2025",
    summary:
      "Integrated IoT telemetry and AI-generated detections into incident and alert workflows.",
    points: [
      "Collaborated with the engineering team to integrate IoT telemetry and AI-generated detections into incident and alert workflows.",
      "Validated device-data flows, monitored system behavior, documented integration issues, and supported troubleshooting.",
    ],
  },
  {
    id: "kavach-swe",
    role: "Software Engineering Intern",
    org: "KAVACH (VIANSEC Solutions Pvt. Ltd.), Hyderabad, India",
    period: "Sep 2023 – Aug 2024",
    summary:
      "Built dashboard functionality for site operations, incident tracking, and alert management.",
    points: [
      "Contributed to dashboard functionality for user access, site operations, incident tracking, and alert management.",
      "Performed software testing, documented defects, and supported Docker-based deployments and application debugging.",
    ],
  },
  {
    id: "rnr",
    role: "Software & Business Systems Intern",
    org: "RNR Facilities Pvt. Ltd. (now RNR Infra Pvt. Ltd.), Hyderabad, India",
    period: "Aug 2022 – Aug 2023",
    summary:
      "Java and Spring Boot work-order and vendor-tracking application backed by MySQL.",
    points: [
      "Contributed to development of a Java and Spring Boot work-order and vendor-tracking application backed by MySQL.",
      "Tested and documented application features while maintaining database records and operational reports.",
    ],
  },
];

// ----------------------------------------------------------------------------
//  LEADERSHIP & ACTIVITIES
// ----------------------------------------------------------------------------

export interface LeadershipItem {
  role: string;
  org: string;
  period: string;
  detail: string;
}

export const leadership: LeadershipItem[] = [
  {
    role: "Community Service Officer",
    org: "Rutgers University Police Department",
    period: "Jan 2025 – May 2026",
    detail:
      "Supported incident response and crowd management for large-scale university events.",
  },
  {
    role: "Risk Management Chair · Head of Judiciary Board · Co-Brotherhood Chair",
    org: "Alpha Phi Delta Fraternity",
    period: "May 2024 – May 2026",
    detail:
      "Three elected positions across two years, leading safety compliance, conduct governance, and member engagement.",
  },
  {
    role: "Administration Secretary",
    org: "ENIGMA Technical Society",
    period: "Aug 2023 – May 2024",
    detail:
      "Organized technical workshops and streamlined communication across society events.",
  },
];

export const languages = ["English", "Hindi", "Telugu"];

// ----------------------------------------------------------------------------
//  SKILLS — aligned to the current résumé
// ----------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "Java",
      "C",
      "C++",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Frameworks & Web",
    items: ["FastAPI", "Node.js", "Express", "Spring Boot", "React", "Next.js"],
  },
  {
    label: "Databases & Storage",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Supabase",
      "MinIO (S3-compatible)",
    ],
  },
  {
    label: "AI & ML",
    items: [
      "LLM integration",
      "RAG pipelines",
      "Vector search",
      "Embeddings",
      "Semantic search",
      "Prompt engineering",
      "LLM evaluation",
      "PyTorch",
      "NumPy",
      "sentence-transformers",
      "Claude API",
    ],
  },
  {
    label: "ML Systems & MLOps (projects)",
    items: [
      "scikit-learn",
      "TensorFlow/Keras",
      "ONNX Runtime",
      "MLflow",
      "Feast",
      "SHAP",
      "Fairlearn",
      "Evidently",
      "Prometheus",
      "Locust",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "AWS", "Vercel", "Git", "GitHub"],
  },
  {
    label: "Systems & Low-level",
    items: [
      "Computer architecture",
      "RISC-V",
      "Compilers",
      "Operating systems",
      "Memory hierarchies",
      "IoT telemetry",
    ],
  },
  {
    label: "Tools & Concepts",
    items: [
      "pytest",
      "JUnit",
      "Object-oriented design",
      "System design",
      "REST API design",
      "Microservices",
      "Agile collaboration",
    ],
  },
];

// ----------------------------------------------------------------------------
//  CHAT: suggested starter questions
// ----------------------------------------------------------------------------

export const suggestedQuestions: string[] = [
  "What ML systems have you built?",
  "Have you trained models on GPUs?",
  "What is AgentMemry?",
  "Tell me about your IoT experience",
  "Why should I hire you?",
  "What's your backend experience?",
  "How many years have you been engineering?",
];
