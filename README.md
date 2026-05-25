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

## Everything about you lives in one file

Edit **`lib/profile.ts`**. It is the single source of truth for the rendered
page *and* the chat (both engines). Placeholders are marked with
`[[ double brackets ]]` — search for those and replace them.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Enables live Claude-powered chat. Omit for offline mode. |
| `CHAT_MODEL` | No | Override the model. Defaults to Claude Haiku. |
| `NEXT_PUBLIC_GITHUB_USERNAME` | No | Powers the live "Latest from GitHub" card. |

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata
  page.tsx            Assembles all sections
  globals.css         Tailwind + custom styles
  api/chat/route.ts   The chat backend (live engine + fallback signal)
components/           Nav, Hero, ChatBaavansh, About, Projects, ...
lib/
  profile.ts          ← EDIT THIS: all content + knowledge base
  retrieval.ts        In-browser fallback retrieval engine
```

## Deploy

Push to GitHub, import at [vercel.com](https://vercel.com), add the environment
variables in project settings, deploy. See `ROADMAP.md` for the full plan.

## License

Personal project — all rights reserved.
