import { X, Printer, MapPin, Mail, Phone, Github, Linkedin, ArrowLeft } from "lucide-react";
import { resumeData } from "../data/resumeData";

interface ResumePDFViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumePDFView({ isOpen, onClose }: ResumePDFViewProps) {
  if (!isOpen) return null;
  const { basics, skills, experience, projects, education, certifications } = resumeData;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-base/95 p-4 backdrop-blur-md sm:p-10">
      <div className="relative my-4 flex w-full max-w-4xl flex-col gap-6">
        {/* Controls (hidden on print) */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl glass p-4 text-ink print:hidden sm:flex-row sm:items-center">
          <button onClick={onClose} className="inline-flex items-center gap-1.5 self-start rounded-xl glass-soft px-3.5 py-2 text-sm text-dim transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-[#06080f] transition-colors hover:bg-accent-soft">
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
            <button onClick={onClose} aria-label="Close résumé" className="grid h-9 w-9 place-items-center rounded-xl glass-soft text-dim transition-colors hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable sheet — intentionally light for ATS / paper */}
        <div id="printable-resume-card" className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-slate-900 shadow-2xl sm:p-12 print:rounded-none print:border-none print:p-0 print:shadow-none">
          <header className="flex flex-col justify-between gap-4 border-b-2 border-slate-800 pb-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-950">{basics.fullName}</h1>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-600">{basics.disciplines.join(" · ")}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-slate-700">
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0 text-slate-500" />{basics.location}</span>
              <a href={`mailto:${basics.email}`} className="flex items-center gap-2 hover:underline"><Mail className="h-3.5 w-3.5 shrink-0 text-slate-500" />{basics.email}</a>
              <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0 text-slate-500" />{basics.phone}</span>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                <a href={basics.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><Github className="h-3 w-3 text-slate-500" />github.com/nafisashaikh</a>
                <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><Linkedin className="h-3 w-3 text-slate-500" />linkedin.com/in/nafisshaikh</a>
              </span>
            </div>
          </header>
          <div className="mt-6 flex flex-col gap-6">
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-950">Summary</h2>
              <p className="text-xs leading-relaxed text-slate-700">{basics.about} {basics.lookingFor}</p>
            </section>

            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-950">Technical Skills</h2>
              <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {skills.map((g) => (
                  <p key={g.category} className="text-xs leading-relaxed text-slate-700">
                    <span className="font-bold text-slate-900">{g.category}: </span>{g.items.join(", ")}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-950">Experience</h2>
              <div className="flex flex-col gap-4">
                {experience.map((exp) => (
                  <div key={exp.company}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-xs font-bold text-slate-950">{exp.role} — {exp.company}</h3>
                      <span className="shrink-0 text-xs text-slate-500">{exp.dates}</span>
                    </div>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs leading-relaxed text-slate-700">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-950">Projects</h2>
              <div className="flex flex-col gap-3">
                {projects.map((p) => (
                  <div key={p.title}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-xs font-bold text-slate-950">{p.title} <span className="font-normal text-slate-500">({p.status})</span></h3>
                      <span className="shrink-0 text-xs text-slate-500">{p.stack.join(", ")}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700"><span className="font-semibold">Problem:</span> {p.problem}</p>
                    <p className="text-xs leading-relaxed text-slate-700"><span className="font-semibold">Approach:</span> {p.approach}</p>
                    {p.note && <p className="text-xs italic leading-relaxed text-slate-500">{p.note}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-950">Education</h2>
              <div className="flex flex-col gap-2">
                {education.map((e, i) => (
                  <div key={i} className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-slate-950">{e.degree}</h3>
                      <p className="text-xs text-slate-700">{e.institution}, {e.location}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-500">{e.dates}{e.result ? `, ${e.result}` : ""}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-950">Certifications</h2>
              <div className="flex flex-col gap-2">
                {certifications.map((c) => (
                  <div key={c.name} className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-slate-950">{c.name}</h3>
                      <p className="text-xs text-slate-700">{c.issuer} — {c.detail}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-500">{c.date}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
