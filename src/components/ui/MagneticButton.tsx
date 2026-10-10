import { useRef, type ReactNode, type MouseEvent, type RefObject } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}

interface AsButton extends BaseProps {
  onClick: () => void;
  href?: never;
}
interface AsLink extends BaseProps {
  href: string;
  onClick?: never;
  external?: boolean;
}

type Props = AsButton | AsLink;

const STYLES: Record<Variant, string> = {
  primary:
    "bg-accent text-[#06080f] font-semibold hover:bg-accent-soft shadow-[0_10px_30px_-10px_rgba(119,146,255,0.6)]",
  ghost:
    "glass-soft text-ink hover:border-[color:var(--color-line-strong)] hover:bg-white/[0.06]",
};

/** CTA with a subtle magnetic pull on fine-pointer devices. */
export default function MagneticButton(props: Props) {
  const { children, variant = "primary", className = "", ariaLabel } = props;
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const classes =
    `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm transition-[background,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${STYLES[variant]} ${className}`;

  if ("href" in props && props.href) {
    const linkProps = props as AsLink;
    const external = linkProps.external ?? linkProps.href.startsWith("http");
    return (
      <a
        ref={ref as unknown as RefObject<HTMLAnchorElement>}
        href={linkProps.href}
        aria-label={ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as unknown as RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={(props as AsButton).onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={classes}
    >
      {children}
    </button>
  );
}
