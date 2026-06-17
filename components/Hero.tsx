"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const MARQUEE = [
  "Open-source AI memory",
  "Production RAG",
  "Systems & Compilers in C",
  "Full-stack: Postgres → React",
  "Tests what I build",
  "Owns problems end-to-end",
];

const TERMINAL_LINES = [
  { prompt: "$", text: "whoami", typed: true },
  { prompt: ">", text: "baavansh — backend & ai/ml engineer", typed: false },
  { prompt: "$", text: "cat ./focus.txt", typed: true },
  { prompt: ">", text: "shipping things — apis, retrieval, agent memory", typed: false },
  { prompt: "$", text: "ls ./flagship", typed: true },
  { prompt: ">", text: "agentmemry/   ai-document-pipeline/   chat-with-baavansh/", typed: false },
];

function Typewriter({ text, speed = 32 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return <>{out}</>;
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg mask-fade-b absolute inset-0 opacity-70" />
      <div className="code-rain absolute inset-0 opacity-[0.08] pointer-events-none" />
      <div className="absolute -right-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-lime/10 blur-3xl" />

      <div className="relative mx-auto max-w-site px-6 pb-16 pt-36 md:pt-44">
        <p
          className="animate-fade-up font-mono text-xs uppercase tracking-[0.28em] text-lime"
          style={{ animationDelay: "0s" }}
        >
          <span className="cursor-blink">▍</span> {profile.headline}
        </p>

        <h1 className="mt-6 font-display font-bold uppercase leading-[0.9] tracking-tight">
          <span
            className="animate-fade-up block text-[clamp(2.6rem,10.5vw,7.5rem)]"
            style={{ animationDelay: "0.06s" }}
          >
            Baavansh
          </span>
          <span
            className="animate-fade-up block text-[clamp(2.6rem,10.5vw,7.5rem)]"
            style={{ animationDelay: "0.12s" }}
          >
            Reddy
          </span>
          <span
            className="animate-fade-up block text-[clamp(2.6rem,10.5vw,7.5rem)] text-transparent glitch"
            style={{
              animationDelay: "0.18s",
              WebkitTextStroke: "2px #CCFF00",
            }}
            data-text="Gundlapalli"
          >
            Gundlapalli
          </span>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-2xl text-balance text-lg text-muted md:text-2xl"
          style={{ animationDelay: "0.26s" }}
        >
          {profile.tagline}
        </p>

        {/* Mini terminal — pure CSS, all animated */}
        <div
          className="animate-fade-up mt-10 max-w-2xl border border-line bg-ink/70 backdrop-blur"
          style={{ animationDelay: "0.30s" }}
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-surface/60 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              ~/baavansh — zsh
            </span>
          </div>
          <div className="space-y-1 px-4 py-3 font-mono text-[12.5px] leading-relaxed md:text-sm">
            {TERMINAL_LINES.map((line, i) => (
              <div
                key={i}
                className="animate-fade-up flex gap-2"
                style={{ animationDelay: `${0.45 + i * 0.18}s` }}
              >
                <span className={line.typed ? "text-lime" : "text-muted"}>
                  {line.prompt}
                </span>
                <span className={line.typed ? "text-paper" : "text-muted"}>
                  {line.typed ? (
                    <Typewriter text={line.text} speed={28} />
                  ) : (
                    line.text
                  )}
                </span>
              </div>
            ))}
            <div
              className="animate-fade-up flex gap-2"
              style={{ animationDelay: `${0.45 + TERMINAL_LINES.length * 0.18}s` }}
            >
              <span className="text-lime">$</span>
              <span className="cursor-blink text-lime">▍</span>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.42s" }}
        >
          <a
            href="#chat"
            className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
          >
            Ask my AI anything
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center border border-line px-6 py-3.5 font-mono text-sm uppercase tracking-wide text-paper transition-colors hover:border-lime hover:text-lime"
          >
            View work
          </a>
          <a
            href={profile.resumeUrl}
            className="font-mono text-sm uppercase tracking-wide text-muted underline underline-offset-4 transition-colors hover:text-lime"
          >
            Résumé ↓
          </a>
        </div>

        <div
          className="animate-fade-up mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted"
          style={{ animationDelay: "0.52s" }}
        >
          <span>
            <span className="text-lime">◆</span> {profile.status}
          </span>
          <span>
            <span className="text-lime">◆</span> {profile.university}
          </span>
          <span>
            <span className="text-lime">◆</span> {profile.location}
          </span>
        </div>
      </div>

      <div className="overflow-hidden border-y border-line bg-lime py-3">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {MARQUEE.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-6 px-6 font-display text-sm font-bold uppercase tracking-wide text-ink"
                >
                  {m}
                  <span className="text-ink/35">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
