import type { CSSProperties } from "react";

interface LogoProps {
  className?: string;
  style?: CSSProperties;
}

/** Minimal NS monogram in the brand's blue→cyan gradient. */
export function Logo({ className = "h-full w-full", style }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="ns-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#97acff" />
          <stop offset="1" stopColor="#6be4ed" />
        </linearGradient>
      </defs>
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Sora', sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="-1"
        fill="url(#ns-grad)"
      >
        NS
      </text>
    </svg>
  );
}
