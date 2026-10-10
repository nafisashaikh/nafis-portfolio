export type ProjectStatus = "Completed" | "Prototype" | "Research" | "In Progress";
export type Accent = "blue" | "cyan";

export interface Project {
  title: string;
  tagline: string;
  category: string;
  status: ProjectStatus;
  year?: string;
  stack: string[];
  problem: string;
  approach: string;
  contribution?: string;
  features?: string[];
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
