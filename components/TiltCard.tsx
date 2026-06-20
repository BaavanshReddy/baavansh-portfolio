"use client";

import { useRef, useState, type ReactNode, useCallback } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  3D Tilt Card — perspective transform + spotlight on hover          */
/* ------------------------------------------------------------------ */

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  tiltStrength = 8,
  glowColor = "rgba(204, 255, 0, 0.06)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setTilt({
        rotateX: ((y - centerY) / centerY) * -tiltStrength,
        rotateY: ((x - centerX) / centerX) * tiltStrength,
      });
      setSpotlight({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [tiltStrength]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 60%)`,
        }}
      />

      {/* Border glow that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(204,255,0,0.15), transparent 40%)`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {children}
    </motion.div>
  );
}
