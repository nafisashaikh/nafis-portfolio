import { useId } from "react";
import type { Accent, Visual } from "../../types";

interface Props {
  variant: Visual;
  accent?: Accent;
}

/**
 * Abstract, honest preview motifs for each project — stylised data-viz,
 * not fabricated product screenshots. Tinted by the project's accent.
 */
export default function ProjectVisual({ variant, accent = "blue" }: Props) {
  const uid = useId().replace(/:/g, "");
  const p = accent === "cyan" ? "#6be4ed" : "#7792ff";
  const s = accent === "cyan" ? "#7792ff" : "#6be4ed";

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={p} stopOpacity="0.08" />
          <stop offset="1" stopColor={p} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p} />
          <stop offset="1" stopColor={s} />
        </linearGradient>
      </defs>

      {/* shared faint baseline grid + axis */}
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1="24" y1={y} x2="296" y2={y} stroke="rgba(255,255,255,0.055)" />
      ))}
      <line x1="24" y1="44" x2="24" y2="192" stroke="rgba(255,255,255,0.14)" />
      {[60, 100, 140, 180].map((y) => (
        <line key={`t${y}`} x1="20" y1={y} x2="24" y2={y} stroke="rgba(255,255,255,0.18)" />
      ))}

      {variant === "bars" && (
        <g>
          {[0.55, 0.8, 0.45, 0.95, 0.6, 0.75].map((hgt, i) => {
            const x = 40 + i * 42;
            const h1 = hgt * 120;
            const h2 = (hgt * 0.7 + 0.1) * 120;
            return (
              <g key={i}>
                <rect x={x} y={180 - h1} width="13" height={h1} rx="3" fill={`url(#${uid}-fill)`} />
                <rect x={x + 16} y={180 - h2} width="13" height={h2} rx="3" fill={s} opacity="0.35" />
              </g>
            );
          })}
        </g>
      )}

      {variant === "area" && (
        <g>
          <path d="M24 150 L68 120 L112 134 L156 92 L200 108 L244 66 L296 84 L296 180 L24 180 Z" fill={`url(#${uid}-fill)`} />
          <path d="M24 150 L68 120 L112 134 L156 92 L200 108 L244 66 L296 84" fill="none" stroke={`url(#${uid}-line)`} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {[[68, 120], [156, 92], [244, 66]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="#0d1220" stroke={p} strokeWidth="2" />
          ))}
        </g>
      )}

      {variant === "network" && (
        <g>
          {[[70, 80, 150, 70], [70, 80, 120, 140], [150, 70, 230, 100], [120, 140, 210, 160], [230, 100, 210, 160], [150, 70, 120, 140]].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={p} strokeOpacity="0.3" strokeWidth="1.2" />
          ))}
          {[[70, 80, 7], [150, 70, 9], [120, 140, 6], [230, 100, 8], [210, 160, 5]].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? s : p} opacity="0.9" />
          ))}
        </g>
      )}

      {variant === "scatter" && (
        <g>
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 11 }).map((__, col) => {
              const cx = 36 + col * 25;
              const cy = 62 + row * 21;
              const depth = Math.sin(col * 0.6 + row * 0.9) * 0.5 + 0.5;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={cx}
                  cy={cy}
                  r={1.6 + depth * 3.4}
                  fill={depth > 0.5 ? p : s}
                  opacity={0.25 + depth * 0.55}
                />
              );
            })
          )}
        </g>
      )}

      {variant === "feed" && (
        <g>
          {[52, 100, 148].map((y, i) => (
            <g key={i}>
              <rect x="28" y={y} width="264" height="40" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />
              <circle cx="52" cy={y + 20} r="11" fill={i % 2 ? s : p} opacity="0.75" />
              <rect x="74" y={y + 11} width={150 - i * 24} height="6" rx="3" fill="rgba(255,255,255,0.22)" />
              <rect x="74" y={y + 23} width={110 - i * 16} height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
            </g>
          ))}
        </g>
      )}

      {variant === "map" && (
        <g>
          <polyline points="40,172 92,120 150,120 212,70 288,70" fill="none" stroke={p} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="36,86 110,86 162,150 256,150" fill="none" stroke={s} strokeWidth="3" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" />
          {[[40, 172], [92, 120], [150, 120], [212, 70], [288, 70], [36, 86], [110, 86], [162, 150], [256, 150]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill="#0d1220" stroke={i % 2 ? s : p} strokeWidth="2" />
          ))}
        </g>
      )}

      {variant === "satellite" && (
        <g>
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 9 }).map((__, c) => {
              const on = (r * 9 + c) % 5 === 0;
              return (
                <rect key={`${r}-${c}`} x={40 + c * 28} y={58 + r * 31} width="24" height="27" rx="3"
                  fill={on ? p : "rgba(255,255,255,0.04)"} fillOpacity={on ? 0.5 : 1} stroke="rgba(255,255,255,0.08)" />
              );
            })
          )}
          <circle cx="250" cy="50" r="5" fill={s} />
          <path d="M250 50 L298 38" stroke={s} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      )}

      {variant === "gauge" && (
        <g>
          <path d="M70 172 A90 90 0 0 1 250 172" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
          <path d="M70 172 A90 90 0 0 1 214 104" fill="none" stroke={`url(#${uid}-line)`} strokeWidth="12" strokeLinecap="round" />
          <text x="160" y="150" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="34" fontWeight="600" fill="#f5f7fb">72</text>
          <text x="160" y="172" textAnchor="middle" fontSize="10" letterSpacing="2" fill="rgba(255,255,255,0.45)">SCORE</text>
        </g>
      )}

      {variant === "pulse" && (
        <g>
          <polyline points="24,118 96,118 116,118 131,78 146,166 161,102 176,118 296,118" fill="none" stroke={`url(#${uid}-line)`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {[70, 160, 250].map((x, i) => (
            <circle key={i} cx={x} cy={188} r="4" fill={[s, p, "rgba(255,255,255,0.3)"][i]} />
          ))}
        </g>
      )}
    </svg>
  );
}
