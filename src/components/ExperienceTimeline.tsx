import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { resumeData as activePersona } from '../data/resumeData';
import { useState } from "react";

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  
  if (!activePersona.experience || activePersona.experience.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-24 z-10" id="experience">
      <div className="flex flex-col gap-2 mb-12">
        <span className="font-mono text-xs tracking-[0.25em] text-theme-500 uppercase font-semibold">Career Journey</span>
        <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight dark:text-white text-slate-900">
          Professional <span className="dark:text-slate-400 text-slate-500 italic font-serif">Experience</span>
        </h2>
      </div>

      <div className="relative border-l-2 dark:border-slate-800/50 border-slate-300 ml-4 md:ml-6 space-y-8">
        {activePersona.experience.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full dark:bg-slate-900 bg-white border-2 border-theme-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-125 transition-transform duration-300" />

            <div 
              className={`dark:bg-slate-900/40 bg-white backdrop-blur-md border dark:border-white/5 border-slate-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm ${
                expandedIndex === idx 
                  ? 'border-theme-500/50 shadow-md' 
                  : 'hover:border-slate-300 dark:hover:border-white/20'
              }`}
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold dark:text-white text-slate-900 group-hover:text-theme-500 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-lg dark:text-slate-300 text-slate-700 mt-1">
                    <span className="font-medium">{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 text-sm dark:text-slate-400 text-slate-600">
                  <div className="flex items-center gap-1.5 dark:bg-slate-800/50 bg-slate-100 px-3 py-1 rounded-full border dark:border-white/5 border-slate-200 dark:text-slate-300 text-slate-700">
                    <Calendar className="w-4 h-4 text-theme-500" />
                    <span>{(exp as any).dates || (exp as any).duration}</span>
                  </div>
                  {expandedIndex === idx ? <ChevronUp className="w-5 h-5 text-slate-500 hidden md:block" /> : <ChevronDown className="w-5 h-5 text-slate-500 hidden md:block" />}
                </div>
              </div>

              <div className={`grid transition-all duration-300 ease-in-out ${expandedIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden">
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 dark:text-slate-300 text-slate-700 text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-theme-500 mt-2 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
