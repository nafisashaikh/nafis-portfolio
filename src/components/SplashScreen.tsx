import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { useReducedMotion } from "../lib/useReducedMotion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const duration = reduced ? 250 : 1200;

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-base"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: reduced ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => leaving && onComplete()}
    >
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="relative flex flex-col items-center gap-6">
        <motion.span
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid h-16 w-16 place-items-center rounded-2xl glass"
        >
          <Logo className="h-9 w-9" />
        </motion.span>
        <span className="text-sm tracking-[0.08em] text-dim">Nafis Shaikh</span>
        <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-cyan"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
