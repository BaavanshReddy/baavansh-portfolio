// ============================================================================
//  Offline retrieval engine — the chat's in-browser fallback.
//  Runs entirely client-side over the knowledge base in profile.ts.
//  No network, no API key, no cost. Used whenever the live Claude engine
//  is unavailable (no key configured, API error, or rate limit hit).
// ============================================================================

import { knowledgeChunks, profile, type KnowledgeChunk } from "./profile";

export interface RetrievalResult {
  answer: string;
  sources: string[];
  confident: boolean;
}

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being", "do",
  "does", "did", "of", "to", "in", "on", "for", "and", "or", "with", "as", "at",
  "by", "from", "his", "her", "he", "she", "him", "they", "them", "you", "your",
  "yours", "we", "us", "it", "its", "this", "that", "these", "those", "what",
  "who", "whom", "how", "why", "when", "where", "which", "can", "could", "would",
  "should", "will", "has", "have", "had", "tell", "give", "know", "please",
  "there", "also", "any", "some", "more", "most", "much", "very", "really",
  "just", "get", "got", "about", "into", "out", "if", "so", "but",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreChunk(chunk: KnowledgeChunk, tokens: string[]): number {
  let score = 0;
  const titleTokens = new Set(tokenize(chunk.title));
  const keywordSet = new Set(chunk.keywords.map((k) => k.toLowerCase()));
  const haystack = (chunk.title + " " + chunk.text).toLowerCase();

  for (const t of tokens) {
    if (keywordSet.has(t)) score += 6;
    if (titleTokens.has(t)) score += 4;

    if (!keywordSet.has(t) && t.length > 3) {
      for (const k of Array.from(keywordSet)) {
        if (k.includes(t) || t.includes(k)) {
          score += 2;
          break;
        }
      }
    }

    const occurrences = haystack.split(t).length - 1;
    if (occurrences > 0) score += Math.min(occurrences, 3);
  }
  return score;
}

const GREETINGS = ["hi", "hello", "hey", "yo", "sup", "hiya", "howdy", "heya"];

function isGreeting(raw: string): boolean {
  if (raw.length > 14) return false;
  return GREETINGS.some(
    (g) => raw === g || raw.startsWith(g + " ") || raw.startsWith(g + "!"),
  );
}

/**
 * Answer a query from the knowledge base. Always returns something useful.
 */
export function retrieveAnswer(query: string): RetrievalResult {
  const raw = query.trim().toLowerCase();
  const tokens = tokenize(query);

  if (isGreeting(raw)) {
    return {
      answer: `Hey! I'm ${profile.shortName}. Ask me about my projects, what roles I'm targeting, my backend or AI/ML experience, my Python work, or how to reach me.`,
      sources: [],
      confident: true,
    };
  }

  if (tokens.length === 0) {
    return {
      answer:
        "Ask me something — my projects, backend experience, AI/ML work, Python skills, what roles I'm looking for, or how to reach me.",
      sources: [],
      confident: false,
    };
  }

  const ranked = knowledgeChunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, tokens) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];

  if (!top || top.score < 3) {
    return {
      answer: `I don't have a confident answer to that from what's on this site. The best move is to email me directly at ${profile.email}. You can also ask about my projects, backend work, AI/ML experience, Python skills, or what roles I'm targeting.`,
      sources: [],
      confident: false,
    };
  }

  const picked: KnowledgeChunk[] = [top.chunk];
  const second = ranked[1];
  if (
    second &&
    second.chunk.id !== top.chunk.id &&
    second.score >= Math.max(4, top.score * 0.6)
  ) {
    picked.push(second.chunk);
  }

  const answer = picked.map((c) => c.text).join(" ");
  const sources = Array.from(new Set(picked.map((c) => c.source)));

  return { answer, sources, confident: true };
}
