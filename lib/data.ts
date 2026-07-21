// Single source of truth for portfolio content — rendered by the OS-themed components.

export const person = {
  name: "Abrham Ababu",
  firstName: "Abrham",
  lastName: "Ababu",
  handle: "abrham@dev",
  location: "Addis Ababa, Ethiopia",
  email: "abrhambest7@gmail.com",
  phone: "+251 943113823",
  telegram: "@RASAbrish",
  cv: "/Abrham%20Ababu%20CV.pdf",
  availability: "available for new opportunities",
  roles: [
    "Full Stack Developer",
    "TypeScript Developer",
    "Backend Developer",
    "Node.js Expert",
    "Next.js Enthusiast",
  ],
  socials: {
    github: "https://github.com/RasAbrish",
    linkedin: "https://www.linkedin.com/in/abrham-ababu-85a112297/",
    telegram: "https://t.me/RASAbrish",
  },
  about: [
    "I’m a full-stack software developer building scalable web products and digital platforms across ERP systems, internal tools, and customer-facing applications.",
    "My experience includes Safaricom’s Talent Cloud program, enterprise rental and agreement systems, and production websites for growing businesses, with a focus on clean architecture, delivery speed, and practical business impact.",
  ],
  photo: "/assets/images/profile-photo.png",
}

export const stats = [
  { value: "3+", label: "years experience" },
  { value: "12+", label: "projects shipped" },
  { value: "5+", label: "companies served" },
]

export interface Milestone {
  hash: string
  year: string
  title: string
  description: string
  branch?: string
}

export const milestones: Milestone[] = [
  {
    hash: "a1b2c3d",
    year: "Start",
    title: "Joined Hope University",
    description:
      "Began my Bachelor's in Computer Science where curiosity became code, and learning became a way of life.",
    branch: "init",
  },
  {
    hash: "b7c8d9e",
    year: "2022+",
    title: "Founded HaLink Technology PLC",
    description:
      "Co-founded HaLink Technology PLC after starting university, growing from student builder into a key founder and CTO shaping the company's technical direction.",
    branch: "feat/halink-founder",
  },
  {
    hash: "f4e5d6c",
    year: "2023",
    title: "University Hackathon Winner",
    description:
      "Won the in-house hackathon at Hope University by building fast, thinking creatively, and proving I could compete.",
    branch: "feat/hackathon",
  },
  {
    hash: "9a8b7c6",
    year: "2025",
    title: "Safaricom Cloud Talent — 2nd Place",
    description:
      "Competed and claimed 2nd place with the Fuel Finder app, recognized for cloud innovation at a national level.",
    branch: "feat/fuel-finder",
  },
  {
    hash: "3d4e5f6",
    year: "2025–2026",
    title: "Enterprise SaaS & Systems Developer",
    description:
      "Joined Atlas Computer Technology and others, delivering SaaS products, system architecture, and enterprise-grade solutions.",
    branch: "feat/enterprise",
  },
  {
    hash: "7g8h9i0",
    year: "2026",
    title: "BSc Computer Science — CGPA 3.85",
    description:
      "Graduated with honors from Hope University with a CGPA of 3.85, the result of discipline, creativity, and determination.",
    branch: "release/v1.0",
  },
  {
    hash: "HEAD",
    year: "Now",
    title: "Working with Local & Global Companies",
    description:
      "Currently collaborating with several local and international organizations, shipping high-performance software that makes a real impact.",
    branch: "main",
  },
]

export interface Project {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  link: string
  company?: string
  role?: string
  image?: string
  /** Surfaced first in the projects carousel. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 9,
    slug: "halink",
    title: "HaLink Technology PLC",
    description:
      "Co-founded HaLink Technology PLC and helped lead the company as CTO, building the public web platform with a JavaScript, CSS, and Next.js stack alongside the founding team.",
    tags: ["Next.js", "JavaScript", "CSS", "Company Website"],
    link: "https://halink.et/",
    company: "HaLink Technology PLC",
    role: "Key Founder & CTO",
    image: "/assets/images/halink.png",
    featured: true,
  },
  {
    id: 10,
    slug: "skiwai",
    title: "Skiwai Platform",
    description:
      "Full-stack platform formerly known as Impactis, built to connect startup founders with advisors and legal funding support in an AngelList-inspired ecosystem.",
    tags: ["Next.js", "NestJS", "AWS", "Cloudflare", "TypeScript"],
    link: "https://skiwai.com/",
    company: "Skiwai",
    role: "Full Stack Developer",
    image: "/assets/images/impactis.png",
    featured: true,
  },
  {
    id: 7,
    slug: "ptgr-token",
    title: "PTGR Token Platform",
    description:
      "Token-holder platform built for the PTGR hackathon in Switzerland — secure onboarding, Didit-powered KYC/identity verification, and global investor access across 40+ countries.",
    tags: ["Next.js", "NestJS", "TypeScript", "Tailwind", "Didit"],
    link: "https://ptgr-front-end.onrender.com/",
    company: "PTGR",
    role: "Full Stack Developer",
    image: "/assets/images/ptgr.png",
    featured: true,
  },
  {
    id: 8,
    slug: "beleqet",
    title: "Beleqet — Career Marketplace",
    description:
      "Ethiopia's job-finding platform connecting seekers with verified employers, featuring job search, CV maker, and employer tools. Built as a recruitment interview assessment.",
    tags: ["Next.js", "NestJS", "Redis", "TypeScript"],
    link: "https://beleqet-interview-task-mu.vercel.app/",
    company: "Interview Assessment",
    role: "Full Stack Developer",
    image: "/assets/images/beleqet.png",
    featured: true,
  },
  {
    id: 0,
    slug: "headless-cms",
    title: "Headless CMS Platform",
    description:
      "Built a modular CMS with role-based access and structured content workflows for production-ready publishing.",
    tags: ["React", "TypeScript", "Next.js"],
    link: "https://cmc-project-cx9u.vercel.app/login",
    company: "Elisoft Solution",
    role: "Full Stack Developer",
    image: "/assets/images/cmc-dashboard.png",
  },
  {
    id: 6,
    slug: "elisoft-solution",
    title: "Elisoft Solution",
    description:
      "Delivered a fully dynamic Laravel website and supported ERP-focused software delivery for business operations.",
    tags: ["PHP", "Laravel", "MySQL", "Tailwind", "Blade"],
    link: "https://elisoftsolution.com/",
    company: "Elisoft",
    role: "Full Stack Developer",
    image: "/placeholder.jpg",
  },
  {
    id: 3,
    slug: "fuel-finder",
    title: "FuelFinder",
    description:
      "Real-time fuel discovery MVP from Safaricom Talent Cloud, ranked 2nd place for innovation and execution.",
    tags: ["React", "Node.js", "Redis"],
    link: "https://fuel-finder-frontend.onrender.com/",
    company: "Gebyainc",
    role: "Frontend Developer",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Fm3un0MWIj3ufrtJFk9z8CtVgnuA8Z.png",
  },
  {
    id: 4,
    slug: "rent-management",
    title: "Rent Management",
    description:
      "Digitized housing workflows with modules for tenants, rentals, payments, and operational reporting.",
    tags: ["React", "PostgreSQL", "Node.js"],
    link: "https://www.act.com.et/",
    company: "Atlas Computer Tech",
    role: "Lead Developer",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Dy18cKbUzCfD6eQPz9a4Q6gnRzqYIf.png",
  },
  {
    id: 2,
    slug: "yab-chemicals",
    title: "YAB Chemicals Website",
    description:
      "Designed and deployed a modern corporate web presence to improve product visibility and customer trust.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://www.yabchemicals.com/",
    company: "Yabchemicals",
    role: "Frontend",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2E0TPOdenF5ZAwMp0YeWwLjIB5MKbB.png",
  },
  {
    id: 5,
    slug: "aahrams",
    title: "AAHRAMS",
    description:
      "Full-stack rental agreement platform presented to Addis Ababa city stakeholders for real-world adoption.",
    tags: ["React", "Node.js", "Docker"],
    link: "https://aahrams.onrender.com/",
    company: "AAHAMS",
    role: "Fullstack Developer",
    image: "/AAS.png",
  },
  {
    id: 1,
    slug: "agriculture-mgmt",
    title: "Agriculture Management",
    description: "Crop tracking, GIS field mapping and predictive analytics for yield optimization.",
    tags: ["Next.js", "MongoDB", "GIS"],
    link: "#",
    company: "Personal Project",
    role: "Full Stack Developer",
    image: "/agricultural-management-system-dashboard.jpg",
  },
]

export interface Tool {
  name: string
  icon: string
}

export const toolsRowOne: Tool[] = [
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "ShadCN", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shadcnui.svg" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
]

export const toolsRowTwo: Tool[] = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubactions.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg" },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netlify.svg" },
  { name: "n8n", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg" },
  { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "ngrok", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ngrok.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
]

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Mr. Biniyam",
    role: "Senior Developer",
    company: "Atlas Computer Technology",
    content:
      "Abrham is a very good developer. We have worked together where I was a team leader and he was a frontend developer. His attention to detail and ability to implement complex UI requirements is exceptional.",
  },
  {
    name: "Sebele Wengele",
    role: "Project Manager",
    company: "Gebyainc",
    content:
      "Abrham is a good, passionate developer who is competent at our company. He won 2nd place reward with the FuelFinder app. His dedication to excellence and innovative problem-solving made a real impact on our project.",
  },
  {
    name: "Samson Admasu",
    role: "Lead Senior Developer",
    company: "Unichash Team",
    content:
      "He has been good at collaborating and adapting to new technologies. He worked with us at Atlas Computer Technology for about 5 months as an internship and job, and he worked on the rent management system project. His technical skills and team-oriented approach are impressive.",
  },
  {
    name: "Mr. Elias",
    role: "Founder & CEO",
    company: "Elisoft Solution",
    content:
      "Abrham is a very talented professional. We have worked together on different projects in our company, and he consistently demonstrates strong problem-solving skills, punctuality, and a clear technical point of view.",
  },
  {
    name: "Mr. Yonas Kebeta",
    role: "Founder & CEO",
    company: "Hammer AI",
    content:
      "I am passionate about AI products, and Abrham is one of the few developers who can translate client requirements into practical results. His commitment to AI technology and delivery quality made our collaboration very successful.",
  },
  {
    name: "Abel Shebabaw",
    role: "Senior Fullstack Developer",
    company: "Safaricom Ethiopia",
    content:
      "Abrham is a reliable and skilled developer. He writes clean code, learns fast, and is easy to work with on any team. A great engineer to have on a project.",
  },
  {
    name: "Amanuel Girma",
    role: "Co-Founder",
    company: "HaLink Technology PLC",
    content:
      "Abrham is my friend and co-founder at HaLink. Working with him as a team has been a strong experience, especially on large ERP and complex projects where the way he handles pressure, structure, and delivery is amazing.",
  },
  {
    name: "Mr. Ashenafi",
    role: "Project Collaborator",
    company: "Impactis / Skiwai",
    content:
      "Abrham is a good software engineer. We have known each other through Impactis, Skiwai, and several other projects, and he follows client alignment well with mature, skillful execution.",
  },
]
