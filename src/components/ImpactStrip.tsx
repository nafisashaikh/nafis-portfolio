import { Trophy, Compass, Star, Zap, Target, Award } from "lucide-react";
import { usePersona } from "../context/PersonaContext";

export default function ImpactStrip() {
  const { activePersona } = usePersona();

  const iconMap = {
    Star: Star,
    Trophy: Trophy,
    Compass: Compass,
    Zap: Zap,
    Target: Target,
    Award: Award
  };

  return (
    <section id="impact" className="py-16 max-w-6xl mx-auto px-6 text-white scroll-mt-20">
      {/* Visual background element */}
      <div className="absolute left-1/4 h-72 w-72 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header heading */}
      <div className="flex flex-col gap-2 mb-10">
        <span className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase font-semibold">Top 3 Accomplishments</span>
        <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight">
          High-Impact <span className="text-slate-400 italic font-serif">Distinctions</span>
        </h2>
      </div>

      {/* Trophy grid layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {activePersona.achievements.map((item, idx) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Star;
          return (
            <div
              key={idx}
              className="bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden transition-all duration-300 hover:border-orange-500/30 group shadow-md"
            >
              {/* Corner accent decal */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-orange-500" />
              </div>

              {/* Icon / Trophy container */}
              <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" style={{ color: item.iconColor }} />
              </div>

              {/* Large Metric Badges */}
              <span className={`inline-block px-2.5 py-0.5 rounded-none text-[9px] font-mono uppercase tracking-widest mb-3 bg-white/5 border border-white/10 ${item.textAccent}`}>
                {item.metric}
              </span>

              <h3 className="text-sm font-mono font-bold uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors mb-2">
                {item.title}
              </h3>

              <p className="text-xs font-sans font-light text-slate-400 leading-relaxed">
                {item.description}
              </p>

              {/* Glow backdrop overlay */}
              <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${item.accent} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
