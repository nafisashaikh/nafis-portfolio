import { useEffect, useState } from "react";
import { User, Zap, Terminal, Cpu, GraduationCap, FileText, Menu, X, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  onOpenPDF: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Navbar({ onOpenPDF, darkMode = true, onToggleDarkMode }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("orange");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "orange";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

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

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <>
      {/* Sticky Top Header (Desktop & Mobile title bar) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        {/* Global Broadcast Banner */}
        <div className="w-full bg-theme-500 text-black py-1.5 px-4 text-center text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 relative overflow-hidden group">
          {/* Subtle animated shine */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Live Update: Successfully completed 2 months of Data Analyst Internship @ Cipla</span>
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>

        <div className={`max-w-6xl w-full mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4 mt-1'}`}>
          {/* Logo / Monogram (Fuses directly with the Editorial NAS border spec) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 border border-theme-500 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-theme-500/10 shrink-0">
              <Logo className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-white hidden sm:inline-block">
                NAFIS ABID SHAIKH
              </span>
              <p className="text-[9px] font-mono text-theme-500/80 tracking-widest leading-none hidden sm:block mt-1">
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
                      ? "bg-theme-500/10 text-theme-400 border border-theme-500/20"
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
            {/* Dark / Light Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-theme-500/30 transition-all flex items-center justify-center cursor-pointer"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle dark/light mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
              </button>
            )}

            {/* Quick Resume Print Trigger Button (Editorial CTA - transparent with amber bounds) */}
            <button
              onClick={onOpenPDF}
              className="flex items-center gap-1.5 px-4 py-2 bg-theme-500 text-black hover:bg-theme-600 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Print Resume</span>
              <span className="inline xs:hidden">CV</span>
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
                      ? "bg-theme-500/10 text-theme-400 border border-theme-500/20"
                      : "text-gray-400 hover:text-white bg-white/5 border border-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 text-theme-500" />
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
                  isActive ? "text-theme-500" : "text-gray-500 hover:text-gray-300"
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
