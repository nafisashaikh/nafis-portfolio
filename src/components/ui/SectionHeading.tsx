import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  id?: string;
  kicker?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * A quiet, consistent section header: a strong display title with an optional
 * one-line lead. No decorative eyebrow by default — the title does the work.
 */
export default function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {kicker && (
        <span className="text-sm font-medium text-accent">{kicker}</span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display tracking-tight text-ink max-w-2xl">
        {title}
      </h2>
      {lead && (
        <p className="text-dim text-base sm:text-lg leading-relaxed max-w-xl">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
