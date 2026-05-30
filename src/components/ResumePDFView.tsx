import { X, Printer, Download, MapPin, Mail, Phone, Github, Linkedin, ArrowLeft, ZoomIn, ZoomOut, Monitor } from "lucide-react";
import { resumeData as activePersona } from "../data/resumeData";
import { useState } from "react";

interface ResumePDFViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumePDFView({ isOpen, onClose }: ResumePDFViewProps) {
  // Using direct data instead of context
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/98 overflow-y-auto flex items-start justify-center p-4 sm:p-10 backdrop-blur-md">
      {/* High-tech overlay borders */}
      <div className="absolute top-4 left-4 right-4 h-[1px] bg-orange-500/10 pointer-events-none" />
      <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-orange-500/10 pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-6 my-4">
        {/* Top Control Bar (Screen only, hidden on print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-none print:hidden text-white backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-none bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/30 transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </button>
            <div>
              <span className="text-xs font-mono text-orange-500">NAFIS ABID SHAIKH //</span>
              <p className="text-[10px] font-mono text-slate-400 leading-none mt-0.5">FORMAL ATS-COMPATIBLE PORTRAIT</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4.5 py-2 rounded-none bg-orange-500 hover:bg-orange-600 text-black font-semibold font-mono text-xs tracking-wide transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-none bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-orange-500/35 transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* The Formal Resume Sheet (Custom print-focused styling) */}
        <div
          id="printable-resume-card"
          className="bg-white text-slate-900 rounded-none shadow-2xl p-8 sm:p-12 border border-slate-200 w-full overflow-hidden print:shadow-none print:border-none print:p-0 print:m-0"
        >
          {/* Header Contact Section */}
          <div className="border-b-2 border-slate-800 pb-5 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-950 uppercase">
                {activePersona.basics.name}
              </h1>
              <p className="text-sm font-mono text-orange-600 font-semibold uppercase mt-1 tracking-wider">
                {activePersona.basics.titles[0]}
              </p>
            </div>
            {/* Contact cards */}
            <div className="flex flex-col gap-1.5 text-xs font-sans text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{activePersona.basics.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={`mailto:${activePersona.basics.email}`} className="hover:underline">{activePersona.basics.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>+91 {activePersona.basics.phone}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="flex items-center gap-1 hover:underline">
                  <Github className="w-3 h-3 text-slate-500 shrink-0" />
                  <a href={activePersona.basics.github} target="_blank" rel="noopener noreferrer">github.com/nafisashaikh</a>
                </span>
                <span className="text-slate-350 px-1">|</span>
                <span className="flex items-center gap-1 hover:underline">
                  <Linkedin className="w-3 h-3 text-slate-500 shrink-0" />
                  <a href={activePersona.basics.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/nafisshaikh</a>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {/* Objective */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Objective
              </h2>
              <p className="text-xs font-sans text-slate-700 leading-relaxed">
                {activePersona.basics.objective}
              </p>
            </div>

            {/* Technical Skills grouped */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {activePersona.skills.map((sGroup, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <h3 className="text-xs font-mono font-bold text-slate-900">
                      {sGroup.category}
                    </h3>
                    <p className="text-xs font-sans text-slate-700 leading-relaxed">
                      {sGroup.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience or Hackathons Sandbox */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Experience & Simulations
              </h2>
              <div className="space-y-4">
                {activePersona.experience.map((exp, expIdx) => (
                  <div key={expIdx} className="space-y-1.5">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-xs font-sans font-bold text-slate-950">
                        {exp.role} <span className="text-slate-400">|</span> <span className="text-slate-700 font-medium">{exp.company}</span>
                      </h3>
                      <span className="text-xs font-mono text-slate-500 shrink-0">{exp.dates}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs font-sans text-slate-700 leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key projects from resume */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Academic & Practical Projects
              </h2>
              <div className="space-y-4">
                {activePersona.projects.map((p, pIdx) => (
                  <div key={pIdx} className="space-y-1.5">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-xs font-sans font-bold text-slate-950">
                        {p.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 shrink-0">{p.stack}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1">
                      {p.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs font-sans text-slate-700 leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education systems */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-3">
                {activePersona.education.map((edu, eduIdx) => (
                  <div key={eduIdx} className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="text-xs font-sans font-bold text-slate-950">{edu.degree}</h3>
                      <p className="text-xs font-sans text-slate-700">{edu.institution}, {edu.location}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 shrink-0">{edu.dates}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications and Virtual and Capstone roles */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {activePersona.certifications.map((c, cIdx) => (
                  <div key={cIdx} className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="text-xs font-sans font-bold text-slate-950">{c.name}</h3>
                      <p className="text-xs font-sans text-slate-700">{c.issuer} // {c.bullets.join(", ")}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 shrink-0">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra additions representing open placement details */}
            <div>
              <h2 className="text-sm font-mono font-bold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Collaborative Ambition
              </h2>
              <p className="text-xs font-sans text-slate-700 leading-relaxed">
                {activePersona.basics.lookingFor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
