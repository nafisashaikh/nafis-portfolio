import { useState } from "react";
import { Cpu, Terminal, Brackets, Sliders, LayoutDashboard, Compass, Monitor, Database, LineChart, Code2, Wrench } from "lucide-react";
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
      <div className="absolute left-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Code2 className="w-5 h-5 text-orange-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight">Technical Arsenal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {activePersona.skills.map((cat, idx) => {
          const IconComponent = ICONS[cat.category] || Cpu;
          const isSelected = activeCategory === cat.category;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveCategory(cat.category)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`bg-white/[0.02] border p-6 relative overflow-hidden transition-all duration-300 transform group rounded-none ${
                isSelected
                  ? "border-orange-500/35 bg-white/5 shadow-none"
                  : "border-white/10"
              }`}
            >
              {/* Corner accent laser lines */}
              <div
                className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-500 ${
                  isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:text-orange-400 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  {cat.category}
                </h3>
              </div>

              {/* Skill items rendered as nice glowing blocks */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill, sIdx) => {
                  return (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-none transition-all border text-slate-300 bg-white/5 border-white/10 hover:border-orange-500/35 hover:text-white"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>

              {/* Gentle visual radar glow */}
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />
            </div>
          );
        })}
      </div>

      {/* Embedded Skill Spotlight panel indicating core tools */}
      <div className="mt-10 p-6 bg-white/[0.02] border border-white/10 rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h4 className="font-mono text-xs font-bold text-orange-500 uppercase tracking-widest">
            Primary Framework Stack
          </h4>
          <p className="text-xs font-sans font-light text-slate-400 leading-relaxed mt-1">
            Proficient in configuring automated statistical pipelines, interactive Tableau structures, VLOOKUP parsing matrices, and NLP text-classification models.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {["Python", "Pandas & NumPy", "SQL (MySQL)", "Excel Dashboards", "Tableau", "Power BI"].map((major, mIdx) => (
            <span
              key={mIdx}
              className="px-3 py-1.5 rounded-none text-xs font-mono font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20"
            >
              {major}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
