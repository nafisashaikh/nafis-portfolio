import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds loading
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 text-white overflow-hidden">
      {/* Decorative futuristic backlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] top-1/4 left-1/4 animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Monogram Monolith */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-16 h-16 border border-orange-500 flex items-center justify-center mb-8"
        >
          <Logo className="w-12 h-12" />

          {/* Tiny scanning laser */}
          <motion.div
            animate={{
              y: [-25, 25, -25],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-2 right-2 h-[1px] bg-orange-500/80 shadow-[0_0_8px_rgba(249,115,22,0.6)] pointer-events-none"
          />
        </motion.div>

        {/* Identity statement */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base font-sans tracking-[0.3em] text-white font-light uppercase text-center"
        >
          Nafis Abid Shaikh
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[9px] font-mono text-orange-500 mt-2 tracking-[0.2em] font-semibold"
        >
          // INITIALIZING DATA PORTFOLIO
        </motion.p>

        {/* Loading Bar Container */}
        <div className="w-48 h-[2px] bg-white/10 mt-10 overflow-hidden relative">
          <motion.div
            className="h-full bg-orange-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic percentage readout */}
        <span className="text-[10px] font-mono text-orange-500/80 mt-2 tracking-widest">
          {Math.floor(progress)}%
        </span>
      </div>
    </div>
  );
}
