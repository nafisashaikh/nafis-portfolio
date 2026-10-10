import { useState, useRef, useEffect, type FormEvent } from "react";
import { X, Send, Sparkles, User } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { resumeData as d } from "../data/resumeData";

type Message = { id: string; role: "user" | "model"; content: string };

const SYSTEM_PROMPT = `You are the AI assistant on Nafis Shaikh's portfolio. Answer questions from recruiters and hiring managers about his skills, experience, and projects. Be professional, concise, and confident. Never invent facts — use only the data below. Keep answers to 2-3 short paragraphs.

ABOUT: ${d.basics.about} Focus areas: ${d.basics.disciplines.join(", ")}. ${d.basics.availability}.

SKILLS:
${d.skills.map((s) => `${s.category}: ${s.items.join(", ")}`).join("\n")}

EXPERIENCE:
${d.experience.map((e) => `${e.role} at ${e.company} (${e.dates}): ${e.bullets.join(" ")}`).join("\n")}

PROJECTS:
${d.projects.map((p) => `${p.title} [${p.status}] (${p.stack.join(", ")}): ${p.problem} ${p.approach}`).join("\n")}

EDUCATION:
${d.education.map((e) => `${e.degree}, ${e.institution} (${e.dates}${e.result ? ", " + e.result : ""})`).join("\n")}

For contact, point them to the contact section, email (${d.basics.email}), LinkedIn, or GitHub.`;

const QUICK_REPLIES = [
  "What are Nafis's top skills?",
  "Tell me about the Cipla internship",
  "How can I get in touch?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", content: "Hi — I'm Nafis's assistant. Ask me about his experience, projects, or skills." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const send = async (e?: FormEvent, override?: string) => {
    e?.preventDefault();
    const text = (override ?? input).trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const history = [...messages, { id: Date.now().toString(), role: "user" as const, content: text }];
    setMessages(history);
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("The assistant isn't configured yet — please use the contact section to reach Nafis directly.");
      const ai = new GoogleGenAI({ apiKey });
      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `Follow these rules: ${SYSTEM_PROMPT}` }] },
          { role: "model", parts: [{ text: "Understood — I'll answer as Nafis's assistant." }] },
          ...history.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
        ],
      });
      if (res.text) setMessages((p) => [...p, { id: Date.now().toString(), role: "model", content: res.text as string }]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-root">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
        className={`fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-cyan text-[#06080f] shadow-[0_12px_30px_-8px_rgba(119,146,255,0.6)] transition-all duration-300 hover:scale-105 ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <div
        role="dialog"
        aria-label="AI assistant"
        className={`fixed bottom-6 right-4 left-4 z-40 flex h-[32rem] max-h-[76vh] flex-col rounded-2xl glass transition-all duration-300 sm:left-auto sm:right-6 sm:w-[26rem] ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        style={{ transformOrigin: "bottom right" }}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--color-line)] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-cyan text-[#06080f]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">Assistant</h3>
              <p className="text-xs text-muted">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-8 w-8 place-items-center rounded-lg text-dim transition-colors hover:bg-white/[0.06] hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "model" && (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full glass-soft text-accent"><Sparkles className="h-3.5 w-3.5" /></span>
              )}
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-accent text-[#06080f]" : "bg-white/[0.05] text-ink"}`}>
                {m.content}
              </div>
              {m.role === "user" && (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full glass-soft text-dim"><User className="h-3.5 w-3.5" /></span>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full glass-soft text-accent"><Sparkles className="h-3.5 w-3.5" /></span>
              <div className="flex items-center gap-1 rounded-2xl bg-white/[0.05] px-4 py-3">
                {[0, 0.2, 0.4].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-dim" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
          )}
          {error && <p className="rounded-lg bg-white/[0.05] px-3 py-2 text-center text-xs text-danger">{error}</p>}
          <div ref={endRef} />
        </div>
        {!loading && messages.length < 3 && (
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {QUICK_REPLIES.map((q) => (
              <button key={q} onClick={() => send(undefined, q)} className="rounded-full glass-soft px-3 py-1.5 text-xs text-dim transition-colors hover:text-ink">
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => send(e)} className="border-t border-[color:var(--color-line)] p-3">
          <div className="relative flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my work…"
              aria-label="Message"
              disabled={loading}
              className="w-full rounded-full border border-[color:var(--color-line)] bg-white/[0.03] py-3 pl-4 pr-12 text-sm text-ink placeholder-muted focus:border-[color:var(--color-accent)] focus:outline-none disabled:opacity-50"
            />
            <button type="submit" disabled={!input.trim() || loading} aria-label="Send" className="absolute right-1.5 grid h-9 w-9 place-items-center rounded-full bg-accent text-[#06080f] transition-colors hover:bg-accent-soft disabled:opacity-40">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
