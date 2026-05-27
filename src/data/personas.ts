import { ResumeData } from "../types";
import { resumeData as baseData } from "./resumeData";

// Utility to clone the base data and merge overrides
const createPersona = (id: string, overrides: Partial<ResumeData>): ResumeData & { id: string } => {
  return {
    id,
    ...baseData,
    ...overrides,
    basics: { ...baseData.basics, ...overrides.basics }
  };
};

export const personas: Record<string, ResumeData & { id: string }> = {
  "data-analyst": {
    id: "data-analyst",
    ...baseData
  },
  
  "full-stack": createPersona("full-stack", {
    basics: {
      ...baseData.basics,
      titles: ["Full Stack Developer", "Python Backend", "Web Development", "SQL Database Admin"],
      objective: "Motivated Computer Engineering student with hands-on full stack development experience, including web application development, backend data management, and frontend dashboards. Eager to contribute to end-to-end software solutions."
    },
    skills: [
      { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "Data Visualization (Matplotlib)", "React"] },
      { category: "Backend", items: ["Python", "MySQL", "REST Concepts", "Data Processing"] },
      { category: "Tools", items: ["VS Code", "GitHub", "MySQL Workbench", "Postman"] },
      { category: "Concepts", items: ["CRUD Operations", "User Management", "Dashboard Design", "Data Handling"] }
    ],
    projects: [
      {
        title: "Sehtsetu - Healthcare Web Application",
        stack: "Full Stack Development",
        link: "https://github.com/nafisashaikh",
        bullets: [
          "Developed a full stack healthcare web application with user data management and service features",
          "Handled backend data operations, form management, and user session handling",
          "Designed and integrated data entry and display modules for healthcare services"
        ]
      },
      ...baseData.projects
    ]
  }),

  "ui-ux": createPersona("ui-ux", {
    basics: {
      ...baseData.basics,
      titles: ["UI/UX Designer", "Visual Communication", "Dashboard UI", "Figma Expert"],
      objective: "Creative Computer Engineering student with hands-on experience designing interactive dashboards, data visualizations, and web application interfaces. Passionate about user-centered design, building intuitive and visually clear experiences across web and data platforms."
    },
    skills: [
      { category: "UI/UX Tools", items: ["Figma", "Adobe XD", "Canva", "Tableau", "Excel Dashboard Design"] },
      { category: "Design Concepts", items: ["Information Architecture", "Visual Hierarchy", "User Flow", "Dashboard Layout"] },
      { category: "Technical", items: ["HTML/CSS", "Python (Matplotlib)"] },
      { category: "Soft Skills", items: ["User Empathy", "Creative Problem Solving", "Storytelling with Data"] }
    ],
    projects: [
      {
        title: "Sehtsetu - Healthcare Web App UI",
        stack: "Figma UI/UX",
        link: "https://github.com/nafisashaikh",
        bullets: [
          "Designed the user interface and navigation flow for a healthcare service application",
          "Focused on clean layout, accessibility, and ease-of-use for healthcare users",
          "Created data input forms and display screens with usability-first approach"
        ]
      },
      {
        title: "Sales Dashboard - Interactive UI Design",
        stack: "Excel UI",
        link: "https://github.com/nafisashaikh/excel-sales-dashboard",
        bullets: [
          "Designed an interactive, visually intuitive sales dashboard with clear information hierarchy",
          "Crafted user-friendly filter controls (slicers), charts, and layout for non-technical audiences"
        ]
      }
    ]
  }),

  "system-engineer": createPersona("system-engineer", {
    basics: {
      ...baseData.basics,
      titles: ["Associate System Engineer", "Data Processing", "SDLC Expert", "System Analysis"],
      objective: "Motivated Associate System Engineer candidate with solid foundation in system design, data processing, and software development. Experienced in building end-to-end systems using Python, SQL, and web technologies."
    },
    skills: [
      { category: "Languages & DB", items: ["Python", "SQL", "JavaScript", "MySQL"] },
      { category: "Data & ETL", items: ["Pandas", "NumPy", "Data Cleaning", "Data Pipelines"] },
      { category: "Concepts", items: ["SDLC", "Agile", "OOP", "REST APIs", "System Architecture"] },
      { category: "Tools", items: ["Git", "VS Code", "Linux"] }
    ],
    experience: [
      {
        company: "Smart India Hackathon (SIH)",
        role: "System Engineer / NLP Specialist",
        dates: "2024",
        location: "Mumbai",
        bullets: [
          "Engineered automated NLP pipeline: data ingestion -> preprocessing -> model inference -> visual reporting",
          "Performed system-level debugging and optimization to improve processing throughput"
        ]
      },
      ...baseData.experience
    ]
  }),

  "app-developer": createPersona("app-developer", {
    basics: {
      ...baseData.basics,
      titles: ["App Developer", "Android (Learning)", "Flutter (Learning)", "Cross-Platform Dev"],
      objective: "Enthusiastic about mobile app development using Android and Flutter; actively building skills to create cross-platform, data-driven mobile applications with solid backend integration."
    },
    skills: [
      { category: "Mobile Dev", items: ["Android (Learning)", "Flutter (Learning)", "Cross-Platform Concepts"] },
      { category: "Programming", items: ["Python", "SQL", "JavaScript"] },
      { category: "Backend/Data", items: ["REST APIs", "User Data Handling", "MySQL"] }
    ]
  }),

  "graphic-designer": createPersona("graphic-designer", {
    basics: {
      ...baseData.basics,
      titles: ["Graphic Designer", "Visual Communication", "Branding", "Digital & Print Design"],
      objective: "Creative and detail-oriented Graphic Designer with hands-on experience in UI/UX design, data visualization, dashboard design, and web application interfaces. Skilled in typography, layout, and branding."
    },
    skills: [
      { category: "Design Tools", items: ["Figma", "Canva", "Adobe XD"] },
      { category: "Visual Design", items: ["Typography", "Color Theory", "Layout Design", "Style Guides"] },
      { category: "Branding", items: ["Logo Design", "Brand Identity"] },
      { category: "Data Viz", items: ["Dashboard Design", "Infographics", "Charts"] }
    ]
  }),

  "ai-tech": createPersona("ai-tech", {
    basics: {
      ...baseData.basics,
      titles: ["AI & Tech Intern", "Machine Learning", "Python", "Data Analysis"],
      objective: "Enthusiastic Computer Engineering student with practical experience in AI/ML projects including sentiment analysis and data-driven transportation systems. Looking for an AI/Tech internship to apply Python, data analysis, and machine learning skills in a real-world setting."
    },
    skills: [
      { category: "AI/ML", items: ["Sentiment Analysis", "NLP (Text Preprocessing, Feature Extraction)", "Data Modeling"] },
      { category: "Python", items: ["Pandas", "NumPy", "Matplotlib", "Functions", "Data Cleaning"] },
      { category: "Data Tools", items: ["MS Excel (Pivot Tables, Charts)", "Tableau", "MySQL"] },
      { category: "Other", items: ["GitHub", "VS Code", "Google Colab"] }
    ],
    projects: [
      {
        title: "Sentiment Analysis System - NLP (SIH Hackathon)",
        stack: "Machine Learning / NLP",
        link: "https://github.com/nafisashaikh",
        bullets: [
          "Developed ML-based sentiment classification model for analyzing public text data",
          "Applied NLP preprocessing: tokenization, stopword removal, and text normalization",
          "Visualized sentiment insights using Python (Matplotlib, Pandas) with actionable reporting"
        ]
      },
      {
        title: "AI Driven Metro Rail - Smart India Hackathon",
        stack: "AI / Data Analytics",
        link: "https://github.com/nafisashaikh",
        bullets: [
          "Built AI-assisted data analysis solution for metro transportation efficiency optimization",
          "Processed large transportation datasets to detect patterns and support planning decisions",
          "Presented data-driven recommendations using Python visualizations"
        ]
      },
      {
        title: "Sales Dashboard - Predictive Analytics (Excel)",
        stack: "Excel Predictive Analysis",
        link: "https://github.com/nafisashaikh/excel-sales-dashboard",
        bullets: [
          "Analyzed multi-dimensional sales data to surface trends and forecast patterns",
          "Created interactive dashboards combining region, product, and temporal analysis"
        ]
      },
      {
        title: "Sehtsetu - AI-Assisted Healthcare Web App",
        stack: "Full Stack / Data",
        link: "https://github.com/nafisashaikh",
        bullets: [
          "Integrated data handling logic for healthcare record management and user services"
        ]
      }
    ]
  })
};
