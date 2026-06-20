"use client";

import { AnimatePresence } from "framer-motion";
import { projects, research } from "@/lib/profile";
import { Reveal, Stagger, fadeUp, scaleIn } from "@/lib/animations";
import GitHubActivity from "./GitHubActivity";
import TiltCard from "./TiltCard";

/* ------------------------------------------------------------------ */
/*  Tech chip                                                          */
/* ------------------------------------------------------------------ */

function TechChip({ label }: { label: string }) {
  return (
    <span className="border border-line/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-all duration-300 group-hover:border-lime/40 group-hover:text-paper rounded-sm">
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isPlaceholder(href: string) {
  return href.includes("[[");
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const flagship = projects.find((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);

  return (
    <section id="work" className="relative scroll-mt-20 py-24 md:py-32">
      {/* Section divider */}
      <div className="absolute inset-x-0 top-0 section-divider" />

      {/* Background accents */}
      <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-cyan/[0.02] blur-[120px]" />
      <div className="absolute -left-20 bottom-20 h-[300px] w-[300px] rounded-full bg-violet/[0.02] blur-[100px]" />

      <div className="relative mx-auto max-w-site px-6">
        {/* Section header */}
        <Reveal variants={fadeUp} custom={0}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ selected work ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
              shipped
            </span>
            .
          </h2>
        </Reveal>

        {/* ============================================================ */}
        {/*  FLAGSHIP PROJECT                                            */}
        {/* ============================================================ */}

        <AnimatePresence>
          {flagship && (
            <Reveal variants={scaleIn} custom={0} className="mt-10">
              <TiltCard
                className="glass group rounded-lg"
                tiltStrength={4}
                glowColor="rgba(204, 255, 0, 0.08)"
              >
                <div className="relative p-7 md:p-10">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="relative inline-flex items-center gap-1.5 rounded-sm bg-gradient-to-r from-lime to-cyan px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                      </span>
                      Flagship
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      {flagship.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    <span className="text-muted">{"<"}</span>
                    {flagship.name}
                    <span className="text-muted">{" />"}</span>
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-2xl text-muted md:text-lg">
                    {flagship.description}
                  </p>

                  {/* Highlights */}
                  <Stagger as="ul" className="mt-6 grid gap-2 sm:grid-cols-2">
                    {flagship.highlights.map((h, i) => (
                      <Reveal key={h} variants={fadeUp} custom={i} as="li">
                        <div className="flex gap-2 text-sm text-paper/85">
                          <span className="text-lime">→</span>
                          <span>{h}</span>
                        </div>
                      </Reveal>
                    ))}
                  </Stagger>

                  {/* Tech chips */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {flagship.tech.map((t) => (
                      <TechChip key={t} label={t} />
                    ))}
                  </div>

                  {/* Links */}
                  {flagship.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      {flagship.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-sm bg-lime px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-4px_rgba(204,255,0,0.3)]"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/*  OTHER PROJECTS — 2-col grid with TiltCards                  */}
        {/* ============================================================ */}

        <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} variants={fadeUp} custom={i}>
              <TiltCard
                className="glass group flex h-full flex-col rounded-lg"
                tiltStrength={6}
              >
                <div className="relative flex flex-1 flex-col p-7">
                  {/* Tag */}
                  <span className="font-mono text-xs uppercase tracking-wider text-lime">
                    {p.tag}
                  </span>

                  {/* Name */}
                  <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-paper">
                    {p.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>

                  {/* Tech chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <TechChip key={t} label={t} />
                    ))}
                  </div>

                  {/* Links */}
                  {p.links.some((l) => !isPlaceholder(l.href)) && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {p.links
                        .filter((l) => !isPlaceholder(l.href))
                        .map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-xs uppercase tracking-wider text-paper underline underline-offset-4 transition-colors hover:text-lime"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </Stagger>

        {/* ============================================================ */}
        {/*  RESEARCH CARD                                               */}
        {/* ============================================================ */}

        <Reveal variants={fadeUp} custom={0} className="mt-6">
          <TiltCard
            className="glass group rounded-lg"
            tiltStrength={5}
            glowColor="rgba(0, 229, 255, 0.06)"
          >
            <div className="relative p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-sm bg-paper/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper">
                  Research
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  LLM Evaluation
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-paper">
                {research.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {research.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {research.tech.map((t) => (
                  <span
                    key={t}
                    className="border border-line/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-cyan/40 group-hover:text-paper rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href={research.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-paper underline underline-offset-4 transition-colors hover:text-cyan"
                >
                  Source ↗
                </a>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* ============================================================ */}
        {/*  GITHUB ACTIVITY                                             */}
        {/* ============================================================ */}

        <Reveal variants={fadeUp} custom={0} className="mt-6">
          <GitHubActivity />
        </Reveal>
      </div>
    </section>
  );
}
