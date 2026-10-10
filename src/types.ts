export type ProjectStatus = "Completed" | "Prototype" | "Research" | "In Progress";
export type Accent = "blue" | "cyan";
export type Visual =
  | "bars" | "area" | "network" | "scatter" | "feed"
  | "map" | "satellite" | "gauge" | "pulse";

export type ProjectCategory =
  | "AI & ML"
  | "Software & Full-Stack"
  | "Data & Analytics"
  | "Engineering & Research";

export interface ProjectDetails {
  architecture?: string;
  challenges?: string;
  whatWorks?: string;
  whatsNext?: string;
}

export interface Project {
  title: string;
  tagline: string;
  category: string; // display label, e.g. "AI · Geospatial"
  categories: ProjectCategory[]; // used by the filter
  status: ProjectStatus;
  featured?: boolean;
  visual: Visual;
  image?: string; // real screenshot URL (falls back to visual on error)
  year?: string;
  stack: string[];
  problem: string;
  approach: string;
  contribution?: string;
  features?: string[];
  details?: ProjectDetails;
  note?: string; // honest limitation / clarification
  github?: string;
  demo?: string;
  accent?: Accent;
}

export interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  bullets: string[];
  tools: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  dates: string;
  location: string;
  result?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  detail: string;
}

export interface AboutTheme {
  title: string;
  body: string;
}

export interface Highlight {
  value: string;
  label: string;
  note?: string;
}

export interface SkillGroup {
  category: string;
  blurb: string;
  items: string[];
}

export interface ResumeData {
  basics: {
    name: string;
    fullName: string;
    headline: string;
    subhead: string;
    about: string;
    disciplines: string[];
    availability: string;
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    lookingFor: string;
  };
  about: AboutTheme[];
  highlights: Highlight[];
  experience: ExperienceItem[];
  projects: Project[];
  skills: SkillGroup[];
  education: EducationItem[];
  certifications: CertificationItem[];
}
