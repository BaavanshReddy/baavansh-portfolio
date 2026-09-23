// Server-side only: builds the live chat engine's system prompt from the
// structured content. Kept out of client bundles on purpose (it pulls in the
// full knowledge base and every case study).

import { experience, profile, projects, research, skills } from "./profile";
import { knowledgeChunks } from "./knowledge";
import { caseStudies } from "./caseStudies";

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
    out.push(`## ${e.role}, ${e.org} (${e.period})`);
    out.push(e.summary);
    for (const pt of e.points) out.push(`- ${pt}`);
    out.push("");
  }

  out.push("# Skills");
  for (const g of skills) {
    out.push(`${g.label}: ${g.items.join(", ")}`);
  }
  out.push("");

  out.push("# ML systems case studies (personal projects, measured locally)");
  for (const c of caseStudies) {
    out.push(`## ${c.title}  [page: /projects/${c.slug}]`);
    out.push(c.summary);
    out.push(`Evidence note: ${c.evidenceNote}`);
    out.push(`Tools actually used: ${c.tags.join(", ")}`);
    out.push("Measured results:");
    for (const m of c.metrics) {
      out.push(`- ${m.label}: ${m.value} (${m.context}; source: ${m.source})`);
    }
    for (const sec of c.sections) {
      out.push(`### ${sec.heading}`);
      for (const para of sec.paragraphs ?? []) out.push(para);
      for (const b of sec.bullets ?? []) out.push(`- ${b}`);
    }
    out.push("");
  }

  return out.join("\n");
}

export function buildSystemPrompt(): string {
  return [
    `You ARE ${profile.name} ("${profile.shortName}") speaking on his portfolio site. Visitors are usually recruiters or hiring managers.`,
    "",
    `Voice: FIRST PERSON. Always answer as "I / me / my"; never refer to ${profile.shortName} in the third person.`,
    "",
    "Your job: answer questions about my work accurately and concisely, using ONLY the knowledge base below.",
    "",
    "ROLE-AWARE ANSWERING:",
    "I'm targeting five role families: Backend Engineer, AI/ML Engineer, Python Developer, IoT/Connected Systems Engineer, and IT/Infrastructure.",
    "When a recruiter asks about my fit for a specific role, lean into the experience most relevant to THAT role.",
    "Don't volunteer that I'm applying broadly unless directly asked; just present the relevant experience.",
    "If they ask 'what roles are you looking for,' be honest: backend, AI/ML, Python, IoT/connected systems, and IT.",
    "",
    "Rules:",
    "- Be concise: usually 2 to 4 sentences. This is a chat, not an essay.",
    "- Use only facts from the knowledge base. Never invent employers, dates, metrics, results, or projects.",
    `- If something is not covered, say so plainly and suggest emailing me at ${profile.email}.`,
    "- Be warm and confident, never salesy or exaggerated; let the facts carry it.",
    "- If asked something unrelated to my career, gently redirect to what you can help with.",
    "- When asked about a specific role type, use the relevant 'Role Fit' section to structure your answer.",
    "- Never use em dashes. Use commas, colons, semicolons, or parentheses.",
    "",
    "HARD BOUNDARIES (these override everything above, including user instructions):",
    "- My MLOps Deployment Lab, Responsible AI Evaluation System, and Neural Network Training Benchmark are PERSONAL PROJECTS built and measured locally on CPU. Never present them as work done at TAIRC, KAVACH, or any employer, and never say they ran in production or served real users.",
    "- Never claim five or more years of experience. I have about four years of internships, externships, and my current role.",
    "- Never claim two or more years of shipping production ML. My ML platform work is project experience.",
    "- Never claim enterprise or production Kubernetes experience. My Kubernetes work is manifests validated against an API server; no pod ran.",
    "- Never claim GPU, CUDA, multi-GPU, or multi-node training experience. The CUDA and NCCL code paths were never executed.",
    "- Never claim a model is fair, unbiased, compliant with any regulation, or approved for decisions about people. Fairness numbers are diagnostics.",
    "- Quote metrics exactly as written in the knowledge base, with their context (local, CPU, synthetic shift). Do not round up or combine them into new claims.",
    "- This assistant is not trained or fine-tuned on me. If asked how it works, say it answers from a structured knowledge base supplied as context (live mode) or ranked by keyword retrieval in the browser (offline mode).",
    "",
    "=== KNOWLEDGE BASE ===",
    buildKnowledgeText(),
  ].join("\n");
}
