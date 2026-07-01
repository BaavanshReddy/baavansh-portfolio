// ============================================================================
//  SINGLE SOURCE OF TRUTH
//  Everything the site renders AND everything the chat knows comes from here.
//  Voice: first person ("I / me / my"). The chat answers in first person too.
//
//  POSITIONING: This portfolio targets FIVE role families:
//    1. AI/ML Engineer — retrieval, embeddings, RAG, neural nets, LLM eval
//    2. Backend Engineer — APIs, pipelines, auth, databases, system design
//    3. Python Developer — automation, scripting, data processing, libraries
//    4. IT / Systems — troubleshooting, infrastructure, security, AWS, auth
//    5. IoT / Connected Systems — C/C++ systems work, cloud-platform exposure
//       (AWS, S3-compatible storage), OS internals, embedded-adjacent depth
//  The knowledge base is written so the chat can intelligently surface the
//  right experience for whichever role a recruiter is asking about.
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
  headline: "Software Engineer",
  tagline:
    "I build things that ship — backend APIs, AI/ML systems, Python tooling, and the systems work underneath them.",
  status:
    "Backend & AI Systems Engineer at TAIRC · open to backend, AI/ML, and IoT/connected-systems roles",
  location: "New Brunswick, NJ",
  university: "Rutgers University",
  major: "Computer Science",
  gradYear: "May 2026",
  email: "baavanshreddy@gmail.com",
  github: "https://github.com/BaavanshReddy",
  linkedin: "https://www.linkedin.com/in/baavansh",
  resumeUrl: "/resume.pdf",
  summary:
    "I'm a Computer Science graduate from Rutgers University (Magna Cum Laude, 3.76 GPA), currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC). I've shipped REST APIs, authentication systems, data pipelines, and AI tooling — including AgentMemry, my open-source memory library for AI agents. I'm backed by a strong systems foundation — compilers, computer architecture, operating systems, and low-level C — that shapes how I build software, debug across the stack, and reason about infrastructure, cloud services, and the kind of connected-systems work that lives between hardware and the cloud.",
};

// ----------------------------------------------------------------------------
//  WHAT MAKES ME DIFFERENT  (the "unfair edges")
// ----------------------------------------------------------------------------

export const edges: Edge[] = [
  {
    title: "Ships production systems",
    detail:
      "I'm currently a Backend & AI Systems Engineer at TAIRC, building backend APIs and AI/ML infrastructure. I also open-sourced AgentMemry (~500 LOC, 15 tests) and built a real document-ingestion pipeline at Metasys Global.",
  },
  {
    title: "Owns problems end-to-end",
    detail:
      "I don't hand problems up. I show up with the read, two or three options, and the plan to ship — then I ship it.",
  },
  {
    title: "Rare systems depth",
    detail:
      "I built a full compiler — lexer, recursive-descent parser, AST, and code generation — a single-cycle RISC-V CPU in C, and a Unix-style filesystem with inodes and persistence. I reason about how code actually runs on real hardware, not just how to call an API.",
  },
  {
    title: "Full-stack and cloud range",
    detail:
      "Comfortable across the stack — PostgreSQL, REST APIs, authentication, real-time data, AWS-deployed services, S3-compatible object storage (MinIO), Vercel, and frontend UIs — all in production codebases.",
  },
  {
    title: "Tests what I build",
    detail:
      "15-test pytest suite on AgentMemry, JUnit coverage on RuPizza. I don't ship code I haven't verified.",
  },
  {
    title: "Communicates like a senior",
    detail:
      "I write READMEs people actually read, document trade-offs, and explain technical work to non-technical stakeholders. Recruiters and engineers both get the point.",
  },
];

// ----------------------------------------------------------------------------
//  PROJECTS
// ----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "agentmemry",
    name: "AgentMemry — Open-Source Memory for AI Agents",
    tag: "AI / Open Source · Flagship",
    blurb:
      "My open-source, local-first memory library for AI agents — SQLite, on-device embeddings, no cloud.",
    description:
      "AgentMemry is a ~500-line Python library I built and open-sourced that gives AI agents persistent memory without a cloud database or any API keys. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity. I added a Maximal Marginal Relevance (MMR) diversity mode and per-agent namespacing so multiple agents can share one database safely. The public API is covered by 15 passing unit tests.",
    tech: [
      "Python",
      "SQLite",
      "sentence-transformers",
      "Semantic Search",
      "MMR",
      "pytest",
    ],
    highlights: [
      "Local-first: no cloud database, no API keys — works offline",
      "Semantic retrieval (cosine similarity) + MMR diversity mode",
      "Per-agent namespacing inside a single SQLite database",
      "Clean public API verified by 15 passing pytest tests",
      "~500 lines, no heavy dependencies, MIT licensed",
    ],
    links: [
      { label: "Source", href: "https://github.com/BaavanshReddy/agentmemry" },
    ],
    flagship: true,
  },
  {
    id: "metasys",
    name: "AI Document Pipeline",
    tag: "AI / Retrieval",
    blurb:
      "An AI document-ingestion pipeline I built during my backend internship at Metasys Global.",
    description:
      "During my backend internship at Metasys Global, I built the document-ingestion layer for an AI semantic-retrieval system. I integrated MinIO (S3-compatible) object storage to programmatically extract heterogeneous, mixed-format files, and engineered the file-processing workflow that staged extracted documents for downstream chunking, embedding, and vector search.",
    tech: [
      "Python",
      "MinIO / S3",
      "Embeddings",
      "Chunking",
      "Semantic Retrieval",
    ],
    highlights: [
      "Document-ingestion layer backed by MinIO (S3-compatible) object storage",
      "Programmatic extraction of heterogeneous, mixed-format files",
      "Staged content for downstream chunking, embedding, and vector search",
    ],
    links: [],
  },
  {
    id: "portfolio",
    name: "Chat-with-Baavansh Portfolio",
    tag: "AI / Full-stack",
    blurb:
      "The site you're on — a Next.js portfolio with an embedded RAG agent I wrote.",
    description:
      "This site itself is a project. I paired a Next.js front end with an embedded RAG agent: a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so the chat never breaks. Recruiters don't just read my résumé — they can interrogate it.",
    tech: ["Next.js", "TypeScript", "Claude API", "RAG", "Tailwind CSS"],
    highlights: [
      "Embedded RAG chat over a structured knowledge base",
      "Live Claude API engine with an in-browser fallback",
      "Sourced, cited answers",
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
      "A full compiler for the TinyL language — lexer, parser, AST, code generation.",
    description:
      "I built a complete compiler — lexer, recursive-descent parser, AST, intermediate representation, and code generation — translating the TinyL language from a formal grammar down to stack-based bytecode.",
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
      "Perceptron + 3-layer neural net implemented from scratch — hand-coded forward + backprop.",
    description:
      "I implemented a perceptron and a 3-layer neural network with hand-coded forward propagation and backpropagation in NumPy, reaching 89.1% face-recognition and 86.7% digit-classification accuracy — validated against a PyTorch baseline.",
    tech: ["Python", "NumPy", "PyTorch"],
    highlights: [
      "Hand-coded forward + backprop, no ML framework for the core",
      "89.1% face recognition, 86.7% digit classification",
      "Validated against a PyTorch baseline",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/BaavanshReddy/neural-net-from-scratch",
      },
    ],
  },
  {
    id: "rupizza",
    name: "RuPizza — OOP Ordering App",
    tag: "OOP / Java",
    blurb:
      "JavaFX ordering app designed around OOP — inheritance, polymorphism, Factory pattern.",
    description:
      "I developed a JavaFX desktop ordering application designed around object-oriented principles — inheritance, polymorphism, and the Factory pattern — featuring an order builder, store-order management, and JUnit test coverage.",
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
      "Python scraping pipeline → indexed SQLite — exponential-backoff retries, offline fallback.",
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
  title: "LLM FactCheck — Factual QA Evaluation Framework",
  tech: ["Python", "RAG", "BM25", "TriviaQA"],
  description:
    "I co-authored a research study benchmarking LLM factual question-answering across direct prompting, BM25 retrieval, and RAG on a controlled 100-question TriviaQA evaluation set. We found that BM25 surfaced supporting evidence in 90% of cases while RAG improved exact-match accuracy by only 3 points (0.66 → 0.69), isolating generation quality — not retrieval — as the bottleneck.",
  repo: "https://github.com/BaavanshReddy/LLM_factcheck",
};

// ----------------------------------------------------------------------------
//  EXPERIENCE
// ----------------------------------------------------------------------------

export const experience: ExperienceItem[] = [
  {
    id: "tairc",
    role: "Backend & AI Systems Engineer",
    org: "The AI Research Center (TAIRC)",
    period: "Present",
    summary:
      "Building backend APIs, AI/ML infrastructure, and production services.",
    points: [
      "Design and build scalable backend systems, REST APIs, and database architectures powering AI-enabled research and production applications.",
      "Integrate machine learning models and AI technologies into backend services, supporting end-to-end development from system requirements analysis through deployment.",
      "Collaborate with research and engineering teams to translate technical requirements into production-grade AI solutions.",
    ],
  },
  {
    id: "metasys",
    role: "Backend Developer Intern",
    org: "Metasys Global",
    period: "Jan 2026 – Feb 2026",
    summary: "Built an AI document-ingestion pipeline for semantic retrieval.",
    points: [
      "Built the document-ingestion layer for an AI semantic-retrieval system, integrating MinIO (S3-compatible) object storage to programmatically extract heterogeneous, mixed-format files.",
      "Engineered the file-processing workflow that staged extracted documents for downstream chunking, embedding, and vector search.",
    ],
  },
  {
    id: "fidelis",
    role: "Full-Stack Engineering Extern",
    org: "LIVELY — Jillcyn Enterprises, LLC",
    period: "Jan 2026 – May 2026",
    summary: "Co-built LIVEY, a full-stack event-discovery platform.",
    points: [
      "Co-built LIVEY, a full-stack event-discovery platform, developing React search and filtering components and engineering REST API routes across the front and back end.",
      "Integrated Supabase (PostgreSQL) for real-time data storage, user authentication, and event management.",
    ],
  },
  {
    id: "lrrh",
    role: "Software Engineering Extern",
    org: "Little Red Riding Hood Inc.",
    period: "Sep 2025 – Dec 2025",
    summary: "Built secure backend systems for a safety-focused rideshare platform.",
    points: [
      "Engineered secure authentication with role-based login and credential management for separate rider and driver accounts.",
      "Built driver session tracking and real-time geolocation handling on AWS-deployed services, supporting dispatch coordination and passenger-safety workflows.",
    ],
  },
  {
    id: "internpe",
    role: "Python Programming Intern",
    org: "InternPe",
    period: "Sep 2024 – Oct 2024",
    summary: "Wrote Python automation scripts and applied OOP fundamentals.",
    points: [
      "Developed Python automation scripts for data processing and file handling, applying object-oriented design principles across structured engineering assignments.",
    ],
  },
];

// ----------------------------------------------------------------------------
//  SKILLS — aligned to the 2026 résumé
// ----------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    label: "AI & ML",
    items: [
      "RAG pipelines",
      "Vector search",
      "Embeddings",
      "Semantic search",
      "PyTorch",
      "NumPy",
      "Prompt engineering",
      "LLM evaluation",
    ],
  },
  {
    label: "Frameworks & Web",
    items: ["Node.js", "Express", "FastAPI"],
  },
  {
    label: "Databases & Storage",
    items: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "MinIO"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "S3-compatible (MinIO)", "Vercel", "Git", "GitHub"],
  },
  {
    label: "Systems & low-level",
    items: ["C", "Computer architecture", "RISC-V", "Compilers", "Operating systems", "Memory hierarchies"],
  },
  {
    label: "Tools & Practice",
    items: [
      "pytest",
      "JUnit",
      "OOP",
      "System design",
      "REST API design",
      "Microservices",
      "Agile",
    ],
  },
];

// ----------------------------------------------------------------------------
//  KNOWLEDGE BASE  — the retrievable units the chat answers from.
//  All written in first person ("I / me / my").
//
//  ROLE-AWARE: chunks are written so the chat can tailor answers to
//  whichever role family a recruiter asks about. The "role-fit-*" chunks
//  explicitly map experience → role type.
// ----------------------------------------------------------------------------

export const knowledgeChunks: KnowledgeChunk[] = [
  // ---- Identity & overview ----
  {
    id: "intro",
    title: "Who I am",
    source: "Profile",
    keywords: [
      "who", "baavansh", "about", "summary", "introduce", "yourself",
      "background", "overview", "person", "tell",
    ],
    text: "I'm Baavansh Reddy Gundlapalli — a Computer Science graduate from Rutgers University (Magna Cum Laude, 3.76 GPA). I have experience across backend engineering, AI/ML systems, Python development, IT infrastructure, and low-level systems work in C — the kind of foundation that maps cleanly onto IoT and connected-systems engineering. I'm currently a Backend & AI Systems Engineer at TAIRC and I'm open to software engineering roles for 2026.",
  },
  {
    id: "approach",
    title: "How I work",
    source: "About",
    keywords: [
      "adaptable", "resourceful", "charge", "leadership", "approach",
      "different", "strength", "stand", "out", "team", "initiative",
      "ownership", "special", "unique", "style",
    ],
    text: "What sets me apart is ownership. I like taking a problem end to end — mapping it, weighing two or three approaches, then shipping a solution rather than handing it off. I also have unusual range: I'm comfortable from database and backend APIs up to the UI, and from an LLM retrieval pipeline down to the compiler and OS internals I studied. That range means I can debug across the full stack and understand how the pieces fit together.",
  },

  // ---- ROLE-FIT CHUNKS — the smart part ----
  {
    id: "role-fit-aiml",
    title: "Why I'm a fit for AI/ML roles",
    source: "Role Fit",
    keywords: [
      "ai", "ml", "machine", "learning", "artificial", "intelligence",
      "ai/ml", "aiml", "data", "scientist", "nlp", "deep", "model",
      "training", "inference",
    ],
    text: "For AI/ML roles: I built AgentMemry, an open-source Python library that gives AI agents persistent memory using local embeddings and semantic retrieval (cosine similarity + MMR). At TAIRC, I integrate ML models into production backend services. At Metasys Global, I built a document-ingestion pipeline for RAG — staging files for chunking, embedding, and vector search. I implemented a neural network from scratch with hand-coded backpropagation (89.1% face recognition accuracy), and co-authored LLM FactCheck, a research study evaluating factual QA across prompting, BM25, and RAG. My AI work is hands-on and production-oriented, not just academic.",
  },
  {
    id: "role-fit-backend",
    title: "Why I'm a fit for backend roles",
    source: "Role Fit",
    keywords: [
      "backend", "back-end", "server", "api", "apis", "microservices",
      "services", "infrastructure", "distributed", "scalable", "rest",
      "endpoint", "database", "sql",
    ],
    text: "For backend roles: I've built REST APIs and backend services at TAIRC (current — designing scalable backend systems and database architectures), at Metasys Global (document-ingestion pipeline with MinIO/S3 object storage), and at Little Red Riding Hood Inc. (secure authentication, session tracking, real-time geolocation on AWS). I've worked with PostgreSQL, MySQL, SQLite, Supabase, Express, and FastAPI. I also have a systems background — compilers, OS, computer architecture — so I reason about performance, memory, and how code actually executes, not just the API surface.",
  },
  {
    id: "role-fit-python",
    title: "Why I'm a fit for Python roles",
    source: "Role Fit",
    keywords: [
      "python", "developer", "scripting", "automation", "script",
      "programming", "django", "flask", "fastapi", "pandas",
    ],
    text: "For Python roles: Python is my primary language and runs through almost every project I've built. AgentMemry is a pure Python library (~500 lines, pytest-tested). My TinyL compiler is Python. My neural network is Python + NumPy. My campus event scraper is Python + BeautifulSoup + SQLite. At InternPe, I built Python automation scripts for data processing and file handling. I also use FastAPI for backend services. I think in Python — it's where I'm fastest and most comfortable.",
  },
  {
    id: "role-fit-iot",
    title: "Why I'm a fit for IoT / connected-systems roles",
    source: "Role Fit",
    keywords: [
      "iot", "internet", "of", "things", "connected", "device", "devices",
      "embedded", "edge", "firmware", "sensor", "sensors", "telemetry",
      "azure", "google", "gcp", "aws", "cloud", "platform", "platforms",
      "level", "3", "production", "support", "scale", "performance",
      "cognizant",
    ],
    text: "For IoT and connected-systems roles: I bring three things the role actually needs. First, the language coverage — C, C++, Java, and Python are all in projects I've shipped (RISC-V CPU and Linux filesystem in C, RuPizza in Java with the Factory pattern, AgentMemry and the document pipeline in Python). Second, the systems foundation IoT lives on top of — computer architecture, operating systems, memory hierarchies, and how code actually runs on real hardware, all from coursework and hands-on C projects rather than just textbook reading. Third, cloud-platform exposure — AWS-deployed services at Little Red Riding Hood Inc., S3-compatible object storage with MinIO at Metasys Global, and Vercel/Supabase across portfolio and event-platform work. Add fluency with AI tools (Claude, Copilot, Codex) used daily in my development workflow, plus SQL, design patterns, OOP, and data structures, and that's the skill stack the role profile asks for. I'm explicitly looking to extend this foundation into IoT and connected-systems engineering.",
  },
  {
    id: "role-fit-it",
    title: "Why I'm a fit for IT roles",
    source: "Role Fit",
    keywords: [
      "it", "information", "technology", "support", "helpdesk", "help",
      "desk", "sysadmin", "admin", "administrator", "network",
      "troubleshoot", "troubleshooting", "infrastructure", "security",
      "devops", "operations", "cloud", "aws", "deploy", "deployment",
    ],
    text: "For IT and infrastructure roles: I have hands-on experience with AWS-deployed services (built session tracking and geolocation handling), S3-compatible object storage (MinIO at Metasys Global), PostgreSQL/MySQL database administration, authentication and credential management systems, and Git-based deployment workflows (Vercel, GitHub). My coursework in operating systems and computer architecture gives me a strong foundation for understanding system internals, debugging, and infrastructure management. As a Community Service Officer with Rutgers University Police, I also developed incident response and coordination skills that translate directly to IT operations.",
  },

  // ---- Projects ----
  {
    id: "agentmemry",
    title: "AgentMemry — open-source memory for AI agents",
    source: "Projects · AgentMemry",
    keywords: [
      "agentmemry", "memory", "agent", "agents", "library", "open",
      "source", "sqlite", "embeddings", "package", "main", "best",
      "flagship", "top", "project",
    ],
    text: "AgentMemry is my flagship project — a ~500-line open-source Python library that gives AI agents persistent memory without a cloud database or any API keys. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity. It also has an MMR diversity mode and per-agent namespacing so multiple agents can share one database safely. The public API is verified by 15 passing unit tests. Source: github.com/BaavanshReddy/agentmemry.",
  },
  {
    id: "tinyl",
    title: "TinyL Compiler",
    source: "Projects",
    keywords: [
      "tinyl", "compiler", "compilers", "lexer", "parser", "parsing",
      "codegen", "ast", "language",
    ],
    text: "My TinyL compiler is a full pipeline: I wrote the lexer, a recursive-descent parser working from a formal grammar, AST construction, an intermediate representation, and a code generator targeting stack-based bytecode.",
  },
  {
    id: "neuralnet",
    title: "Neural Network from Scratch",
    source: "Projects",
    keywords: [
      "neural", "net", "network", "perceptron", "backprop",
      "backpropagation", "numpy", "pytorch", "ml", "deep", "learning",
      "scratch",
    ],
    text: "I implemented a perceptron and a 3-layer neural network from scratch with hand-coded forward propagation and backpropagation in NumPy, reaching 89.1% face-recognition and 86.7% digit-classification accuracy — validated against a PyTorch baseline.",
  },
  {
    id: "rupizza",
    title: "RuPizza — OOP Ordering App",
    source: "Projects",
    keywords: [
      "rupizza", "pizza", "java", "javafx", "junit", "oop", "object",
      "oriented", "factory",
    ],
    text: "RuPizza is a JavaFX desktop ordering application I built around object-oriented principles — inheritance, polymorphism, and the Factory pattern — featuring an order builder, store-order management, and JUnit test coverage.",
  },
  {
    id: "scraper",
    title: "Campus Event Scraper",
    source: "Projects",
    keywords: [
      "scraper", "scrape", "scraping", "beautifulsoup", "events",
      "sqlite", "pipeline", "backoff", "retry", "automation",
    ],
    text: "I built a Python web-scraping pipeline that collects and normalizes university event listings into an indexed SQLite database. It stays reliable through exponential-backoff retries, URL-based deduplication, and graceful offline fallback when sources are unavailable.",
  },

  // ---- Experience ----
  {
    id: "tairc",
    title: "The AI Research Center (TAIRC) — current role",
    source: "TAIRC · Experience",
    keywords: [
      "tairc", "research", "center", "current", "currently", "now",
      "present", "today", "engineer", "job", "work", "role", "experience",
      "where",
    ],
    text: "I'm currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC). I design and build scalable backend systems, REST APIs, and database architectures powering AI-enabled research and production applications. I integrate machine learning models and AI technologies into backend services, supporting end-to-end development from system requirements analysis through deployment. I collaborate with research and engineering teams to translate technical requirements into production-grade AI solutions.",
  },
  {
    id: "metasys",
    title: "Metasys Global — AI document pipeline",
    source: "Metasys Global · Experience",
    keywords: [
      "metasys", "rag", "retrieval", "pipeline", "ingestion", "minio",
      "vector", "embeddings", "internship",
    ],
    text: "During my backend internship at Metasys Global, I built the document-ingestion layer for an AI semantic-retrieval system. I integrated MinIO (S3-compatible) object storage to programmatically extract heterogeneous, mixed-format files, and engineered the file-processing workflow that staged extracted documents for downstream chunking, embedding, and vector search.",
  },
  {
    id: "fidelis",
    title: "LIVELY — full-stack event platform",
    source: "Experience",
    keywords: [
      "fidelis", "livey", "lively", "event", "fullstack", "full-stack",
      "react", "supabase", "postgres", "frontend", "extern",
    ],
    text: "As a full-stack engineering extern at LIVELY (Jillcyn Enterprises), I co-built LIVEY — a localized event-discovery platform. I developed React search and filtering components, engineered REST API routes across the front and back end, and integrated Supabase (PostgreSQL) for real-time storage, user authentication, and event management.",
  },
  {
    id: "rideshare",
    title: "Rideshare backend — Little Red Riding Hood Inc.",
    source: "Experience",
    keywords: [
      "rideshare", "ride", "little", "red", "riding", "hood", "auth",
      "authentication", "login", "geolocation", "extern", "aws",
      "security", "session",
    ],
    text: "As a software engineering extern with Little Red Riding Hood Inc., I built backend systems for a safety-focused rideshare platform. I implemented secure login, credential management, and role-based authentication for separate rider and driver accounts, plus driver session tracking and real-time geolocation handling on AWS-deployed services for dispatch coordination.",
  },
  {
    id: "internpe",
    title: "InternPe — Python programming intern",
    source: "Experience",
    keywords: [
      "internpe", "intern", "python", "automation", "scripting", "oop",
      "data", "processing",
    ],
    text: "At InternPe, I worked as a Python Programming Intern developing automation scripts for data processing and file handling, applying object-oriented design principles across structured engineering assignments. This was my first engineering internship and where I formalized my Python development practices.",
  },

  // ---- Skills & depth ----
  {
    id: "systems",
    title: "Systems & compilers background",
    source: "Projects · Systems",
    keywords: [
      "systems", "compiler", "compilers", "architecture", "operating",
      "low-level", "depth", "technical", "os", "cpu",
    ],
    text: "I have a deeper systems background than most candidates. I built a full compiler for the TinyL language — lexer, recursive-descent parser, AST, intermediate representation, and code generation — and my coursework covers computer architecture and operating systems. Being able to reason about parsers, datapaths, memory management, and how code actually runs is an edge whether I'm building an AI pipeline, debugging a backend service, or understanding infrastructure.",
  },
  {
    id: "backend-skills",
    title: "Backend & engineering skills",
    source: "Skills · Experience",
    keywords: [
      "node", "nodejs", "typescript", "express", "fastapi", "api", "rest",
      "engineering", "build", "ship", "code", "stack",
    ],
    text: "I have hands-on backend experience across multiple roles. I've built REST API routes, authentication systems, and data pipelines: a document-ingestion pipeline at Metasys Global, secure role-based auth for a rideshare platform at Little Red Riding Hood Inc., REST routes plus Supabase/PostgreSQL backend for the LIVEY event platform, and production backend services at TAIRC. My tech stack includes Python, Node.js, Express, FastAPI, PostgreSQL, MySQL, SQLite, Supabase, and MinIO.",
  },
  {
    id: "ai-skills",
    title: "AI & retrieval skills",
    source: "Skills",
    keywords: [
      "skills", "rag", "vector", "embeddings", "llm", "claude", "prompt",
      "eval", "evaluation", "retrieval", "semantic", "search",
    ],
    text: "My AI work centers on retrieval and memory: RAG pipelines, vector search, embeddings, and semantic retrieval. I built AgentMemry (open-source memory library for AI agents), the Metasys Global document-ingestion pipeline, this site's embedded RAG agent, and a perceptron + 3-layer neural net from scratch in NumPy. I also co-authored a research study evaluating LLM factual question-answering.",
  },
  {
    id: "python-skills",
    title: "Python expertise",
    source: "Skills",
    keywords: [
      "python", "language", "primary", "comfortable", "strongest",
      "proficient", "fluent",
    ],
    text: "Python is my primary language. It's what I reach for first and where I'm most productive. I've used it for: building AgentMemry (open-source library with pytest test suite), data pipelines and file processing (Metasys Global, InternPe), compilers (TinyL), neural networks (NumPy + PyTorch), web scraping (BeautifulSoup), backend APIs (FastAPI), and research (LLM FactCheck). Basically — if it touches Python, I've probably built something with it.",
  },

  // ---- Research ----
  {
    id: "research",
    title: "Research — LLM factual QA evaluation",
    source: "Research",
    keywords: [
      "research", "paper", "factcheck", "fact", "check", "evaluation",
      "bm25", "triviaqa", "hallucination", "study",
    ],
    text: "I co-authored LLM FactCheck — a research study benchmarking LLM factual QA across direct prompting, BM25 retrieval, and RAG on a controlled 100-question TriviaQA evaluation set. We found that BM25 surfaced supporting evidence in 90% of cases while RAG improved exact-match accuracy by only 3 points (0.66 → 0.69), isolating generation quality — not retrieval — as the real bottleneck.",
  },

  // ---- Portfolio ----
  {
    id: "portfolio",
    title: "This site — Chat-with-Baavansh",
    source: "Projects",
    keywords: [
      "site", "website", "portfolio", "this", "chat", "nextjs", "next",
      "built", "made", "assistant",
    ],
    text: "This site itself is a project — a Next.js portfolio with an embedded RAG agent I wrote. It runs a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so it never breaks. The point is that recruiters can interrogate my work instead of just reading it.",
  },

  // ---- Leadership ----
  {
    id: "leadership",
    title: "Leadership & activities",
    source: "Experience",
    keywords: [
      "leadership", "lead", "rupd", "police", "campus", "safety",
      "officer", "fraternity", "greek", "risk", "judiciary", "community",
      "service", "volunteer", "extracurricular",
    ],
    text: "I serve as a Community Service Officer with the Rutgers University Police Department, supporting incident response and crowd management for large-scale university events. I've also held three elected positions in Alpha Phi Delta Fraternity (Risk Management Chair, Head of Judiciary Board, Co-Brotherhood Chair), leading safety compliance, conduct governance, and member engagement. And I was Administration Secretary for ENIGMA Technical Society, organizing technical workshops and streamlining communication.",
  },

  // ---- Pitch ----
  {
    id: "why-hire",
    title: "Why hire me",
    source: "Pitch",
    keywords: [
      "why", "hire", "fit", "best", "good", "reason", "value", "strong",
      "candidate", "recruit", "offer", "great", "pick", "choose",
    ],
    text: "Hire me if you want an engineer with real range: I've shipped backend APIs and data pipelines, open-sourced a memory library for AI agents (AgentMemry), automated data workflows in Python, and can reason from the API layer down to compilers, operating systems, and the hardware underneath. I pair rare systems depth — C, RISC-V, Linux filesystems — with current AI/retrieval and cloud-platform experience, I test what I build, and I take problems end to end. Whether you need someone to build backend services, ship AI/ML infrastructure, write Python tooling, support and scale IoT/cloud-platform applications, or manage technical systems — I bring the foundation for all of it and the appetite to learn the rest fast.",
  },
  {
    id: "looking-for",
    title: "What I'm looking for",
    source: "Profile",
    keywords: [
      "looking", "want", "seeking", "roles", "role", "opportunity",
      "opportunities", "interested", "available", "open", "job", "hiring",
      "position", "type",
    ],
    text: "I'm open to software engineering roles for 2026 — backend engineering, AI/ML engineering, Python development, IoT and connected-systems engineering, and IT/infrastructure positions. I'm most excited by teams shipping real products to real users, and I bring experience that maps across all of those role families: production backend, AI retrieval pipelines, low-level C systems work, and cloud-platform deployments. I'm not locked into one narrow lane — I want work that lets me build, ship, and solve real problems.",
  },

  // ---- Contact ----
  {
    id: "contact",
    title: "How to contact me",
    source: "Contact",
    keywords: [
      "contact", "email", "reach", "connect", "linkedin", "github",
      "resume", "touch", "message", "available", "phone",
    ],
    text: "The fastest way to reach me is email — baavanshreddy@gmail.com. My GitHub and LinkedIn are linked in the navigation and the contact section of this site, and you can download my résumé there too. I'm open to software engineering opportunities for 2026.",
  },

  // ---- Education ----
  {
    id: "education",
    title: "Education",
    source: "Education",
    keywords: [
      "education", "school", "college", "university", "rutgers", "degree",
      "study", "student", "major", "graduate", "gpa", "coursework",
      "magna", "cum", "laude", "deans", "list",
    ],
    text: "I graduated from Rutgers University in May 2026 with a B.S. in Computer Science, Magna Cum Laude, with a 3.76 GPA and four semesters on the Dean's List (Fall '24, Spring '25, Fall '25, Spring '26). My coursework leans heavily into systems — computer architecture, compilers, operating systems — alongside AI, databases, data structures & algorithms, and software engineering.",
  },
];

// ----------------------------------------------------------------------------
//  CHAT — suggested starter questions
// ----------------------------------------------------------------------------

export const suggestedQuestions: string[] = [
  "What is AgentMemry?",
  "What kind of roles are you targeting?",
  "Why should I hire you?",
  "Walk me through your Python experience",
  "What's your backend experience?",
];

// ----------------------------------------------------------------------------
//  DERIVED — knowledge text + system prompt for the live (Claude) chat engine
// ----------------------------------------------------------------------------

export function buildKnowledgeText(): string {
  const out: string[] = [];
  out.push(`# About ${profile.name}`);
  out.push(`Headline: ${profile.headline}`);
  out.push(`Status: ${profile.status}`);
  out.push(`Location: ${profile.location}`);
  out.push(
    `Education: ${profile.major} at ${profile.university} (${profile.gradYear})`,
  );
  out.push(`Email: ${profile.email}`);
  out.push(`Summary: ${profile.summary}`);
  out.push("");

  out.push("# Knowledge base");
  for (const c of knowledgeChunks) {
    out.push(`## ${c.title}  [source: ${c.source}]`);
    out.push(c.text);
    out.push("");
  }

  out.push("# Projects");
  for (const p of projects) {
    out.push(`## ${p.name} (${p.tag})`);
    out.push(p.description);
    out.push(`Tech: ${p.tech.join(", ")}`);
    out.push("");
  }

  out.push("# Research");
  out.push(`## ${research.title}`);
  out.push(research.description);
  out.push("");

  out.push("# Experience");
  for (const e of experience) {
    out.push(`## ${e.role} — ${e.org} (${e.period})`);
    out.push(e.summary);
    for (const pt of e.points) out.push(`- ${pt}`);
    out.push("");
  }

  out.push("# Skills");
  for (const g of skills) {
    out.push(`${g.label}: ${g.items.join(", ")}`);
  }

  return out.join("\n");
}

export function buildSystemPrompt(): string {
  return [
    `You ARE ${profile.name} ("${profile.shortName}") speaking on his portfolio site. Visitors are usually recruiters or hiring managers.`,
    "",
    `Voice: FIRST PERSON. Always answer as "I / me / my" — never refer to ${profile.shortName} in the third person.`,
    "",
    "Your job: answer questions about my work accurately and concisely, using ONLY the knowledge base below.",
    "",
    "ROLE-AWARE ANSWERING:",
    "I'm targeting four role families: AI/ML Engineer, Backend Engineer, Python Developer, and IT/Infrastructure.",
    "When a recruiter asks about my fit for a specific role, lean into the experience most relevant to THAT role.",
    "Don't volunteer that I'm applying broadly unless directly asked — just confidently present the relevant experience.",
    "If they ask 'what roles are you looking for,' be honest: I'm open to backend, AI/ML, Python, and IT roles.",
    "",
    "Rules:",
    "- Be concise — usually 2 to 4 sentences. This is a chat, not an essay.",
    "- Use only facts from the knowledge base. Never invent employers, dates, metrics, or projects.",
    `- If something is not covered, say so plainly and suggest emailing me at ${profile.email}.`,
    "- Be warm and confident, never salesy or exaggerated — let the facts carry it.",
    "- If asked something unrelated to my career, gently redirect to what you can help with.",
    "- When asked about a specific role type, use the relevant 'Role Fit' section to structure your answer.",
    "",
    "=== KNOWLEDGE BASE ===",
    buildKnowledgeText(),
  ].join("\n");
}
