import type { ProjectEntry } from "../types";

const eyeexplore: ProjectEntry = {
  id: "eyeexplore",
  name: "EyeExplore",
  title: "See-the-world camera at UofTHacks X",
  blurb:
    "React Native + Clarifai/TensorFlow: point the phone and get a spoken read of what is in front of you.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "UofTHacks X", year: 2023, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "vision",
    ],
  stack: [
      "React Native",
      "Clarifai",
      "TensorFlow",
      "Cohere",
      "Firebase",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/eyeexplore",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/eye-explore",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "EyeExplore (UofTHacks X) is a phone app that looks at the world for you. On-device and cloud vision label the scene; Cohere helps turn that into something you can actually use.",
  contributions: [
    "Wired Clarifai / TensorFlow recognition into a React Native camera flow.",
    "Used Cohere so raw labels become a readable description.",
  ],
  outcomes: [
    "Submitted at UofTHacks X as a working vision companion.",
  ],
};

export default eyeexplore;
