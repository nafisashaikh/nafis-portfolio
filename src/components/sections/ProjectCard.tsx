import { useRef, type MouseEvent } from "react";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../../types";
import { useReducedMotion } from "../../lib/useReducedMotion";
import ProjectVisual, { type Visual } from "./ProjectVisual";
import StatusBadge from "../ui/StatusBadge";

interface Props {
  project: Project;
  visual: Visual;
  index: number;
}

export default function ProjectCard({ project, visual, index }: Props) {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const flipped = index % 2 === 1;

  const onMove = (e: MouseEvent) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
  };
  const onLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={flipped ? "lg:order-2" : ""}>
        <div
          ref={frameRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative overflow-hidden rounded-2xl glass p-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
            style={{ background: project.accent === "cyan" ? "rgba(107,228,237,0.18)" : "rgba(119,146,255,0.18)" }}
          />
          <div className="relative aspect-[320/220]">
            <ProjectVisual variant={visual} accent={project.accent} />
          </div>
        </div>
      </div>

      <div className={flipped ? "lg:order-1" : ""}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs tracking-wide text-accent">{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-3 text-2xl font-display tracking-tight text-ink sm:text-3xl">{project.title}</h3>
        <p className="mt-2 text-lg text-dim">{project.tagline}</p>

        <div className="mt-5 grid gap-4">
          <div>
            <p className="text-xs font-medium text-accent/80">Problem</p>
            <p className="mt-1 leading-relaxed text-dim">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-accent/80">Approach</p>
            <p className="mt-1 leading-relaxed text-ink/90">{project.approach}</p>
          </div>
        </div>
        {project.features && project.features.length > 0 && (
          <ul className="mt-5 grid gap-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-dim">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${project.accent === "cyan" ? "bg-cyan" : "bg-accent"}`} />
                {f}
              </li>
            ))}
          </ul>
        )}

        {project.contribution && (
          <p className="mt-5 text-sm text-muted">
            <span className="text-dim">My role:</span> {project.contribution}
          </p>
        )}

        {project.note && (
          <p className="mt-4 rounded-lg border-l-2 border-[color:var(--color-line-strong)] bg-white/[0.02] px-3 py-2 text-xs italic leading-relaxed text-muted">
            {project.note}
          </p>
        )}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li key={t} className="rounded-md border border-[color:var(--color-line)] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-dim">
              {t}
            </li>
          ))}
        </ul>

        {(project.demo || project.github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-[#06080f] transition-colors hover:bg-accent-soft">
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass-soft px-4 py-2.5 text-sm text-ink transition-colors hover:bg-white/[0.06]">
                <Github className="h-4 w-4" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
