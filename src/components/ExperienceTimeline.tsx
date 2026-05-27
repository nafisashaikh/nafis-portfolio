import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { usePersona } from "../context/PersonaContext";
import { useState } from "react";

export default function ExperienceTimeline() {
  const { activePersona } = usePersona();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  
  if (!activePersona.experience || activePersona.experience.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-24 z-10" id="experience">
      <div className="flex items-center gap-4 mb-12 animate-fade-in-up">
        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
          <Briefcase className="w-6 h-6 text-orange-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-light text-white tracking-tight">
          Experience & <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Achievements</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-slate-800/50 ml-4 md:ml-6 space-y-8">
        {activePersona.experience.map((exp, idx) => (
          <div 
            key={idx}
            className="relative pl-8 md:pl-12 group animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* Timeline dot */}
            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-125 transition-transform duration-300" />

            <div 
              className={`bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                expandedIndex === idx 
                  ? 'border-orange-500/30 shadow-[0_4px_20px_rgba(249,115,22,0.1)]' 
                  : 'hover:border-white/20 hover:bg-slate-800/50'
              }`}
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-lg text-slate-300 mt-1">
                    <span className="font-medium">{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 text-sm text-slate-400">
                  <div className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span>{exp.duration}</span>
                  </div>
                  {expandedIndex === idx ? <ChevronUp className="w-5 h-5 text-slate-500 hidden md:block" /> : <ChevronDown className="w-5 h-5 text-slate-500 hidden md:block" />}
                </div>
              </div>

              <div className={`grid transition-all duration-300 ease-in-out ${expandedIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden">
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
