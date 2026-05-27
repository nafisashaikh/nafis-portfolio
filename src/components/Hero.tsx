import { useEffect, useState } from "react";
import { ArrowDown, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { resumeData } from "../data/resumeData";
import { Logo } from "./Logo";

interface HeroProps {
  onOpenPDF: () => void;
}

export default function Hero({ onOpenPDF }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const titles = resumeData.basics.titles;

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [titles.length]);

  const scrollToExperience = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative pt-28 pb-20 px-6 max-w-6xl mx-auto overflow-hidden text-white"
    >
      {/* Decorative backdrop graphics */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-10 top-20 w-72 h-72 border border-white/[0.02] rounded-full pointer-events-none hidden lg:block" />

      <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left main branding header columns */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Top subtle high-tech tag */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 bg-white/5 border border-white/10 text-orange-500 font-mono text-[10px] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Active Internship Aspirant
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-light tracking-tighter text-white leading-none">
              NAFIS ABID <span className="text-orange-500 italic block mt-2 font-serif text-6xl sm:text-7xl md:text-8xl leading-none">Shaikh</span>
            </h1>
            
            {/* Editorial cycler */}
            <div className="h-10 mt-3 flex items-center">
              <div className="font-mono text-xs sm:text-sm tracking-[0.3em] text-slate-400 flex items-center gap-2 uppercase">
                <span className="text-orange-500 font-bold">//</span>
                <span>
                  {titles[roleIndex]}
                </span>
              </div>
            </div>
          </div>

          {/* High-Impact summary context */}
          <p className="text-sm sm:text-base font-sans font-light text-slate-355 leading-relaxed max-w-xl opacity-90">
            {resumeData.basics.objective}
          </p>

          <div className="flex flex-col gap-1.5 text-slate-400 font-mono text-xs border-l border-orange-500/30 pl-4 mt-2">
            <div>
              <span className="text-orange-500">Location:</span> {resumeData.basics.location}
            </div>
            <div>
              <span className="text-orange-500">Comm-Channel:</span> {resumeData.basics.email} // {resumeData.basics.phone}
            </div>
          </div>

          {/* Core Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
            <button
              onClick={scrollToExperience}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 text-black hover:bg-orange-600 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4" />
              View Experience
            </button>
            
            <button
              onClick={onOpenPDF}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white hover:text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-widest border border-white/20 hover:border-white transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </div>

        {/* Right visualization column showing metrics or a futuristic card */}
        <div className="lg:col-span-5 relative flex justify-center">
          {/* Glass design grid block */}
          <div className="w-full max-w-[360px] bg-white/[0.02] backdrop-blur-md border border-white/10 p-6 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] group hover:border-orange-500/20 transition-all duration-500">
            {/* Corner literal decals */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500" />
            
            <div className="font-mono text-[9px] text-orange-500 tracking-[0.2em] mb-4 flex items-center justify-between opacity-80">
              <span>SYSTEM PROFILE STATE</span>
              <span>ACTIVE // 2026</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border border-orange-500 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-orange-500/10 shrink-0">
                <Logo className="w-9 h-9" />
              </div>
              <div>
                <h3 className="font-mono text-xs font-semibold tracking-wider text-white uppercase">Nafit Abid Shaikh</h3>
                <p className="text-[9px] font-mono text-slate-400 leading-tight mt-1 uppercase tracking-widest">
                  Computer Engg. / MU
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/[0.02] border border-white/5 p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-white">Structured Analytics</h4>
                  <p className="text-[10px] font-sans text-slate-400 mt-1 leading-relaxed">
                    Excel, SQL & Power BI predictive models and interactive dashboards.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-white">SIH Hackathon Winner</h4>
                  <p className="text-[10px] font-sans text-slate-400 mt-1 leading-relaxed">
                    National Hackathon. Deployed NLP and transit platforms.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-white">Forensic Simulation</h4>
                  <p className="text-[10px] font-sans text-slate-400 mt-1 leading-relaxed">
                    Deloitte Australia forensic data analytics industry simulation.
                  </p>
                </div>
              </div>
            </div>

            {/* Glowing bottom line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
