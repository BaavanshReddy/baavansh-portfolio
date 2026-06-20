"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/profile";

/* ------------------------------------------------------------------ */
/*  NAV LINKS                                                         */
/* ------------------------------------------------------------------ */

const LINKS = [
  { label: "Ask AI", href: "#chat" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  NAV LINK WITH HOVER UNDERLINE                                     */
/* ------------------------------------------------------------------ */

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
      <span className={active ? "text-lime" : "text-muted group-hover:text-lime"}>
        {label}
      </span>
      {/* Hover underline: slides in from left */}
      <span
        className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-lime transition-transform duration-300 origin-left ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  MOBILE MENU ANIMATION VARIANTS                                    */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  NAV COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll state: backdrop + progress bar
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

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
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

  // Close mobile menu on resize to desktop
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-lime"
        style={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1, ease: "linear" }}
      />

      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <motion.span
            className="grid h-9 w-9 place-items-center bg-lime font-mono text-sm font-bold text-ink"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {profile.initials}
          </motion.span>
          <span className="font-mono text-sm tracking-tight text-paper">
            {profile.shortName.toLowerCase()}
            <span className="text-lime">.dev</span>
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
          <motion.a
            href={profile.resumeUrl}
            className="ml-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-lime hover:text-lime"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            R&eacute;sum&eacute;
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center border border-line text-paper md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
        >
          <span className="font-mono text-base leading-none">
            {open ? "✕" : "≡"}
          </span>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md px-6 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {LINKS.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={closeMobile}
                className={`block py-2.5 font-mono text-sm uppercase tracking-wider transition-colors hover:text-lime ${
                  activeSection === l.href.replace("#", "") ? "text-lime" : "text-muted"
                }`}
                variants={mobileItemVariants}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={profile.resumeUrl}
              onClick={closeMobile}
              className="mt-1 block py-2.5 font-mono text-sm uppercase tracking-wider text-lime"
              variants={mobileItemVariants}
            >
              R&eacute;sum&eacute; &darr;
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
