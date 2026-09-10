import type { Profile } from "./types";

/** Contact / identity from James-Yang-Resume.pdf */
export const profile: Profile = {
  name: "James Yang",
  headline: "Full-stack engineer · AI agent builder",
  honor: { label: "MLH Top 50", projectId: "mlh-top-50" },
  bio: "I build full-stack apps and AI agents — poke at problems, fix what breaks, make hard things clear.",
  location: "Toronto, Canada",
  email: "jamesyangbuilds@gmail.com",
  phone: "647-937-5288",
  website: "https://yangjames.com",
  links: [
    {
      label: "email",
      href: "mailto:jamesyangbuilds@gmail.com",
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao",
      external: true,
    },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/jpyang",
      external: true,
    },
    {
      label: "website",
      href: "https://yangjames.com",
      external: true,
    },
    {
      label: "resume",
      href: "/resume.pdf",
      external: true,
    },
  ],
};

/** Extra contact fields from the resume header (not always shown in chrome). */
export const resumeContact = {
  phone: "647-937-5288",
  email: "jamesyangbuilds@gmail.com",
  linkedin: "https://www.linkedin.com/in/jpyang",
  github: "https://github.com/HaoChiBao",
  website: "https://yangjames.com",
  pdfHref: "/resume.pdf",
} as const;
