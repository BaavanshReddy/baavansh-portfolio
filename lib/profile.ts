// ============================================================================
//  SINGLE SOURCE OF TRUTH
//  Everything the site renders AND everything the chat knows comes from here.
//  All [[ placeholders ]] have been filled with real details.
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
    "I build things that ship — from low-level systems in C to retrieval pipelines and memory for AI agents.",
  status: "Open to backend & AI/ML engineering roles · 2026",
  location: "New Brunswick, NJ",
  university: "Rutgers University",
  major: "Computer Science",
  gradYear: "May 2026",
  email: "baavanshreddy@gmail.com",
  github: "https://github.com/BaavanshReddy",
  linkedin: "https://www.linkedin.com/in/baavansh",
  resumeUrl: "/resume.pdf", // drop your PDF into  public/resume.pdf
  summary:
    "Computer Science graduate from Rutgers University (Magna Cum Laude, GPA 3.76) with backend engineering experience, applied AI/retrieval work, and an unusually deep systems background. I build things that ship — production-style APIs and data pipelines, an open-source memory library for AI agents, CPU simulators, and a full compiler — and I like owning a problem end to end.",
};

// ----------------------------------------------------------------------------
//  WHAT MAKES HIM DIFFERENT  (the "unfair edges")
// ----------------------------------------------------------------------------

export const edges: Edge[] = [
  {
    title: "Ships real AI infrastructure",
    detail:
      "AgentRecall — an open-source memory library for AI agents — plus a document-ingestion layer built during an AI research internship.",
  },
  {
    title: "Systems & compilers",
    detail:
      "A RISC-V CPU simulator, a compiler, and a filesystem — all in C. Rare among AI candidates.",
  },
  {
    title: "Full-stack range",
    detail:
      "Backend APIs, React frontends, SQL and Postgres — comfortable from the database up to the UI.",
  },
  {
    title: "D1 discipline",
    detail:
      "Former NCAA Division I crew athlete — knows how to ship through fatigue.",
  },
  {
    title: "Native Hindi + Telugu",
    detail:
      "Trilingual — native intuition for two languages most AI tooling underserves.",
  },
];

// ----------------------------------------------------------------------------
//  PROJECTS
// ----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "velarro",
    name: "Velarro — AI Document Pipeline",
    tag: "AI / Retrieval",
    blurb:
      "An AI document-ingestion pipeline built during a backend internship at an AI research center.",
    description:
      "During a backend internship at the Velarro AI Research Center (Metasys Global), Baavansh built the document-ingestion layer for an AI semantic-retrieval system — integrating MinIO (S3-compatible) object storage to programmatically extract heterogeneous, mixed-format files and stage them for downstream chunking, embedding, and vector search.",
    tech: ["Python", "MinIO / S3", "Embeddings", "Chunking", "Semantic Retrieval"],
    highlights: [
      "Document-ingestion layer backed by MinIO (S3-compatible) object storage",
      "Programmatic extraction of heterogeneous, mixed-format files",
      "Staged content for downstream chunking, embedding, and vector search",
    ],
    links: [],
    flagship: true,
  },
  {
    id: "agentrecall",
    name: "AgentRecall — Memory for AI Agents",
    tag: "AI / Open Source",
    blurb:
      "An open-source, local-first memory library for AI agents — SQLite, local embeddings, no cloud.",
    description:
      "AgentRecall is an open-source Python library that gives AI agents persistent memory without a cloud database. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity — plus an MMR mode for diverse results and per-agent namespacing so multiple agents can share one database safely. Roughly 500 lines, with 15 passing unit tests.",
    tech: ["Python", "SQLite", "Embeddings", "Semantic Search", "sentence-transformers", "pytest"],
    highlights: [
      "Local-first: no cloud database, no API keys",
      "Semantic + MMR retrieval over a SQLite store",
      "Per-agent namespacing inside one database file",
      "Clean public API covered by 15 passing unit tests",
    ],
    links: [{ label: "Source", href: "https://github.com/BaavanshReddy/agentrecall" }],
  },
  {
    id: "portfolio",
    name: "Chat-with-Baavansh Portfolio",
    tag: "AI / Full-stack",
    blurb: "The site you're on — a Next.js portfolio with an embedded RAG agent.",
    description:
      "This site itself is a project. It pairs a Next.js front end with an embedded RAG agent: a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so it never breaks. Recruiters don't just read the resume — they can interrogate it.",
    tech: ["Next.js", "TypeScript", "Claude API", "RAG", "Tailwind CSS"],
    highlights: [
      "Embedded RAG chat over a structured knowledge base",
      "Live Claude API engine with an in-browser fallback",
      "Sourced, cited answers",
    ],
    links: [{ label: "Source", href: "https://github.com/BaavanshReddy/baavansh-portfolio" }],
  },
  {
    id: "riscv",
    name: "RISC-V CPU Simulator",
    tag: "Systems / Architecture",
    blurb: "A single-cycle RISC-V CPU simulator in C, with cache simulation.",
    description:
      "A single-cycle CPU simulator for the RISC-V instruction set, written in C. It decodes instructions, models the processor datapath, runs the register file, and handles memory-mapped I/O — backed by a 1KiB direct-mapped cache with hit/miss tracking to model a realistic memory hierarchy.",
    tech: ["C", "Computer Architecture", "RISC-V", "Caches"],
    highlights: [
      "Full instruction decode and datapath execution",
      "1KiB direct-mapped instruction/data cache with hit/miss tracking",
      "Memory-mapped I/O and register-file modeling",
    ],
    links: [{ label: "Source", href: "https://github.com/BaavanshReddy/risc-v-simulator" }],
  },
  {
    id: "tinyl",
    name: "TinyL Compiler",
    tag: "Compilers",
    blurb: "A full compiler for the TinyL language — lexer, parser, AST, code generation.",
    description:
      "A full compiler for the TinyL language: lexical analysis, recursive-descent parsing from a formal grammar, intermediate-representation generation, and target code generation — handling operator precedence, variable binding, and control flow end to end.",
    tech: ["Python", "Compilers", "Parsing", "ASTs", "Code Generation"],
    highlights: [
      "Lexer and recursive-descent parser with AST construction",
      "Intermediate representation and translation pipeline",
      "End-to-end: source text to generated target code",
    ],
    links: [{ label: "Source", href: "https://github.com/BaavanshReddy/tinyl-compiler" }],
  },
  {
    id: "filesystem",
    name: "Linux Filesystem in C",
    tag: "Operating Systems",
    blurb: "A Unix-style virtual filesystem in C — inodes, permissions, persistence.",
    description:
      "A Unix-style virtual filesystem built from the ground up in C: inode-based file representation, directory hierarchies with recursive traversal, permission management, and serialization/deserialization so filesystem state persists across sessions.",
    tech: ["C", "Operating Systems", "Filesystems", "Data Structures"],
    highlights: [
      "Inode-based file representation with Unix permissions",
      "Recursive directory traversal and path resolution",
      "Serialization for persistent state across sessions",
    ],
    links: [{ label: "Source", href: "https://github.com/BaavanshReddy/linux-filesystem" }],
  },
];

// ----------------------------------------------------------------------------
//  EXPERIENCE
// ----------------------------------------------------------------------------

export const experience: ExperienceItem[] = [
  {
    id: "velarro",
    role: "Backend Developer Intern",
    org: "Metasys Global — Velarro AI Research Center",
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
    summary: "Co-built a full-stack localized event-discovery platform.",
    points: [
      "Built React filtering and search components and engineered REST API routes across the stack.",
      "Integrated Supabase (PostgreSQL) for real-time storage, user authentication, and event management.",
    ],
  },
  {
    id: "lrrh",
    role: "Software Engineering Extern",
    org: "Little Red Riding Hood Inc.",
    period: "Sep 2025 – Dec 2025",
    summary: "Built backend systems for a safety-focused rideshare platform.",
    points: [
      "Implemented secure login, credential management, and role-based authentication for riders and drivers.",
      "Built driver session tracking and real-time geolocation handling to support dispatch coordination.",
    ],
  },
  {
    id: "internpe",
    role: "Python Programming Intern",
    org: "InternPe",
    period: "Sep 2024 – Oct 2024",
    summary: "Built Python automation scripts and applied OOP fundamentals.",
    points: [
      "Developed Python scripts for data processing, file handling, and task automation.",
      "Applied object-oriented design and software-engineering best practices across structured assignments.",
    ],
  },
];

// ----------------------------------------------------------------------------
//  SKILLS
// ----------------------------------------------------------------------------

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "C", "SQL"],
  },
  {
    label: "AI & Retrieval",
    items: [
      "RAG pipelines",
      "Vector search",
      "Embeddings",
      "Semantic search",
      "LLM applications",
      "Evaluation",
    ],
  },
  {
    label: "Backend & Web",
    items: ["Node.js", "Express", "FastAPI", "React", "Next.js", "REST APIs"],
  },
  {
    label: "Systems",
    items: ["Computer architecture", "Compilers", "Operating systems", "Filesystems"],
  },
  {
    label: "Data & Tools",
    items: ["PostgreSQL", "MySQL", "SQLite", "MinIO / S3", "Git", "Linux"],
  },
  {
    label: "Spoken languages",
    items: ["English", "Hindi — native", "Telugu — native"],
  },
];

// ----------------------------------------------------------------------------
//  KNOWLEDGE BASE  — the retrievable units the chat answers from.
// ----------------------------------------------------------------------------

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "intro",
    title: "Who is Baavansh",
    source: "Profile",
    keywords: ["who", "baavansh", "about", "summary", "introduce", "yourself", "background", "overview", "person"],
    text: "Baavansh Reddy Gundlapalli is a Computer Science graduate from Rutgers University (Magna Cum Laude, GPA 3.76). He has backend engineering experience, applied AI and retrieval work, and an unusually deep systems background — and he is currently open to backend and AI/ML engineering roles for 2026.",
  },
  {
    id: "approach",
    title: "How Baavansh works",
    source: "About",
    keywords: ["adaptable", "resourceful", "charge", "leadership", "approach", "different", "strength", "stand", "out", "team", "initiative", "ownership", "special", "unique"],
    text: "What makes Baavansh different is ownership. He likes taking a problem end to end — mapping it, weighing two or three approaches, and shipping a solution rather than handing it off. He pairs that with rare range: he is comfortable from a SQL database up to a React UI, and from an LLM retrieval pipeline down to a CPU simulator in C.",
  },
  {
    id: "agentrecall",
    title: "AgentRecall — open-source memory for AI agents",
    source: "Projects · AgentRecall",
    keywords: ["agentrecall", "memory", "agent", "agents", "library", "open", "source", "sqlite", "embeddings", "package", "main", "best", "project"],
    text: "AgentRecall is Baavansh's open-source Python library that gives AI agents persistent memory without a cloud database. It stores memories in a single SQLite file, embeds them locally with sentence-transformers, and retrieves them by cosine similarity — with an MMR mode for diverse results and per-agent namespacing so multiple agents can share one database. It is roughly 500 lines of code with 15 passing unit tests.",
  },
  {
    id: "velarro",
    title: "Velarro — AI document pipeline",
    source: "Velarro · Experience",
    keywords: ["velarro", "metasys", "rag", "retrieval", "pipeline", "ingestion", "minio", "vector", "embeddings", "internship", "job", "work", "experience"],
    text: "During a backend internship at the Velarro AI Research Center (Metasys Global), Baavansh built the document-ingestion layer for an AI semantic-retrieval system. He integrated MinIO (S3-compatible) object storage to programmatically extract heterogeneous, mixed-format files and stage them for downstream chunking, embedding, and vector search.",
  },
  {
    id: "fidelis",
    title: "Fidelis / LIVEY — full-stack event platform",
    source: "Experience",
    keywords: ["fidelis", "livey", "event", "fullstack", "full-stack", "react", "supabase", "postgres", "frontend", "extern"],
    text: "As a full-stack engineering extern with Fidelis, Baavansh helped build LIVEY, a localized event-discovery platform. He built React filtering and search components, engineered REST API routes, and integrated Supabase (PostgreSQL) for real-time storage, user authentication, and event management.",
  },
  {
    id: "rideshare",
    title: "Rideshare backend — Little Red Riding Hood Inc.",
    source: "Experience",
    keywords: ["rideshare", "ride", "little", "red", "riding", "hood", "auth", "authentication", "login", "backend", "geolocation", "extern"],
    text: "As a software engineering extern with Little Red Riding Hood Inc., Baavansh built backend systems for a safety-focused rideshare platform. He implemented secure login, credential management, and role-based authentication for riders and drivers, plus driver session tracking and real-time geolocation handling for dispatch coordination.",
  },
  {
    id: "systems",
    title: "Systems & compilers background",
    source: "Projects · Systems",
    keywords: ["systems", "compiler", "compilers", "architecture", "operating", "filesystem", "low-level", "hardware", "depth", "technical", "c"],
    text: "Baavansh has an unusually deep systems background for an AI candidate. He built a RISC-V CPU simulator in C with cache simulation, a full compiler for the TinyL language, and a Unix-style filesystem in C. Very few engineers can reason about parsers, datapaths, and memory hierarchies and also build modern AI tooling — that combination is a real edge.",
  },
  {
    id: "riscv",
    title: "RISC-V CPU Simulator",
    source: "Projects",
    keywords: ["risc", "riscv", "cpu", "simulator", "processor", "datapath", "architecture", "assembly", "instruction", "cache"],
    text: "The RISC-V CPU simulator is a single-cycle C program that decodes RISC-V instructions, models the processor datapath, runs the register file, and handles memory-mapped I/O. It includes a 1KiB direct-mapped cache with hit/miss tracking to model a realistic memory hierarchy.",
  },
  {
    id: "tinyl",
    title: "TinyL Compiler",
    source: "Projects",
    keywords: ["tinyl", "compiler", "compilers", "lexer", "parser", "parsing", "codegen", "ast", "language"],
    text: "The TinyL compiler is a full compiler: it lexes source into tokens, parses them into an abstract syntax tree with a recursive-descent parser, builds an intermediate representation, and generates target code — handling operator precedence, variable binding, and control flow.",
  },
  {
    id: "filesystem",
    title: "Linux Filesystem in C",
    source: "Projects",
    keywords: ["filesystem", "file", "linux", "inode", "inodes", "operating", "block", "storage", "disk"],
    text: "Baavansh implemented a Unix-style filesystem in C from the ground up — inode-based file representation, directory hierarchies with recursive traversal, permission management, and serialization so filesystem state persists across sessions.",
  },
  {
    id: "backend",
    title: "Backend & engineering experience",
    source: "Skills · Experience",
    keywords: ["backend", "server", "node", "nodejs", "typescript", "python", "api", "rest", "fullstack", "engineering", "build", "ship", "code"],
    text: "Yes — Baavansh has hands-on backend experience. He has built REST API routes, authentication systems, and data pipelines: a document-ingestion pipeline at Velarro, secure role-based auth for a rideshare platform, and REST routes plus a Supabase/PostgreSQL backend for the LIVEY event platform. Combined with his C systems work, he is comfortable from the API layer down to memory and filesystems.",
  },
  {
    id: "ai-skills",
    title: "AI & retrieval skills",
    source: "Skills",
    keywords: ["skills", "rag", "vector", "embeddings", "llm", "claude", "prompt", "eval", "evaluation", "retrieval", "machine", "learning", "ml"],
    text: "Baavansh's AI work centers on retrieval and memory: RAG pipelines, vector search, embeddings, and semantic retrieval. He built AgentRecall (an open-source memory library for AI agents), a document-ingestion pipeline at the Velarro AI Research Center, and this site — itself an embedded RAG agent. He also co-authored a research study evaluating LLM factual question-answering.",
  },
  {
    id: "research",
    title: "Research — LLM factual QA evaluation",
    source: "Research",
    keywords: ["research", "paper", "factcheck", "fact", "check", "evaluation", "rag", "bm25", "triviaqa", "hallucination", "study"],
    text: "Baavansh co-authored a research study evaluating LLM factual question-answering, comparing direct prompting, BM25 retrieval, and RAG on a controlled 100-question TriviaQA pilot. The finding: BM25 retrieved supporting evidence 90% of the time, yet RAG improved exact match by only ~3 points — showing that generation quality, not retrieval, was the real bottleneck.",
  },
  {
    id: "portfolio",
    title: "This site — Chat-with-Baavansh",
    source: "Projects",
    keywords: ["site", "website", "portfolio", "this", "chat", "agent", "nextjs", "next", "built", "made", "assistant"],
    text: "This site itself is a project: a Next.js portfolio with an embedded RAG agent. It runs a structured knowledge base, a retrieval engine, and a Claude-powered chat endpoint with an automatic in-browser fallback so it never breaks. The point is that recruiters can interrogate the resume instead of just reading it.",
  },
  {
    id: "languages",
    title: "Spoken languages — Hindi & Telugu",
    source: "About",
    keywords: ["language", "languages", "hindi", "telugu", "indian", "native", "speak", "multilingual", "trilingual"],
    text: "Baavansh is a native speaker of both Hindi and Telugu, in addition to English.",
  },
  {
    id: "leadership",
    title: "Leadership & activities",
    source: "Experience",
    keywords: ["leadership", "lead", "rupd", "police", "campus", "safety", "officer", "fraternity", "greek", "risk", "judiciary", "community", "service"],
    text: "Baavansh serves as a community service officer with the Rutgers University Police Department, supporting incident response and crowd management at large university events. He also holds chapter leadership roles in his fraternity — risk management and judiciary — overseeing compliance and operations.",
  },
  {
    id: "crew",
    title: "Former NCAA Division I crew athlete",
    source: "Experience",
    keywords: ["crew", "rowing", "row", "athlete", "sport", "sports", "ncaa", "division", "discipline", "fatigue", "fitness"],
    text: "Baavansh is a former NCAA Division I crew (rowing) athlete at Rutgers. It is one of the strongest discipline signals on a resume — year-round, early-morning training and competing through fatigue as part of a team.",
  },
  {
    id: "why-hire",
    title: "Why hire Baavansh",
    source: "Pitch",
    keywords: ["why", "hire", "fit", "best", "good", "reason", "value", "strong", "candidate", "recruit", "offer", "great"],
    text: "Hire Baavansh if you want an engineer with real range: he has shipped backend APIs and data pipelines, built an open-source memory library for AI agents, and can reason from the API layer down to compilers and filesystems. He pairs rare systems depth with current AI/retrieval experience and the discipline of a Division I athlete. He is looking for backend and AI/ML engineering roles in 2026.",
  },
  {
    id: "looking-for",
    title: "What Baavansh is looking for",
    source: "Profile",
    keywords: ["looking", "want", "seeking", "roles", "role", "opportunity", "opportunities", "interested", "available", "open", "job", "hiring"],
    text: "Baavansh is open to backend and AI/ML engineering roles for 2026 — work that lets him build APIs, data pipelines, and retrieval or LLM systems, or that draws on his systems and compilers background. He is most excited by teams shipping real products to real users.",
  },
  {
    id: "contact",
    title: "How to contact Baavansh",
    source: "Contact",
    keywords: ["contact", "email", "reach", "connect", "linkedin", "github", "resume", "touch", "message", "available"],
    text: "You can reach Baavansh by email at baavanshreddy@gmail.com. His GitHub and LinkedIn are linked in the navigation and the contact section of this site, and his resume can be downloaded there too. He is open to backend and AI/ML engineering opportunities for 2026.",
  },
  {
    id: "education",
    title: "Education",
    source: "Education",
    keywords: ["education", "school", "college", "university", "rutgers", "degree", "study", "student", "major", "graduate", "gpa", "coursework"],
    text: "Baavansh graduated from Rutgers University in May 2026 with a B.S. in Computer Science, Magna Cum Laude, with a 3.76 GPA and four semesters on the Dean's List. His coursework leans heavily into systems — computer architecture, compilers, and operating systems — alongside his applied AI and retrieval work.",
  },
];

// ----------------------------------------------------------------------------
//  CHAT — suggested starter questions
// ----------------------------------------------------------------------------

export const suggestedQuestions: string[] = [
  "What is AgentRecall?",
  "Does Baavansh have backend experience?",
  "What's his systems background?",
  "Why should I hire him?",
  "What is he looking for?",
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
  out.push(`Education: ${profile.major} at ${profile.university} (${profile.gradYear})`);
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
    `You are the portfolio assistant for ${profile.name} ("${profile.shortName}"). Visitors are usually recruiters or hiring managers.`,
    "",
    "Your job: answer questions about Baavansh accurately and concisely, in the third person, using ONLY the knowledge base below.",
    "",
    "Rules:",
    "- Be concise — usually 2 to 4 sentences. This is a chat, not an essay.",
    "- Use only facts from the knowledge base. Never invent employers, dates, metrics, or projects.",
    `- If something is not covered, say so plainly and suggest emailing Baavansh at ${profile.email}.`,
    "- Be warm and confident, never salesy or exaggerated — let the facts carry it.",
    "- If asked something unrelated to Baavansh or his career, gently redirect to what you can help with.",
    "",
    "=== KNOWLEDGE BASE ===",
    buildKnowledgeText(),
  ].join("\n");
}
