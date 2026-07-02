"use client";

import { edges } from "@/lib/profile";
import {
  Reveal,
  Stagger,
  Counter,
  fadeUp,
  slideInRight,
} from "@/lib/animations";
import { m } from "framer-motion";

const hireSignals = [
  { k: "Production AI", v: "shipped", num: null },
  { k: "Open source", v: "1 library", num: 1, suffix: " library" },
  { k: "Systems in C", v: "3 projects", num: 3, suffix: " projects" },
  { k: "Test coverage", v: "pytest + JUnit", num: null },
  { k: "Stack range", v: "DB → UI", num: null },
  { k: "Internships", v: "4 completed", num: 4, suffix: " completed" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
    >
      {/* Gradient mesh blobs */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-lime/[0.04] blur-[150px]" />
      <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan/[0.03] blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/[0.02] blur-[100px]" />

      {/* Top border */}
      <div className="absolute inset-x-0 top-0 section-divider" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp} custom={0}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ what makes me different ]
          </p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* Left column */}
          <div>
            <Reveal variants={fadeUp} custom={1}>
              <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold uppercase leading-[1.03] tracking-tight">
                Most people hand the problem up.{" "}
                <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
                  I hand up the solution.
                </span>
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <Reveal variants={fadeUp} custom={2}>
                <p>
                  I&apos;m a Computer Science graduate from Rutgers University
                  (Magna Cum Laude, 3.76 GPA) who builds backend services, APIs,
                  authentication systems, data pipelines, and AI tooling. My
                  applied work spans retrieval, embeddings, and semantic
                  search&nbsp;&mdash; from an open-source memory library for AI
                  agents to a production document-ingestion pipeline.
                </p>
              </Reveal>
              <Reveal variants={fadeUp} custom={3}>
                <p>
                  I work across{" "}
                  <strong className="font-semibold text-paper">
                    Python, Node.js, FastAPI, PostgreSQL, SQLite, Supabase, and
                    MinIO
                  </strong>
                  , backed by a systems foundation most AI candidates
                  don&apos;t have&nbsp;&mdash; compilers, computer architecture,
                  and operating systems. I reason about how code actually runs,
                  not just how to call an API.
                </p>
              </Reveal>
              <Reveal variants={fadeUp} custom={4}>
                <p>
                  I&apos;m looking for early-career backend and AI/ML engineering
                  roles where I can ship real products to real users.
                </p>
              </Reveal>

              {/* Hire signals grid — glassmorphic cards */}
              <Stagger className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                {hireSignals.map((sig, i) => (
                  <Reveal key={sig.k} variants={fadeUp} custom={i} as="div">
                    <m.div
                      className="glass rounded-lg p-3"
                      whileHover={{
                        scale: 1.04,
                        borderColor: "rgba(204,255,0,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {sig.k}
                      </p>
                      <p className="mt-0.5 font-display text-base font-bold uppercase tracking-tight text-paper">
                        {sig.num !== null ? (
                          <Counter
                            target={sig.num}
                            suffix={sig.suffix}
                            className=""
                          />
                        ) : (
                          sig.v
                        )}
                      </p>
                    </m.div>
                  </Reveal>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Right column — Unfair edges */}
          <div>
            <Reveal variants={fadeUp} custom={0}>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                Unfair edges
              </p>
            </Reveal>
            <ul className="mt-4 border-t border-line/50">
              {edges.map((e, i) => (
                <Reveal
                  key={e.title}
                  variants={slideInRight}
                  custom={i}
                  as="li"
                >
                  <div className="group border-b border-line/50 py-4 transition-all hover:bg-lime/[0.02] hover:pl-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-muted/40">
                        0{i + 1}
                      </span>
                      <p className="font-display text-lg font-bold uppercase tracking-tight text-paper">
                        {e.title}
                      </p>
                    </div>
                    <p className="mt-1 pl-7 text-sm text-muted">{e.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
