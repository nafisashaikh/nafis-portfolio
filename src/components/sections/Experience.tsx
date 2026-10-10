import { Briefcase, GraduationCap, Award } from "lucide-react";
import { resumeData } from "../../data/resumeData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Experience() {
  const { experience, education, certifications } = resumeData;

  return (
    <Section id="experience">
      <SectionHeading
        title="Experience & education"
        lead="Where I've applied this — in industry, in the classroom, and through certifications."
      />

      <div className="mt-14 flex items-center gap-2.5 text-dim">
        <Briefcase className="h-4 w-4 text-accent" strokeWidth={1.75} />
        <h3 className="text-xl font-display text-ink">Experience</h3>
      </div>

      {experience.map((exp) => (
        <Reveal key={exp.company} className="mt-6">
          <div className="rounded-2xl glass p-7 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-display text-ink">{exp.role}</h4>
                <p className="mt-1 text-dim">
                  <span className="text-ink">{exp.company}</span>, {exp.location}
                </p>
              </div>
              <span className="rounded-full glass-soft px-3.5 py-1.5 font-mono text-xs tracking-wide text-dim">{exp.dates}</span>
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed text-dim">{exp.summary}</p>
            <ul className="mt-5 grid gap-3">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed text-dim">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {exp.tools.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-2.5 text-dim">
            <GraduationCap className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <h3 className="text-xl font-display text-ink">Education</h3>
          </div>
          <div className="mt-6 ml-1 border-l border-[color:var(--color-line)] pl-6">
            {education.map((e, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                <span
                  className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 10px rgba(119,146,255,0.7)" }}
                />
                <h4 className="font-medium text-ink">{e.degree}</h4>
                <p className="mt-0.5 text-sm text-dim">{e.institution}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {e.dates}
                  {e.result ? `, ${e.result}` : ""}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex items-center gap-2.5 text-dim">
            <Award className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <h3 className="text-xl font-display text-ink">Certifications</h3>
          </div>
          <div className="mt-6 grid gap-4">
            {certifications.map((c) => (
              <div key={c.name} className="rounded-xl glass-soft p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h4 className="font-medium text-ink">{c.name}</h4>
                  <span className="shrink-0 font-mono text-xs text-muted">{c.date}</span>
                </div>
                <p className="mt-0.5 text-sm text-dim">{c.issuer}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
