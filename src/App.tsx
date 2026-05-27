import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactStrip from "./components/ImpactStrip";
import ProjectGallery from "./components/ProjectGallery";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillsGrid from "./components/SkillsGrid";
import EducationCerts from "./components/EducationCerts";
import ResumePDFView from "./components/ResumePDFView";
import AIAssistant from "./components/AIAssistant";
import RoleSelector from "./components/RoleSelector";
import { usePersona } from "./context/PersonaContext";

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  
  // No longer statically importing resumeData, we get it from context
  const { activePersona } = usePersona();


  if (!splashComplete) {
    return <SplashScreen onComplete={() => setSplashComplete(true)} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden dark bg-[#050505] text-[#e5e5e5] selection:bg-orange-100 selection:text-orange-850">
      {/* 1. Fully-reactive Canvas Background Animation */}
      <AnimatedBackground />

      {/* Editorial aesthetic ambient spots underneath */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[50%] h-[50%] bg-blue-500/8 rounded-full blur-[140px]" />
      </div>

      {/* 2. Responsive Sticky Header & Drawer Layout */}
      <Navbar 
        onOpenPDF={() => setPdfOpen(true)} 
      />
      <RoleSelector />

      {/* Main Container Wrapper */}
      <main className="relative z-10 pt-10 pb-32">
        {/* 3. Hero Interactive Showcase */}
        <Hero onOpenPDF={() => setPdfOpen(true)} />

        {/* 4. Top 3 Impact Accolades strip */}
        <ImpactStrip />

        {/* 4.5. Project Gallery Showcase */}
        <ProjectGallery />

        {/* 5. story timeline Experience accordion */}
        <ExperienceTimeline />

        {/* 6. Skills Matrices */}
        <SkillsGrid />

        {/* 7. Educational Registries & Certifications */}
        <EducationCerts />

        {/* Additional Info Completeness Footer section */}
        <footer className="mt-20 border-t border-white/5 pt-16 pb-24 max-w-6xl mx-auto px-6 text-center">
          {/* Looking For Segment */}
          <div className="max-w-4xl mx-auto px-6 py-12 mb-16 border border-white/10 rounded-2xl bg-slate-900/40 backdrop-blur-sm text-center">
            <h3 className="text-xl font-medium text-current mb-4">Looking for Opportunities</h3>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {activePersona.basics.lookingFor || "I am currently looking for internship opportunities in Data Analytics, MIS, or Business Analytics where I can apply my skills and gain real world experience."}
            </p>
          </div>  
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-slate-400">
              <a 
                href={`mailto:${activePersona.basics.email}`}
                className="hover:text-orange-400 transition-colors flex items-center gap-2"
              >
                {activePersona.basics.email}
              </a>
              <a 
                href={activePersona.basics.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors flex items-center gap-2"
              >
                GitHub
              </a>
              <a 
                href={activePersona.basics.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors flex items-center gap-2"
              >
                LinkedIn
              </a>
            </div>

            <p className="text-[10px] font-mono text-slate-500 mt-8 tracking-widest uppercase opacity-40">
              NAFIS ABID SHAIKH © {new Date().getFullYear()} // ALL FACTS VERIFIED
            </p>
        </footer>
      </main>

      {/* 8. Fullscreen printable ATS portrait Resume Overlay */}
      <AIAssistant />
      <ResumePDFView isOpen={pdfOpen} onClose={() => setPdfOpen(false)} />
    </div>
  );
}

// Cache bust timestamp: 2026-05-27T18:29:00Z
