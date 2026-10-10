import { motion } from "motion/react";
import type { ReactNode, ReactElement } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Subtle, restrained in-view entrance. Used deliberately — not on every element.
 * Honors prefers-reduced-motion by rendering statically.
 */
export default function Reveal({ children, delay = 0, y = 18, className }: RevealProps): ReactElement {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
