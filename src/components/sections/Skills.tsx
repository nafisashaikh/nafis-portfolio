import { Sparkles, Code2, BarChart3, Wrench } from "lucide-react";
import { resumeData } from "../../data/resumeData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const ICONS = [Sparkles, Code2, BarChart3, Wrench];

export default function Skills() {
  const { skills } = resumeData;

  return (
    <Section id="skills">
      <SectionHeading
        title="The toolkit I reach for"
        lead="Grouped by what I actually use them for — from shaping raw data to shipping the product around it."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <Reveal key={group.category} delay={i * 0.07}>
              <div className="group h-full rounded-2xl glass p-7 transition-colors duration-300 hover:border-[color:var(--color-line-strong)]">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl glass-soft text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-lg font-display text-ink">{group.category}</h3>
                    <p className="mt-1 text-sm text-dim">{group.blurb}</p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
