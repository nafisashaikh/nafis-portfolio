export interface Project {
  title: string;
  stack: string;
  link?: string;
  bullets: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  dates: string;
  location: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  bullets: string[];
}

export interface AchievementItem {
  title: string;
  context: string;
  badge?: string;
}

export interface ResumeData {
  basics: {
    name: string;
    titles: string[];
    summary: string;
    objective: string;
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    lookingFor: string;
  };
  experience: ExperienceItem[];
  projects: Project[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  extra: string[];
}
