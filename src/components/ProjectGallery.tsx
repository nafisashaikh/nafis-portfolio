import { ExternalLink, Github, Terminal, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { resumeData as activePersona } from '../data/resumeData';

// Helper function to extract cleanly formatted stack tags
const parseStack = (stackString: string) => {
  return stackString.split(',').map(s => s.trim()).filter(Boolean);
};

export default function ProjectGallery() {
  
  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-24 z-10" id="projects">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-theme-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-12">
        <span className="font-mono text-xs tracking-[0.25em] text-theme-500 uppercase font-semibold">Featured Work</span>
        <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight dark:text-white text-slate-900">
          Engineering <span className="dark:text-slate-400 text-slate-500 italic font-serif">Showcase</span>
        </h2>
      </div>

      {/* Grid container */}
      <div className="grid md:grid-cols-2 gap-8 relative">
        {activePersona.projects.map((project: any, index: number) => {
          const tags = parseStack(project.stack);
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col dark:bg-slate-900/50 bg-white backdrop-blur-sm border dark:border-white/10 border-slate-200 p-8 hover:border-theme-500/50 transition-all duration-500 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden"
            >
              {/* Subtle hover gradient backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-500/0 via-transparent to-theme-500/0 group-hover:from-theme-500/5 group-hover:to-theme-500/5 transition-colors duration-500 -z-10" />

              {/* Title Header */}
              <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-4 group-hover:text-theme-500 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag: string, tIdx: number) => (
                  <span 
                    key={tIdx}
                    className="px-3 py-1 text-xs font-mono font-semibold bg-theme-500/10 text-theme-500 dark:text-theme-400 border border-theme-500/20 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Case Study Details */}
              <div className="flex-1 space-y-4 mb-8">
                {project.problem && (
                  <div>
                    <h4 className="text-xs font-mono font-bold dark:text-slate-500 text-slate-400 uppercase tracking-widest mb-1">The Problem</h4>
                    <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-theme-500/80 uppercase tracking-widest mb-1">The Solution</h4>
                    <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed">{project.solution}</p>
                  </div>
                )}
                {project.impact && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-emerald-600 dark:text-green-500/80 uppercase tracking-widest mb-1">The Impact</h4>
                    <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed">{project.impact}</p>
                  </div>
                )}
                {project.bullets && project.bullets.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {project.bullets.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-start gap-3 dark:text-slate-300 text-slate-700 text-sm leading-relaxed">
                        <ArrowRight className="w-4 h-4 text-theme-500 shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t dark:border-white/5 border-slate-200">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-theme-500 text-black font-semibold text-sm rounded-lg hover:bg-theme-400 transition-colors duration-300 shadow-sm"
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
                    className="flex items-center gap-2 px-5 py-2.5 dark:bg-white/5 bg-slate-100 dark:text-white text-slate-900 font-semibold text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors duration-300 border dark:border-white/10 border-slate-300"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
