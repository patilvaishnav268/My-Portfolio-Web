export const initialProfile = {
  name: "Vaishnav Vitthal Patil",
  title: "Python Full-Stack & AI Solutions Developer",
  taglines: [
    "Python Full-Stack Engineer",
    "Cloud & AWS Architect",
    "AI-Augmented Developer (Antigravity & Cursor)",
    "Node.js & JavaScript Specialist"
  ],
  bio: "Full-Stack Developer passionate about building robust, high-performance web applications and cloud microservices. Combining traditional software engineering in Python, Java, and Node.js with modern AI power tools like Google Antigravity, Cursor, and Codex to architect next-generation software.",
  location: "India",
  email: "vaishnavpatil.dev@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  status: "Available for High-Impact Roles & Projects",
  yearsExperience: "3+ Years",
  projectsCompleted: "15+",
  profileImage: "" // Will fallback to initials or uploaded photo
};

export const initialProjects = [
  {
    id: "proj-1",
    title: "AI-Autonomous Workflow Orchestrator",
    category: "AI & Automation",
    description: "An agentic automation engine integrating Google Antigravity & OpenAI Codex to execute multi-step full-stack tasks, code synthesis, and cloud infrastructure provisioning.",
    tags: ["Python", "FastAPI", "Google Antigravity", "Codex", "AWS Lambda", "React"],
    demoUrl: "https://example.com/demo-ai",
    githubUrl: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "proj-2",
    title: "CloudScale Enterprise Analytics Platform",
    category: "Python Full-Stack",
    description: "High-throughput full-stack analytics platform built with Python Django REST framework, automated AWS S3 data pipelines, and responsive Tailwind UI.",
    tags: ["Python", "Django REST", "Node.js", "AWS S3", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "https://example.com/demo-analytics",
    githubUrl: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "proj-3",
    title: "Smart Cursor-Driven Code Synthesizer",
    category: "AI & Tools",
    description: "Intelligent developer tool leveraging Cursor and Replit environments to automatically refactor legacy codebases into modern TypeScript/Node.js microservices.",
    tags: ["JavaScript", "Node.js", "Cursor", "Replit", "WebSockets", "CSS3"],
    demoUrl: "https://example.com/demo-synthesizer",
    githubUrl: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    featured: false
  },
  {
    id: "proj-4",
    title: "AWS Cloud Sentinel & Health Monitor",
    category: "Cloud & AWS",
    description: "Distributed cloud infrastructure monitoring system orchestrated on AWS EC2, CloudWatch, and Java Spring microservices with automated failover alerts.",
    tags: ["Java", "AWS EC2", "AWS Lambda", "CloudWatch", "Docker", "REST API"],
    demoUrl: "https://example.com/demo-cloud",
    githubUrl: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    featured: true
  },
  {
    id: "proj-5",
    title: "Real-Time Collaborative Code Sandbox",
    category: "JavaScript & Node.js",
    description: "Multiplayer browser IDE inspired by Replit with live terminal execution, peer-to-peer code synchronization, and dynamic AST linting.",
    tags: ["Node.js", "Express", "HTML5", "CSS3", "WebSockets", "Docker"],
    demoUrl: "https://example.com/demo-sandbox",
    githubUrl: "https://github.com",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    featured: false
  }
];

export const skillCategories = [
  {
    id: "backend",
    name: "Backend & Core Languages",
    icon: "Server",
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: "Python", level: 95, icon: "Code2", highlight: "FastAPI, Django, Flask, AsyncIO" },
      { name: "Node.js", level: 90, icon: "Cpu", highlight: "Express, REST APIs, Microservices" },
      { name: "Java", level: 85, icon: "Terminal", highlight: "Core Java, OOP, Spring Boot" },
      { name: "SQL & Databases", level: 88, icon: "Database", highlight: "PostgreSQL, MySQL, Redis" }
    ]
  },
  {
    id: "frontend",
    name: "Frontend & Web Technologies",
    icon: "Layout",
    color: "from-cyan-400 to-teal-400",
    skills: [
      { name: "JavaScript (ES6+)", level: 92, icon: "Zap", highlight: "Async/Await, Modern APIs, DOM" },
      { name: "HTML5 & CSS3", level: 95, icon: "FileCode", highlight: "Semantic UI, Flexbox, CSS Grid" },
      { name: "React.js", level: 88, icon: "Atom", highlight: "Hooks, Context, State Flow" },
      { name: "Tailwind CSS", level: 94, icon: "Palette", highlight: "Glassmorphism, Animations, Dark Mode" }
    ]
  },
  {
    id: "ai-tools",
    name: "AI Power Tools & Accelerators",
    icon: "Bot",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Google Antigravity", level: 95, icon: "Sparkles", highlight: "Agent Workflows, Subagent Orchestration" },
      { name: "Cursor IDE", level: 94, icon: "Compass", highlight: "AI Pair Programming, Multi-file edits" },
      { name: "OpenAI Codex", level: 90, icon: "Binary", highlight: "Code Synthesis, Automated Logic" },
      { name: "Replit", level: 88, icon: "TerminalSquare", highlight: "Rapid Cloud Prototyping & Deployments" }
    ]
  },
  {
    id: "cloud",
    name: "Cloud Computing & DevOps",
    icon: "Cloud",
    color: "from-amber-400 to-orange-500",
    skills: [
      { name: "AWS Services", level: 88, icon: "CloudCog", highlight: "EC2, S3, Lambda, CloudFront, IAM" },
      { name: "Docker & Containers", level: 82, icon: "Box", highlight: "Containerization, Multi-stage builds" },
      { name: "Git & GitHub", level: 92, icon: "GitBranch", highlight: "Branching, PRs, Git Actions CI/CD" },
      { name: "Linux / Server Admin", level: 86, icon: "HardDrive", highlight: "Bash, SSH, Nginx, Process Mgmt" }
    ]
  }
];

export const aiFeatures = [
  {
    title: "Google Antigravity Mastery",
    icon: "Orbit",
    badge: "Next-Gen Agentic AI",
    description: "Orchestrating autonomous AI agents, multi-turn reasoning loops, and intelligent self-healing dev workflows for high-complexity codebases.",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400"
  },
  {
    title: "Cursor & AI Pair Programming",
    icon: "Wand2",
    badge: "10x Engineering",
    description: "Leveraging semantic codebase indexing and contextual AI prompting to rapidly architect, refactor, and debug multi-layer architectures.",
    gradient: "from-purple-500/20 to-indigo-500/10",
    border: "border-purple-500/30",
    iconColor: "text-purple-400"
  },
  {
    title: "OpenAI Codex & Intelligent Synthesis",
    icon: "BrainCircuit",
    badge: "Deep Synthesis",
    description: "Automating unit test coverage, translating architectural designs into verified production algorithms, and optimizing system bottlenecks.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400"
  },
  {
    title: "Replit Cloud & Instant Staging",
    icon: "Flame",
    badge: "Cloud Sandbox",
    description: "Spinning up dynamic serverless testbeds, interactive cloud APIs, and rapid prototype deployments within seconds.",
    gradient: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/30",
    iconColor: "text-orange-400"
  }
];
