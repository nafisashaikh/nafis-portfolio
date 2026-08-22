import { useEffect, useRef } from "react";

// ─── Minimal 3D math ──────────────────────────────────────────────────────────
type Vec3 = [number, number, number];

function rotateX(p: Vec3, a: number): Vec3 {
  const [x, y, z] = p;
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function rotateY(p: Vec3, a: number): Vec3 {
  const [x, y, z] = p;
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
function rotateZ(p: Vec3, a: number): Vec3 {
  const [x, y, z] = p;
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
}
function project(p: Vec3, cx: number, cy: number, fov: number): [number, number, number] {
  const z = p[2] + fov;
  const s = fov / Math.max(z, 0.1);
  return [cx + p[0] * s, cy + p[1] * s, s];
}

// ─── Icosahedron vertices & faces ────────────────────────────────────────────
const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_V: Vec3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const l = Math.sqrt(x * x + y * y + z * z);
  return [x / l, y / l, z / l];
});
const ICO_E: [number, number][] = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,4],[2,10],[2,11],[2,6],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],[10,11],
];

// ─── Octahedron ──────────────────────────────────────────────────────────────
const OCT_V: Vec3[] = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]
];
const OCT_E: [number, number][] = [
  [0,2],[0,3],[0,4],[0,5],
  [1,2],[1,3],[1,4],[1,5],
  [2,4],[2,5],[3,4],[3,5],
];

// ─── Torus points ────────────────────────────────────────────────────────────
function buildTorus(R: number, r: number, segs: number, tubes: number): { verts: Vec3[]; edges: [number, number][] } {
  const verts: Vec3[] = [];
  const edges: [number, number][] = [];
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    for (let j = 0; j < tubes; j++) {
      const b = (j / tubes) * Math.PI * 2;
      verts.push([
        (R + r * Math.cos(b)) * Math.cos(a),
        (R + r * Math.cos(b)) * Math.sin(a),
        r * Math.sin(b),
      ]);
      edges.push([i * tubes + j, i * tubes + ((j + 1) % tubes)]);
      edges.push([i * tubes + j, ((i + 1) % segs) * tubes + j]);
    }
  }
  return { verts, edges };
}
const TORUS = buildTorus(1, 0.38, 18, 10);

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / W - 0.5) * 2;
      mouse.y = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    // ── Particles ─────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 180;
    const pts: { x: number; y: number; z: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pts.push({
        x: (Math.random() - 0.5) * W * 1.4,
        y: (Math.random() - 0.5) * H * 1.4,
        z: Math.random() * 600 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const ORANGE = "rgba(255, 106, 0,";
    const FOV = 500;
    let frameId: number;
    let t = 0;

    // ── Draw wireframe helper ─────────────────────────────────────────────────
    const drawWireframe = (
      verts: Vec3[],
      edges: [number, number][],
      cx: number, cy: number,
      scale: number,
      rx: number, ry: number, rz: number,
      alpha: number
    ) => {
      const projected = verts.map(v => {
        let p: Vec3 = [v[0] * scale, v[1] * scale, v[2] * scale];
        p = rotateX(p, rx);
        p = rotateY(p, ry);
        p = rotateZ(p, rz);
        return project(p, cx, cy, FOV);
      });

      ctx.strokeStyle = `${ORANGE}${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        if (pa[2] > 0 && pb[2] > 0) {
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
        }
      }
      ctx.stroke();
    };

    // ── Grid plane ────────────────────────────────────────────────────────────
    const drawGrid = (alpha: number) => {
      const gridSize = 14;
      const step = Math.min(W, H) / gridSize;
      const offsetY = H * 0.72;
      const vanishX = W / 2;
      const vanishY = H * 0.28;
      ctx.strokeStyle = `${ORANGE}${alpha})`;
      ctx.lineWidth = 0.6;

      // horizontal lines (perspective)
      for (let i = 0; i <= gridSize; i++) {
        const t2 = i / gridSize;
        const y = offsetY - t2 * (offsetY - vanishY) * 0.85;
        const spread = (1 - t2) * W * 0.75;
        ctx.beginPath();
        ctx.moveTo(vanishX - spread, y);
        ctx.lineTo(vanishX + spread, y);
        ctx.stroke();
      }
      // vertical lines converging to vanish point
      for (let i = -gridSize; i <= gridSize; i++) {
        const xBase = vanishX + i * step;
        ctx.beginPath();
        ctx.moveTo(xBase, offsetY);
        ctx.lineTo(vanishX, vanishY);
        ctx.stroke();
      }
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.008;

      ctx.clearRect(0, 0, W, H);

      const mxSmooth = mouse.x * 0.15;
      const mySmooth = mouse.y * 0.08;

      // ── Grid ───────────────────────────────────────────────────────────────
      drawGrid(0.08);

      // ── Particles ──────────────────────────────────────────────────────────
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > W * 0.7) p.x = -W * 0.7;
        if (p.x < -W * 0.7) p.x = W * 0.7;
        if (p.y > H * 0.7) p.y = -H * 0.7;
        if (p.y < -H * 0.7) p.y = H * 0.7;

        const s = FOV / (p.z + FOV);
        const sx = W / 2 + p.x * s + mxSmooth * 20;
        const sy = H / 2 + p.y * s + mySmooth * 20;
        const r = s * 1.8;
        ctx.fillStyle = `${ORANGE}${(0.35 * s).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(r, 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Large Icosahedron (right side) ─────────────────────────────────────
      const icoBreathe = 0.85 + 0.08 * Math.sin(t * 0.9);
      drawWireframe(
        ICO_V, ICO_E,
        W * 0.75 + mxSmooth * 25, H * 0.42 + mySmooth * 15,
        Math.min(W, H) * 0.22 * icoBreathe,
        t * 0.22 + mySmooth, t * 0.15 + mxSmooth, t * 0.08,
        0.18 + 0.06 * Math.sin(t * 0.7)
      );
      // inner smaller ico
      drawWireframe(
        ICO_V, ICO_E,
        W * 0.75 + mxSmooth * 25, H * 0.42 + mySmooth * 15,
        Math.min(W, H) * 0.10 * icoBreathe,
        -t * 0.30 + mySmooth, t * 0.20 + mxSmooth, -t * 0.12,
        0.30 + 0.10 * Math.sin(t * 1.1)
      );

      // ── Octahedron (bottom left) ───────────────────────────────────────────
      drawWireframe(
        OCT_V, OCT_E,
        W * 0.14 + mxSmooth * 20, H * 0.70 + mySmooth * 12,
        Math.min(W, H) * 0.12,
        t * 0.35, -t * 0.25, t * 0.18,
        0.20
      );

      // ── Torus (top-left) ──────────────────────────────────────────────────
      drawWireframe(
        TORUS.verts, TORUS.edges,
        W * 0.16 + mxSmooth * 18, H * 0.22 + mySmooth * 10,
        Math.min(W, H) * 0.10,
        t * 0.28 + mySmooth * 0.5, t * 0.18 + mxSmooth * 0.5, 0,
        0.16
      );

      // ── Small Icosahedron (top-right) ─────────────────────────────────────
      drawWireframe(
        ICO_V, ICO_E,
        W * 0.88 + mxSmooth * 15, H * 0.15 + mySmooth * 10,
        Math.min(W, H) * 0.07,
        t * 0.40, -t * 0.30, t * 0.20,
        0.15
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-[5] pointer-events-none"
      aria-hidden="true"
    />
  );
}
