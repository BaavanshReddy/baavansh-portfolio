# Project Handoff — Baavansh Portfolio + "Chat with Baavansh"

> Hand this file to a new chat (or a different AI assistant) to continue the
> project with full context. It covers what exists, what's verified, what's
> broken or unverified, and what to do next. Last updated: 2026-05-23.

---

## 1. TL;DR

A personal portfolio website with an embedded "Chat with Baavansh" RAG agent —
recruiters can ask questions about Baavansh's experience and get sourced
answers. It is **Project #1** of a 3-project job-hunting plan (see §11).

The project is **fully built and scaffolded** as a Next.js app. It runs, but it
has **not yet been compiled with `next build`** (see §8) and still contains
**unfilled placeholders** (see §10). It is not yet deployed.

Location on disk: `RESUME AND PROJECTS/CLAUDE/baavansh-portfolio/`

---

## 2. What this project is and why

Baavansh Reddy Gundlapalli is a Rutgers CS student job-hunting for AI / software
engineering roles in 2026. In 2026, recruiters ask for **links before
resumes**. The differentiator here: instead of a static portfolio, the site has
an **AI chat agent** that answers recruiter questions ("tell me about Metasys Global",
"does he have backend experience?") from a structured knowledge base, with
citations.

This is the foundation project — every later project links back to this site.
The full strategy lives in `../Ultimate_Project_Plan.docx` and the build plan
lives in `ROADMAP.md` (same folder as this file).

---

## 3. Current status

| Item | Status |
|---|---|
| Next.js project scaffolded | ✅ Done |
| All UI sections built | ✅ Done |
| Dual-engine chat (live + offline) | ✅ Done |
| Offline retrieval engine | ✅ Built **and runtime-tested** |
| `ROADMAP.md` build plan | ✅ Done |
| `next build` compile check | ⚠️ **NOT run** — see §8 |
| Real content / placeholders filled | ❌ Not done — see §10 |
| Resume PDF added | ❌ Not done |
| Live Claude API tested end-to-end | ❌ Not done (needs API key) |
| Deployed to Vercel | ❌ Not done |

---

## 4. Tech stack

- **Next.js 14.2.15** (App Router)
- **React 18.3**
- **TypeScript 5.5** (strict mode on)
- **Tailwind CSS 3.4** — custom theme: near-black `#0B0B0C` + electric-lime
  `#CCFF00` accent ("bold high-contrast" design)
- **No runtime dependencies beyond Next/React** — the chat backend calls the
  Anthropic API with plain `fetch`, no SDK.
- Fonts: Space Grotesk + JetBrains Mono, loaded via `<link>` in `app/layout.tsx`.

---

## 5. Architecture — the dual-engine chat

The "Chat with Baavansh" widget runs in **one of two modes, auto-detected**:

1. **Live engine** — `app/api/chat/route.ts` (a Next.js API route). When the
   `ANTHROPIC_API_KEY` environment variable is set, it sends the conversation
   to Claude with the full knowledge base as the system prompt and returns a
   generated answer.
2. **Offline engine** — `lib/retrieval.ts`. A keyword-retrieval engine that
   runs **entirely in the browser** over the same knowledge base. Used whenever
   the live engine is unavailable: no API key, API error, or rate limit hit.

The client (`components/ChatBaavansh.tsx`) POSTs to `/api/chat`. If the route
returns `{ fallback: true }` (or the request fails), the client transparently
runs `retrieveAnswer()` locally. The user sees a badge: "Live AI" or
"Offline engine". **The chat never breaks** — worst case it drops to offline mode.

**Single source of truth:** `lib/profile.ts`. All page content AND both chat
engines read from it. Edit that one file and everything updates.

---

## 6. File-by-file map

```
baavansh-portfolio/
├── ROADMAP.md            6-phase build plan with time estimates + checklist
├── README.md             Quickstart + env vars + structure
├── HANDOFF.md            This file
├── package.json          Deps: next, react, react-dom (+ dev: TS, tailwind)
├── next.config.mjs        eslint.ignoreDuringBuilds = true (type-check stays on)
├── tsconfig.json         Standard Next 14 config, paths: "@/*" -> "./*"
├── tailwind.config.ts    Custom colors (ink/lime/paper/...) + fonts
├── postcss.config.js     tailwindcss + autoprefixer
├── .env.example          Template for .env.local (API key, model, GH username)
├── .gitignore
├── app/
│   ├── layout.tsx        Root layout, metadata, font <link>s
│   ├── page.tsx          Assembles all sections in order
│   ├── globals.css       Tailwind + custom CSS (animations, grid bg, scrollbar)
│   └── api/chat/route.ts THE CHAT BACKEND. GET=status, POST=chat. Rate-limited.
├── lib/
│   ├── profile.ts        ⭐ SINGLE SOURCE OF TRUTH — all content + knowledge base
│   └── retrieval.ts      Offline in-browser retrieval engine
├── components/
│   ├── Nav.tsx           Fixed nav, scroll-aware, mobile menu  [client]
│   ├── Hero.tsx          Big hero + marquee strip
│   ├── ChatBaavansh.tsx  ⭐ The chat widget  [client]
│   ├── About.tsx         The "adaptable engineer" story (lime section)
│   ├── Projects.tsx      Metasys Global flagship + 4 project cards
│   ├── GitHubActivity.tsx Live GitHub feed card  [client]
│   ├── Experience.tsx    Timeline + skills
│   ├── Contact.tsx       Email CTA + links
│   └── Footer.tsx
└── public/
    └── README.md         Note to drop resume.pdf here
```

---

## 7. How to run / deploy

**Run locally** (needs Node 18.18+ — Node 20+ recommended):

```bash
cd "/Users/baavanshreddy/Documents/RESUME AND PROJECTS/CLAUDE/baavansh-portfolio"
npm install
npm run dev
```

Open http://localhost:3000. Chat works immediately in offline mode.

**Enable the live Claude chat:** `cp .env.example .env.local`, set
`ANTHROPIC_API_KEY` (from console.anthropic.com), restart `npm run dev`.

**Deploy:** push to GitHub, import at vercel.com, add env vars in Vercel project
settings, deploy. Full steps in `ROADMAP.md` Phase 4.

---

## 8. Known issues, errors & caveats

**⚠️ The project was never compiled with `next build`.** It was built in an
environment where the npm registry was network-blocked, so dependencies could
not be installed and `next build` could not run. What WAS verified: (a) the
offline retrieval engine and `lib/profile.ts` were run through Node's
TypeScript support and execute correctly — all 5 suggested questions return
confident sourced answers; (b) a full static review of every file; (c) all
`@/` import paths resolve and all hook-using components have `"use client"`.
**Action for next session: run `npm install && npm run build` and fix anything
that surfaces.** It is expected to pass, but it is unconfirmed.

**Bug found and already fixed:** `components/GitHubActivity.tsx` originally did
`ev.payload?.commits?.[ev.payload.commits.length - 1]`, which is a TypeScript
error (accessing `.length` on a possibly-undefined value). It was rewritten to
`const commits = ev.payload?.commits ?? []` first. Already corrected — noted
here only so it isn't reintroduced.

**`next-env.d.ts`** had a comment line auto-updated by a linter (the docs URL
changed). Harmless — Next.js regenerates this file anyway. Do not hand-edit it.

**Unverified at runtime:** the live Claude path (`/api/chat` calling Anthropic)
has not been exercised with a real key. The request shape follows the Anthropic
Messages API (`POST /v1/messages`, header `anthropic-version: 2023-06-01`).

**Model string:** the chat defaults to `claude-haiku-4-5-20251001` (cheap +
fast), overridable via the `CHAT_MODEL` env var. If Anthropic's model names
have changed by deploy time, update this.

**Rate limiter** in `route.ts` is in-memory and best-effort only — it resets on
serverless cold starts. For real public traffic, add a platform firewall and
set a spend cap in the Anthropic console.

**Content accuracy — needs Baavansh's confirmation.** The knowledge base in
`profile.ts` was written from `Ultimate_Project_Plan.docx`. Some details were
inferred and should be checked: the CS major is assumed; "Metasys Global" is treated
as a role/employer (could be a project); no fabricated metrics were inserted —
metric/date fields are left as `[[placeholders]]`.

---

## 9. What's left to do (next steps, in order)

1. **Run `npm install && npm run build`** — confirm it compiles; fix any errors.
2. **Fill `lib/profile.ts`** — replace every `[[placeholder]]` (see §10).
3. **Add `public/resume.pdf`** — Baavansh's resume.
4. **Get an Anthropic API key**, put it in `.env.local`, test live mode.
5. **Push to GitHub** (public repo) and **deploy to Vercel** with env vars set.
6. **Buy a domain** (e.g. baavansh.dev) and point it at Vercel.
7. **Phase 5 (optional, later):** the chat tool-use upgrade — let the AI call a
   tool for live GitHub commits. See `ROADMAP.md` Phase 5.

Full detail and time estimates: `ROADMAP.md`.

---

## 10. Personal details still needed

Everything below is a `[[placeholder]]` in `lib/profile.ts` waiting on Baavansh:

- GitHub profile URL
- LinkedIn profile URL
- City / State (location)
- Graduation year (and confirm major is "Computer Science")
- Metasys Global: exact role title + dates
- Metasys Global: a real outcome metric (or remove that highlight line)
- GitHub repo / demo links for RISC-V sim, TinyL compiler, Linux filesystem,
  and this portfolio
- Fraternity name
- Dates for RUPD, fraternity, and crew
- Any extra skills/languages to add
- `NEXT_PUBLIC_GITHUB_USERNAME` (in `.env.local`) for the live GitHub card
- The resume PDF file itself → `public/resume.pdf`

---

## 11. Key decisions made (and why)

- **Next.js (not a single HTML file)** — Baavansh chose the full framework; it
  makes the chat backend (API route) trivial and matches the target resume bullet.
- **Bold high-contrast design** — Baavansh's pick. Near-black + electric lime,
  giant uppercase type, outline-stroke headlines. Stands out in a recruiter's
  tab graveyard and nods to the systems/engineer brand.
- **Dual-engine chat** — chosen over "live only" or "offline only" so the site
  works instantly with zero setup AND upgrades to a real LLM when a key is
  added, with no rebuild. Recommended approach; Baavansh deferred to it.
- **No Anthropic SDK** — the API route uses plain `fetch`, keeping dependencies
  to just Next/React for a robust, lightweight install.

---

## 12. The bigger picture (3-project plan)

From `Ultimate_Project_Plan.docx`, a 90-day plan to land a 2026 AI role:

1. **Portfolio + Chat-with-Baavansh** ← this project (the foundation)
2. **AgentMemry** — an open-source agent-memory framework with a niche
3. **Voice Mock Interview Coach** — a viral-friendly demo

After this site ships, Project #2 (AgentMemry) is next.

---

## 13. Briefing for the next chat

Paste this to start a new session:

> I'm continuing a project. Read `HANDOFF.md`, `ROADMAP.md`, and `lib/profile.ts`
> in the `baavansh-portfolio/` folder. It's a Next.js portfolio site with an
> embedded "Chat with Baavansh" RAG agent — Project #1 of my AI job-hunt plan.
> It's built but not yet compiled or deployed. Help me [run the build / fill in
> my details / deploy it / start the tool-use upgrade].

Baavansh's contact for the knowledge base: baavanshreddy@gmail.com.
