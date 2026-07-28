export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  brandColor: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  email: string;
  statusBadge: string;
  heroHeadlineTop: string;
  heroHeadlineHighlight: string;
  heroHeadlineBottom: string;
  heroTagline: string;
  navLinks: NavLink[];
  socials: SocialLink[];
}

export type SkillIcon = "terminal" | "server" | "settings";

export interface Skill {
  name: string;
  proficiency: string;
}

export interface SkillCategory {
  title: string;
  icon: SkillIcon;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  role: string;
  stack: string[];
  objective: string;
  outcomes: string[];
  images: string[];
  imageAlt: string;
  href: string;
}

export interface Certification {
  title: string;
  issuer: string;
  image: string;
  imageAlt: string;
  href?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  items: string[];
}

export interface Benchmark {
  metric: string;
  value: string;
  label: string;
}

export interface SectionHeading {
  index: string;
  label: string;
  titleTop: string;
  titleBottom: string;
}

export interface AboutInfo {
  location: string;
  experience: string;
  focus: string;
  availability: string;
  bio: string;
  profileImage: string;
}
