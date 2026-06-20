"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/profile";
import { Magnetic } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                         */
/* ------------------------------------------------------------------ */

const MARQUEE = [
  "Open-source AI memory",
  "Production RAG",
  "Systems & Compilers in C",
  "Full-stack: Postgres to React",
  "Tests what I build",
  "Owns problems end-to-end",
];

const TERMINAL_LINES = [
  { prompt: "$", text: "whoami", typed: true },
  { prompt: ">", text: "baavansh — backend & ai/ml engineer", typed: false },
  { prompt: "$", text: "cat ./focus.txt", typed: true },
  { prompt: ">", text: "apis, retrieval systems, agent memory, data pipelines", typed: false },
  { prompt: "$", text: "ls ./projects", typed: true },
  { prompt: ">", text: "agentmemry/  ai-doc-pipeline/  chat-with-baavansh/", typed: false },
];

const ROLE_KEYWORDS = [
  "Backend Systems",
  "AI Pipelines",
  "Retrieval Systems",
  "REST APIs",
  "Data Workflows",
];

/* ------------------------------------------------------------------ */
/*  TYPEWRITER (framer-motion driven)                                 */
/* ------------------------------------------------------------------ */

function Typewriter({ text, speed = 32, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [out, setOut] = useState("");
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setOut(text);
      onDone?.();
      return;
    }
    let i = 0;
    setOut("");
    const id = window.setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, prefersReduced, onDone]);

  return <>{out}</>;
}

/* ------------------------------------------------------------------ */
/*  CYCLING ROLE KEYWORD                                              */
/* ------------------------------------------------------------------ */

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLE_KEYWORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.2em] w-[14ch] overflow-hidden align-bottom sm:w-[18ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLE_KEYWORDS[index]}
          className="absolute left-0 whitespace-nowrap text-lime"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {ROLE_KEYWORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                */
/* ------------------------------------------------------------------ */

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
};

const terminalLine = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5 + i * 0.18,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  HERO COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReduced(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  // Mouse-following gradient
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [prefersReduced],
  );

  const animateProps = prefersReduced
    ? { initial: undefined, animate: undefined }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ---- backgrounds ---- */}
      <div className="grid-bg mask-fade-b absolute inset-0 opacity-70" />
      <div className="code-rain absolute inset-0 opacity-[0.08] pointer-events-none" />

      {/* Static radial glow */}
      <div className="absolute -right-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-lime/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-lime/[0.04] blur-[120px]" />

      {/* Mouse-following gradient */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-lime/[0.06] blur-[100px]"
          animate={{
            x: mousePos.x - 300,
            y: mousePos.y - 300,
          }}
          transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* ---- content ---- */}
      <motion.div
        className="relative mx-auto max-w-site px-6 pb-16 pt-36 md:pt-44"
        variants={container}
        {...animateProps}
      >
        {/* Headline label */}
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.28em] text-lime"
          variants={fadeUp}
          custom={0}
        >
          <span className="cursor-blink">&#9613;</span> {profile.headline}
        </motion.p>

        {/* Name */}
        <h1 className="mt-6 font-display font-bold uppercase leading-[0.9] tracking-tight">
          <motion.span
            className="block text-[clamp(2.6rem,10.5vw,7.5rem)]"
            variants={fadeUp}
            custom={1}
          >
            Baavansh
          </motion.span>
          <motion.span
            className="block text-[clamp(2.6rem,10.5vw,7.5rem)]"
            variants={fadeUp}
            custom={2}
          >
            Reddy
          </motion.span>
          <motion.span
            className="block text-[clamp(2.6rem,10.5vw,7.5rem)] text-transparent glitch"
            style={{ WebkitTextStroke: "2px #CCFF00" }}
            data-text="Gundlapalli"
            variants={fadeUp}
            custom={3}
          >
            Gundlapalli
          </motion.span>
        </h1>

        {/* Sub-headline with cycling keyword */}
        <motion.p
          className="mt-8 max-w-2xl text-balance text-lg text-muted md:text-2xl"
          variants={fadeUp}
          custom={4}
        >
          Computer Science graduate building{" "}
          <RoleCycler />,{" "}
          AI-powered tools, retrieval pipelines, and practical software.
        </motion.p>

        {/* Mini terminal */}
        <motion.div
          className="mt-10 max-w-2xl overflow-hidden border border-line bg-ink/70 backdrop-blur"
          variants={fadeUp}
          custom={5}
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-surface/60 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              ~/baavansh &mdash; zsh
            </span>
          </div>
          <div className="space-y-1 px-4 py-3 font-mono text-[12.5px] leading-relaxed md:text-sm">
            {TERMINAL_LINES.map((line, i) => (
              <motion.div
                key={i}
                className="flex gap-2"
                variants={terminalLine}
                custom={i}
              >
                <span className={line.typed ? "text-lime" : "text-muted"}>
                  {line.prompt}
                </span>
                <span className={line.typed ? "text-paper" : "text-muted"}>
                  {line.typed ? (
                    <Typewriter text={line.text} speed={28} />
                  ) : (
                    line.text
                  )}
                </span>
              </motion.div>
            ))}
            <motion.div
              className="flex gap-2"
              variants={terminalLine}
              custom={TERMINAL_LINES.length}
            >
              <span className="text-lime">$</span>
              <span className="cursor-blink text-lime">&#9613;</span>
            </motion.div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          variants={fadeUp}
          custom={7}
        >
          <Magnetic strength={0.15}>
            <a
              href="#chat"
              className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
            >
              Ask My AI Assistant
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Magnetic>
          <a
            href="#work"
            className="inline-flex items-center border border-line px-6 py-3.5 font-mono text-sm uppercase tracking-wide text-paper transition-colors hover:border-lime hover:text-lime"
          >
            View Projects
          </a>
          <a
            href={profile.resumeUrl}
            className="font-mono text-sm uppercase tracking-wide text-muted underline underline-offset-4 transition-colors hover:text-lime"
          >
            R&eacute;sum&eacute; &darr;
          </a>
        </motion.div>

        {/* Status chips */}
        <motion.div
          className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted"
          variants={fadeUp}
          custom={8}
        >
          <span>
            <span className="text-lime">&diams;</span> {profile.status}
          </span>
          <span>
            <span className="text-lime">&diams;</span> {profile.university}
          </span>
          <span>
            <span className="text-lime">&diams;</span> {profile.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Marquee banner */}
      <div className="overflow-hidden border-y border-line bg-lime py-3">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {MARQUEE.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-6 px-6 font-display text-sm font-bold uppercase tracking-wide text-ink"
                >
                  {m}
                  <span className="text-ink/35">&diams;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
