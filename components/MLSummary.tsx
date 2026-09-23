"use client";

import Link from "next/link";
import { Reveal, fadeUp } from "@/lib/animations";
import { caseStudyIndex, mlSummary } from "@/lib/mlCards";

/**
 * Short ML systems summary shown right after the introduction.
 * Kept deliberately compact: one paragraph, an explicit scope note, and
 * links to the three case studies.
 */
export default function MLSummary() {
  return (
    <section
      id="ml-summary"
      aria-labelledby="ml-summary-heading"
      className="relative scroll-mt-20 py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <div className="glass rounded-lg p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
                [ ml systems ]
              </p>
              <span className="rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                {mlSummary.boundary}
              </span>
            </div>
            <h2
              id="ml-summary-heading"
              className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-paper md:text-3xl"
            >
              {mlSummary.heading}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {mlSummary.text}
            </p>
            <ul
              className="mt-5 flex flex-wrap gap-3"
              aria-label="ML systems case studies"
            >
              {caseStudyIndex.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/projects/${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-lime/60 hover:text-lime"
                  >
                    {c.title} <span aria-hidden>&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
