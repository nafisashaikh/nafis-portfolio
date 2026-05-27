import React, { createContext, useContext, useState, ReactNode } from 'react';
import { personas } from '../data/personas';
import { ResumeData as Persona } from '../types';

interface PersonaContextType {
  activePersona: Persona;
  setActivePersona: (id: string) => void;
  availablePersonas: { id: string; title: string }[];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  // Default to data-analyst
  const [activePersonaId, setActivePersonaId] = useState<string>('data-analyst');

  const activePersona = personas[activePersonaId] || personas['data-analyst'];
  
  const availablePersonas = Object.values(personas).map(p => ({
    id: p.id,
    title: p.basics.titles[0]
  }));

  const setActivePersona = (id: string) => {
    if (personas[id]) {
      setActivePersonaId(id);
    }
  };

  return (
    <PersonaContext.Provider value={{ activePersona, setActivePersona, availablePersonas }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
