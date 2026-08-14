import type { ProjectEntry } from "../types";

const tickex: ProjectEntry = {
  id: "tickex",
  name: "TickeX",
  title: "Cross-chain NFT tickets at OlympiHacks",
  blurb:
    "Event tickets as NFTs with Axelar so they can move across chains.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "OlympiHacks", year: 2023, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "fintech",
    ],
  stack: [
      "Solidity",
      "Axelar",
      "TypeScript",
      "Tailwind",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/tickex",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/RyanSh3n/olympihacks/tree/testing-tokens",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "TickeX (OlympiHacks) turns event tickets into NFTs and uses Axelar callContract so ticket messages and tokens can move across chains. Organizers mint event cards; attendees buy and hold the NFT as the ticket.",
  contributions: [
    "Modeled tickets as NFTs with event metadata, not just a seat number.",
    "Used Axelar to send cross-chain messages and tokens for the ticket flow.",
  ],
  outcomes: [
    "Submitted at OlympiHacks as a working cross-chain ticketing demo.",
  ],
};

export default tickex;
