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
      className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-lime/10 blur-3xl" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
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
                className="border border-line px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-lime hover:text-lime"
              >
                {l.label} ↗
              </a>
            ))}

            <a
              href={profile.resumeUrl}
              className="border border-lime bg-lime/10 px-5 py-3 font-mono text-xs uppercase tracking-wider text-lime transition-colors hover:bg-lime hover:text-ink"
            >
              View Resume ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
