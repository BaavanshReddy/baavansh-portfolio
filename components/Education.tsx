"use client";

import { Reveal, fadeUp } from "@/lib/animations";
import TiltCard from "./TiltCard";

const coursework = [
  "Computer Architecture",
  "Compilers",
  "Operating Systems",
  "Artificial Intelligence",
  "Databases",
  "Software Engineering",
];

const deansListSemesters = [
  "Fall '24",
  "Spring '25",
  "Fall '25",
  "Spring '26",
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-20 py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div className="absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan/[0.02] blur-[100px]" />

      <div className="relative mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ education ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Where I built my{" "}
            <span className="bg-gradient-to-r from-lime to-cyan bg-clip-text text-transparent">
              foundation.
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Degree details */}
          <Reveal variants={fadeUp} custom={2}>
            <TiltCard
              className="glass rounded-lg"
              tiltStrength={5}
              glowColor="rgba(204,255,0,0.04)"
            >
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
                  Rutgers University
                </h3>
                <p className="mt-1 text-sm text-paper/80">
                  B.S. in Computer Science
                </p>
                <p className="mt-0.5 font-mono text-sm text-lime">May 2026</p>

                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Honors
                    </p>
                    <p className="mt-1 text-sm font-medium text-paper">
                      Magna Cum Laude
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      GPA
                    </p>
                    <p className="mt-1 text-sm font-medium text-paper">3.76</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Dean&apos;s List
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {deansListSemesters.map((sem) => (
                      <span
                        key={sem}
                        className="rounded-sm border border-line/50 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {sem}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-line/30 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Research
                  </p>
                  <p className="mt-2 text-sm text-paper/70">
                    Co-authored{" "}
                    <span className="text-paper">LLM FactCheck</span> -- a
                    research study benchmarking LLM factual QA across direct
                    prompting, BM25 retrieval, and RAG on a TriviaQA evaluation
                    set.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Coursework */}
          <Reveal variants={fadeUp} custom={3}>
            <TiltCard
              className="glass rounded-lg"
              tiltStrength={5}
              glowColor="rgba(0,229,255,0.04)"
            >
              <div className="p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  Key Coursework
                </p>
                <ul className="mt-4 space-y-2.5">
                  {coursework.map((course) => (
                    <li
                      key={course}
                      className="flex items-center gap-3 text-sm text-paper/80"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-lime to-cyan" />
                      {course}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line/30 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Focus Areas
                  </p>
                  <p className="mt-2 text-sm text-paper/70">
                    Heavy emphasis on{" "}
                    <span className="text-lime">systems</span> -- computer
                    architecture, compilers, and operating systems -- alongside AI,
                    databases, and software engineering.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
