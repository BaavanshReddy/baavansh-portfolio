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
    "Four years of engineering across production REST APIs, LLM and ML integration, and IoT platforms.",
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
  summary:
    "I'm a backend and AI systems engineer with four years of engineering experience across production REST APIs, LLM and ML integration, and IoT platforms. My core stack is Python, Java, and C, and my work ranges from authentication systems and data pipelines to compilers, CPU simulators, and operating systems. I'm a Computer Science graduate from Rutgers University (Magna Cum Laude, 3.76 GPA), currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC). I'm the author of AgentMemry, an open-source memory library for AI agents published on PyPI, and co-author of a retrieval evaluation study benchmarking BM25 against RAG. This site hosts an AI assistant you can chat with about any of it.",
};

// ----------------------------------------------------------------------------
//  WHAT MAKES ME DIFFERENT  (the "unfair edges")
// ----------------------------------------------------------------------------

export const edges: Edge[] = [
  {
    title: "Four years, already shipping",
    detail:
      "I've been doing engineering work since 2022 — Java and Spring Boot business systems, two years on an IoT security platform at KAVACH, backend externships, and now production backend and AI services at TAIRC. Not a résumé of coursework.",
  },
  {
    title: "Published open source",
    detail:
      "AgentMemry is my memory library for AI agents — ~500 lines, 15 passing tests, local-first, and published on PyPI where anyone can pip install it.",
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
    name: "AgentMemry — Open-Source Memory for AI Agents",
    tag: "AI / Open Source · Published on PyPI",
    blurb:
      "My open-source, local-first memory library for AI agents — SQLite, on-device embeddings, no cloud. Published on PyPI.",
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
      "Published on PyPI — pip install agentmemry",
      "Local-first: no cloud database, no API keys — works offline",
      "Semantic retrieval (cosine similarity) + MMR diversity mode",
      "Per-agent namespacing inside a single SQLite database",
      "Clean public API verified by 15 passing pytest tests",
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
      "The site you're on — a Next.js portfolio with an embedded RAG agent I wrote.",
    description:
      "This site itself is a project. I paired a Next.js front end with an embedded RAG assistant: a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so the chat never breaks. Recruiters don't just read my résumé — they can interrogate it.",
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
//  EXPERIENCE  — reverse chronological, mirrors the résumé
// ----------------------------------------------------------------------------

export const experience: ExperienceItem[] = [
  {
    id: "tairc",
    role: "Backend & AI Systems Engineer",
    org: "TAIRC — The AI Research Center",
    period: "June 2026 – Present",
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
    org: "LIVELY — Jillcyn Enterprises, LLC (Rutgers MBS Externship Exchange)",
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
    org: "KAVACH — VIANSEC Solutions Pvt. Ltd., Hyderabad, India",
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
    org: "KAVACH — VIANSEC Solutions Pvt. Ltd., Hyderabad, India",
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
    items: [
      "FastAPI",
      "Node.js",
      "Express",
      "Spring Boot",
      "React",
      "Next.js",
    ],
  },
  {
    label: "Databases & Storage",
    items: ["PostgreSQL", "MySQL", "SQLite", "Supabase", "MinIO (S3-compatible)"],
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
    text: "I'm Baavansh Reddy Gundlapalli — a backend and AI systems engineer with four years of engineering experience across production REST APIs, LLM and ML integration, and IoT platforms. My core stack is Python, Java, and C, and my work runs from authentication systems and data pipelines down to compilers, CPU simulators, and operating systems. I graduated from Rutgers University with a B.S. in Computer Science, Magna Cum Laude, 3.76 GPA, and I'm currently a Backend & AI Systems Engineer at TAIRC.",
  },
  {
    id: "experience-span",
    title: "How much experience I have",
    source: "Profile",
    keywords: [
      "experience", "years", "how", "long", "many", "four", "4",
      "senior", "junior", "level", "entry", "early", "career", "timeline",
      "history",
    ],
    text: "I have four years of engineering experience, starting in August 2022. It runs continuously: a Java and Spring Boot business-systems internship at RNR (2022–2023), two years at KAVACH/VIANSEC Solutions on an IoT security platform — first as a software engineering intern, then as a backend and IoT engineering intern (2023–2025) — a software engineering externship with Little Red Riding Hood Inc. (2025), a full-stack externship at LIVELY (2026), and now backend and AI systems engineering at TAIRC. That's production work alongside my degree, not a gap-filled timeline.",
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
    text: "What sets me apart is ownership. I like taking a problem end to end — mapping it, weighing two or three approaches, then shipping a solution rather than handing it off. I also have unusual range: I'm comfortable from database and backend APIs up to the UI, from IoT device telemetry up to an LLM retrieval pipeline, and down to the compiler and OS internals I studied. That range means I can debug across the full stack and understand how the pieces fit together.",
  },

  // ---- ROLE-FIT CHUNKS — the smart part ----
  {
    id: "role-fit-backend",
    title: "Why I'm a fit for backend roles",
    source: "Role Fit",
    keywords: [
      "backend", "back-end", "server", "api", "apis", "microservices",
      "services", "infrastructure", "distributed", "scalable", "rest",
      "endpoint", "database", "sql", "schema",
    ],
    text: "For backend roles: I build and maintain Python backend services and REST APIs at TAIRC today, designing relational schemas and data-access layers and converting research prototypes into deployable, tested endpoints. Before that I engineered secure role-based authentication, credential management, session tracking, and real-time geolocation on AWS-deployed services at Little Red Riding Hood Inc.; REST API routes plus a Supabase/PostgreSQL backend for the LIVEY event platform; and a Java/Spring Boot work-order application on MySQL at RNR. I've worked with PostgreSQL, MySQL, SQLite, Supabase, Express, FastAPI, and Docker. My systems background — compilers, OS, computer architecture — means I reason about performance and memory, not just the API surface.",
  },
  {
    id: "role-fit-aiml",
    title: "Why I'm a fit for AI/ML roles",
    source: "Role Fit",
    keywords: [
      "ai", "ml", "machine", "learning", "artificial", "intelligence",
      "ai/ml", "aiml", "data", "scientist", "nlp", "deep", "model",
      "training", "inference", "llm", "genai",
    ],
    text: "For AI/ML roles: at TAIRC I integrate LLM and machine-learning components into backend services — model invocation, prompt orchestration, retrieval, and output evaluation. I built and published AgentMemry, an open-source Python library on PyPI that gives AI agents persistent memory using local embeddings and semantic retrieval (cosine similarity plus MMR). I implemented a perceptron and 3-layer neural network from scratch with hand-coded backpropagation (89.1% face recognition, 86.7% digit classification, validated against PyTorch), and co-authored LLM FactCheck, a research study evaluating factual QA across direct prompting, BM25, and RAG. I also integrated AI-generated detections into alert workflows on an IoT platform at KAVACH. My AI work is shipped and evaluated, not just academic.",
  },
  {
    id: "role-fit-python",
    title: "Why I'm a fit for Python roles",
    source: "Role Fit",
    keywords: [
      "python", "developer", "scripting", "automation", "script",
      "programming", "django", "flask", "fastapi", "pandas",
    ],
    text: "For Python roles: Python is my primary language and runs through almost everything I've built. My backend services and REST APIs at TAIRC are Python. AgentMemry is a pure Python library (~500 lines, 15 pytest tests, published on PyPI). My TinyL compiler is Python. My neural network is Python + NumPy. My campus event scraper is Python + BeautifulSoup + SQLite. I use FastAPI for backend services and pytest for verification. I think in Python — it's where I'm fastest.",
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
      "hardware", "kavach", "viansec",
    ],
    text: "For IoT and connected-systems roles: I spent two years at KAVACH (VIANSEC Solutions) on a real IoT security platform. As a backend and IoT engineering intern I integrated IoT telemetry and AI-generated detections into incident and alert workflows, validated device-data flows, monitored system behavior, documented integration issues, and supported troubleshooting. Before that I built dashboard functionality for user access, site operations, incident tracking, and alert management, and supported Docker-based deployments. Underneath that I have the systems foundation IoT sits on — a single-cycle RISC-V CPU and a Unix-style filesystem written in C, plus computer architecture and operating systems coursework — and the cloud side: AWS-deployed services, Docker, and S3-compatible object storage. Device data at one end, cloud services at the other; I've worked at both.",
  },
  {
    id: "role-fit-it",
    title: "Why I'm a fit for IT / infrastructure roles",
    source: "Role Fit",
    keywords: [
      "it", "information", "technology", "support", "helpdesk", "help",
      "desk", "sysadmin", "admin", "administrator", "network",
      "troubleshoot", "troubleshooting", "infrastructure", "security",
      "devops", "operations", "deploy", "deployment", "docker",
    ],
    text: "For IT and infrastructure roles: I've supported Docker-based deployments and application debugging at KAVACH, worked hands-on with AWS-deployed services (session tracking and geolocation handling), administered PostgreSQL and MySQL databases, built authentication and credential-management systems, and run Git-based deployment workflows on Vercel and GitHub. At KAVACH I also monitored system behavior, validated data flows, and documented integration issues — day-to-day operational troubleshooting. My operating systems and computer architecture coursework gives me a real foundation for system internals and debugging, and as a Community Service Officer with Rutgers University Police I developed incident response and coordination skills that translate directly to operations work.",
  },
  {
    id: "role-fit-java",
    title: "Java and Spring Boot experience",
    source: "Role Fit",
    keywords: [
      "java", "spring", "boot", "springboot", "jvm", "enterprise",
      "mysql", "rnr", "backend", "oop",
    ],
    text: "On the Java side: at RNR Facilities (now RNR Infra) I contributed to a Java and Spring Boot work-order and vendor-tracking application backed by MySQL, and tested and documented application features while maintaining database records and operational reports. I also built RuPizza, a JavaFX desktop ordering application designed around inheritance, polymorphism, and the Factory pattern with JUnit test coverage. Java is one of my three core languages alongside Python and C.",
  },

  // ---- Projects ----
  {
    id: "agentmemry",
    title: "AgentMemry — open-source memory for AI agents, on PyPI",
    source: "Projects · AgentMemry",
    keywords: [
      "agentmemry", "agentmem", "memory", "agent", "agents", "library",
      "open", "source", "sqlite", "embeddings", "package", "pypi", "pip",
      "published", "main", "best", "flagship", "top", "project",
    ],
    text: "AgentMemry is my flagship project — a ~500-line open-source Python library, published on PyPI, that gives AI agents persistent memory without a cloud database or any API keys. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity. It also has an MMR diversity mode and per-agent namespacing so multiple agents can share one database safely. The public API is verified by 15 passing unit tests. Install it with `pip install agentmemry` — source at github.com/BaavanshReddy/agentmemry, package at pypi.org/project/agentmemry.",
  },
  {
    id: "tinyl",
    title: "TinyL Compiler",
    source: "Projects",
    keywords: [
      "tinyl", "compiler", "compilers", "lexer", "parser", "parsing",
      "codegen", "ast", "language", "grammar",
    ],
    text: "My TinyL compiler is a full pipeline: I wrote the lexer, a recursive-descent parser working from a formal grammar, AST construction, an intermediate representation, and a code generator targeting stack-based bytecode. Source: github.com/BaavanshReddy/tinyl-compiler.",
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
      "rupizza", "pizza", "javafx", "junit", "oop", "object",
      "oriented", "factory", "pattern", "design",
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
  {
    id: "systems-projects",
    title: "Systems projects in C — RISC-V CPU and Unix filesystem",
    source: "Projects · Systems",
    keywords: [
      "risc-v", "riscv", "cpu", "simulator", "processor", "datapath",
      "filesystem", "file", "system", "inode", "unix", "linux", "c",
      "low-level", "kernel", "os",
    ],
    text: "Beyond the compiler, I've written a single-cycle RISC-V CPU simulator in C — instruction decode, datapath, and register file — and a Unix-style filesystem with inodes and persistence. These are the projects that taught me how code actually executes on hardware: memory hierarchies, instruction cycles, and what an operating system is really doing underneath a system call.",
  },

  // ---- Experience ----
  {
    id: "tairc",
    title: "TAIRC — current role",
    source: "TAIRC · Experience",
    keywords: [
      "tairc", "research", "center", "current", "currently", "now",
      "present", "today", "engineer", "job", "work", "role", "experience",
      "where",
    ],
    text: "I'm currently a Backend & AI Systems Engineer at TAIRC (The AI Research Center), since June 2026. I build and maintain Python backend services and REST APIs, designing relational schemas and data-access layers that support AI-enabled research and production applications. I integrate LLM and machine-learning components into those services — model invocation, prompt orchestration, retrieval, and output evaluation — and convert research prototypes into deployable, tested endpoints, owning features from requirements analysis through API design, implementation, testing, and deployment.",
  },
  {
    id: "kavach",
    title: "KAVACH (VIANSEC Solutions) — two years on an IoT platform",
    source: "KAVACH · Experience",
    keywords: [
      "kavach", "viansec", "iot", "telemetry", "device", "detection",
      "detections", "alert", "alerts", "incident", "dashboard",
      "hyderabad", "india", "internship", "intern", "security",
      "docker", "testing",
    ],
    text: "I spent two years at KAVACH (VIANSEC Solutions Pvt. Ltd.) in Hyderabad, India. As Backend & IoT Engineering Intern (Aug 2024 – Aug 2025) I collaborated with the engineering team to integrate IoT telemetry and AI-generated detections into incident and alert workflows, validated device-data flows, monitored system behavior, documented integration issues, and supported troubleshooting. Before that, as Software Engineering Intern (Sep 2023 – Aug 2024), I contributed to dashboard functionality for user access, site operations, incident tracking, and alert management, performed software testing, documented defects, and supported Docker-based deployments and application debugging.",
  },
  {
    id: "rnr",
    title: "RNR Facilities — Java and Spring Boot business systems",
    source: "RNR · Experience",
    keywords: [
      "rnr", "facilities", "infra", "java", "spring", "boot", "mysql",
      "work", "order", "vendor", "tracking", "business", "first",
      "earliest", "2022",
    ],
    text: "My first engineering role was at RNR Facilities Pvt. Ltd. (now RNR Infra Pvt. Ltd.) in Hyderabad, India, from Aug 2022 to Aug 2023, as a Software & Business Systems Intern. I contributed to development of a Java and Spring Boot work-order and vendor-tracking application backed by MySQL, and tested and documented application features while maintaining database records and operational reports.",
  },
  {
    id: "lively",
    title: "LIVELY — full-stack event platform",
    source: "Experience",
    keywords: [
      "livey", "lively", "jillcyn", "event", "fullstack", "full-stack",
      "react", "supabase", "postgres", "frontend", "extern", "externship",
      "mbs",
    ],
    text: "As a full-stack engineering extern at LIVELY (Jillcyn Enterprises, LLC) through the Rutgers MBS Externship Exchange from Jan to May 2026, I co-built LIVEY — a full-stack event-discovery platform. I developed React search and filtering components, engineered REST API routes across the front and back end, and integrated Supabase (PostgreSQL) for real-time data storage, user authentication, and event management.",
  },
  {
    id: "rideshare",
    title: "Rideshare backend — Little Red Riding Hood Inc.",
    source: "Experience",
    keywords: [
      "rideshare", "ride", "little", "red", "riding", "hood", "auth",
      "authentication", "login", "geolocation", "extern", "aws",
      "security", "session", "safety",
    ],
    text: "As a software engineering extern with Little Red Riding Hood Inc. (Rutgers MBS Externship Exchange, Sep – Dec 2025), I built backend systems for a safety-focused rideshare platform. I engineered secure authentication with role-based login and credential management for separate rider and driver accounts, and built driver session tracking and real-time geolocation handling on cloud-deployed (AWS) services, supporting dispatch coordination and passenger-safety workflows.",
  },

  // ---- Skills & depth ----
  {
    id: "systems",
    title: "Systems & compilers background",
    source: "Projects · Systems",
    keywords: [
      "systems", "compiler", "compilers", "architecture", "operating",
      "low-level", "depth", "technical", "os", "cpu", "memory",
    ],
    text: "I have a deeper systems background than most candidates at my stage. I built a full compiler for the TinyL language — lexer, recursive-descent parser, AST, intermediate representation, and code generation — a single-cycle RISC-V CPU simulator in C, and a Unix-style filesystem with inodes and persistence, alongside coursework in computer architecture and operating systems. Being able to reason about parsers, datapaths, memory management, and how code actually runs is an edge whether I'm building an AI pipeline, debugging a backend service, or tracing an IoT device-data flow.",
  },
  {
    id: "backend-skills",
    title: "Backend & engineering skills",
    source: "Skills · Experience",
    keywords: [
      "node", "nodejs", "typescript", "express", "fastapi", "api", "rest",
      "engineering", "build", "ship", "code", "stack", "tech",
    ],
    text: "My backend stack is Python (FastAPI), Java (Spring Boot), Node.js and Express, on PostgreSQL, MySQL, SQLite, and Supabase, deployed with Docker, AWS, and Vercel. I've built REST APIs and relational schemas at TAIRC, secure role-based auth and real-time geolocation at Little Red Riding Hood Inc., REST routes and a Supabase backend for LIVEY, and a Spring Boot work-order system on MySQL at RNR. I verify with pytest and JUnit and work in Agile teams.",
  },
  {
    id: "ai-skills",
    title: "AI & retrieval skills",
    source: "Skills",
    keywords: [
      "skills", "rag", "vector", "embeddings", "llm", "claude", "prompt",
      "eval", "evaluation", "retrieval", "semantic", "search",
      "sentence-transformers",
    ],
    text: "My AI work centers on retrieval, memory, and evaluation: LLM integration, RAG pipelines, vector search, embeddings, semantic search, prompt engineering, and LLM evaluation, using PyTorch, NumPy, sentence-transformers, and the Claude API. I built and published AgentMemry (open-source memory library for AI agents), integrate LLM components into production backend services at TAIRC, wrote this site's embedded RAG assistant, built a perceptron and 3-layer neural net from scratch in NumPy, and co-authored a research study evaluating LLM factual question-answering.",
  },
  {
    id: "python-skills",
    title: "Python expertise",
    source: "Skills",
    keywords: [
      "python", "language", "primary", "comfortable", "strongest",
      "proficient", "fluent",
    ],
    text: "Python is my primary language. It's what I reach for first and where I'm most productive. I've used it for: production backend services and REST APIs (TAIRC), an open-source library with a pytest suite (AgentMemry, on PyPI), compilers (TinyL), neural networks (NumPy + PyTorch), web scraping and data pipelines (BeautifulSoup + SQLite), backend APIs (FastAPI), and research (LLM FactCheck).",
  },

  // ---- Research ----
  {
    id: "research",
    title: "Research — LLM factual QA evaluation",
    source: "Research",
    keywords: [
      "research", "paper", "factcheck", "fact", "check", "evaluation",
      "bm25", "triviaqa", "hallucination", "publication",
      "co-author", "coauthor",
    ],
    text: "I co-authored LLM FactCheck — a research study benchmarking LLM factual QA across direct prompting, BM25 retrieval, and RAG on a controlled 100-question TriviaQA evaluation set. We found that BM25 surfaced supporting evidence in 90% of cases while RAG improved exact-match accuracy by only 3 points (0.66 → 0.69), isolating generation quality — not retrieval — as the real bottleneck. Repo: github.com/BaavanshReddy/LLM_factcheck.",
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
    text: "This site itself is a project — a Next.js portfolio with an embedded RAG assistant I wrote. It runs a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so it never breaks. The point is that recruiters can interrogate my work instead of just reading it.",
  },

  // ---- Leadership ----
  {
    id: "leadership",
    title: "Leadership & activities",
    source: "Leadership",
    keywords: [
      "leadership", "lead", "rupd", "police", "campus", "safety",
      "officer", "fraternity", "greek", "risk", "judiciary", "community",
      "service", "volunteer", "extracurricular", "activities", "enigma",
      "languages", "hindi", "telugu",
    ],
    text: "I served as a Community Service Officer with the Rutgers University Police Department (Jan 2025 – May 2026), supporting incident response and crowd management for large-scale university events. I held three elected positions in Alpha Phi Delta Fraternity (May 2024 – May 2026) — Risk Management Chair, Head of Judiciary Board, and Co-Brotherhood Chair — leading safety compliance, conduct governance, and member engagement. I was also Administration Secretary for ENIGMA Technical Society (Aug 2023 – May 2024), organizing technical workshops and streamlining communication. I speak English, Hindi, and Telugu.",
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
    text: "Hire me if you want an engineer with four years of range already behind him. I've shipped production REST APIs and data pipelines, integrated LLM and ML components into backend services, spent two years on an IoT platform wiring device telemetry and AI detections into alert workflows, built business systems in Java and Spring Boot, and published an open-source memory library for AI agents on PyPI. Underneath that I have rare systems depth — a compiler, a RISC-V CPU, and a Unix filesystem written from scratch — so I debug across the stack rather than at one layer. I test what I build and I take problems end to end.",
  },
  {
    id: "looking-for",
    title: "What I'm looking for",
    source: "Profile",
    keywords: [
      "looking", "want", "seeking", "roles", "role", "opportunity",
      "opportunities", "interested", "available", "open", "job", "hiring",
      "position", "type", "relocate", "sponsorship",
    ],
    text: "I'm open to backend engineering, AI/ML engineering, Python development, IoT and connected-systems engineering, and IT/infrastructure roles. I'm most excited by teams shipping real products to real users. My experience maps across all of those families — production backend and REST APIs, LLM and retrieval pipelines, two years of IoT platform work, low-level C systems, and cloud deployments — so I'm not locked into one narrow lane. I'm based in New Brunswick, NJ.",
  },

  // ---- Contact ----
  {
    id: "contact",
    title: "How to contact me",
    source: "Contact",
    keywords: [
      "contact", "email", "reach", "connect", "linkedin", "github",
      "resume", "résumé", "cv", "touch", "message", "available", "phone",
    ],
    text: "The fastest way to reach me is email — baavanshreddy@gmail.com. My GitHub (github.com/BaavanshReddy) and LinkedIn are linked in the navigation and the contact section of this site, and you can download my résumé there too.",
  },

  // ---- Education ----
  {
    id: "education",
    title: "Education",
    source: "Education",
    keywords: [
      "education", "school", "college", "university", "rutgers", "degree",
      "study", "studied", "studying", "classes", "class", "student",
      "major", "graduate", "gpa", "coursework",
      "magna", "cum", "laude", "deans", "list", "honors",
    ],
    text: "I graduated from Rutgers University, New Brunswick in May 2026 with a B.S. in Computer Science, Magna Cum Laude, with a 3.76 GPA and four semesters on the Dean's List (Fall '24, Spring '25, Fall '25, Spring '26). My relevant coursework: Data Structures & Algorithms, Computer Architecture, Operating Systems, Compilers, Software Engineering, Databases, and Artificial Intelligence.",
  },
];

// ----------------------------------------------------------------------------
//  CHAT — suggested starter questions
// ----------------------------------------------------------------------------

export const suggestedQuestions: string[] = [
  "What is AgentMemry?",
  "Tell me about your IoT experience",
  "Why should I hire you?",
  "What's your backend experience?",
  "How many years have you been engineering?",
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
    "I'm targeting five role families: Backend Engineer, AI/ML Engineer, Python Developer, IoT/Connected Systems Engineer, and IT/Infrastructure.",
    "When a recruiter asks about my fit for a specific role, lean into the experience most relevant to THAT role.",
    "Don't volunteer that I'm applying broadly unless directly asked — just confidently present the relevant experience.",
    "If they ask 'what roles are you looking for,' be honest: backend, AI/ML, Python, IoT/connected systems, and IT.",
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
