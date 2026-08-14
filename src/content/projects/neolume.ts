import type { ProjectEntry } from "../types";

const neolume: ProjectEntry = {
  id: "neolume",
  name: "NeoLume",
  title: "SMS jaundice screening for newborns",
  blurb:
    "Twilio + PyTorch pipeline: send a baby photo by SMS, get an early jaundice risk read-back.",
  dates: "2025",
  section: "hackathons",
  hackathon: { event: "TBD", year: 2025, notes: "Event name / placement TBD (Devpost: neolume)" },
  labels: [
      "hackathon",
      "health",
      "vision",
    ],
  stack: [
      "PyTorch",
      "Flask",
      "Twilio",
      "React",
      "Railway",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/neolume",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/sms-jaundice-detection",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "NeoLume screens neonatal jaundice from a phone photo sent over SMS. A PyTorch CNN scores the image; Twilio returns the result, and a dashboard maps cases for field teams in low-resource settings.",
  contributions: [
    "Built the Twilio SMS image pipeline into a Flask + PyTorch scorer.",
    "Shipped a mobile-first capture app and an NGO dashboard with case maps.",
  ],
  outcomes: [
    "Reported 86% model accuracy on a jaundice photo set across skin tones and lighting.",
  ],
};

export default neolume;
