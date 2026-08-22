import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene Setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Helper: Accent colour (orange theme) ─────────────────────────────────
    const THEME_ORANGE = 0xff6a00;
    const THEME_DIM    = 0x2a1500;

    // ── 1. Large Wireframe Icosahedron (centrepiece) ─────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: THEME_ORANGE,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(2.5, 0.2, -1);
    scene.add(ico);

    // ── 2. Smaller inner solid icosahedron (glow core) ───────────────────────
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: THEME_ORANGE,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(2.5, 0.2, -1);
    scene.add(core);

    // ── 3. Torus Knot (top-left accent) ──────────────────────────────────────
    const torusGeo = new THREE.TorusKnotGeometry(0.8, 0.22, 80, 12, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({
      color: THEME_ORANGE,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.position.set(-3.5, 2.0, -2);
    scene.add(torusKnot);

    // ── 4. Grid Plane (ground horizon) ───────────────────────────────────────
    const gridHelper = new THREE.GridHelper(24, 28, THEME_DIM, THEME_DIM);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    gridHelper.position.set(0, -3.2, -4);
    scene.add(gridHelper);

    // ── 5. Floating Particle Field ────────────────────────────────────────────
    const PARTICLE_COUNT = 280;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({
      color: THEME_ORANGE,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(ptGeo, ptMat);
    scene.add(particles);

    // ── 6. Octahedron accent (bottom right) ──────────────────────────────────
    const octGeo = new THREE.OctahedronGeometry(1.1, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: THEME_ORANGE,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(-2.8, -2.0, -1.5);
    scene.add(oct);

    // ── Animation Loop ───────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse parallax for scene group
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;
      scene.rotation.y = target.x * 0.18;
      scene.rotation.x = target.y * 0.08;

      // Slow auto-rotation for each object
      ico.rotation.y = t * 0.12;
      ico.rotation.x = t * 0.07;

      core.rotation.y = -t * 0.18;
      core.rotation.z =  t * 0.10;

      torusKnot.rotation.x = t * 0.20;
      torusKnot.rotation.y = t * 0.14;

      oct.rotation.y = t * 0.25;
      oct.rotation.x = -t * 0.15;

      particles.rotation.y = t * 0.015;

      // Breathing opacity for icosahedron
      icoMat.opacity = 0.09 + 0.05 * Math.sin(t * 0.8);
      coreMat.opacity = 0.20 + 0.10 * Math.sin(t * 1.2 + 1.0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ───────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-[5] pointer-events-none"
      aria-hidden="true"
    />
  );
}
