"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only framer-motion's DOM animation runtime (~25KB) instead of the
 * full bundle. All components must use `m.` instead of `motion.`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
