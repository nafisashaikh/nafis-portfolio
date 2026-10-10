import { lazy, Suspense, useState } from "react";
import AtmosphereBackground from "./components/background/AtmosphereBackground";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/sections/About";
import Highlights from "./components/sections/Highlights";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

// Non-critical, interaction-driven — kept out of the initial bundle.
const AIAssistant = lazy(() => import("./components/AIAssistant"));
const ResumePDFView = lazy(() => import("./components/ResumePDFView"));

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <AtmosphereBackground />

      <Navbar onOpenResume={() => setResumeOpen(true)} />

      <main id="main">
        <Hero />
        <About />
        <Highlights />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer onOpenResume={() => setResumeOpen(true)} />

      <Suspense fallback={null}>
        <AIAssistant />
        {resumeOpen && <ResumePDFView isOpen onClose={() => setResumeOpen(false)} />}
      </Suspense>

      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
    </>
  );
}
