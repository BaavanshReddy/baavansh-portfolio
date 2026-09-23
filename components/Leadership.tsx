"use client";

import { Reveal, Stagger, fadeUp } from "@/lib/animations";
import { leadership, languages } from "@/lib/profile";

export default function Leadership() {
  return (
    <section id="leadership" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[320px] w-[320px] rounded-full bg-violet/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ leadership ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Outside the{" "}
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
              editor
            </span>
            .
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} custom={2}>
          <p className="mt-5 max-w-2xl text-muted">
            Elected and appointed roles across campus safety, conduct
            governance, and technical community: the part of the job that is
            about people rather than code.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {leadership.map((item, i) => (
            <Reveal key={item.org} variants={fadeUp} custom={i} as="div">
              <div className="glass card-hover flex h-full flex-col rounded-lg p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
                  {item.period}
                </p>
                <h3 className="mt-3 font-display text-base font-bold uppercase leading-snug tracking-tight text-paper">
                  {item.role}
                </h3>
                <p className="mt-1 font-mono text-xs text-faint">{item.org}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </Stagger>

        <Reveal variants={fadeUp} custom={4}>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface px-6 py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Languages
            </span>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <span
                  key={l}
                  className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
