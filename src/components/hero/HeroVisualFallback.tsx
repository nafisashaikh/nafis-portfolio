/**
 * Static, dependency-free hero visual. Mirrors the 3D scene's motif
 * (glass core, orbit rings, data points, a hint of a chart) so the
 * experience is cohesive on mobile, reduced-motion, and while WebGL loads.
 */
export default function HeroVisualFallback() {
  const bars = [34, 58, 46, 72, 54, 88, 64];
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative w-[min(78%,22rem)] aspect-square animate-float">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-[70px]" />
        <svg viewBox="0 0 400 400" className="relative h-full w-full">
          <defs>
            <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#7792ff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#6be4ed" stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id="core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.4" stopColor="#6be4ed" />
              <stop offset="1" stopColor="#7792ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* orbit rings */}
          <ellipse cx="200" cy="200" rx="168" ry="60" fill="none" stroke="#7792ff" strokeOpacity="0.3" transform="rotate(-18 200 200)" />
          <ellipse cx="200" cy="200" rx="150" ry="150" fill="none" stroke="#6be4ed" strokeOpacity="0.14" />

          {/* data points */}
          {[[48, 150], [360, 120], [330, 300], [70, 280], [200, 36], [196, 366]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 2.5 : 3.5} fill={i % 2 ? "#6be4ed" : "#7792ff"} />
          ))}

          {/* glass core */}
          <circle cx="200" cy="200" r="104" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.16)" />
          <circle cx="200" cy="200" r="104" fill="url(#core)" fillOpacity="0.25" />

          {/* embedded chart */}
          <g transform="translate(150 150)">
            {bars.map((hgt, i) => (
              <rect key={i} x={i * 15} y={100 - hgt} width="9" height={hgt} rx="2.5" fill="url(#bar)" />
            ))}
            <line x1="-6" y1="100" x2="104" y2="100" stroke="rgba(255,255,255,0.2)" />
          </g>

          <circle cx="200" cy="200" r="7" fill="url(#core)" />
        </svg>
      </div>
    </div>
  );
}
