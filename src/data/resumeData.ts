import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  basics: {
    name: "NAFIS ABID SHAIKH",
    titles: [
      "Data Analyst Intern",
      "Computer Engineer (B.E.)",
      "Power BI & Excel Specialist",
      "Python & SQL Analyst",
      "Full Stack Developer"
    ],
    summary: "Final-year Computer Engineering student (B.E., lateral entry) and Data Analyst Intern at Cipla, with hands-on experience turning raw datasets into Power BI dashboards and actionable reporting. Skilled in SQL, Python (Pandas), and Excel (Power Pivot, DAX, VBA), with a track record of self-driven projects spanning sentiment analysis, ETL pipelines, and BI systems.",
    objective: "Final-year Computer Engineering student (B.E., lateral entry) and Data Analyst Intern at Cipla, with hands-on experience turning raw datasets into Power BI dashboards and actionable reporting. Skilled in SQL, Python (Pandas), and Excel (Power Pivot, DAX, VBA), with a track record of self-driven projects spanning sentiment analysis, ETL pipelines, and BI systems. Seeking a full-time Data Analyst role to apply and grow these skills in a professional environment.",
    location: "Saphale, Palghar, Maharashtra – 401102",
    email: "nafisabidshaikh12@gmail.com",
    phone: "9579655849",
    github: "https://github.com/nafisashaikh",
    linkedin: "https://www.linkedin.com/in/nafisshaikh",
    lookingFor: "Seeking a full-time Data Analyst role to apply and grow SQL, Python (Pandas), Excel (Power Pivot, DAX, VBA), and Power BI skills in a professional environment."
  },
  experience: [
    {
      company: "Cipla",
      role: "Data Analyst Intern",
      dates: "Jun 2026 – Present",
      location: "Mumbai, India",
      bullets: [
        "Clean and structure employee survey datasets for HR analytics reporting, reducing manual data-prep effort and turnaround time for stakeholder deliverables.",
        "Build and maintain dashboards and visual reports in Power BI/Excel, translating raw survey and operational data into clear, actionable summaries for internal stakeholders.",
        "Apply SQL and Excel to identify trends and anomalies within reporting datasets, supporting data-driven decisions across HR reporting cycles."
      ]
    },
    {
      company: "Smart India Hackathon (SIH)",
      role: "System Engineer & NLP Specialist",
      dates: "2024",
      location: "Mumbai (National Challenge)",
      bullets: [
        "Engineered an automated NLP pipeline involving data ingestion, preprocessing, model inference, and visual reporting.",
        "Developed a sentiment analysis model classifying raw text inputs with high accuracy as part of a Smart India Hackathon submission.",
        "Analyzed operational transportation datasets to identify efficiency gaps for an 'AI Driven Metro Rail Project'.",
        "Performed system-level debugging and optimization to improve processing throughput."
      ]
    },
    {
      company: "Deloitte Australia (Forage)",
      role: "Forensic Data Analyst Intern",
      dates: "Mar 2026",
      location: "Remote Simulation",
      bullets: [
        "Completed a realistic forensic corporate data analysis simulation.",
        "Built a detailed Tableau dashboard to audit corporate data patterns and surface anomalies.",
        "Utilized advanced Excel modeling to analyze metrics and draw verified business conclusions for stakeholders."
      ]
    }
  ],
  projects: [
    {
      title: "Sales Dashboard Analysis (Excel)",
      stack: "Excel, Pivot Tables, Power Pivot, DAX, VBA, Slicers",
      link: "https://github.com/12Nafis12/excel-sales-dashboard",
      demoLink: "https://github.com/12Nafis12/excel-sales-dashboard",
      problem: "Evaluating multi-dimensional revenue metrics across regions, categories, and monthly timelines required static manual reporting.",
      solution: "Built an interactive sales dashboard using Excel Pivot Tables, Charts, and Slicers to dynamically analyze performance by region, category, and month.",
      impact: "Identified top-performing regions and products, presenting insights through Sales-by-Region, Monthly Trend, and Top-Products visual reports."
    },
    {
      title: "Employee Sentiment Analysis Dashboard",
      stack: "Power BI, DAX, Data Transformation, ETL, HR Analytics",
      link: "https://github.com/nafisashaikh",
      demoLink: "https://github.com/nafisashaikh",
      problem: "Organizations needed an efficient cross-question sentiment tracking system for large employee survey datasets (~20,000 responses).",
      solution: "Built a Power BI dashboard analyzing sentiment across ~20,000 employee survey responses, using DAX measures and a wide-to-long data transformation for cross-question comparison.",
      impact: "Designed clustered visualizations by question and sentiment to help identify engagement trends."
    },
    {
      title: "Sentiment Analysis System",
      stack: "Python, Pandas, Matplotlib, NLP, Text Preprocessing",
      link: "https://github.com/nafisashaikh/sentiment-engine",
      demoLink: "https://github.com/nafisashaikh/sentiment-engine",
      problem: "Categorizing public opinion and sentiment from unstructured text data required automated classification.",
      solution: "Built a sentiment analysis model in Python to classify public sentiment (positive/negative/neutral) from text data, as part of a Smart India Hackathon submission.",
      impact: "Performed data preprocessing, text cleaning, and result visualization for high-accuracy sentiment detection."
    },
    {
      title: "SehtSetu — Rural Healthcare Web Platform",
      stack: "React, Python, MySQL, REST APIs, Telemedicine",
      link: "https://github.com/nafisashaikh/sehtsetu",
      demoLink: "https://sehtsetu-demo.vercel.app",
      problem: "Rural healthcare coordination suffered from fragmented patient data management and limited telemedicine coverage.",
      solution: "Developed a telemedicine web application for rural healthcare access, covering backend data handling and user data management.",
      impact: "Streamlined healthcare delivery and patient management for Nabha, Punjab and 173 surrounding villages."
    },
    {
      title: "AI News Platform",
      stack: "Next.js, Python, OpenAI API, PostgreSQL",
      link: "https://github.com/nafisashaikh",
      demoLink: "https://news-intelligence-platform-frontend.vercel.app/",
      problem: "Readers are overwhelmed by information overload and struggle to find concise, categorized global news.",
      solution: "Engineered an automated aggregation pipeline using advanced NLP to distill article feeds into actionable intelligence briefs.",
      impact: "Delivered a responsive frontend ecosystem providing real-time, categorized news intelligence at a glance."
    }
  ],
  skills: [
    {
      category: "Languages & Tools",
      items: [
        "Python (Pandas, Matplotlib)",
        "SQL (MySQL)",
        "MS Excel (Power Pivot, DAX, VBA, Pivot Tables)",
        "Power BI",
        "Tableau",
        "VS Code",
        "GitHub"
      ]
    },
    {
      category: "Core Skills",
      items: [
        "Data Cleaning",
        "Data Analysis",
        "Data Visualization",
        "Dashboarding",
        "Basic Data Modeling",
        "ETL Data Pipelines"
      ]
    },
    {
      category: "Web & Frameworks",
      items: [
        "React",
        "Next.js",
        "JavaScript / TypeScript",
        "HTML5 & CSS3",
        "REST APIs",
        "Tailwind CSS"
      ]
    },
    {
      category: "Analytics & Techniques",
      items: [
        "DAX Measures",
        "Sentiment Analysis",
        "HR Analytics",
        "Pivot Reporting",
        "Text Preprocessing"
      ]
    }
  ],
  education: [
    {
      institution: "University of Mumbai",
      degree: "Bachelor of Engineering, Computer Engineering",
      dates: "Pursuing (Final Year)",
      location: "Mumbai, India"
    },
    {
      institution: "M.S.B.T.E., Mumbai",
      degree: "Diploma in Computer Engineering",
      dates: "May 2024 — 73.89%",
      location: "Mumbai, India"
    },
    {
      institution: "University of Mumbai",
      degree: "S.S.C.",
      dates: "Mar 2021 — 73.60%",
      location: "Mumbai, India"
    }
  ],
  certifications: [
    {
      name: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "Dec 2025",
      bullets: [
        "Python, Pandas, NumPy, data cleaning, and visualization."
      ]
    },
    {
      name: "Data Analytics Job Simulation",
      issuer: "Deloitte Australia, Forage",
      date: "Mar 2026",
      bullets: [
        "Built a Tableau dashboard and used Excel to classify data and draw business conclusions."
      ]
    }
  ],
  achievements: [
    {
      title: "Data Analyst Intern @ Cipla",
      context: "Building Power BI and Excel dashboards for HR analytics reporting, analyzing survey datasets with SQL and DAX.",
      badge: "Industry Experience"
    },
    {
      title: "Employee Sentiment Analysis (~20k Responses)",
      context: "Transformed survey datasets and designed clustered Power BI visual reports to track employee engagement trends.",
      badge: "Power BI & DAX"
    },
    {
      title: "SehtSetu Telemedicine Platform",
      context: "Developed backend data infrastructure serving Nabha, Punjab and 173 surrounding villages.",
      badge: "Healthcare Impact"
    }
  ],
  extra: [
    "Seeking a full-time Data Analyst role to apply and grow SQL, Python, Excel, and BI skills.",
    "Feel free to connect or contact me via email or LinkedIn!"
  ]
};

