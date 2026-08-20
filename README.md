# Baavansh Reddy Gundlapalli — Portfolio + "Chat with Baavansh"

A personal portfolio site with an embedded RAG agent. Recruiters can **ask
questions** about Baavansh's experience and get sourced answers — not just read
a static page.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## The dual-engine chat

The "Chat with Baavansh" widget runs in one of two modes, automatically:

- **Live AI** — when `ANTHROPIC_API_KEY` is set, `/api/chat` sends questions to
  Claude with the full knowledge base as context. Real, reasoning answers.
- **Offline** — when no key is set (or the API fails / rate-limits), the chat
  runs a keyword-retrieval engine **in the browser** over the same knowledge
  base. Always works, costs nothing.

You don't choose — the site detects which is available and shows a badge.

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

## Everything lives in one file

Edit **`lib/profile.ts`**. It is the single source of truth for the rendered
page *and* the chat (both engines): profile, hero stats, projects, research,
experience, skills, leadership, and every knowledge chunk the assistant
answers from. Change it there and the whole site follows.

## Design constraints worth keeping

- **Contrast is measured, not eyeballed.** `tailwind.config.ts` documents the
  ratio of every text tone against the page and card backgrounds. `muted` is
  for body copy (8.5:1), `faint` is for micro-labels only (5.5:1), and
  `violet` is decorative — never text.
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
  layout.tsx          Root layout, fonts, metadata
  page.tsx            Assembles all sections
  globals.css         Tailwind + custom styles
  api/chat/route.ts   The chat backend (live engine + fallback signal)
app/fonts/            Vendored Space Grotesk + JetBrains Mono
components/           Nav, Hero, ChatBaavansh, About, Projects, Leadership, ...
lib/
  profile.ts          ← EDIT THIS: all content + knowledge base
  retrieval.ts        In-browser fallback retrieval engine
```

## Deploy

Push to GitHub, import at [vercel.com](https://vercel.com), add the environment
variables in project settings, deploy. See `ROADMAP.md` for the full plan.

## License

Personal project — all rights reserved.
