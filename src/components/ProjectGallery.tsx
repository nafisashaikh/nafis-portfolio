import { ExternalLink, Github, Terminal } from "lucide-react";
import { usePersona } from "../context/PersonaContext";

// Helper function to extract cleanly formatted stack tags
const parseStack = (stackString: string) => {
  return stackString
    .replace(/[()]/g, "")
    .split(/,\s*/)
    .filter(tag => tag.trim() !== "");
};

export default function ProjectGallery() {
  const { activePersona } = usePersona();
  
  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-24 z-10" id="projects">
      
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center animate-fade-in-up">
        <div
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-transform duration-500 hover:scale-110"
        >
          <Terminal className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Showcase</span>
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl font-light">
          A selection of high-impact data analytics and software development architectures I have constructed.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePersona.projects.map((project, index) => (
          <div
            key={index}
            className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 dark:bg-[#0a0a0a]/60 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
          >
            {/* Ambient background glow inside the card on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-colors duration-300">
                {project.title}
              </h3>
              
              <ul className="space-y-3 mb-8">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-1.5 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0 mt-auto">
              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {parseStack(project.stack).map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 text-xs font-mono rounded-full bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/10 transition-colors duration-300 group-hover:border-orange-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-orange-500 dark:hover:bg-orange-400 transition-colors duration-300 active:scale-95"
                >
                  {project.link.includes('github.com') ? (
                    <Github className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  View Architecture
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
