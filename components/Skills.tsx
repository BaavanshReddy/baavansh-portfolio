"use client";

import { Reveal, Stagger, fadeUp } from "@/lib/animations";
import { skills } from "@/lib/profile";

const real = (s: string) => !s.includes("[[");

export default function Skills() {
  const totalCount = skills.reduce(
    (acc, g) => acc + g.items.filter(real).length,
    0
  );

  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-line py-24 md:py-32"
    >
      <div className="mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ technical skills ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            What I <span className="text-lime">work</span> with.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, gi) => {
            const items = g.items.filter(real);
            if (items.length === 0) return null;
            return (
              <Reveal
                key={g.label}
                variants={fadeUp}
                custom={gi}
                className="border border-line bg-surface p-5"
              >
                <p className="font-display text-sm font-bold uppercase tracking-tight text-paper">
                  {g.label}
                </p>
                <Stagger className="mt-3 flex flex-wrap gap-2">
                  {items.map((it, ii) => (
                    <Reveal key={it} variants={fadeUp} custom={ii} as="span">
                      <span className="inline-block border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-all duration-200 hover:border-lime hover:text-paper cursor-default">
                        {it}
                      </span>
                    </Reveal>
                  ))}
                </Stagger>
              </Reveal>
            );
          })}
        </div>

        <Reveal variants={fadeUp} custom={skills.length}>
          <p className="mt-8 font-mono text-xs text-muted">
            <span className="text-lime">{totalCount}</span> technologies across{" "}
            <span className="text-lime">{skills.length}</span> categories
          </p>
        </Reveal>
      </div>
    </section>
  );
}
