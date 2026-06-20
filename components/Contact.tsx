"use client";

import { profile } from "@/lib/profile";
import { Reveal, Magnetic, fadeUp } from "@/lib/animations";

export default function Contact() {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Résumé", href: profile.resumeUrl },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 section-divider" />

      {/* Background glows */}
      <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-lime/[0.04] blur-[150px]" />
      <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-cyan/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ contact ]
          </p>

          <h2 className="mt-4 font-display text-[clamp(2.2rem,7vw,5rem)] font-bold uppercase leading-[0.92] tracking-tight">
            Let&apos;s build
            <br />
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
              something.
            </span>
          </h2>

          <p className="mt-4 font-mono text-sm text-muted">
            {profile.status}
          </p>

          <p className="mt-4 max-w-xl text-muted md:text-lg">
            The fastest way to reach me is email — or ask the assistant up top
            and it&apos;ll point you here.
          </p>
        </Reveal>

        <Reveal variants={fadeUp} custom={1}>
          <Magnetic className="mt-8 inline-block" strength={0.15}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight text-paper transition-colors hover:text-lime md:text-3xl"
            >
              {profile.email}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal variants={fadeUp} custom={2}>
          <div className="mt-10 flex flex-wrap gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass rounded-sm px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-all hover:border-lime/50 hover:text-lime hover:shadow-[0_0_15px_-3px_rgba(204,255,0,0.12)]"
              >
                {l.label} ↗
              </a>
            ))}

            <a
              href={profile.resumeUrl}
              className="rounded-sm border border-lime bg-lime/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-lime transition-all hover:bg-lime hover:text-ink hover:shadow-[0_0_20px_-4px_rgba(204,255,0,0.3)]"
            >
              View Resume ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
