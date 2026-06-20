"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Glow cursor — dot + ring, scales on interactive elements           */
/*  Hidden on touch devices via CSS media query in globals.css         */
/* ------------------------------------------------------------------ */

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const dotRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const ringX = useSpring(0, { damping: 20, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(0, { damping: 20, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    // Detect touch device
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    // Track hover over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, [role='button'], [data-hover]"
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, [x, y, ringX, ringY, visible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-lime" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 0.5 : 0,
          scale: hovering ? 2.2 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="h-8 w-8 rounded-full border border-lime/60" />
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 0.15 : 0,
          scale: hovering ? 3 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-16 w-16 rounded-full bg-lime/30 blur-xl" />
      </motion.div>
    </>
  );
}
