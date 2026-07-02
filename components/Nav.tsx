"use client";

import { useEffect, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/profile";

const LINKS = [
  { label: "Ask AI", href: "#chat" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
    >
      <span className={active ? "text-lime" : "text-muted group-hover:text-paper"}>
        {label}
      </span>
      <span
        className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-lime to-cyan transition-transform duration-300 origin-left ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </a>
  );
}

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      when: "afterChildren" as const,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren" as const,
      staggerChildren: 0.05,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as number[] },
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(id);
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect(id), {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Scroll progress — gradient bar */}
      <m.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-lime via-cyan to-violet"
        style={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1, ease: "linear" }}
      />

      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <m.span
            className="grid h-9 w-9 place-items-center bg-gradient-to-br from-lime to-cyan font-mono text-sm font-bold text-ink rounded-sm"
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {profile.initials}
          </m.span>
          <span className="font-mono text-sm tracking-tight text-paper">
            {profile.shortName.toLowerCase()}
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              active={activeSection === l.href.replace("#", "")}
            />
          ))}
          <m.a
            href={profile.resumeUrl}
            className="glass ml-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-all hover:border-lime/50 hover:text-lime hover:shadow-[0_0_15px_-3px_rgba(204,255,0,0.15)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            R&eacute;sum&eacute;
          </m.a>
        </nav>

        {/* Mobile hamburger */}
        <m.button
          onClick={() => setOpen((v) => !v)}
          className="glass grid h-9 w-9 place-items-center text-paper md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
        >
          <span className="font-mono text-base leading-none">
            {open ? "✕" : "≡"}
          </span>
        </m.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.nav
            className="glass-strong overflow-hidden px-6 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {LINKS.map((l) => (
              <m.a
                key={l.href}
                href={l.href}
                onClick={closeMobile}
                className={`block py-2.5 font-mono text-sm uppercase tracking-wider transition-colors hover:text-lime ${
                  activeSection === l.href.replace("#", "") ? "text-lime" : "text-muted"
                }`}
                variants={mobileItemVariants}
              >
                {l.label}
              </m.a>
            ))}
            <m.a
              href={profile.resumeUrl}
              onClick={closeMobile}
              className="mt-1 block py-2.5 font-mono text-sm uppercase tracking-wider text-lime"
              variants={mobileItemVariants}
            >
              R&eacute;sum&eacute; &darr;
            </m.a>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
