"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Glow cursor — dot + ring, scales on interactive elements           */
/*  Perf: zero React re-renders after mount. Position is driven by     */
/*  direct style.transform writes in a single rAF loop; hover/visible  */
/*  states toggle CSS classes on the nodes instead of setState.        */
/* ------------------------------------------------------------------ */

const LERP_DOT = 0.35;
const LERP_RING = 0.18;
const LERP_GLOW = 0.12;

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isTouch) return;

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    document.body.classList.add("custom-cursor");

    const target = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const glowPos = { x: -100, y: -100 };
    let visible = false;
    let hovering = false;
    let raf = 0;

    const setOpacity = () => {
      dot.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? "0.5" : "0";
      glow.style.opacity = visible ? "0.15" : "0";
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        setOpacity();
      }
    };

    const onEnter = () => {
      visible = true;
      setOpacity();
    };
    const onLeave = () => {
      visible = false;
      setOpacity();
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = !!el.closest(
        "a, button, input, textarea, [role='button'], [data-hover]"
      );
      if (interactive !== hovering) {
        hovering = interactive;
        dot.style.setProperty("--cursor-scale", hovering ? "1.8" : "1");
        ring.style.setProperty("--cursor-scale", hovering ? "2.2" : "1");
        glow.style.setProperty("--cursor-scale", hovering ? "3" : "1");
      }
    };

    const loop = () => {
      dotPos.x += (target.x - dotPos.x) * LERP_DOT;
      dotPos.y += (target.y - dotPos.y) * LERP_DOT;
      ringPos.x += (target.x - ringPos.x) * LERP_RING;
      ringPos.y += (target.y - ringPos.y) * LERP_RING;
      glowPos.x += (target.x - glowPos.x) * LERP_GLOW;
      glowPos.y += (target.y - glowPos.y) * LERP_GLOW;

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference opacity-0 transition-opacity duration-150"
      >
        <div
          className="h-2.5 w-2.5 rounded-full bg-lime transition-transform duration-150"
          style={{ transform: "scale(var(--cursor-scale, 1))" }}
        />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] opacity-0 transition-opacity duration-200"
      >
        <div
          className="h-8 w-8 rounded-full border border-lime/60 transition-transform duration-200"
          style={{ transform: "scale(var(--cursor-scale, 1))" }}
        />
      </div>

      {/* Glow trail */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] opacity-0 transition-opacity duration-300"
      >
        <div
          className="h-16 w-16 rounded-full bg-lime/30 blur-xl transition-transform duration-300"
          style={{ transform: "scale(var(--cursor-scale, 1))" }}
        />
      </div>
    </>
  );
}
