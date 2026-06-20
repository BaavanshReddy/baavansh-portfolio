"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects, research } from "@/lib/profile";
import { Reveal, Stagger, fadeUp, scaleIn } from "@/lib/animations";
import GitHubActivity from "./GitHubActivity";

/* ------------------------------------------------------------------ */
/*  Tech chip                                                          */
/* ------------------------------------------------------------------ */

function TechChip({ label }: { label: string }) {
  return (
    <span className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/40 group-hover:text-paper">
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner bracket decoration                                          */
/* ------------------------------------------------------------------ */

function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-2 top-2 font-mono text-xs text-line transition-colors duration-300 group-hover:text-lime">
        &#x250C;
      </span>
      <span className="pointer-events-none absolute right-2 top-2 font-mono text-xs text-line transition-colors duration-300 group-hover:text-lime">
        &#x2510;
      </span>
      <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-xs text-line transition-colors duration-300 group-hover:text-lime">
        &#x2514;
      </span>
      <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-xs text-line transition-colors duration-300 group-hover:text-lime">
        &#x2518;
      </span>
    </>
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
    <section id="work" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-site px-6">
        {/* Section header */}
        <Reveal variants={fadeUp} custom={0}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ selected work ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Things I&apos;ve <span className="text-lime">shipped</span>.
          </h2>
        </Reveal>

        {/* ============================================================ */}
        {/*  FLAGSHIP PROJECT                                            */}
        {/* ============================================================ */}

        <AnimatePresence>
          {flagship && (
            <Reveal variants={scaleIn} custom={0} className="mt-10">
              <motion.article
                className="group relative overflow-hidden border border-lime/40 bg-surface p-7 transition-colors duration-300 hover:border-lime md:p-10"
                whileHover={{ scale: 1.008 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Animated glow backdrop */}
                <div className="pointer-events-none absolute -inset-1 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime/[0.06] via-transparent to-lime/[0.04] blur-2xl" />
                </div>

                <div className="relative">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="relative inline-flex items-center gap-1.5 bg-lime px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
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

                  {/* Highlights — 2-col grid */}
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
                          className="inline-flex items-center gap-1.5 bg-lime px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            </Reveal>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/*  OTHER PROJECTS — 2-col grid                                 */}
        {/* ============================================================ */}

        <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} variants={fadeUp} custom={i}>
              <motion.article
                className="group relative flex h-full flex-col overflow-hidden border border-line bg-surface p-7 transition-colors duration-300 hover:border-lime/60"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <CornerBrackets />

                {/* Tag */}
                <span className="font-mono text-xs uppercase tracking-wider text-lime">
                  {p.tag}
                </span>

                {/* Name */}
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight">
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
              </motion.article>
            </Reveal>
          ))}
        </Stagger>

        {/* ============================================================ */}
        {/*  RESEARCH CARD                                               */}
        {/* ============================================================ */}

        <Reveal variants={fadeUp} custom={0} className="mt-6">
          <motion.article
            className="group border border-line bg-surface-2 p-7 transition-colors duration-300 hover:border-paper/20"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-paper/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper">
                Research
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                LLM Evaluation
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight">
              {research.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {research.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {research.tech.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/40 group-hover:text-paper"
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
                className="font-mono text-xs uppercase tracking-wider text-paper underline underline-offset-4 transition-colors hover:text-lime"
              >
                Source ↗
              </a>
            </div>
          </motion.article>
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
