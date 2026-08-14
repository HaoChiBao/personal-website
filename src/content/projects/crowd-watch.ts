import type { ProjectEntry } from "../types";

const crowd_watch: ProjectEntry = {
  id: "crowd-watch",
  name: "Crowd Watch",
  title: "Drone crowd-density alerts at Hack Western 12",
  blurb:
    "Computer vision on live drone feeds to flag dangerous overcrowding before a crush.",
  dates: "2025",
  section: "hackathons",
  hackathon: { event: "Hack Western 12", year: 2025, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "vision",
    ],
  stack: [
      "Python",
      "PyTorch",
      "CSRNet",
      "Flask",
      "OpenAI",
      "React",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/crowd-watch",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/hackwestern12",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Crowd Watch (Hack Western 12) estimates crowd density from live drone video with CSRNet and alerts organizers when a space is heading toward a crush, instead of waiting for a human to notice on a monitor.",
  contributions: [
    "Ran CSRNet density estimation on drone frames in a Flask pipeline.",
    "Surfaced overcrowding alerts to organizers from the live feed.",
  ],
  outcomes: [
    "Working vision demo submitted at Hack Western 12.",
  ],
};

export default crowd_watch;
