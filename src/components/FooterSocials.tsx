import type { ReactNode } from "react";
import { profile } from "@/content";

const SOCIAL_LABELS = ["github", "linkedin", "email"] as const;

type SocialLabel = (typeof SOCIAL_LABELS)[number];

function isSocialLabel(label: string): label is SocialLabel {
  return (SOCIAL_LABELS as readonly string[]).includes(label);
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.5-.6 1.2-.5 2V21" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

const ICONS: Record<SocialLabel, () => ReactNode> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

export default function FooterSocials() {
  const links = profile.links.filter((link) => isSocialLabel(link.label));

  return (
    <nav className="site-footer__socials" aria-label="Social links">
      {links.map((link) => {
        const Icon = ICONS[link.label as SocialLabel];
        return (
          <a
            key={link.label}
            href={link.href}
            className="site-footer__social"
            {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <Icon />
            <span className="sr-only">{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
