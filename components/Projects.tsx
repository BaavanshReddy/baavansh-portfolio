import { projects, research } from "@/lib/profile";
import GitHubActivity from "./GitHubActivity";

function TechChip({ label }: { label: string }) {
  return (
    <span className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors group-hover:border-lime/40 group-hover:text-paper">
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
          Things I've <span className="text-lime">shipped</span>.
        </h2>

        {flagship && (
          <article className="group relative mt-10 overflow-hidden border border-lime/40 bg-surface p-7 transition-all hover:border-lime md:p-10">
            {/* Animated glow */}
            <div className="pointer-events-none absolute -inset-1 -z-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-lime/[0.06] via-transparent to-lime/[0.04] blur-2xl" />
            </div>
            <div className="relative">
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
              <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                <span className="text-muted">{"<"}</span>
                {flagship.name}
                <span className="text-muted">{" />"}</span>
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
          </article>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden border border-line bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-lime/60"
            >
              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-2 top-2 font-mono text-xs text-line transition-colors group-hover:text-lime">
                ┌
              </span>
              <span className="pointer-events-none absolute right-2 top-2 font-mono text-xs text-line transition-colors group-hover:text-lime">
                ┐
              </span>
              <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-xs text-line transition-colors group-hover:text-lime">
                └
              </span>
              <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-xs text-line transition-colors group-hover:text-lime">
                ┘
              </span>

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

        {/* Research card */}
        <article className="mt-6 border border-line bg-surface p-7">
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
                className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
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
        </article>

        <div className="mt-6">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
