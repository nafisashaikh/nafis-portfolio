import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      alphaSpeed: number;
      fadeDirection: number;
    }[] = [];

    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 25 : 85;
    const connectionDistance = isMobile ? 70 : 120;

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Seed particles
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35, // slow, organic drift
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.1,
          alphaSpeed: Math.random() * 0.005 + 0.002,
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    initCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle custom radial background mesh underneath - Editorial #050505 / obsidian base
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient.addColorStop(0, "#0c0a09"); // Warm obsidian/charcoal
      gradient.addColorStop(0.6, "#050505"); // Signature editorial rich black
      gradient.addColorStop(1, "#020202"); // Absolute black depth
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elegant grid system - very thin lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw drifting particles (Sunset Amber & Slate)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Slow breathing transparency oscillation
        p.alpha += p.alphaSpeed * p.fadeDirection;
        if (p.alpha >= 0.7) {
          p.fadeDirection = -1;
        } else if (p.alpha <= 0.1) {
          p.fadeDirection = 1;
        }

        // Clip alpha limits
        p.alpha = Math.max(0.08, Math.min(0.6, p.alpha));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Alternate particle color palette for editorial contrast (Orange-500 and Soft white)
        if (i % 2 === 0) {
          ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha})`; // Orange
          ctx.shadowColor = "rgba(249, 115, 22, 0.25)";
        } else {
          ctx.fillStyle = `rgba(229, 229, 229, ${p.alpha * 0.7})`; // Silver/off-white
          ctx.shadowColor = "rgba(255, 255, 255, 0.1)";
        }
        
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw faint connections between adjacent nodes with low-opacity orange/amber-slated paths
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alphaWeight = (1 - dist / connectionDistance) * 0.08 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // warm amber connections
            ctx.strokeStyle = `rgba(249, 115, 22, ${alphaWeight * 1.5})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduceMotion]);

  // Reduced motion: fallback to gorgeous static mesh representation
  if (reduceMotion) {
    return (
      <div 
        id="animated-bg-static"
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #0c0a09 0%, #050505 70%, #010101 100%)",
        }}
      />
    );
  }

  return (
    <canvas
      id="animated-bg-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 block pointer-events-none"
    />
  );
}
