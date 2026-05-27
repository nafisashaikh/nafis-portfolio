import { useEffect, useState } from "react";
import { User, Zap, Terminal, Cpu, GraduationCap, FileText, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  onOpenPDF: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Navbar({ onOpenPDF, darkMode, setDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Profile", icon: User },
    { id: "impact", label: "Highlights", icon: Zap },
    { id: "projects", label: "Experience", icon: Terminal },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "education", label: "Background", icon: GraduationCap },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky backdrop on small scroll
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll spy logic
      const sections = navItems.map((item) => document.getElementById(item.id));
      let currentSection = "hero";

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section top is near the viewport top
          if (rect.top <= 160) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Top Header (Desktop & Mobile title bar) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Monogram (Fuses directly with the Editorial NAS border spec) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 border border-orange-500 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-orange-500/10 shrink-0">
              <Logo className="w-8 h-8" isLight={!darkMode} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-white hidden sm:inline-block">
                NAFIS ABID SHAIKH
              </span>
              <p className="text-[9px] font-mono text-orange-500/80 tracking-widest leading-none hidden sm:block mt-1">
                // SYSTEM REPORT: LIVE
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      : "text-gray-400 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Theme Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Resume Print Trigger Button (Editorial CTA - transparent with amber bounds) */}
            <button
              onClick={onOpenPDF}
              className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-black hover:bg-orange-600 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Print Resume</span>
              <span className="inline xs:hidden">CV</span>
            </button>

            {/* Toggle Theme Custom State Control */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-white/5 border border-white/10 text-gray-400 hover:text-orange-500 hover:border-orange-500/30 transition-all text-sm rounded-none"
              title="Toggle Theme Presets"
            >
              {darkMode ? "☼" : "☾"}
            </button>

            {/* Mobile Burger Open button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-white/5 border border-white/10 text-gray-400 hover:text-white md:hidden transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#050505]/95 backdrop-blur-lg z-30 md:hidden flex flex-col border-b border-white/5">
          <div className="flex flex-col p-6 gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 font-mono text-xs tracking-wider text-left transition-all ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      : "text-gray-400 hover:text-white bg-white/5 border border-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Sleek High-Tech Capsule Grid) */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <nav className="bg-[#050505]/90 backdrop-blur-lg border border-white/10 p-2 flex items-center justify-around shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex flex-col items-center gap-1 p-2 transition-all ${
                  isActive ? "text-orange-500" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-widest scale-90">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
