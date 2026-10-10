import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../../types";
import ProjectVisual, { type Visual } from "./ProjectVisual";
import StatusBadge from "../ui/StatusBadge";

interface Props {
  project: Project;
  visual: Visual;
}

/** Compact supporting-project card for the secondary grid. */
export default function ProjectCardCompact({ project, visual }: Props) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl glass transition-colors duration-300 hover:border-[color:var(--color-line-strong)]">
      <div className="relative border-b border-[color:var(--color-line)] p-4">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
          style={{ background: project.accent === "cyan" ? "rgba(107,228,237,0.16)" : "rgba(119,146,255,0.16)" }}
        />
        <div className="relative aspect-[320/150]">
          <ProjectVisual variant={visual} accent={project.accent} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs tracking-wide text-accent">{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-3 text-xl font-display tracking-tight text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-dim">{project.approach}</p>

        {project.note && (
          <p className="mt-3 text-xs italic leading-relaxed text-muted">{project.note}</p>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <li key={t} className="rounded-md border border-[color:var(--color-line)] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-dim">
              {t}
            </li>
          ))}
        </ul>

        {(project.demo || project.github) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-soft">
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-dim transition-colors hover:text-ink">
                <Github className="h-4 w-4" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
