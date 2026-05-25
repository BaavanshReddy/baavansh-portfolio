"use client";

import { useEffect, useState } from "react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { commits?: { message: string }[] };
}

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function label(type: string): string {
  if (type === "PushEvent") return "pushed to";
  if (type === "CreateEvent") return "created";
  if (type === "PullRequestEvent") return "PR on";
  if (type === "WatchEvent") return "starred";
  if (type === "ForkEvent") return "forked";
  if (type === "IssuesEvent") return "issue on";
  return "activity in";
}

export default function GitHubActivity() {
  const configured = USERNAME.length > 0 && !USERNAME.includes("[[");
  const [events, setEvents] = useState<GitHubEvent[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!configured) return;
    let active = true;
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=15`)
      .then((r) => {
        if (!r.ok) throw new Error("github");
        return r.json();
      })
      .then((data) => {
        if (active) setEvents(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [configured]);

  return (
    <div className="border border-line bg-surface p-7">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-lime">
          [ live · github ]
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="h-2 w-2 rounded-full bg-lime cursor-blink" />
          real-time
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight">
        Latest from GitHub
      </h3>

      {!configured && (
        <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
          Set <span className="text-lime">NEXT_PUBLIC_GITHUB_USERNAME</span> in
          your environment to stream live commits here. This card proves the
          portfolio is live, not stale — the chat tool-use upgrade (ROADMAP
          Phase 5) wires the same feed into the AI.
        </p>
      )}

      {configured && error && (
        <p className="mt-4 font-mono text-xs text-muted">
          Couldn&apos;t reach GitHub right now (it rate-limits anonymous
          requests). It will refresh on the next visit.
        </p>
      )}

      {configured && !error && !events && (
        <p className="mt-4 font-mono text-xs text-muted">Loading activity…</p>
      )}

      {configured && events && events.length === 0 && (
        <p className="mt-4 font-mono text-xs text-muted">
          No recent public activity.
        </p>
      )}

      {configured && events && events.length > 0 && (
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {events.map((ev) => {
            const commits = ev.payload?.commits ?? [];
            const commit =
              commits.length > 0 ? commits[commits.length - 1] : null;
            return (
              <li key={ev.id} className="flex gap-3 py-3">
                <span className="font-mono text-xs text-lime">◆</span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-paper">
                    <span className="text-muted">{label(ev.type)} </span>
                    <a
                      href={`https://github.com/${ev.repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-2 hover:text-lime"
                    >
                      {ev.repo.name}
                    </a>
                  </p>
                  {commit && (
                    <p className="mt-0.5 truncate font-mono text-xs text-muted">
                      {commit.message}
                    </p>
                  )}
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted/70">
                    {timeAgo(ev.created_at)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
