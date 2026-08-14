import type { ProjectEntry } from "../types";

const mednow: ProjectEntry = {
  id: "mednow",
  name: "MedNow",
  title: "Best Health & Wellbeing hack at MapleHacks",
  blurb:
    "Queue patients to the next free doctor on video, with a chatbot while they wait.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "MapleHacks", year: 2023, placement: "Best Health Hack" },
  labels: ["hackathon", "award", "featured", "health"],
  stack: [
      "Agora",
      "React",
      "Firebase",
      "Socket.io",
      "Node.js",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/mednow-puajqc",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/maplehacks",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "MedNow won Best Good Health & Wellbeing Hack at MapleHacks. Patients join a queue, get the next available doctor on video, and can talk to a chatbot while they wait. Doctors log into a private room and take the next person in line.",
  contributions: [
    "Built the dual-sided queue that routes a waiting patient into a doctor's Agora room.",
    "Added wait-time chatbot consults so the queue is not dead air.",
  ],
  outcomes: [
    "Best Good Health & Wellbeing Hack at MapleHacks.",
  ],
};

export default mednow;
