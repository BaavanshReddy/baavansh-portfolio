"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/profile";
import { Magnetic } from "@/lib/animations";
import Scene3D from "./Scene3D";

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
/*  TYPEWRITER                                                        */
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
          className="absolute left-0 whitespace-nowrap bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent"
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
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
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
      delay: 0.6 + i * 0.18,
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
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReduced(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const animateProps = prefersReduced
    ? { initial: undefined, animate: undefined }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ---- Three.js 3D background ---- */}
      <Scene3D />

      {/* ---- Gradient overlays for depth ---- */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/30" />

      {/* Grid background */}
      <div className="grid-bg mask-fade-b absolute inset-0 opacity-40" />

      {/* Ambient glow orbs */}
      <div className="absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-lime/[0.04] blur-[120px]" />
      <div className="absolute -left-20 bottom-40 h-[400px] w-[400px] rounded-full bg-cyan/[0.03] blur-[100px]" />
      <div className="absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-violet/[0.03] blur-[80px]" />

      {/* ---- Content ---- */}
      <motion.div
        className="relative mx-auto flex min-h-screen max-w-site flex-col justify-center px-6 pb-32 pt-28"
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
        <h1 className="mt-6 font-display font-bold uppercase leading-[0.88] tracking-tight">
          <motion.span
            className="block text-[clamp(2.8rem,11vw,8rem)]"
            variants={fadeUp}
            custom={1}
          >
            Baavansh
          </motion.span>
          <motion.span
            className="block text-[clamp(2.8rem,11vw,8rem)]"
            variants={fadeUp}
            custom={2}
          >
            Reddy
          </motion.span>
          <motion.span
            className="glitch block text-[clamp(2.8rem,11vw,8rem)] text-transparent"
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

        {/* Mini terminal — glassmorphic */}
        <motion.div
          className="glass mt-10 max-w-2xl overflow-hidden rounded-lg shadow-[0_0_60px_-15px_rgba(204,255,0,0.08)]"
          variants={fadeUp}
          custom={5}
        >
          <div className="flex items-center gap-1.5 border-b border-line/50 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
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
                <span className={line.typed ? "text-lime" : "text-cyan/60"}>
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
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-lime px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Ask My AI Assistant</span>
              <span className="relative transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Magnetic>
          <a
            href="#work"
            className="glass inline-flex items-center px-6 py-3.5 font-mono text-sm uppercase tracking-wide text-paper transition-all hover:border-lime/50 hover:text-lime hover:shadow-[0_0_20px_-5px_rgba(204,255,0,0.15)]"
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
            <span className="text-cyan">&diams;</span> {profile.university}
          </span>
          <span>
            <span className="text-violet">&diams;</span> {profile.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Marquee banner */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-lime/20 bg-lime py-3">
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
