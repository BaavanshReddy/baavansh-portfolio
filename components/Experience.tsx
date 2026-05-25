import { experience, skills } from "@/lib/profile";

const real = (s: string) => !s.includes("[[");

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-line py-24 md:py-32"
    >
      <div className="mx-auto max-w-site px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
          [ experience ]
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
          Where he&apos;s <span className="text-lime">earned</span> it.
        </h2>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ol className="relative border-l border-line">
            {experience.map((e) => {
              const points = e.points.filter(real);
              return (
                <li key={e.id} className="relative pb-10 pl-7 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 bg-lime" />
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {e.period}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold uppercase tracking-tight">
                    {e.role}
                  </h3>
                  <p className="font-mono text-sm text-lime">{e.org}</p>
                  <p className="mt-2 text-sm text-paper/70">{e.summary}</p>
                  {points.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {points.map((pt) => (
                        <li
                          key={pt}
                          className="flex gap-2 text-sm text-muted"
                        >
                          <span className="text-lime">→</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Skills
            </p>
            <div className="mt-5 space-y-6">
              {skills.map((g) => {
                const items = g.items.filter(real);
                if (items.length === 0) return null;
                return (
                  <div key={g.label}>
                    <p className="font-display text-sm font-bold uppercase tracking-tight text-paper">
                      {g.label}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {items.map((it) => (
                        <span
                          key={it}
                          className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
