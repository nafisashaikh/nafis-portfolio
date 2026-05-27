import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { resumeData } from '../data/resumeData';

// Format the resume data into a powerful system prompt for Gemini
const systemPrompt = `You are Nafis Abid Shaikh's official AI assistant, embedded on his portfolio website.
Your job is to answer questions from recruiters, hiring managers, and clients about Nafis's skills, experience, and projects.
Be professional, concise, enthusiastic, and confident. Never make up information. Use only the following data.

ABOUT NAFIS:
${resumeData.summary}

SKILLS:
${resumeData.skills.join(', ')}

EDUCATION:
${resumeData.education.map(e => `- ${e.degree} from ${e.university} (${e.duration})`).join('\n')}

EXPERIENCE:
${resumeData.experience.map(e => `- ${e.role} at ${e.company} (${e.duration}):\n  ${e.bullets.join('\n  ')}`).join('\n\n')}

PROJECTS:
${resumeData.projects.map(p => `- ${p.title} (${p.stack}):\n  ${p.bullets.join('\n  ')}`).join('\n\n')}

If someone asks for contact info, tell them to use the links in the header. Keep answers to 2-3 short paragraphs max.`;

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hi! I'm Nafis's AI Assistant. Ask me anything about his experience, projects, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key missing. The site administrator needs to configure VITE_GEMINI_API_KEY in the environment.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // We pass the conversation history and the system instruction to Gemini
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          // Inject system instructions as the very first context message (if the SDK supports system_instruction directly, that's better, but this is a safe fallback)
          { role: 'user', parts: [{ text: `SYSTEM INSTRUCTION (Do not reply to this directly, just follow the rules): ${systemPrompt}` }] },
          { role: 'model', parts: [{ text: "Understood. I am Nafis's AI Assistant. How can I help the user?" }] },
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
      });

      if (response.text) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: response.text }]);
      }
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      setError(err.message || "Failed to connect to the AI. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 hover:scale-110 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[500px] max-h-[80vh] flex flex-col bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-inner">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
              <p className="text-orange-400 text-xs">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-sm' 
                  : 'bg-white/10 text-slate-200 rounded-tl-sm border border-white/5'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start animate-pulse">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience..."
              disabled={isLoading}
              className="w-full bg-slate-900/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-50 disabled:hover:bg-orange-500 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
