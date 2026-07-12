export const NAME = "Parth Patidar";

export const SOCIAL_LINKS = {
  github: "https://github.com/parthpatidar03",
  linkedin: "https://www.linkedin.com/in/patidar-parth/",
  email: "parthpatidar202@gmail.com",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/12AYv-pRTZCvLIgfA4IeyaqQQEqw0Jq5u/view";

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export const STATS = [
  { value: "10+", label: "Projects shipped" },
  { value: "300+", label: "DSA problems solved" },
  { value: "2+", label: "Years building" },
];

export const PROJECTS = [
  {
    title: "QuestXP",
    subtitle: "High-performance learning platform",
    date: "Jun 2026",
    tech: ["React", "Node.js", "Express", "MongoDB", "BullMQ", "Pinecone", "Azure"],
    description:
      "Transforms YouTube playlists into structured, gamified courses with streaks, leaderboards, and a RAG doubt-solving chatbot.",
    features: [
      "AI course generation pipeline built on BullMQ, the YouTube API, and GPT-4o-mini",
      "RAG doubt chatbot grounded in lecture content via Pinecone and OpenAI embeddings",
      "Adaptive study plans from a custom greedy allocation engine with daily recalculation",
    ],
    github: "https://github.com/parthpatidar03/QuestXP",
    live: "https://www.questxp.in/",
    featured: true,
  },
  {
    title: "Context-Aware PDF QA",
    subtitle: "RAG document intelligence",
    date: "Apr 2026",
    tech: ["FastAPI", "React", "LangChain", "Gemini", "Qdrant", "Docker"],
    description:
      "Retrieval-augmented document intelligence for querying large PDFs with grounded, context-aware answers.",
    features: [
      "Semantic search and contextual chunk retrieval over vector embeddings",
      "Ingestion and retrieval pipelines built with FastAPI, LangChain, and Qdrant",
      "Fully containerized development environment orchestrated with Docker",
    ],
    github: "https://github.com/parthpatidar03/RAG-Based-Pdf-Chatbot",
  },
  {
    title: "Reel-to-Real",
    subtitle: "AI place discovery",
    date: "Feb 2026",
    tech: ["React", "Express", "MongoDB", "Redis", "OpenAI"],
    description:
      "Extracts venue data from Instagram Reels to turn casual scrolling into a searchable travel map.",
    features: [
      "Whisper transcription, GPT-4 parsing, and Tesseract OCR for venue extraction",
      "BullMQ async queues keeping API responses under 200ms",
      "Geospatial search via MongoDB 2dsphere indexing and a Mapbox GL frontend",
    ],
    github: "https://github.com/parthpatidar03/Reel2Real",
  },
  {
    title: "Smart Campus E-Gate",
    subtitle: "Entry-exit access control",
    date: "Dec 2025",
    tech: ["React", "EJS", "Node.js", "Express", "MongoDB"],
    description:
      "Digitizes entry-exit verification for NIT Trichy's campus gates with QR-based access control.",
    features: [
      "OTP-based authentication and time-bound QR code generation",
      "JWT auth with role-based access for guards and admins",
      "Automated audit logs for every entry and exit",
    ],
    github: "https://github.com/parthpatidar03/smart-campus-egate",
  },
  {
    title: "Book Buddy",
    subtitle: "Personal library management",
    date: "Oct 2025",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    description:
      "A full-stack reading tracker with role-based access and personalized book recommendations.",
    features: [
      "JWT authentication with compound MongoDB indexing",
      "Collaborative filtering recommendations via the Gutendex API",
      "Real-time progress tracking across 8+ MVC controllers",
    ],
    github: "https://github.com/parthpatidar03/Book-Buddy",
  },
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["C++", "JavaScript", "Python", "TypeScript"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Redux", "Node.js", "Express.js", "FastAPI", "Next.js"],
  },
  {
    category: "AI & GenAI",
    items: ["LangChain", "OpenAI API", "Hugging Face", "Ollama", "MCP"],
    tint: true,
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "SQL", "Qdrant"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "AWS"],
  },
  {
    category: "Web Development",
    items: ["HTML/CSS", "TailwindCSS", "REST APIs", "WebSockets"],
    tint: true,
  },
];

export const MARQUEE_ITEMS = [
  "C++", "JavaScript", "Python", "TypeScript", "React", "Redux", "Node.js",
  "Express.js", "FastAPI", "Next.js", "MongoDB", "PostgreSQL", "Qdrant",
  "LangChain", "OpenAI API", "Hugging Face", "Ollama", "MCP", "Git", "Docker",
  "AWS", "REST APIs", "WebSockets", "TailwindCSS", "HTML/CSS", "SQL",
];

export const EDUCATION = {
  institution: "National Institute of Technology, Tiruchirappalli",
  logo: "https://ik.imagekit.io/qfvuxdt5o/clg1.png?updatedAt=1762255352668",
  url: "https://www.nitt.edu",
  degree: "Bachelor of Technology",
  duration: "2024 - 2028",
  cgpa: "8.87",
};
