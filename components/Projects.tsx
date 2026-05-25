import { projects } from "@/lib/profile";
import GitHubActivity from "./GitHubActivity";

function TechChip({ label }: { label: string }) {
  return (
    <span className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
      {label}
    </span>
  );
}

function isPlaceholder(href: string) {
  return href.includes("[[");
}

export default function Projects() {
  const flagship = projects.find((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-site px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
          [ selected work ]
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
          Things he has <span className="text-lime">shipped</span>.
        </h2>

        {flagship && (
          <article className="mt-10 border border-line bg-surface p-7 transition-colors hover:border-lime/60 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-lime px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                Flagship
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                {flagship.tag}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
              {flagship.name}
            </h3>
            <p className="mt-3 max-w-2xl text-muted md:text-lg">
              {flagship.description}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {flagship.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-paper/85">
                  <span className="text-lime">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {flagship.tech.map((t) => (
                <TechChip key={t} label={t} />
              ))}
            </div>
          </article>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <article
              key={p.id}
              className="flex flex-col border border-line bg-surface p-7 transition-colors hover:border-lime/60"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-lime">
                {p.tag}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight">
                {p.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <TechChip key={t} label={t} />
                ))}
              </div>
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
            </article>
          ))}
        </div>

        <div className="mt-6">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
