"use client";

import Link from "next/link";
import { Reveal, Stagger, fadeUp } from "@/lib/animations";
import { mlCards } from "@/lib/mlCards";

function Tag({ label }: { label: string }) {
  return (
    <li className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
      {label}
    </li>
  );
}

export default function MLSystems() {
  return (
    <section
      id="ml-systems"
      aria-labelledby="ml-systems-heading"
      className="relative scroll-mt-20 overflow-x-clip py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div className="absolute -right-24 top-32 h-[360px] w-[360px] rounded-full bg-cyan/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp} custom={0}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ ml systems and mlops ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2
            id="ml-systems-heading"
            className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight"
          >
            Built,{" "}
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
              measured
            </span>
            , documented.
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} custom={2}>
          <p className="mt-5 max-w-2xl text-muted md:text-lg">
            Personal and academic ML work. Every number below comes from a
            results file in the project&apos;s repository, measured on one CPU
            machine. None of it is employer or production experience, and the
            case studies say exactly what was and wasn&apos;t run.
          </p>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {mlCards.map((card, i) => (
            <Reveal
              key={card.id}
              as="li"
              variants={fadeUp}
              custom={i}
              className="h-full"
            >
              <article
                className="glass card-hover flex h-full flex-col rounded-lg p-6"
                aria-labelledby={`ml-card-${card.id}`}
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-lime">
                  {card.kind}
                </p>
                <h3
                  id={`ml-card-${card.id}`}
                  className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-paper"
                >
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {card.blurb}
                </p>
                <p className="mt-4 border-l-2 border-lime/60 pl-3 font-mono text-xs leading-relaxed text-paper">
                  {card.proof}
                </p>
                <ul
                  className="mt-4 flex flex-wrap gap-1.5"
                  aria-label="Tools used"
                >
                  {card.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  {card.caseStudy && (
                    <Link
                      href={`/projects/${card.caseStudy}`}
                      className="inline-flex items-center gap-1.5 rounded-sm bg-lime px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
                    >
                      Read case study <span aria-hidden>&rarr;</span>
                      <span className="sr-only">: {card.title}</span>
                    </Link>
                  )}
                  {card.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs uppercase tracking-wider text-paper underline underline-offset-4 transition-colors hover:text-lime"
                    >
                      {l.label} <span aria-hidden>↗</span>
                      <span className="sr-only">
                        {" "}
                        for {card.title} (opens in a new tab)
                      </span>
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
