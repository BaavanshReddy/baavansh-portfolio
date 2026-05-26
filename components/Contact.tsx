import { profile } from "@/lib/profile";

const real = (s: string) => !s.includes("[[");

export default function Contact() {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Résumé", href: profile.resumeUrl },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-lime/10 blur-3xl" />
      <div className="relative mx-auto max-w-site px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
          [ contact ]
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.2rem,7vw,5rem)] font-bold uppercase leading-[0.92] tracking-tight">
          Let&apos;s build
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #CCFF00" }}
          >
            something.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-muted md:text-lg">
          {profile.status}. The fastest way to reach me is email — or ask the
          assistant up top and it'll point you here.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-8 inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight text-paper transition-colors hover:text-lime md:text-3xl"
        >
          {profile.email}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>

        <div className="mt-10 flex flex-wrap gap-3">
          {links.map((l) =>
            real(l.href) ? (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="border border-line px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-lime hover:text-lime"
              >
                {l.label} ↗
              </a>
            ) : (
              <span
                key={l.label}
                className="border border-dashed border-line px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted/60"
              >
                {l.label} — add link
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
