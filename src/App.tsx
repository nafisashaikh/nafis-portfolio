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
import { resumeData } from "./data/resumeData";

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  if (!splashComplete) {
    return <SplashScreen onComplete={() => setSplashComplete(true)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      darkMode 
        ? "bg-[#050505] text-[#e5e5e5]" 
        : "bg-[#fafafa] text-slate-900 selection:bg-orange-100 selection:text-orange-850"
    }`}>
      {/* 1. Fully-reactive Canvas Background Animation */}
      <AnimatedBackground />

      {/* Editorial aesthetic ambient spots underneath */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[50%] h-[50%] bg-blue-500/8 rounded-full blur-[140px]" />
      </div>

      {/* Cybernetic decorative grid line indicator for light mode override */}
      {!darkMode && (
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(100,116,139,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />
      )}

      {/* 2. Responsive Sticky Header & Drawer Layout */}
      <Navbar 
        onOpenPDF={() => setPdfOpen(true)} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

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
          <div className="flex flex-col items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">Aspirations // Opportunities</span>
            <p className="text-sm font-sans font-light text-slate-450 max-w-xl leading-relaxed opacity-80">
              {resumeData.basics.lookingFor}
            </p>
            
            <div className="flex items-center gap-4 flex-wrap justify-center mt-4">
              <a 
                href={`mailto:${resumeData.basics.email}`}
                className="text-xs font-mono text-orange-400 hover:text-orange-300 hover:underline"
              >
                {resumeData.basics.email}
              </a>
              <span className="text-slate-800 font-mono text-xs">|</span>
              <a 
                href={resumeData.basics.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono text-orange-400 hover:text-orange-300 hover:underline"
              >
                GitHub Profile
              </a>
              <span className="text-slate-800 font-mono text-xs">|</span>
              <a 
                href={resumeData.basics.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono text-orange-400 hover:text-orange-300 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>

            <p className="text-[10px] font-mono text-slate-500 mt-8 tracking-widest uppercase opacity-40">
              NAFIS ABID SHAIKH © {new Date().getFullYear()} // ALL FACTS VERIFIED
            </p>
          </div>
        </footer>
      </main>

      {/* 8. Fullscreen printable ATS portrait Resume Overlay */}
      <ResumePDFView isOpen={pdfOpen} onClose={() => setPdfOpen(false)} />
    </div>
  );
}
