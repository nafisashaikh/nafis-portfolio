import { ExternalLink, Github, Terminal, ArrowRight } from "lucide-react";
import { resumeData as activePersona } from '../data/resumeData';

// Helper function to extract cleanly formatted stack tags
const parseStack = (stackString: string) => {
  return stackString.split(',').map(s => s.trim()).filter(Boolean);
};

export default function ProjectGallery() {
  
  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-24 z-10" id="projects">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-12">
        <span className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase font-semibold">Featured Work</span>
        <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight">
          Engineering <span className="text-slate-400 italic font-serif">Showcase</span>
        </h2>
      </div>

      {/* Grid container */}
      <div className="grid md:grid-cols-2 gap-8 relative">
        {activePersona.projects.map((project: any, index: number) => {
          const tags = parseStack(project.stack);
          
          return (
            <div 
              key={index}
              className="group relative flex flex-col bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] rounded-2xl overflow-hidden"
            >
              {/* Subtle hover gradient backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-colors duration-500 -z-10" />

              {/* Title Header */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag: string, tIdx: number) => (
                  <span 
                    key={tIdx}
                    className="px-3 py-1 text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bullet Points */}
              <ul className="flex-1 space-y-3 mb-8">
                {project.bullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <ArrowRight className="w-4 h-4 text-orange-500 shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-white/5">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-black font-semibold text-sm rounded-lg hover:bg-orange-400 transition-colors duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-colors duration-300 border border-white/10 hover:border-white/30"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
