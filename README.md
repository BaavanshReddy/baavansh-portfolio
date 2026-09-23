# Baavansh Reddy Gundlapalli: Portfolio + "Chat with Baavansh"

A personal portfolio site with ML systems case studies and an embedded
assistant grounded in a structured knowledge base. Recruiters can **ask
questions** about Baavansh's experience instead of only reading a static page.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## The dual-engine chat

The "Chat with Baavansh" widget runs in one of two modes, automatically. Neither
mode trains or fine-tunes a model.

- **Live AI**: when `ANTHROPIC_API_KEY` is set, `/api/chat` sends the question to
  Claude with the whole knowledge base (`lib/knowledge.ts`, `lib/profile.ts`, and
  every case study in `lib/caseStudies.ts`) as context, built by `lib/prompt.ts`.
  The prompt carries hard boundaries (no invented experience, no project work
  presented as employer work, no five-plus years, no production ML years, no
  enterprise Kubernetes, no GPU training, no fairness or compliance verdicts).
  Every reply is then screened by `lib/guardrails.ts`; a reply that breaks a
  rule is discarded and the client answers offline instead.
- **Offline**: when no key is set (or the API fails, rate-limits, or a reply is
  blocked), the chat lazy-loads a keyword-retrieval engine (`lib/retrieval.ts`)
  that ranks knowledge chunks **in the browser** and returns them with sources.

The site detects which is available and shows a badge.

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:3000. The chat works immediately in offline mode.

To enable live AI, copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
# then edit .env.local and set ANTHROPIC_API_KEY
```

## Where the content lives

- **`lib/profile.ts`**: profile, hero stats, projects, research, experience,
  skills, leadership, and suggested chat questions.
- **`lib/knowledge.ts`**: the knowledge chunks the chat answers from.
- **`lib/caseStudies.ts`**: the three ML case studies (`/projects/[slug]`). Every
  metric names the results file it came from.
- **`lib/mlCards.ts`**: the lightweight home-page ML cards and summary.

Tests (`npm test`) fail if a case study misses a required section, tags a tool
its repository does not use, contains an em dash, or if any knowledge chunk or
page text makes a claim the guardrails forbid.

## Design constraints worth keeping

- **Contrast is measured, not eyeballed.** `tailwind.config.ts` documents the
  ratio of every text tone against the page and card backgrounds. `muted` is
  for body copy (8.5:1), `faint` is for micro-labels only (5.5:1), and
  `violet` is decorative only, never text.
- **Reveal animations never gate content.** `lib/animations.tsx` forces every
  section visible after a short timeout, so a missed IntersectionObserver
  can't leave a section stuck at opacity 0.
- **Fonts are vendored** in `app/fonts/`, so the build does not depend on
  fonts.googleapis.com being reachable.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Enables live Claude-powered chat. Omit for offline mode. |
| `CHAT_MODEL` | No | Override the model. Defaults to Claude Haiku. |
| `NEXT_PUBLIC_GITHUB_USERNAME` | No | Overrides the GitHub handle for the live activity card (defaults to `BaavanshReddy`). |

## Project structure

```
app/
  layout.tsx               Root layout, fonts, metadata, Person JSON-LD
  page.tsx                 Assembles all home-page sections
  projects/page.tsx        Case-study index
  projects/[slug]/page.tsx ML case studies (static, with TechArticle JSON-LD)
  api/chat/route.ts        Live chat engine, guardrail screening, fallback signal
  sitemap.ts, robots.ts
components/                Nav, Hero, MLSummary, About, MLSystems, Projects, ChatBaavansh, ...
lib/
  profile.ts, knowledge.ts, caseStudies.ts, mlCards.ts   content
  prompt.ts                Server-side system prompt builder
  retrieval.ts             In-browser fallback retrieval engine
  guardrails.ts            Forbidden-claim checks for chat replies
public/case-studies/       Optimized WebP screenshots and plots (real captures)
tests/unit/                Vitest: content rules, guardrails, chat answers, API route
tests/e2e/                 Playwright: navigation, case studies, links, résumé, responsive, chat
```

## Checks

```bash
npm run format:check && npm run lint && npm run typecheck
npm test                 # unit tests
npm run build
npm run test:e2e         # Playwright; starts `next start` itself
```

If Playwright's own Chromium is not installed, point it at any Chromium with
`PW_CHROMIUM_PATH=/path/to/chrome npm run test:e2e`.

## Deploy

Push to GitHub, import at [vercel.com](https://vercel.com), add the environment
variables in project settings, deploy. See `ROADMAP.md` for the full plan.

## License

Personal project, all rights reserved.
