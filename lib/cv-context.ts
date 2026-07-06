// Abrham Ababu's CV, bundled as plain text so the AI assistant can answer
// grounded questions about it without any database — the whole document fits
// in a single system prompt (context stuffing, the pragmatic "RAG for one small
// doc"). Regenerate from public/Abrham-Ababu-CV.pdf if the CV changes.

export const CV_TEXT = `
ABRHAM ABABU — Full-Stack Software Developer
Location: Addis Ababa, Ethiopia · Nationality: Ethiopian · DOB: 02/03/2002
Phone / WhatsApp: (+251) 943113823 · Email: abrhambest7@gmail.com
LinkedIn: linkedin.com/in/abrham-ababu-85a112297 · Portfolio: https://abrhamababuportfolio.vercel.app/

ABOUT
Full-Stack Developer with 3+ years of hands-on experience building modular, scalable, production-ready
web applications using React, Next.js, TypeScript, Node.js, NestJS, Laravel, PostgreSQL, Supabase, and
Docker. Strong across both frontend and backend — responsive UI, API integration, ERP systems, company
websites, SaaS platforms, and AI automation. Experienced across internships, freelance work, company
environments, and hackathons.

WORK EXPERIENCE
- Gebeya Inc (Safaricom Talent Cloud), Addis Ababa — Full Stack Developer (May 2025–Oct 2025).
  5-month intensive program. Built & deployed an MVP with Next.js, React, Node.js, Express, PostgreSQL;
  responsive UI with Tailwind; Agile teams with Jira. Won 2nd place for the Fuel Finder app.
- Atlas Computer Technology, Addis Ababa — Software / Frontend Developer (Aug 2024–Dec 2025).
  Built and maintained the frontend of a House Rent Management System with React and Next.js. 5-month
  paid internship, then full-time contractor for several months.
- Formidable, Addis Ababa — Full Stack Developer (Jun 2023–Apr 2025).
  Built the Wedet App, a tourism booking platform for Ethiopia (tour listings, bookings, user management)
  with Next.js, Supabase, and Docker.
- Yab Chemicals, Addis Ababa — Web Developer & Operations Support (Feb 2025–Nov 2025).
  Developed and deployed the company website with React/Next.js; managed content and daily operations.
- Elisoft Solution PLC, Addis Ababa — Software Developer (Feb 2026–Current).
  ERP system development with Laravel and PHP; design, development, and maintenance.
- Zagoal PLC, Washington DC (remote) — Freelance Frontend Developer (Jan 2026–Current).
  Contributing to a large-scale internal operations project.
- AfterQuery, San Francisco (remote) — Software Developer & AI Designer (Mar 2026–Current).
  Web app development plus AI-driven solutions and prompt design.
- Gebeya Inc / Dala AI — AI Ambassador (Feb 2026–Current). One of the first AI Ambassadors; AI use-case
  development and community adoption.
- CodSoft (remote) — Web Development Intern (Jun 2023–Jul 2024). Responsive sites in HTML, CSS, JS.
- Hope Enterprise University College — ICT Club Advisor & Parliament Group ICT Representative
  (2022–2026). Organizes tech events/workshops for 80+ students; mentors and drives hackathon participation.

EDUCATION & TRAINING
- BSc Computer Science, Hope Enterprise University College, Addis Ababa (2022–2026), CGPA 3.85.
- Udacity: Programming Fundamentals, AI Fundamentals, Android Development.
- FreeCodeCamp: Responsive Web Design. AWS AI Trainee. ICT Club Hackathon Competition.

SKILLS
- Frontend: React, Next.js, Tailwind CSS, shadcn/ui, Zustand, Redux.
- Backend: Node.js, Express.js, NestJS, Laravel, Spring Boot, Django.
- Databases & services: PostgreSQL, MySQL, MongoDB, Redis, Vector Databases, Supabase.
- DevOps & testing: Docker, CI/CD, VPS, cPanel, Jest, Jenkins.
- AI & automation: RAG, n8n, Didit (KYC/identity verification).
- Languages: Amharic (native), English (writing C1, spoken B2).

PROJECTS
- PTGR Token Platform — token-holder platform built for the PTGR hackathon in Switzerland. Secure
  onboarding, Didit-powered KYC/identity verification, global investor access. Next.js, NestJS, TypeScript,
  Tailwind. Link: https://ptgr-front-end.onrender.com/
- Beleqet — Ethiopia's career marketplace connecting job seekers with verified employers (job search, CV
  maker, employer tools). Built as a recruitment interview assessment. Next.js, NestJS, Redis, TypeScript.
  Link: https://beleqet-interview-task-mu.vercel.app/
- Fuel Finder — full-stack real-time fuel discovery app (React, Node.js, Express); 2nd place at Safaricom
  Talent Cloud. Link: https://fuel-finder-frontend.onrender.com/
- AAHRAMS (Senior Project) — Addis Ababa House Rental Agreement Management System; full-stack digital
  solution presented to a city sub-city. React, Node.js, Docker, Zod. Link: https://aahrams.onrender.com/
- House Rental Management System — for Amhara Housing Corporation and Hibret Bank; React, Next.js,
  shadcn/ui, Zod, Zustand. Link: https://act.com.et/
- YAB Chemicals Website — modern responsive corporate site in React. Link: https://www.yabchemicals.com/
- Wedet App — full-stack tourism booking platform; Next.js, Supabase, Docker. Link: https://wedet-fe.vercel.app/
- Elisoft Solution Website — full Laravel dynamic website. Link: https://elisoftsolution.com
- Zagoal PLC SaaS — large-scale internal operations project (frontend). Link: https://www.zagoal.com
`.trim()
