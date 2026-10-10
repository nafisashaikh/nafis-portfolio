import { Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { resumeData } from "../data/resumeData";
import { NAV_ITEMS, scrollToSection } from "../lib/constants";

interface FooterProps {
  onOpenResume: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const { basics } = resumeData;
  const year = new Date().getFullYear();

  const socials = [
    { icon: Mail, href: `mailto:${basics.email}`, label: "Email" },
    { icon: Github, href: basics.github, label: "GitHub" },
    { icon: Linkedin, href: basics.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="mx-auto max-w-6xl px-6 pb-16 pt-8">
      <div className="hairline" />
      <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg glass-soft">
              <Logo className="h-5 w-5" />
            </span>
            <span className="font-semibold text-ink">{basics.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-dim">{basics.availability}.</p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-10 w-10 place-items-center rounded-lg glass-soft text-dim transition-colors hover:text-ink">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm sm:grid-cols-3">
          {NAV_ITEMS.map(({ id, label }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="text-left text-dim transition-colors hover:text-ink">
              {label}
            </button>
          ))}
          <button onClick={onOpenResume} className="text-left text-dim transition-colors hover:text-ink">
            Résumé
          </button>
        </nav>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© {year} {basics.fullName}</p>
        <button
          onClick={() => scrollToSection("home")}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
