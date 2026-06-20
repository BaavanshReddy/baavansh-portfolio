"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Reveal, Stagger, fadeUp, slideInLeft } from "@/lib/animations";
import { experience } from "@/lib/profile";

const real = (s: string) => !s.includes("[[");

function TimelineDot() {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 bg-lime"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isInView
          ? { scale: [0, 1.6, 1], opacity: [0, 1, 1] }
          : { scale: 0, opacity: 0 }
      }
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={ref} className="absolute inset-y-0 left-0 w-px">
      {/* base line (dim) */}
      <div className="absolute inset-0 bg-line" />
      {/* animated overlay */}
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top bg-lime/40"
        style={{ scaleY }}
      />
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-line py-24 md:py-32"
    >
      <div className="mx-auto max-w-site px-6">
        <Reveal variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-lime">
            [ experience ]
          </p>
        </Reveal>
        <Reveal variants={fadeUp} custom={1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Where I&apos;ve <span className="text-lime">earned</span> it.
          </h2>
        </Reveal>

        <div className="mt-12">
          <Stagger as="ol" className="relative">
            <TimelineLine />

            {experience.map((e, i) => {
              const points = e.points.filter(real);
              return (
                <Reveal
                  key={e.id}
                  as="li"
                  variants={slideInLeft}
                  custom={i}
                  className="relative pb-10 pl-7 last:pb-0"
                >
                  <TimelineDot />

                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {e.period}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold uppercase tracking-tight">
                    {e.role}
                  </h3>
                  <p className="font-mono text-sm text-lime">{e.org}</p>
                  <p className="mt-2 text-sm text-paper/70">{e.summary}</p>

                  {points.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {points.map((pt) => (
                        <li
                          key={pt}
                          className="flex gap-2 text-sm text-muted"
                        >
                          <span className="text-lime">→</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
