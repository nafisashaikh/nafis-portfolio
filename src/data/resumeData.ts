import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  basics: {
    name: "Nafis Shaikh",
    fullName: "Nafis Abid Shaikh",
    headline: "Turning complex data into clear decisions.",
    subhead:
      "I'm Nafis Shaikh, a Computer Engineering student focused on data analytics and AI-driven solutions. I turn raw information into meaningful insights, interactive dashboards, and practical technology products.",
    about:
      "I'm a final-year Computer Engineering student with a strong interest in data analytics, business intelligence, and AI-powered applications. I enjoy working at the intersection of data, technology, and problem-solving — cleaning complex datasets, uncovering patterns, building dashboards, and developing solutions that address real-world needs.",
    disciplines: ["Data Analytics", "Business Intelligence", "AI-Driven Solutions"],
    availability: "Open to full-time Data Analyst & BI roles",
    location: "Palghar, Maharashtra, India",
    email: "nafisabidshaikh12@gmail.com",
    phone: "+91 95796 55849",
    github: "https://github.com/nafisashaikh",
    linkedin: "https://www.linkedin.com/in/nafisshaikh",
    lookingFor:
      "I'm interested in opportunities where analytical thinking, data, and technology create practical value — full-time Data Analyst, Business Intelligence, or MIS roles. If you're hiring, collaborating, or exploring an idea, I'd be glad to connect.",
  },

  about: [
    {
      title: "Analytical thinking",
      body: "I transform raw, messy datasets into structured, trustworthy information — cleaning, validating, and modelling data so the numbers can actually be relied on.",
    },
    {
      title: "Practical problem-solving",
      body: "I build around real requirements, not technology for its own sake. Each dashboard or tool starts from the decision it needs to support.",
    },
    {
      title: "Continuous learning",
      body: "I grow my skills through projects, experimentation, and hands-on work — from BI dashboards to sentiment analysis and AI-assisted prototypes.",
    },
  ],

  highlights: [
    {
      value: "~20,000",
      label: "Employee survey responses analyzed",
      note: "Cross-question sentiment analysis in Power BI",
    },
    {
      value: "3 months",
      label: "Data Analyst internship at Cipla",
      note: "HR analytics reporting, Jun–Sep 2026",
    },
    {
      value: "6",
      label: "Analytics & AI projects shipped",
      note: "Dashboards, NLP, and applied prototypes",
    },
    {
      value: "2",
      label: "Industry certifications",
      note: "freeCodeCamp · Deloitte (Forage)",
    },
  ],

  experience: [
    {
      company: "Cipla",
      role: "Data Analyst Intern",
      dates: "Jun 2026 – Sep 2026",
      location: "Mumbai, India",
      summary:
        "A three-month internship turning HR survey and operational data into clear, decision-ready reporting.",
      bullets: [
        "Cleaned and structured employee survey datasets for HR analytics reporting, cutting manual data-prep effort and turnaround time for stakeholder deliverables.",
        "Built and maintained dashboards and visual reports in Power BI and Excel, translating raw survey and operational data into clear, actionable summaries.",
        "Used SQL and Excel to surface trends and anomalies across reporting datasets, supporting data-driven decisions through HR reporting cycles.",
      ],
      tools: ["Power BI", "Excel", "SQL", "DAX"],
    },
  ],

  projects: [
    {
      title: "Employee Sentiment Analysis Dashboard",
      tagline: "Reading the mood of ~20,000 survey responses at a glance.",
      category: "Business Intelligence · HR Analytics",
      status: "Completed",
      stack: ["Power BI", "DAX", "Power Query (ETL)", "Data Modelling"],
      problem:
        "Large employee surveys (~20,000 responses across many questions) are hard to read in raw form, making engagement trends easy to miss.",
      approach:
        "Built a Power BI dashboard with a wide-to-long data transformation and DAX measures so sentiment can be compared across every question and department.",
      contribution:
        "Owned the data model, the ETL shaping, and the visual design end to end.",
      features: [
        "Positive / neutral / negative classification per question",
        "Department- and question-level drill-downs",
        "Clustered visuals that expose engagement patterns",
      ],
      github: "https://github.com/nafisashaikh",
      accent: "blue",
    },
    {
      title: "Sales Analytics Dashboard",
      tagline: "Turning flat sales data into an interactive performance view.",
      category: "Business Intelligence · Excel",
      status: "Completed",
      stack: ["Excel", "Power Pivot", "DAX", "VBA", "Pivot Tables"],
      problem:
        "Evaluating revenue across regions, categories, and months meant rebuilding static reports by hand every cycle.",
      approach:
        "Built an interactive Excel dashboard with pivot tables, slicers, and charts to analyse performance dynamically by region, category, and month.",
      contribution:
        "Designed the KPI layout and the sales-by-region, monthly-trend, and top-product views.",
      features: [
        "Slicer-driven filtering across dimensions",
        "KPI cards for revenue and top performers",
        "Monthly trend and top-product breakdowns",
      ],
      github: "https://github.com/12Nafis12/excel-sales-dashboard",
      accent: "cyan",
    },
    {
      title: "SehatSetu — Rural Healthcare Platform",
      tagline: "Preliminary care guidance for low-connectivity regions.",
      category: "Full-Stack · Healthcare",
      status: "Prototype",
      stack: ["React", "Python", "MySQL", "REST APIs"],
      problem:
        "Rural healthcare suffers from fragmented patient data and limited telemedicine coverage, often over unreliable connections.",
      approach:
        "Built a telemedicine web prototype covering backend data handling and patient-record management, with workflows designed for low-connectivity environments.",
      contribution:
        "Focused on the backend data model, APIs, and patient-data management.",
      features: [
        "Preliminary symptom guidance flow",
        "Telemedicine and local medical-resource workflows",
        "Offline-friendly design for weak connectivity",
      ],
      note: "Prototype built for the Nabha region — not a clinically validated medical product.",
      github: "https://github.com/nafisashaikh/sehtsetu",
      demo: "https://sehtsetu-demo.vercel.app",
      accent: "cyan",
    },
    {
      title: "OceanEmbed",
      tagline: "Reconstructing 3D ocean temperature from surface signals.",
      category: "AI Research · Geospatial",
      status: "Research",
      stack: ["Python", "Machine Learning", "Satellite / Ocean Data"],
      problem:
        "Subsurface ocean temperature is expensive to measure directly, while satellites observe mostly the surface.",
      approach:
        "An exploratory study of how satellite-derived ocean-surface observations and supporting data could help reconstruct three-dimensional ocean temperature patterns.",
      contribution:
        "Framing the problem, methodology, and technical architecture.",
      features: [
        "Satellite surface observations as model inputs",
        "Proposed mapping to subsurface temperature profiles",
      ],
      note: "Active research — methodology proposed; results not yet validated.",
      accent: "blue",
    },
    {
      title: "Sentiment Analysis System",
      tagline: "Classifying opinion from unstructured text.",
      category: "Python · NLP",
      status: "Completed",
      stack: ["Python", "Pandas", "Matplotlib", "NLP"],
      problem:
        "Making sense of large volumes of free-text opinion requires automated, consistent classification.",
      approach:
        "Built a Python model to classify text as positive, negative, or neutral, developed as a Smart India Hackathon submission.",
      contribution:
        "Handled preprocessing, text cleaning, and result visualization.",
      features: [
        "Text preprocessing and cleaning pipeline",
        "Positive / negative / neutral classification",
        "Visual summaries of sentiment distribution",
      ],
      note: "Smart India Hackathon — participant submission.",
      github: "https://github.com/nafisashaikh/sentiment-engine",
      accent: "blue",
    },
    {
      title: "AI News Platform",
      tagline: "Distilling the firehose into categorized briefs.",
      category: "Full-Stack · NLP",
      status: "Completed",
      stack: ["Next.js", "Python", "NLP", "PostgreSQL"],
      problem:
        "Readers are overwhelmed by information overload and struggle to find concise, categorized news.",
      approach:
        "Built an automated aggregation pipeline that uses NLP to distill article feeds into short, categorized intelligence briefs.",
      contribution:
        "Built the aggregation pipeline and the responsive reading frontend.",
      features: [
        "Automated article aggregation",
        "NLP summarization into briefs",
        "Category-based real-time feed",
      ],
      demo: "https://news-intelligence-platform-frontend.vercel.app/",
      accent: "cyan",
    },
  ],

  /* SKILLS_PLACEHOLDER */
  skills: [
    {
      category: "Data Analytics",
      blurb: "Shaping and interrogating raw data.",
      items: [
        "Python",
        "Pandas",
        "NumPy",
        "SQL (MySQL)",
        "Exploratory Data Analysis",
        "Data Cleaning & Validation",
      ],
    },
    {
      category: "Business Intelligence",
      blurb: "Turning data into dashboards and reporting.",
      items: [
        "Microsoft Excel",
        "Power Pivot",
        "DAX",
        "VBA",
        "Power BI",
        "Tableau",
        "Dashboard Design",
      ],
    },
    {
      category: "AI & Intelligent Apps",
      blurb: "Applied language and data-driven features.",
      items: [
        "Sentiment Analysis",
        "NLP Fundamentals",
        "Text Preprocessing",
        "AI API Integration",
        "Data-Driven Apps",
      ],
    },
    {
      category: "Development & Tools",
      blurb: "Building and shipping the surrounding product.",
      items: [
        "Git & GitHub",
        "JavaScript / TypeScript",
        "React",
        "Next.js",
        "REST APIs",
        "Tailwind CSS",
      ],
    },
  ],

  education: [
    {
      institution: "University of Mumbai",
      degree: "B.E., Computer Engineering",
      dates: "Final year (lateral entry)",
      location: "Mumbai, India",
    },
    {
      institution: "M.S.B.T.E., Mumbai",
      degree: "Diploma in Computer Engineering",
      dates: "May 2024",
      location: "Mumbai, India",
      result: "73.89%",
    },
    {
      institution: "University of Mumbai",
      degree: "S.S.C.",
      dates: "Mar 2021",
      location: "Mumbai, India",
      result: "73.60%",
    },
  ],

  certifications: [
    {
      name: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "Dec 2025",
      detail: "Python, Pandas, NumPy, data cleaning, and visualization.",
    },
    {
      name: "Data Analytics Job Simulation",
      issuer: "Deloitte Australia · Forage",
      date: "Mar 2026",
      detail: "Built a Tableau dashboard and used Excel to classify data and draw business conclusions.",
    },
  ],
};
