"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { profile, heroStats } from "@/lib/profile";
import { Magnetic } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  STATIC CONTENT                                                     */
/* ------------------------------------------------------------------ */

const MARQUEE = [
  "Published on PyPI",
  "Production REST APIs",
  "LLM & ML integration",
  "MLflow, Feast, ONNX",
  "IoT telemetry to cloud",
  "Compilers & CPUs in C",
  "Postgres to React",
  "Tests what I build",
  "Owns problems end-to-end",
];

const TERMINAL_LINES = [
  { prompt: "$", text: "whoami", typed: true },
  {
    prompt: ">",
    text: "baavansh: backend & ai systems engineer",
    typed: false,
  },
  { prompt: "$", text: "cat ./focus.txt", typed: true },
  {
    prompt: ">",
    text: "rest apis, llm/ml integration, ml systems, iot platforms, low-level C",
    typed: false,
  },
  { prompt: "$", text: "ls ./projects", typed: true },
  {
    prompt: ">",
    text: "mlops-lab/  nn-benchmark/  agentmemry/  llm-factcheck/  risc-v-cpu/  tinyl-compiler/",
    typed: false,
  },
];

// Keep each phrase under the 20ch slot the cycler reserves, so nothing clips.
const ROLE_KEYWORDS = [
  "backend systems",
  "LLM pipelines",
  "ML systems",
  "IoT integrations",
  "Python tooling",
  "REST APIs",
  "systems in C",
];

/* ------------------------------------------------------------------ */
/*  TYPEWRITER                                                         */
/* ------------------------------------------------------------------ */

function Typewriter({ text, speed = 30 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
    }
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setOut(text);
      return;
    }
    let i = 0;
    setOut("");
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, prefersReduced]);

  return <>{out}</>;
}

/* ------------------------------------------------------------------ */
/*  ROLE CYCLER                                                        */
/* ------------------------------------------------------------------ */

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROLE_KEYWORDS.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] w-[20ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <m.span
          key={ROLE_KEYWORDS[index]}
          className="absolute left-0 top-0 whitespace-nowrap text-lime"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {ROLE_KEYWORDS[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
};

const terminalLine = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5 + i * 0.16,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as number[],
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, []);

  // Always animate to "visible". The previous version dropped the animate
  // prop once reduced motion was detected, which left the hero stuck at
  // opacity 0 for visitors who prefer reduced motion. MotionConfig (see
  // MotionProvider) already removes the movement for those visitors.
  const animateProps = {
    initial: "hidden" as const,
    animate: "visible" as const,
  };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ---- Background: aurora wash + fine dot grid, nothing that fights
              the type for attention ---- */}
      <div className="aurora pointer-events-none absolute inset-0" />
      <div className="dot-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink" />

      {/* ---- Content ---- */}
      <m.div
        className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-site flex-col justify-center px-6 pb-40 pt-32"
        variants={container}
        {...animateProps}
      >
        {/* Availability pill */}
        <m.div variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.07] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            {profile.availability}
          </span>
        </m.div>

        {/* Name */}
        <h1 className="mt-7 font-display font-bold uppercase leading-[0.86] tracking-tight">
          <m.span
            className="block text-[clamp(2.6rem,10.5vw,7.5rem)] text-paper"
            variants={fadeUp}
            custom={1}
          >
            Baavansh Reddy
          </m.span>
          <m.span
            className="block bg-gradient-to-r from-lime via-lime to-cyan bg-clip-text text-[clamp(2.6rem,10.5vw,7.5rem)] text-transparent [background-size:150%_100%]"
            variants={fadeUp}
            custom={2}
          >
            Gundlapalli
          </m.span>
        </h1>

        {/* Positioning line */}
        <m.p
          className="mt-7 max-w-3xl text-balance text-lg leading-relaxed text-muted md:text-2xl"
          variants={fadeUp}
          custom={3}
        >
          Backend &amp; AI systems engineer with four years across REST APIs and
          IoT platforms, now integrating LLM and ML components, with ML systems
          projects built and measured end to end.
        </m.p>

        <m.p
          className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-faint sm:text-sm"
          variants={fadeUp}
          custom={4}
        >
          Currently building <RoleCycler />
        </m.p>

        {/* Proof strip — the numbers a recruiter scans for */}
        <m.dl
          className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4"
          variants={fadeUp}
          custom={5}
        >
          {heroStats.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {s.label}
              </dt>
              <dd className="mt-1.5 font-display text-lg font-bold uppercase tracking-tight text-paper">
                {s.value}
              </dd>
            </div>
          ))}
        </m.dl>

        {/* Terminal */}
        <m.div
          className="glass mt-10 max-w-2xl overflow-hidden rounded-lg"
          variants={fadeUp}
          custom={6}
        >
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-[11px] text-faint">
              ~/baavansh: zsh
            </span>
          </div>
          <div className="space-y-1 overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed md:text-[13px]">
            {TERMINAL_LINES.map((line, i) => (
              <m.div
                key={i}
                className="flex gap-2 whitespace-nowrap"
                variants={terminalLine}
                custom={i}
              >
                <span className={line.typed ? "text-lime" : "text-cyan"}>
                  {line.prompt}
                </span>
                <span className={line.typed ? "text-paper" : "text-muted"}>
                  {line.typed ? (
                    <Typewriter text={line.text} speed={26} />
                  ) : (
                    line.text
                  )}
                </span>
              </m.div>
            ))}
            <m.div
              className="flex gap-2"
              variants={terminalLine}
              custom={TERMINAL_LINES.length}
            >
              <span className="text-lime">$</span>
              <span className="cursor-blink text-lime">&#9613;</span>
            </m.div>
          </div>
        </m.div>

        {/* CTAs */}
        <m.div
          className="mt-10 flex flex-wrap items-center gap-3"
          variants={fadeUp}
          custom={7}
        >
          <Magnetic strength={0.12}>
            <a
              href="#chat"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-lime px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Ask my AI assistant</span>
              <span className="relative transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Magnetic>
          <a
            href="#work"
            className="glass card-hover inline-flex items-center rounded-sm px-6 py-3.5 font-mono text-sm uppercase tracking-wide text-paper"
          >
            View projects
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center rounded-sm px-4 py-3.5 font-mono text-sm uppercase tracking-wide text-muted underline underline-offset-4 transition-colors hover:text-lime"
          >
            R&eacute;sum&eacute; &darr;
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-sm px-4 py-3.5 font-mono text-sm uppercase tracking-wide text-muted transition-colors hover:text-lime"
          >
            {copied ? "Email copied ✓" : "Copy email"}
          </button>
        </m.div>

        {/* Meta line */}
        <m.p
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
          variants={fadeUp}
          custom={8}
        >
          <span>{profile.location}</span>
          <span aria-hidden>·</span>
          <span>{profile.university}, B.S. Computer Science</span>
          <span aria-hidden>·</span>
          <span>Magna Cum Laude · 3.76 GPA</span>
        </m.p>
      </m.div>

      {/* Marquee — quiet band, lets the lime CTA stay the loudest thing */}
      <div className="relative border-y border-line bg-surface/80 py-3">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                {MARQUEE.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-6 px-6 font-mono text-xs uppercase tracking-[0.16em] text-muted"
                  >
                    {item}
                    <span className="text-lime">&diams;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
