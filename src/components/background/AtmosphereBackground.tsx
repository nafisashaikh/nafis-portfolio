import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Atmospheric backdrop: a cool blue-black field with soft aurora light,
 * a faint technical grid, and a sparse layer of drifting particles.
 * Deliberately quiet so foreground text stays effortless to read.
 */
export default function AtmosphereBackground() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 26 : 54;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; cyan: boolean };
    let dots: P[] = [];

    const seed = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.6,
        a: Math.random() * 0.4 + 0.15,
        cyan: Math.random() > 0.7,
      }));
    };
    seed();

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of dots) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan
          ? `rgba(107,228,237,${p.a})`
          : `rgba(119,146,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => seed();
    const onVisibility = () => {
      running = !document.hidden;
      if (running) draw();
      else cancelAnimationFrame(raf);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div id="atmosphere" aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0d1220 0%, #080b12 55%, #06080e 100%)",
        }}
      />
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-[12%] right-[-6%] h-[46vmax] w-[46vmax] rounded-full bg-accent/14 blur-[150px] animate-aurora" />
      <div
        className="absolute bottom-[-18%] left-[-8%] h-[42vmax] w-[42vmax] rounded-full bg-cyan/10 blur-[150px] animate-aurora"
        style={{ animationDelay: "-9s" }}
      />
      {!reduced && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
    </div>
  );
}
