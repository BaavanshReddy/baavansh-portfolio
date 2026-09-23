"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only framer-motion's DOM animation runtime (~25KB) instead of the
 * full bundle. All components must use `m.` instead of `motion.`.
 *
 * MotionConfig reducedMotion="user" makes framer-motion honour the OS
 * "reduce motion" setting (transforms are skipped, content still appears).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
