import { useState } from "react";
import { FolderGit2, Calendar, MapPin, ChevronDown, ChevronUp, Star, Sparkles, Filter, ExternalLink } from "lucide-react";
import { resumeData } from "../data/resumeData";

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // first item expanded by default
  const [filterMode, setFilterMode] = useState<"all" | "excel" | "python">("all");

  const experiences = [
    {
      id: 0,
      type: "python",
      title: "Sentiment Analysis System",
      org: "Smart India Hackathon (SIH)",
      role: "NLP Systems Lead & Developer",
      dates: "Hackathon Delegate (Python)",
      location: "SIH National Arena",
      stack: ["Python", "Pandas", "NumPy", "NLP", "Matplotlib"],
      link: undefined,
      bullets: [
        "Built NLP-based sentiment analysis model classifying text inputs as positive, negative, or neutral",
        "Performed comprehensive data preprocessing, cleaning, and feature extraction using Python Pandas and NumPy libraries",
        "Visualized text sentiment distribution and temporal trends with dashboards to highlight patterns and support decisions"
      ],
      impact: "Designed and built high-accuracy text sorting classifiers to extract structured polarities from unorganized inputs."
    },
    {
      id: 1,
      type: "excel",
      title: "Sales Dashboard Analysis",
      org: "Excel Analytics Sandbox",
      role: "Commercial Data Analyst",
      dates: "Jan - Mar 2026",
      location: "Remote Project",
      stack: ["Excel", "Pivot Tables", "VLOOKUP", "Charts", "Dynamic Filters"],
      link: "https://github.com/12Nafis12/excel-sales-dashboard",
      bullets: [
        "Cleaned and standardized raw sales data before building an interactive dashboard using Pivot Tables, Charts, and dynamic filters in Excel",
        "Analyzed sales by region, product category, and monthly trends to identify top performers",
        "Presented key insights through visual reports on Sales by Region, Monthly Sales Trends, and Top Products for leadership review"
      ],
      impact: "Mapped multi-dimensional sales funnels for instant C-suite performance updates."
    },
    {
      id: 2,
      type: "python",
      title: "AI Driven Metro Rail Project",
      org: "Smart India Hackathon (SIH)",
      role: "Transit Optimization Specialist",
      dates: "Hackathon Delegate (Python)",
      location: "SIH National Arena",
      stack: ["Python", "Transportation Datasets", "Data Visualizer", "Operational Planning"],
      link: undefined,
      bullets: [
        "Analyzed operational transportation datasets to identify layout and scheduling efficiency gaps",
        "Processed, calculated, and visualized operational parameters using Python to offer data-driven planning support"
      ],
      impact: "Automated timetabling simulation to resolve resource idle-state configurations."
    },
    {
      id: 3,
      type: "excel",
      title: "Forensic Data Analyst Simulation",
      org: "Deloitte Australia (Forage)",
      role: "Job Simulation Participant",
      dates: "March 2026",
      location: "Remote Simulation",
      stack: ["Tableau", "MS Excel", "Forensic Auditing", "Business Consulting"],
      link: undefined,
      bullets: [
        "Completed a realistic forensic data analysis simulation to inspect corporate accounting and operations anomalies",
        "Engineered business dashboards using Tableau for easy interactive drill-downs and audit reports",
        "Executed Excel formulas to interpret business data and present actionable recommendations to stakeholder teams"
      ],
      impact: "Demonstrated consulting proficiency in auditing operational logs and delivering interactive dashboards."
    }
  ];

  // Auto-pulled metrics/impact highlights from the resume
  const impactHighlights = [
    { text: "Smart India Hackathon delegate for NLP Sentiment Analysis & Metro Transit Logistics.", category: "National Competitions" },
    { text: "Built interactive dashboards using Tableau, Power BI, and Excel dynamic pivot matrices.", category: "Visualization Mastery" },
    { text: "Completed Deloitte Forensic Consulting Job Simulation solving remote forensics audit modules.", category: "Corporate Readiness" }
  ];

  const filteredExperiences = experiences.filter((item) => {
    if (filterMode === "all") return true;
    return item.type === filterMode;
  });

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="projects" className="py-20 max-w-6xl mx-auto px-6 text-white scroll-mt-20">
      {/* Decorative high-tech elements */}
      <div className="absolute right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid container */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left column: Expanded Experience Lists */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase font-semibold">Sandbox & Academic Experience</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight mt-1">
                Story <span className="text-slate-400 italic font-serif">Timeline</span>
              </h2>
            </div>

            {/* Quick tag filters */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-none border border-white/10">
              <button
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono rounded-none transition-colors cursor-pointer ${
                  filterMode === "all" ? "bg-orange-500 text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode("python")}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono rounded-none transition-colors cursor-pointer ${
                  filterMode === "python" ? "bg-orange-500 text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setFilterMode("excel")}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono rounded-none transition-colors cursor-pointer ${
                  filterMode === "excel" ? "bg-orange-500 text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                Excel
              </button>
            </div>
          </div>

          {/* Interactive Stacked Timeline Story Cards */}
          <div className="space-y-4">
            {filteredExperiences.map((exp) => {
              const isOpen = expandedIndex === exp.id;
              return (
                <div
                  key={exp.id}
                  className={`bg-white/[0.02] border transition-all duration-300 overflow-hidden rounded-none ${
                    isOpen ? "border-orange-500/35 shadow-[0_0_20px_rgba(249,115,22,0.03)]" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Card Header (Clickable Accordion) */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-6 flex items-start justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex gap-4">
                      {/* High-tech icons */}
                      <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0 group-hover:text-orange-400 transition-colors">
                        <FolderGit2 className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-wide">
                            {exp.title}
                          </h3>
                          {exp.link && (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-450 hover:text-orange-400 inline-flex items-center gap-0.5 text-xs font-mono shrink-0 ml-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <p className="text-xs font-sans text-slate-300 mt-1">
                          {exp.role} · <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">{exp.org}</span>
                        </p>
                        
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mt-2.5 flex-wrap">
                          <span className="flex items-center gap-1.5 uppercase">
                            <Calendar className="w-3 h-3 text-orange-500" />
                            {exp.dates}
                          </span>
                          <span className="flex items-center gap-1.5 uppercase">
                            <MapPin className="w-3 h-3 text-orange-500" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand Trigger Icon */}
                    <button className="p-1.5 bg-white/5 border border-white/10 text-slate-450 hover:text-white transition-all cursor-pointer">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expandable Panel Body */}
                  <div
                    className={`transition-all duration-350 ease-in-out ${
                      isOpen ? "max-h-[500px] border-t border-white/5" : "max-h-0 pointer-events-none"
                    }`}
                  >
                    <div className="p-6 bg-[#0c0a09]/10 space-y-4">
                      {/* Key bullets */}
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs font-sans font-light text-slate-300 flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-orange-500 shrink-0 mt-1.5" />
                            <span className="leading-relaxed opacity-90">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stacks badges */}
                      <div className="pt-3">
                        <span className="text-[9px] font-mono text-orange-500 uppercase tracking-widest block mb-2 font-semibold">
                          Project Tech Stack //
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.stack.map((item, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 text-[10px] font-mono bg-white/5 border border-white/10 text-orange-400"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Impact Highlight Badge */}
                      <div className="p-3.5 bg-orange-500/5 border border-orange-500/10 rounded-none flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-mono text-orange-400 font-bold uppercase tracking-wider">Impact Accomplishment</p>
                          <p className="text-xs font-sans font-light text-slate-300 mt-1 leading-relaxed opacity-90">{exp.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Highlights panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-[0.25em] text-orange-500 uppercase font-semibold">Impact Metrics Panel</span>
            <h2 className="text-2xl font-sans font-light tracking-tight text-white mt-1">
              Highlights
            </h2>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden flex flex-col gap-5 shadow-lg rounded-none">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 blur-xl rounded-full" />
            
            <div className="font-mono text-[9px] tracking-wider text-orange-500/60 pb-3 border-b border-white/5 flex items-center justify-between">
              <span>SANDBOX AUDITS</span>
              <span>AUTO PULLED</span>
            </div>

            {impactHighlights.map((hl, index) => (
              <div key={index} className="flex gap-3 items-start group">
                <div className="w-7 h-7 bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-orange-500 uppercase font-semibold">
                    {hl.category}
                  </span>
                  <p className="text-xs font-sans font-light text-slate-300 mt-0.5 leading-relaxed group-hover:text-white transition-colors">
                    {hl.text}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-none">
              <h4 className="font-mono text-[9px] text-orange-500 font-bold uppercase tracking-widest">Aspirant Status</h4>
              <p className="text-xs font-sans font-light text-slate-400 leading-relaxed mt-1">
                Completed {resumeData.education[0].institution} computer studies, currently open for placement partnerships and immediate internship integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
