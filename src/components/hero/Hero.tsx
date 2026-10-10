import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { resumeData } from "../../data/resumeData";
import { scrollToSection } from "../../lib/constants";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useMediaQuery } from "../../lib/useMediaQuery";
import MagneticButton from "../ui/MagneticButton";
import HeroVisualFallback from "./HeroVisualFallback";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function Hero() {
  const { basics } = resumeData;
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [webgl, setWebgl] = useState(false);

  useEffect(() => setWebgl(hasWebGL()), []);
  const use3D = webgl && isDesktop && !reduced;

  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-28 pb-20 md:grid-cols-12 md:pt-20"
    >
      <div className="md:col-span-6 lg:col-span-7">
        <div className="hero-rise mb-7 inline-flex items-center gap-2.5 rounded-full glass-soft px-3.5 py-1.5 text-sm text-dim" style={{ animationDelay: "0.05s" }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {basics.availability}
        </div>

        <h1 className="hero-rise text-[clamp(2.5rem,6vw,4.5rem)] font-display font-semibold leading-[1.02] tracking-tight text-ink" style={{ animationDelay: "0.12s" }}>
          {basics.headline}
        </h1>

        <p className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-dim" style={{ animationDelay: "0.2s" }}>
          I'm <span className="font-medium text-ink">{basics.name}</span>, a Computer Engineering
          student working across AI, software engineering, and data — building intelligent
          applications, full-stack platforms, and analytical workflows that solve real problems.
        </p>

        <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "0.28s" }}>
          <MagneticButton onClick={() => scrollToSection("projects")}>
            Explore my work
            <ArrowDown className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToSection("contact")}>
            Get in touch
          </MagneticButton>
        </div>

        <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted" style={{ animationDelay: "0.36s" }}>
          {basics.disciplines.map((d, i) => (
            <span key={d} className="flex items-center gap-5">
              {i > 0 && <span className="h-3 w-px bg-[color:var(--color-line-strong)]" />}
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Visual — the one place we spend boldness */}
      <div className="relative md:col-span-6 lg:col-span-5">
        <div className="relative mx-auto aspect-square w-full max-w-[16rem] opacity-90 sm:max-w-[22rem] md:max-w-[30rem] md:opacity-100">
          {use3D ? (
            <Suspense fallback={<HeroVisualFallback />}>
              <HeroScene />
            </Suspense>
          ) : (
            <HeroVisualFallback />
          )}
        </div>
      </div>

      {!reduced && (
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-dim md:flex"
          aria-label="Scroll to about section"
        >
          <span className="text-xs tracking-wide">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-[color:var(--color-line-strong)] p-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "scroll-dot 2s ease-in-out infinite" }} />
          </span>
        </a>
      )}
    </section>
  );
}
