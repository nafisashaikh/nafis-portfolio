import { BarChart3, Target, TrendingUp } from "lucide-react";
import { resumeData } from "../../data/resumeData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const ICONS = [BarChart3, Target, TrendingUp];

export default function About() {
  const { basics, about } = resumeData;

  return (
    <Section id="about">
      <SectionHeading title="A bit about how I work" />

      <Reveal>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-dim sm:text-2xl">
          {basics.about}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-0">
        {about.map((theme, i) => {
          const Icon = ICONS[i] ?? BarChart3;
          return (
            <Reveal
              key={theme.title}
              delay={i * 0.08}
              className={`flex flex-col gap-4 sm:px-8 ${i > 0 ? "sm:border-l sm:border-[color:var(--color-line)]" : "sm:pl-0"}`}
            >
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="text-lg font-display text-ink">{theme.title}</h3>
              <p className="text-[0.975rem] leading-relaxed text-dim">{theme.body}</p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
