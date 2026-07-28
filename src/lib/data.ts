import type {
  AboutInfo,
  Benchmark,
  Certification,
  Project,
  ServiceItem,
  SectionHeading,
  SiteConfig,
  SkillCategory,
} from "@/types";

/**
 * SINGLE SOURCE OF TRUTH for all portfolio content.
 * Replace these placeholders with your real information.
 */

export const siteConfig: SiteConfig = {
  name: "Cakra_Ariesa",
  role: "Senior Frontend Engineer",
  email: "cakra.ariesa@gmail.com",
  statusBadge: "SYS.STATUS: ONLINE",
  heroHeadlineTop: "FAST",
  heroHeadlineHighlight: "OUTLASTS",
  heroHeadlineBottom: "FIRST-CLASS",
  heroTagline:
    "I build fast, reliable websites and web apps for startups that will last but can't afford to look cheap.",
  navLinks: [
    { label: "PROJECTS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "TESTIMONIALS", href: "#benchmarks" },
  ],
  socials: [
    {
      label: "[ LINKEDIN ]",
      href: "https://www.linkedin.com/in/cakra-ariesa/",
      brandColor: "#0A66C2",
    },
    {
      label: "[ Whatsapp ]",
      href: "http://wa.me/6281373431111",
      brandColor: "#25D366",
    },
  ],
};

export const aboutInfo: AboutInfo = {
  location: "Palembang, Indonesia",
  experience: "5+ Years",
  focus: "Full-Stack Web Dev",
  availability: "Open to Projects or Work",
  bio: "I build production-grade web applications with Next.js, TypeScript, and modern tooling. Focused on performance, clean architecture, and shipping fast.",
  profileImage: "/images/Cakra.png",
};

export const terminalLines: string[] = [
  "▲ Next.js 16.2.10 (Turbopack)",
  "✓ Compiled successfully in 2.5s",
  "✓ Running TypeScript ...",
  "✓ Ready in 2.7s",
];

export const marqueeItems: string[] = [
  "HIGH PERFORMANCE",
  "ENTERPRISE-GRADE SECURITY",
  "SEO & ACCESSIBILITY OPTIMIZED",
  "PIXEL-PERFECT IMPLEMENTATION",
  "SCALABLE ARCHITECTURE",
  "ZERO-DOWNTIME DEPLOYMENTS",
  "CUSTOM TAILORED DESIGNS",
  "LIGHTNING-FAST LOAD TIMES",
];

export const sectionHeadings: Record<
  | "projects"
  | "skills"
  | "services"
  | "certifications"
  | "benchmarks"
  | "contact"
  | "about",
  SectionHeading
> = {
  projects: {
    index: "01",
    label: "TARGETS",
    titleTop: "DEPLOYED",
    titleBottom: "ASSETS",
  },
  skills: {
    index: "02",
    label: "CAPABILITIES",
    titleTop: "TECH",
    titleBottom: "STACK",
  },
  services: {
    index: "03",
    label: "BUILD TYPES",
    titleTop: "WHAT I",
    titleBottom: "BUILD",
  },
  certifications: {
    index: "04",
    label: "CREDENTIALS",
    titleTop: "VERIFIED",
    titleBottom: "EXPERTISE",
  },
  benchmarks: {
    index: "05",
    label: "METRICS",
    titleTop: "SOCIAL",
    titleBottom: "PROOF",
  },
  contact: {
    index: "06",
    label: "INQUIRY",
    titleTop: "REQUEST",
    titleBottom: "PROPOSAL",
  },
  about: {
    index: "07",
    label: "OPERATOR",
    titleTop: "SYSTEM",
    titleBottom: "PROFILE",
  },
};

export const projects: Project[] = [
  {
    id: "ALPHA_01",
    title: "Distribution Management System (DMS)",
    tagline: "Fuel Distribution ERP",
    role: "Full-Stack Architect & Lead Developer",
    stack: [
      "NEXT.JS 16",
      "TYPESCRIPT",
      "SUPABASE",
      "POSTGRES",
      "RADIX UI",
      "TIPTAP",
    ],
    objective:
      "Build a bilingual operational ERP for fuel distribution — full audit trail, inventory ledger, and document verification.",
    outcomes: [
      "EVENT-SOURCED INVENTORY LEDGER",
      "QR DOCUMENT VERIFICATION",
      "RBAC WITH ROW-LEVEL SECURITY",
      "AUTOMATED EMAIL DISTRIBUTION",
    ],
    images: ["/images/projects/nexus.jpg"],
    imageAlt:
      "Distribution Management System — fuel distribution ERP interface",
    href: "#",
  },
  {
    id: "BETA_02",
    title: "Butcher — Restaurant Web",
    tagline: "Dining Platform",
    role: "Full-Stack Developer",
    stack: [
      "NEXT.JS 16",
      "TYPESCRIPT",
      "SUPABASE",
      "FRAMER MOTION",
      "TAILWIND CSS",
    ],
    objective:
      "Build a high-end, dark-mode restaurant website for a steakhouse and Italian dining concept with dynamic menu, promo slider, and bilingual support.",
    outcomes: [
      "DYNAMIC MENU WITH DAY-AVAILABILITY",
      "FRAMER MOTION HERO SLIDER",
      "BILINGUAL (EN/ID) WITH LOCALE ROUTING",
      "SUPABASE-DRIVEN CONTENT & MENU",
    ],
    images: ["/images/projects/butcher.jpg"],
    imageAlt:
      "Butcher & La Vita Bella — high-end restaurant website with dark industrial aesthetic",
    href: "#",
  },
  {
    id: "GAMMA_03",
    title: "Company Profile Platform",
    tagline: "Industrial Fuel Distributor",
    role: "Full-Stack Developer & UI Designer",
    stack: ["NEXT.JS 16", "TYPESCRIPT", "FRAMER MOTION", "TAILWIND CSS"],
    objective:
      "Build a bilingual company profile website for an industrial fuel distributor with dark/light theme, motion animations, and a clean corporate design system.",
    outcomes: [
      "DUAL-THEME (DARK/LIGHT) WITH CSS CUSTOM PROPERTIES",
      "BILINGUAL (EN/ID) WITH LOCALE ROUTING",
      "FRAMER MOTION PAGE REVEALS",
      "FULLY RESPONSIVE CORPORATE DESIGN",
      "STATICALLY GENERATED PAGES",
    ],
    images: ["/images/projects/abs.jpg", "/images/projects/abs-2.jpg"],
    imageAlt: "Company profile for industrial fuel distributor",
    href: "#",
  },
  // {
  //   id: "DELTA_04",
  //   title: "Realtime Collab Suite",
  //   tagline: "CRDT Editing Surface",
  //   role: "Principal Engineer",
  //   stack: ["REACT", "WEBSOCKETS", "CANVAS", "YJS"],
  //   objective:
  //     "Engineer conflict-free multiplayer canvas at 60fps. Offline-first. Eventual consistency guaranteed.",
  //   outcomes: [
  //     "50K CONCURRENT USERS",
  //     "60FPS UNDER LOAD",
  //     "<16MS SYNC LATENCY",
  //   ],
  //   images: ["/images/projects/delta-04.svg"],
  //   imageAlt: "Realtime collaborative canvas application",
  //   href: "#",
  // },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "FRONTEND",
    icon: "terminal",
    skills: [
      { name: "REACT / NEXT.JS 16", proficiency: "[++]" },
      { name: "TYPESCRIPT", proficiency: "[++]" },
      { name: "TAILWIND CSS", proficiency: "[++]" },
      { name: "FRAMER MOTION", proficiency: "[++]" },
    ],
  },
  {
    title: "BACKEND",
    icon: "server",
    skills: [
      { name: "SUPABASE", proficiency: "[++]" },
      { name: "POSTGRESQL", proficiency: "[++]" },
      { name: "ROW LEVEL SECURITY", proficiency: "[++]" },
      { name: "API ROUTES", proficiency: "[++]" },
    ],
  },
  {
    title: "TOOLS & LIBRARIES",
    icon: "settings",
    skills: [
      { name: "RADIX UI", proficiency: "[++]" },
      { name: "TIPTAP EDITOR", proficiency: "[++]" },
      { name: "RESEND EMAIL", proficiency: "[++]" },
      { name: "REACT-PDF / QR", proficiency: "[++]" },
    ],
  },
];

export const services: ServiceItem[] = [
  {
    title: "LANDING PAGES",
    description: "High-conversion brand & campaign pages",
    items: [
      "SAAS PRODUCT LANDING",
      "STARTUP LAUNCH PAGE",
      "EVENT / CONFERENCE SITE",
      "PERSONAL BRAND SITE",
      "COMPANY PROFILE",
    ],
  },
  {
    title: "FULL-STACK APPS",
    description: "End-to-end web application delivery",
    items: [
      "SAAS DASHBOARD",
      "ECOMMERCE STOREFRONT",
      "CONTENT PLATFORM",
      "API-DRIVEN WEB APP",
      "E-LEARNING APP",
    ],
  },
  // {
  //   title: "DESIGN SYSTEMS",
  //   description: "Scalable, typed component infrastructure",
  //   items: [
  //     "COMPONENT LIBRARY",
  //     "STORYBOOK DOCS",
  //     "THEME ARCHITECTURE",
  //     "ACCESSIBILITY TOOLKIT",
  //   ],
  // },
  // {
  //   title: "OPTIMIZATION",
  //   description: "Performance & conversion engineering",
  //   items: [
  //     "CORE WEB VITALS AUDIT",
  //     "LIGHTHOUSE OPTIMIZATION",
  //     "SEO RESTRUCTURE",
  //     "MIGRATION / REFACTOR",
  //   ],
  // },
];

export const benchmarks: Benchmark[] = [
  { metric: "PROJECTS", value: "10+", label: "SHIPPED TO PRODUCTION" },
  { metric: "UPTIME", value: "98.8%", label: "SLA ACHIEVED" },
  { metric: "LCP", value: "0.8S", label: "AVERAGE ON 4G" },
  { metric: "INP", value: "< 200 ms", label: "AVERAGE ON 4G" },
];

export const testimonials: string[] = [
  '"Architected our entire frontend platform. We went from stalled to GA in 6 weeks."',
  '"No one else could fix our performance issues. He reduced LCP by 60%."',
];

export const certifications: Certification[] = [
  {
    title: "Responsive Web Design Certificate",
    issuer: "freeCodeCamp",
    image: "/images/certs/responsive_web_design.png",
    imageAlt: "freeCodeCamp Responsive Web Design Certificate",
    href: "https://www.freecodecamp.org/certification/s1conan/responsive-web-design-v9",
  },
  {
    title: "Javasscript Certificate",
    issuer: "freeCodeCamp",
    image: "/images/certs/Javascript.png",
    imageAlt: "freeCodeCamp Javascript Certificate",
    href: "https://www.freecodecamp.org/certification/s1conan/javascript-v9",
  },
  {
    title: "Relational Database Certificate",
    issuer: "freeCodeCamp",
    image: "/images/certs/Relational_Database.png",
    imageAlt: "freeCodeCamp Relational Database Certificate",
    href: "https://www.freecodecamp.org/certification/s1conan/relational-databases-v9",
  },
  {
    title: "EF English Certificate",
    issuer: "EF",
    image: "/images/certs/EF.png",
    imageAlt: "EF English Certificate",
    href: "https://cert.efset.org/DD44A6",
  },
];

export const capabilities: string[] = [
  "FULL-STACK DEVELOPMENT",
  "PERFORMANCE OPTIMIZATION",
  "DATABASE DESIGN",
  "API ARCHITECTURE",
  "CI/CD PIPELINES",
  "CLOUD DEPLOYMENT",
  "SECURITY BEST PRACTICES",
  "ACCESSIBILITY COMPLIANCE",
];

/**
 * Values for the PROJECT_TYPE select in the contact form.
 * Consumed by both the form UI and the zod schema — keep in sync by editing here only.
 */
export const projectTypes = [...services.map((s) => s.title), "OTHER"] as const;

export type ProjectType = (typeof projectTypes)[number];
