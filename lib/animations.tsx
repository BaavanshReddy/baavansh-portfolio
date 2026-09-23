"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  m,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

// ---------------------------------------------------------------------------
//  REUSABLE VARIANTS
// ---------------------------------------------------------------------------

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ---------------------------------------------------------------------------
//  REVEAL STATE
//
//  Scroll-triggered reveals are a nice-to-have, never a gate on content.
//  If IntersectionObserver is unavailable, throttled by a fast scroll, or the
//  visitor prefers reduced motion, the content shows anyway: the hook flips to
//  visible after a short timeout regardless of viewport state, so nothing on
//  the page can end up permanently stuck at opacity 0.
// ---------------------------------------------------------------------------

const REVEAL_FALLBACK_MS = 1400;

function useRevealed(
  ref: React.RefObject<Element>,
  { once, amount }: { once: boolean; amount: number },
) {
  const inView = useInView(ref, { once, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setForced(true);
      return;
    }
    const id = window.setTimeout(() => setForced(true), REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, []);

  return inView || forced;
}

// ---------------------------------------------------------------------------
//  SCROLL-TRIGGERED SECTION WRAPPER
// ---------------------------------------------------------------------------

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  custom?: number;
  once?: boolean;
  amount?: number;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  custom = 0,
  once = true,
  amount = 0.15,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useRevealed(ref, { once, amount });
  const Component = m[as] as typeof m.div;

  return (
    <Component
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={custom}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}

// ---------------------------------------------------------------------------
//  STAGGER CONTAINER — triggers children's stagger on scroll
// ---------------------------------------------------------------------------

interface StaggerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "ul" | "ol";
}

export function Stagger({
  children,
  className,
  once = true,
  amount = 0.1,
  as = "div",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useRevealed(ref, { once, amount });
  const Component = m[as] as typeof m.div;

  return (
    <Component
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Component>
  );
}

// ---------------------------------------------------------------------------
//  PARALLAX WRAPPER
// ---------------------------------------------------------------------------

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number; // px of travel
}

export function Parallax({ children, className, offset = 50 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}

// ---------------------------------------------------------------------------
//  TEXT REVEAL — word-by-word or character animation
// ---------------------------------------------------------------------------

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export function TextReveal({
  text,
  className,
  once = true,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <m.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </m.span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
//  MAGNETIC BUTTON — subtle pointer-follow effect
// ---------------------------------------------------------------------------

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
    >
      {children}
    </m.div>
  );
}

// ---------------------------------------------------------------------------
//  COUNTER — animates a number from 0 to target
// ---------------------------------------------------------------------------

export function Counter({
  target,
  suffix = "",
  className,
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  // Render the real value on the server and for reduced-motion visitors, so
  // crawlers, no-JS readers, and screenshots never see "0 years". The count-up
  // animation only runs after hydration, when motion is allowed.
  const [count, setCount] = useState(target);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const alreadyVisible =
      el !== null && el.getBoundingClientRect().top < window.innerHeight;
    if (alreadyVisible) return;
    setCount(0);
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!isInView || !animate) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, animate, target]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
