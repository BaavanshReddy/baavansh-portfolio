"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const LINKS = [
  { label: "Ask AI", href: "#chat" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center bg-lime font-mono text-sm font-bold text-ink">
            {profile.initials}
          </span>
          <span className="font-mono text-sm tracking-tight text-paper">
            {profile.shortName.toLowerCase()}
            <span className="text-lime">.dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-lime"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            className="ml-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-lime hover:text-lime"
          >
            Résumé
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center border border-line text-paper md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="font-mono text-base leading-none">
            {open ? "✕" : "≡"}
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink px-6 py-3 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-mono text-sm uppercase tracking-wider text-muted hover:text-lime"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            onClick={() => setOpen(false)}
            className="mt-1 block py-2.5 font-mono text-sm uppercase tracking-wider text-lime"
          >
            Résumé ↓
          </a>
        </nav>
      )}
    </header>
  );
}
