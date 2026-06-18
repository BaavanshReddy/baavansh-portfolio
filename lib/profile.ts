// ============================================================================
//  SINGLE SOURCE OF TRUTH
//  Everything the site renders AND everything the chat knows comes from here.
//  Voice: first person ("I / me / my"). The chat answers in first person too.
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
  headline: "Backend & AI/ML Engineer",
  tagline:
    "I build things that ship — backend APIs and data pipelines, plus retrieval and memory systems for AI agents.",
  status:
    "Backend & AI Systems Engineer at The AI Research Center (TAIRC) · open to backend & AI/ML roles",
  location: "New Brunswick, NJ",
  university: "Rutgers University",
  major: "Computer Science",
  gradYear: "May 2026",
  email: "baavanshreddy@gmail.com",
  github: "https://github.com/BaavanshReddy",
  linkedin: "https://www.linkedin.com/in/baavansh",
  resumeUrl: "/resume.pdf",
  summary:
    "I'm a Computer Science graduate from Rutgers University (Magna Cum Laude, 3.76 GPA), currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC). I've shipped REST APIs, authentication systems, and data pipelines, with applied AI work in retrieval and embeddings — including AgentMemry, my open-source memory library for AI agents. I'm backed by a strong CS foundation in Python — compilers, computer architecture, and operating systems — that shapes how I build.",
};

// ----------------------------------------------------------------------------
//  WHAT MAKES ME DIFFERENT  (the "unfair edges")
//  Re-ordered around what backend / AI-ML teams actually hire for in 2026.
// ----------------------------------------------------------------------------

export const edges: Edge[] = [
  {
    title: "Ships production AI infra",
    detail:
      "I'm currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC), building backend APIs and AI/ML systems. Plus AgentMemry — my open-source memory library for AI agents (~500 LOC, 15 passing tests) — and a real document-ingestion pipeline I built at Metasys Global.",
  },
  {
    title: "Owns problems end-to-end",
    detail:
      "I don't hand problems up. I show up with the read, two or three options, and the plan to ship — then I ship it.",
  },
  {
    title: "Rare systems depth",
    detail:
      "I built a full compiler — lexer, recursive-descent parser, AST, and code generation — and have hands-on computer-architecture and OS coursework, so I reason about how code actually runs, not just how to call an API.",
  },
  {
    title: "Full-stack range",
    detail:
      "Comfortable across the stack — PostgreSQL, REST APIs, authentication, real-time data, and frontend UIs — all in production codebases.",
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
    tag: "Backend / Scraping",
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
      "Currently building backend APIs and AI/ML systems infrastructure.",
    points: [
      "Building backend APIs and services that power the center's AI systems — REST endpoints and data pipelines that move data between models, storage, and applications.",
      "Engineering AI/ML systems infrastructure — integrating LLM and retrieval components, embeddings, and vector search into production-ready backend services.",
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
    org: "Fidelis — LIVEY Event Platform",
    period: "Jan 2026 – May 2026",
    summary: "Co-built LIVEY, a full-stack localized event-discovery platform.",
    points: [
      "Built React search and filtering components and engineered REST API routes across the front and back end.",
      "Integrated Supabase (PostgreSQL) for real-time data storage, user authentication, and event management.",
    ],
  },
  {
    id: "lrrh",
    role: "Software Engineering Extern",
    org: "Little Red Riding Hood Inc.",
    period: "Sep 2025 – Dec 2025",
    summary: "Built backend systems for a safety-focused rideshare platform.",
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
      "Developed Python automation scripts for data processing and file handling.",
      "Applied object-oriented design principles across structured engineering assignments.",
    ],
  },
];

// ----------------------------------------------------------------------------
//  SKILLS — aligned to the 2026 résumé
// ----------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "Java", "C++", "HTML", "CSS"],
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
    items: ["Vercel", "Git", "GitHub"],
  },
  {
    label: "Systems",
    items: ["Computer architecture", "Compilers", "Operating systems"],
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
// ----------------------------------------------------------------------------

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "intro",
    title: "Who I am",
    source: "Profile",
    keywords: [
      "who",
      "baavansh",
      "about",
      "summary",
      "introduce",
      "yourself",
      "background",
      "overview",
      "person",
    ],
    text: "I'm Baavansh Reddy Gundlapalli — a Computer Science graduate from Rutgers University (Magna Cum Laude, 3.76 GPA). I have backend engineering experience, applied AI and retrieval work, and an unusually deep systems background. I'm currently open to backend and AI/ML engineering roles for 2026.",
  },
  {
    id: "approach",
    title: "How I work",
    source: "About",
    keywords: [
      "adaptable",
      "resourceful",
      "charge",
      "leadership",
      "approach",
      "different",
      "strength",
      "stand",
      "out",
      "team",
      "initiative",
      "ownership",
      "special",
      "unique",
    ],
    text: "What sets me apart is ownership. I like taking a problem end to end — mapping it, weighing two or three approaches, then shipping a solution rather than handing it off. I also have unusual range: I'm comfortable from the database and backend APIs up to the UI, and from an LLM retrieval pipeline down to the compiler and OS internals I studied.",
  },
  {
    id: "agentmemry",
    title: "AgentMemry — open-source memory for AI agents",
    source: "Projects · AgentMemry",
    keywords: [
      "agentmemry",
      "agentrecall",
      "memory",
      "agent",
      "agents",
      "library",
      "open",
      "source",
      "sqlite",
      "embeddings",
      "package",
      "main",
      "best",
      "flagship",
      "top",
      "project",
    ],
    text: "AgentMemry is my flagship project — a ~500-line open-source Python library that gives AI agents persistent memory without a cloud database or any API keys. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity. It also has an MMR diversity mode and per-agent namespacing so multiple agents can share one database safely. The public API is verified by 15 passing unit tests. Source: github.com/BaavanshReddy/agentmemry.",
  },
  {
    id: "tairc",
    title: "The AI Research Center (TAIRC) — current role",
    source: "TAIRC · Experience",
    keywords: [
      "tairc",
      "ai",
      "research",
      "center",
      "current",
      "currently",
      "now",
      "present",
      "today",
      "backend",
      "systems",
      "engineer",
      "job",
      "work",
      "role",
      "experience",
      "where",
    ],
    text: "I'm currently a Backend & AI Systems Engineer at The AI Research Center (TAIRC). I build backend APIs and services that power the center's AI systems — REST endpoints and data pipelines that move data between models, storage, and applications — and I engineer the AI/ML systems infrastructure, integrating LLM and retrieval components, embeddings, and vector search into production-ready backend services.",
  },
  {
    id: "metasys",
    title: "Metasys Global — AI document pipeline",
    source: "Metasys Global · Experience",
    keywords: [
      "metasys",
      "rag",
      "retrieval",
      "pipeline",
      "ingestion",
      "minio",
      "vector",
      "embeddings",
      "internship",
      "job",
      "work",
      "experience",
    ],
    text: "During my backend internship at Metasys Global, I built the document-ingestion layer for an AI semantic-retrieval system. I integrated MinIO (S3-compatible) object storage to programmatically extract heterogeneous, mixed-format files, and engineered the file-processing workflow that staged extracted documents for downstream chunking, embedding, and vector search.",
  },
  {
    id: "fidelis",
    title: "Fidelis / LIVEY — full-stack event platform",
    source: "Experience",
    keywords: [
      "fidelis",
      "livey",
      "event",
      "fullstack",
      "full-stack",
      "react",
      "supabase",
      "postgres",
      "frontend",
      "extern",
    ],
    text: "As a full-stack engineering extern with Fidelis, I helped build LIVEY — a localized event-discovery platform. I built React search and filtering components, engineered REST API routes across the front and back end, and integrated Supabase (PostgreSQL) for real-time storage, user authentication, and event management.",
  },
  {
    id: "rideshare",
    title: "Rideshare backend — Little Red Riding Hood Inc.",
    source: "Experience",
    keywords: [
      "rideshare",
      "ride",
      "little",
      "red",
      "riding",
      "hood",
      "auth",
      "authentication",
      "login",
      "backend",
      "geolocation",
      "extern",
    ],
    text: "As a software engineering extern with Little Red Riding Hood Inc., I built backend systems for a safety-focused rideshare platform. I implemented secure login, credential management, and role-based authentication for separate rider and driver accounts, plus driver session tracking and real-time geolocation handling on AWS-deployed services for dispatch coordination.",
  },
  {
    id: "systems",
    title: "Systems & compilers background",
    source: "Projects · Systems",
    keywords: [
      "systems",
      "compiler",
      "compilers",
      "architecture",
      "operating",
      "low-level",
      "depth",
      "technical",
    ],
    text: "I have a deeper systems background than most AI candidates. I built a full compiler for the TinyL language — lexer, recursive-descent parser, AST, intermediate representation, and code generation — and my coursework covers computer architecture and operating systems. Being able to reason about parsers, datapaths, and how code actually runs, while also building modern AI tooling, is a real edge.",
  },
  {
    id: "tinyl",
    title: "TinyL Compiler",
    source: "Projects",
    keywords: [
      "tinyl",
      "compiler",
      "compilers",
      "lexer",
      "parser",
      "parsing",
      "codegen",
      "ast",
      "language",
    ],
    text: "My TinyL compiler is a full pipeline: I wrote the lexer, a recursive-descent parser working from a formal grammar, AST construction, an intermediate representation, and a code generator targeting stack-based bytecode.",
  },
  {
    id: "neuralnet",
    title: "Neural Network from Scratch",
    source: "Projects",
    keywords: [
      "neural",
      "net",
      "network",
      "perceptron",
      "backprop",
      "backpropagation",
      "numpy",
      "pytorch",
      "ml",
      "deep",
      "learning",
      "scratch",
    ],
    text: "I implemented a perceptron and a 3-layer neural network from scratch with hand-coded forward propagation and backpropagation in NumPy, reaching 89.1% face-recognition and 86.7% digit-classification accuracy — validated against a PyTorch baseline.",
  },
  {
    id: "rupizza",
    title: "RuPizza — OOP Ordering App",
    source: "Projects",
    keywords: [
      "rupizza",
      "pizza",
      "java",
      "javafx",
      "junit",
      "oop",
      "object",
      "oriented",
      "factory",
    ],
    text: "RuPizza is a JavaFX desktop ordering application I built around object-oriented principles — inheritance, polymorphism, and the Factory pattern — featuring an order builder, store-order management, and JUnit test coverage.",
  },
  {
    id: "scraper",
    title: "Campus Event Scraper",
    source: "Projects",
    keywords: [
      "scraper",
      "scrape",
      "scraping",
      "beautifulsoup",
      "events",
      "sqlite",
      "pipeline",
      "backoff",
      "retry",
    ],
    text: "I built a Python web-scraping pipeline that collects and normalizes university event listings into an indexed SQLite database. It stays reliable through exponential-backoff retries, URL-based deduplication, and graceful offline fallback when sources are unavailable.",
  },
  {
    id: "backend",
    title: "Backend & engineering experience",
    source: "Skills · Experience",
    keywords: [
      "backend",
      "server",
      "node",
      "nodejs",
      "typescript",
      "python",
      "api",
      "rest",
      "fullstack",
      "engineering",
      "build",
      "ship",
      "code",
    ],
    text: "Yes — I have hands-on backend experience. I've built REST API routes, authentication systems, and data pipelines: a document-ingestion pipeline at Metasys Global, secure role-based auth for a rideshare platform, and REST routes plus a Supabase/PostgreSQL backend for the LIVEY event platform. Combined with my compilers and systems background, I'm comfortable from the API layer down to how code actually runs.",
  },
  {
    id: "ai-skills",
    title: "AI & retrieval skills",
    source: "Skills",
    keywords: [
      "skills",
      "rag",
      "vector",
      "embeddings",
      "llm",
      "claude",
      "prompt",
      "eval",
      "evaluation",
      "retrieval",
      "machine",
      "learning",
      "ml",
    ],
    text: "My AI work centers on retrieval and memory: RAG pipelines, vector search, embeddings, and semantic retrieval. I built AgentMemry (open-source memory library for AI agents), the Metasys Global document-ingestion pipeline, this site's embedded RAG agent, and a perceptron + 3-layer neural net from scratch in NumPy. I also co-authored a research study evaluating LLM factual question-answering.",
  },
  {
    id: "research",
    title: "Research — LLM factual QA evaluation",
    source: "Research",
    keywords: [
      "research",
      "paper",
      "factcheck",
      "fact",
      "check",
      "evaluation",
      "rag",
      "bm25",
      "triviaqa",
      "hallucination",
      "study",
    ],
    text: "I co-authored LLM FactCheck — a research study benchmarking LLM factual QA across direct prompting, BM25 retrieval, and RAG on a controlled 100-question TriviaQA evaluation set. We found that BM25 surfaced supporting evidence in 90% of cases while RAG improved exact-match accuracy by only 3 points (0.66 → 0.69), isolating generation quality — not retrieval — as the real bottleneck.",
  },
  {
    id: "portfolio",
    title: "This site — Chat-with-Baavansh",
    source: "Projects",
    keywords: [
      "site",
      "website",
      "portfolio",
      "this",
      "chat",
      "agent",
      "nextjs",
      "next",
      "built",
      "made",
      "assistant",
    ],
    text: "This site itself is a project — a Next.js portfolio with an embedded RAG agent I wrote. It runs a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so it never breaks. The point is that recruiters can interrogate my work instead of just reading it.",
  },
  {
    id: "leadership",
    title: "Leadership & activities",
    source: "Experience",
    keywords: [
      "leadership",
      "lead",
      "rupd",
      "police",
      "campus",
      "safety",
      "officer",
      "fraternity",
      "greek",
      "risk",
      "judiciary",
      "community",
      "service",
    ],
    text: "I serve as a Community Service Officer with the Rutgers University Police Department, supporting incident response and crowd management for large-scale university events. I've also held three elected positions in Alpha Phi Delta Fraternity (Risk Management Chair, Head of Judiciary Board, Co-Brotherhood Chair), leading safety compliance, conduct governance, and member engagement.",
  },
  {
    id: "why-hire",
    title: "Why hire me",
    source: "Pitch",
    keywords: [
      "why",
      "hire",
      "fit",
      "best",
      "good",
      "reason",
      "value",
      "strong",
      "candidate",
      "recruit",
      "offer",
      "great",
    ],
    text: "Hire me if you want an engineer with real range: I've shipped backend APIs and data pipelines, open-sourced a memory library for AI agents (AgentMemry), and can reason from the API layer down to compilers and systems internals. I pair rare systems depth with current AI/retrieval experience, I test what I build, and I take problems end to end. I'm looking for backend and AI/ML engineering roles in 2026.",
  },
  {
    id: "looking-for",
    title: "What I'm looking for",
    source: "Profile",
    keywords: [
      "looking",
      "want",
      "seeking",
      "roles",
      "role",
      "opportunity",
      "opportunities",
      "interested",
      "available",
      "open",
      "job",
      "hiring",
    ],
    text: "I'm open to backend and AI/ML engineering roles for 2026 — work that lets me build APIs, data pipelines, and retrieval or LLM systems, or that draws on my systems and compilers background. I'm most excited by teams shipping real products to real users.",
  },
  {
    id: "contact",
    title: "How to contact me",
    source: "Contact",
    keywords: [
      "contact",
      "email",
      "reach",
      "connect",
      "linkedin",
      "github",
      "resume",
      "touch",
      "message",
      "available",
    ],
    text: "The fastest way to reach me is email — baavanshreddy@gmail.com. My GitHub and LinkedIn are linked in the navigation and the contact section of this site, and you can download my résumé there too. I'm open to backend and AI/ML engineering opportunities for 2026.",
  },
  {
    id: "education",
    title: "Education",
    source: "Education",
    keywords: [
      "education",
      "school",
      "college",
      "university",
      "rutgers",
      "degree",
      "study",
      "student",
      "major",
      "graduate",
      "gpa",
      "coursework",
    ],
    text: "I graduated from Rutgers University in May 2026 with a B.S. in Computer Science, Magna Cum Laude, with a 3.76 GPA and four semesters on the Dean's List (Fall '24, Spring '25, Fall '25, Spring '26). My coursework leans heavily into systems — computer architecture, compilers, operating systems — alongside AI, databases, and software engineering.",
  },
];

// ----------------------------------------------------------------------------
//  CHAT — suggested starter questions
// ----------------------------------------------------------------------------

export const suggestedQuestions: string[] = [
  "What is AgentMemry?",
  "Walk me through your AI work",
  "What's your systems background?",
  "Why should I hire you?",
  "What roles are you looking for?",
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
    "Rules:",
    "- Be concise — usually 2 to 4 sentences. This is a chat, not an essay.",
    "- Use only facts from the knowledge base. Never invent employers, dates, metrics, or projects.",
    `- If something is not covered, say so plainly and suggest emailing me at ${profile.email}.`,
    "- Be warm and confident, never salesy or exaggerated — let the facts carry it.",
    "- If asked something unrelated to my career, gently redirect to what you can help with.",
    "",
    "=== KNOWLEDGE BASE ===",
    buildKnowledgeText(),
  ].join("\n");
}
