import { useState } from "react";
import { Cpu, Terminal, Brackets, Sliders, LayoutDashboard, Compass, Monitor, Database, LineChart, Code2, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { resumeData as activePersona } from '../data/resumeData';

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const ICONS: { [key: string]: any } = {
    "Languages": Code2,
    "Frontend": Monitor,
    "Backend": Database,
    "Tools": Wrench,
    "Languages & Tools": Brackets,
    "Techniques & Concepts": Sliders,
    "Top Skills & Domains": LayoutDashboard,
    "Environments & Other": Compass,
  };

  return (
    <section id="skills" className="py-20 max-w-6xl mx-auto px-6 text-white scroll-mt-20">
      {/* Visual glowing spotlight helper */}
      <div className="absolute left-1/3 w-96 h-96 bg-theme-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs tracking-[0.25em] text-theme-500 uppercase font-semibold">Expertise & Stacks</span>
        <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight dark:text-white text-slate-900">
          Holographic <span className="dark:text-slate-400 text-slate-500 italic font-serif">Skill Matrices</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {activePersona.skills.map((cat, idx) => {
          const IconComponent = ICONS[cat.category] || Cpu;
          const isSelected = activeCategory === cat.category;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setActiveCategory(cat.category)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`dark:bg-white/[0.02] bg-white border p-6 relative overflow-hidden transition-all duration-300 transform group rounded-none shadow-sm ${
                isSelected
                  ? "border-theme-500/50 shadow-md"
                  : "dark:border-white/10 border-slate-200"
              }`}
            >
              {/* Corner accent laser lines */}
              <div
                className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-theme-500 to-transparent transition-all duration-500 ${
                  isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 flex items-center justify-center text-theme-500 group-hover:text-theme-400 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest dark:text-white text-slate-900">
                  {cat.category}
                </h3>
              </div>

              {/* Skill items rendered as nice glowing blocks */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill, sIdx) => {
                  return (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-none transition-all border dark:text-slate-300 text-slate-700 dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 hover:border-theme-500 hover:text-slate-900 dark:hover:text-white"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>

              {/* Gentle visual radar glow */}
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-theme-500/5 rounded-full blur-xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      {/* Embedded Skill Spotlight panel indicating core tools */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 p-6 dark:bg-white/[0.02] bg-white border dark:border-white/10 border-slate-200 rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm"
      >
        <div>
          <h4 className="font-mono text-xs font-bold text-theme-500 uppercase tracking-widest">
            Primary Framework Stack
          </h4>
          <p className="text-xs font-sans font-light dark:text-slate-400 text-slate-700 leading-relaxed mt-1">
            Proficient in configuring automated statistical pipelines, interactive Tableau structures, VLOOKUP parsing matrices, and NLP text-classification models.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {["Python", "Pandas & NumPy", "SQL (MySQL)", "Excel Dashboards", "Tableau", "Power BI"].map((major, mIdx) => (
            <span
              key={mIdx}
              className="px-3 py-1.5 rounded-none text-xs font-mono font-medium text-theme-500 dark:text-theme-400 bg-theme-500/10 border border-theme-500/20"
            >
              {major}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
