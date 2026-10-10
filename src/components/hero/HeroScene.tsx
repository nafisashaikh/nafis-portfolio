import { useEffect, useRef } from "react";
import * as THREE from "three";

/** A self-contained equirectangular gradient used to light the glass. */
function buildEnvTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#0a1b3a");
  grad.addColorStop(0.45, "#1b2b6b");
  grad.addColorStop(0.7, "#2a6b86");
  grad.addColorStop(1, "#06080e");
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 256);
  // Soft light blooms for specular highlights on the glass.
  const bloom = (x: number, y: number, r: number, col: string) => {
    const rg = g.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, col);
    rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 512, 256);
  };
  bloom(130, 70, 120, "rgba(119,146,255,0.9)");
  bloom(400, 110, 120, "rgba(107,228,237,0.75)");
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const w = () => mount.clientWidth || 1;
    const h = () => mount.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w() / h(), 0.1, 100);
    camera.position.set(0, 0, 8);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envSrc = buildEnvTexture();
    const envRT = pmrem.fromEquirectangular(envSrc);
    scene.environment = envRT.texture;
    envSrc.dispose();

    const group = new THREE.Group();
    scene.add(group);

    // Faceted glass centerpiece — the "intelligent core".
    const glassGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const glassMat = new THREE.MeshPhysicalMaterial({
      transmission: 1, thickness: 1.8, roughness: 0.07, metalness: 0, ior: 1.5,
      clearcoat: 1, clearcoatRoughness: 0.18, color: new THREE.Color("#e4ebff"),
      attenuationColor: new THREE.Color("#7792ff"), attenuationDistance: 2.4,
      envMapIntensity: 1.15, transparent: true,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    group.add(glass);

    const coreGeo = new THREE.IcosahedronGeometry(0.52, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: "#6be4ed", emissive: "#6be4ed", emissiveIntensity: 2.4, roughness: 0.35, metalness: 0,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const ringGeoA = new THREE.TorusGeometry(2.15, 0.006, 8, 180);
    const ringGeoB = new THREE.TorusGeometry(2.62, 0.005, 8, 180);
    const ringMatA = new THREE.MeshBasicMaterial({ color: "#7792ff", transparent: true, opacity: 0.28 });
    const ringMatB = new THREE.MeshBasicMaterial({ color: "#6be4ed", transparent: true, opacity: 0.2 });
    const ring1 = new THREE.Mesh(ringGeoA, ringMatA);
    ring1.rotation.set(Math.PI / 2.4, 0, 0);
    const ring2 = new THREE.Mesh(ringGeoB, ringMatB);
    ring2.rotation.set(Math.PI / 3, Math.PI / 5, 0);
    group.add(ring1, ring2);

    // Constellation of data points on a loose shell.
    const N = 170;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const cA = new THREE.Color("#7792ff");
    const cB = new THREE.Color("#6be4ed");
    for (let i = 0; i < N; i++) {
      const r = 2.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.72;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = Math.random() > 0.5 ? cA : cB;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    ptsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const ptsMat = new THREE.PointsMaterial({
      size: 0.055, vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const points = new THREE.Points(ptsGeo, ptsMat);
    group.add(points);

    // Fine lines linking nearby nodes — a data network, not decoration.
    const linePos: number[] = [];
    const lineCol: number[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < N; i++) {
      const ix = positions[i * 3], iy = positions[i * 3 + 1], iz = positions[i * 3 + 2];
      const near = [] as { j: number; d: number }[];
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        const dx = ix - positions[j * 3], dy = iy - positions[j * 3 + 1], dz = iz - positions[j * 3 + 2];
        near.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      near.sort((a, b) => a.d - b.d);
      for (let k = 0; k < 2; k++) {
        const j = near[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        linePos.push(ix, iy, iz, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        lineCol.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePos), 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(lineCol), 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const net = new THREE.LineSegments(lineGeo, lineMat);
    group.add(net);

    scene.add(new THREE.AmbientLight(0x5a6caa, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(4, 6, 5);
    scene.add(key);
    const lBlue = new THREE.PointLight(0x7792ff, 22, 24);
    lBlue.position.set(-5, -1, 3);
    scene.add(lBlue);
    const lCyan = new THREE.PointLight(0x6be4ed, 16, 24);
    lCyan.position.set(5, 2, -3);
    scene.add(lCyan);

    // ── Interaction + loop ──────────────────────────────────────────────
    const pointer = { x: 0, y: 0 };
    const aim = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      renderer.setSize(w(), h());
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; });
    io.observe(mount);

    const timer = new THREE.Timer();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!onScreen || document.hidden) return;
      timer.update();
      const t = timer.getElapsed();
      aim.x += (pointer.x - aim.x) * 0.04;
      aim.y += (pointer.y - aim.y) * 0.04;
      group.rotation.y = t * 0.12 + aim.x * 0.5;
      group.rotation.x = Math.sin(t * 0.3) * 0.08 + aim.y * 0.3;
      group.position.y = Math.sin(t * 0.6) * 0.12;
      core.rotation.set(t * 0.25, -t * 0.4, 0);
      points.rotation.y = -t * 0.05;
      net.rotation.y = -t * 0.05;
      ring1.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.08;
      camera.position.x += (aim.x * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (-aim.y * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      envRT.dispose();
      pmrem.dispose();
      [glassGeo, coreGeo, ringGeoA, ringGeoB, ptsGeo, lineGeo].forEach((g) => g.dispose());
      [glassMat, coreMat, ringMatA, ringMatB, ptsMat, lineMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
