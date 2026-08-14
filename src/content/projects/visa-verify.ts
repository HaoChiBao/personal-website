import type { ProjectEntry } from "../types";

const visa_verify: ProjectEntry = {
  id: "visa-verify",
  name: "Visa Verify",
  title: "Visa Truth & Trust track at HackHarvard 2025",
  blurb:
    "Multi-factor payment fraud scoring from behavioural biometrics, device history, and risk signals.",
  dates: "2025",
  section: "hackathons",
  hackathon: {
    event: "HackHarvard",
    year: 2025,
    placement: "1st · Truth & Trust",
    track: "Visa Truth & Trust",
  },
  labels: [
      "hackathon",
      "award",
      "featured",
      "fintech",
      "extension",
    ],
  stack: [
      "Chrome extension",
      "Node.js",
      "Express",
      "JavaScript",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/visa-verify",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/hackharvard2025",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Visa Verify won the Visa Truth and Trust track at HackHarvard 2025. The Chrome extension scores checkout risk from behavioural biometrics, device history, and other signals so merchants can catch fraud without extra friction for good buyers.",
  contributions: [
    "Built the extension-side capture of behavioural and device signals at checkout.",
    "Scored sessions with a multi-factor risk model instead of a single binary rule.",
  ],
  outcomes: [
    "Visa Truth and Trust Track Prize at HackHarvard 2025.",
  ],
};

export default visa_verify;
