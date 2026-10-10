import { useMemo, useState } from "react";
import { resumeData } from "../../data/resumeData";
import type { ProjectCategory } from "../../types";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectCard from "./ProjectCard";
import ProjectCardCompact from "./ProjectCardCompact";

const FILTERS: (ProjectCategory | "All")[] = [
  "All",
  "AI & ML",
  "Software & Full-Stack",
  "Data & Analytics",
  "Engineering & Research",
];

// Spotlight order for the featured rows (and the directory lead).
const FEATURED_ORDER = ["OceanEmbed", "SatQuery-AI", "SowSafe", "Metro Rail Scheduler"];

export default function Projects() {
  const { projects } = resumeData;
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const featured = useMemo(
    () =>
      projects
        .filter((p) => p.featured)
        .sort((a, b) => FEATURED_ORDER.indexOf(a.title) - FEATURED_ORDER.indexOf(b.title)),
    [projects]
  );
  const ordered = useMemo(
    () => [...featured, ...projects.filter((p) => !p.featured)],
    [featured, projects]
  );
  const directory = useMemo(
    () => (active === "All" ? ordered : ordered.filter((p) => p.categories.includes(active))),
    [ordered, active]
  );

  return (
    <Section id="projects">
      <SectionHeading
        title="Selected work"
        lead="Intelligent systems, full-stack applications, engineering tools, and analytics — grouped by what each one actually does."
      />

      {/* Featured — larger spotlight treatment */}
      <div className="mt-16 space-y-24 sm:space-y-28">
        {featured.map((project, i) => (
          <Reveal key={project.title} y={28}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      {/* Explore all — filterable directory */}
      <div className="mt-24 sm:mt-28">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-xl font-display text-ink">Explore all projects</h3>
          <div role="group" aria-label="Filter projects by domain" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={on}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    on
                      ? "border-transparent bg-accent text-[#06080f] font-medium"
                      : "border-[color:var(--color-line)] text-dim hover:text-ink hover:border-[color:var(--color-line-strong)]"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {directory.map((project) => (
            <Reveal key={project.title}>
              <ProjectCardCompact project={project} />
            </Reveal>
          ))}
        </div>
        {directory.length === 0 && (
          <p className="mt-10 text-center text-dim">No projects in this category yet.</p>
        )}
      </div>
    </Section>
  );
}
