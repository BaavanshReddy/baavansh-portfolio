"use client";

import { edges } from "@/lib/profile";
import {
  Reveal,
  Stagger,
  Counter,
  fadeUp,
  slideInRight,
} from "@/lib/animations";
import { motion } from "framer-motion";

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
      className="scroll-mt-20 border-y border-ink bg-lime py-24 text-ink md:py-32"
    >
      <div className="mx-auto max-w-site px-6">
        <Reveal variants={fadeUp} custom={0}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/55">
            [ what makes me different ]
          </p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* Left column */}
          <div>
            <Reveal variants={fadeUp} custom={1}>
              <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold uppercase leading-[1.03] tracking-tight">
                Most people hand the problem up.{" "}
                <span className="decoration-clone bg-ink px-2 text-lime">
                  I hand up the solution.
                </span>
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
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
                  <strong className="font-semibold text-ink">
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

              {/* Hire signals grid */}
              <Stagger className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                {hireSignals.map((m, i) => (
                  <Reveal key={m.k} variants={fadeUp} custom={i} as="div">
                    <motion.div
                      className="border border-ink/20 bg-ink/[0.04] p-3"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
                        {m.k}
                      </p>
                      <p className="mt-0.5 font-display text-base font-bold uppercase tracking-tight">
                        {m.num !== null ? (
                          <Counter
                            target={m.num}
                            suffix={m.suffix}
                            className=""
                          />
                        ) : (
                          m.v
                        )}
                      </p>
                    </motion.div>
                  </Reveal>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Right column — Unfair edges */}
          <div>
            <Reveal variants={fadeUp} custom={0}>
              <p className="font-mono text-xs uppercase tracking-wider text-ink/55">
                Unfair edges
              </p>
            </Reveal>
            <ul className="mt-4 border-t border-ink/15">
              {edges.map((e, i) => (
                <Reveal
                  key={e.title}
                  variants={slideInRight}
                  custom={i}
                  as="li"
                >
                  <div className="group border-b border-ink/15 py-4 transition-all hover:bg-ink/[0.03] hover:pl-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-ink/40">
                        0{i + 1}
                      </span>
                      <p className="font-display text-lg font-bold uppercase tracking-tight">
                        {e.title}
                      </p>
                    </div>
                    <p className="mt-1 pl-7 text-sm text-ink/70">{e.detail}</p>
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
