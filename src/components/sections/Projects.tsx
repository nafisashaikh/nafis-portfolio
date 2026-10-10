import { resumeData } from "../../data/resumeData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectCard from "./ProjectCard";
import ProjectCardCompact from "./ProjectCardCompact";
import type { Visual } from "./ProjectVisual";

// Each project's preview motif, chosen to match what it actually does.
const VISUALS: Visual[] = ["bars", "area", "feed", "scatter", "network", "feed"];
const FEATURED = 3;

export default function Projects() {
  const { projects } = resumeData;
  const featured = projects.slice(0, FEATURED);
  const supporting = projects.slice(FEATURED);

  return (
    <Section id="projects">
      <SectionHeading
        title="Selected work"
        lead="A mix of shipped dashboards, applied NLP, and research — each framed by the decision it was built to support."
      />

      <div className="mt-16 space-y-24 sm:space-y-28">
        {featured.map((project, i) => (
          <Reveal key={project.title} y={28}>
            <ProjectCard project={project} visual={VISUALS[i] ?? "bars"} index={i} />
          </Reveal>
        ))}
      </div>

      {supporting.length > 0 && (
        <div className="mt-24 sm:mt-28">
          <Reveal className="flex items-center gap-4">
            <h3 className="shrink-0 text-xl font-display text-ink">More projects</h3>
            <span className="hairline flex-1" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <ProjectCardCompact project={project} visual={VISUALS[FEATURED + i] ?? "bars"} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
