import { GraduationCap, Award, ExternalLink, Calendar, MapPin, CornerDownRight } from "lucide-react";
import { resumeData as activePersona } from "../data/resumeData";

export default function EducationCerts() {
  
  return (
    <section id="education" className="py-20 max-w-6xl mx-auto px-6 text-white scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Side: Educational Accolades */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-10">
            <span className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase font-semibold">Academic Registries</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight mt-1">
              Education <span className="text-slate-400 italic font-serif">Background</span>
            </h2>
          </div>

          <div className="space-y-6">
            {activePersona.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden group hover:border-orange-500/20 transition-all rounded-none"
              >
                {/* Cyber laser node decoration */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0 mt-1">
                    <GraduationCap className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-wide">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-sans text-slate-300">{edu.institution}</p>
                    
                    <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-slate-405">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      <span className="uppercase">{edu.dates}</span>
                      <span className="text-slate-700">|</span>
                      <span className="uppercase">{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Industry Certifications */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-10">
            <span className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase font-semibold">Verified Credentials</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight mt-1">
              Industry <span className="text-slate-400 italic font-serif">Certifications</span>
            </h2>
          </div>

          <div className="space-y-6">
            {(activePersona.certifications || activePersona.experience.slice(0, 2)).map((cert, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden group hover:border-orange-500/20 transition-all rounded-none"
              >
                {/* Accent glow on list item hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/[0.04]" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shrink-0 mt-1">
                    <Award className="w-5 h-5 text-orange-500" />
                  </div>

                  <div className="space-y-3 w-full">
                    <div>
                      <h3 className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-wide">
                        {cert.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs font-sans text-slate-300 mt-1.5">
                        <span>{cert.issuer}</span>
                        <span className="font-mono text-[9px] text-orange-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-none uppercase tracking-wider">{cert.date}</span>
                      </div>
                    </div>

                    {/* Cert bullet breakdowns */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {cert.bullets.map((bullet, blIdx) => (
                        <div key={blIdx} className="text-xs font-sans font-light text-slate-400 flex items-start gap-1.5 leading-relaxed">
                          <CornerDownRight className="w-3 h-3 text-orange-500 shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
