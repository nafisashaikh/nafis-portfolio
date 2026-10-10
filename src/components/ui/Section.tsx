import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/** Consistent section rhythm, width, and scroll offset across the page. */
export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}
