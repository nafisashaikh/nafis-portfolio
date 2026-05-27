import { usePersona } from '../context/PersonaContext';
import { Briefcase } from 'lucide-react';

export default function RoleSelector() {
  const { activePersona, setActivePersona, availablePersonas } = usePersona();

  return (
    <div className="w-full bg-slate-900/50 backdrop-blur-md border-b border-white/5 py-3 sticky top-0 z-40 overflow-x-auto no-scrollbar">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
          <Briefcase className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wider uppercase text-xs">View As:</span>
        </div>
        
        <div className="flex items-center gap-2">
          {availablePersonas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setActivePersona(persona.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activePersona.id === persona.id
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                  : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {persona.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
