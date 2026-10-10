import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_ITEMS, scrollToSection } from "../lib/constants";

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
          <button onClick={() => go("home")} className="flex items-center gap-2.5" aria-label="Nafis Shaikh — home">
            <span className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${scrolled ? "glass" : "glass-soft"}`}>
              <Logo className="h-6 w-6" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">Nafis Shaikh</span>
          </button>

          <nav className={`hidden items-center gap-1 rounded-full p-1 transition-colors duration-300 md:flex ${scrolled ? "glass" : "glass-soft"}`} aria-label="Primary">
            {NAV_ITEMS.map(({ id, label }) => {
              const on = active === id;
              return (
                <button key={id} onClick={() => go(id)} aria-current={on ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${on ? "text-ink" : "text-dim hover:text-ink"}`}>
                  {on && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-[color:var(--color-line-strong)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={onOpenResume} className="hidden items-center gap-1.5 rounded-xl glass-soft px-3.5 py-2 text-sm text-dim transition-colors hover:text-ink lg:flex">
              <FileText className="h-4 w-4" /> Résumé
            </button>
            <button onClick={() => go("contact")} className="hidden rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-[#06080f] transition-colors hover:bg-accent-soft md:block">
              Let&apos;s connect
            </button>
            <button onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl glass-soft text-ink md:hidden" aria-label="Open menu" aria-expanded={menuOpen}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[60] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-base/80 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.nav aria-label="Mobile" className="absolute inset-x-0 top-0 glass rounded-b-3xl p-6 pt-5"
              initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 32 }}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl glass-soft"><Logo className="h-6 w-6" /></span>
                  <span className="text-sm font-semibold text-ink">Nafis Shaikh</span>
                </span>
                <button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl glass-soft text-ink" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map(({ id, label }, i) => (
                  <motion.button key={id} onClick={() => go(id)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}
                    className={`rounded-xl px-4 py-3 text-left text-lg transition-colors ${active === id ? "bg-white/[0.06] text-ink" : "text-dim"}`}>
                    {label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <button onClick={() => go("contact")} className="rounded-xl bg-accent px-4 py-3 font-semibold text-[#06080f]">Let&apos;s connect</button>
                <button onClick={() => { onOpenResume(); setMenuOpen(false); }} className="flex items-center justify-center gap-2 rounded-xl glass-soft px-4 py-3 text-dim">
                  <FileText className="h-4 w-4" /> View résumé
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
