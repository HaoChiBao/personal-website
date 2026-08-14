import type { ProjectEntry } from "../types";

const doctor_dodo: ProjectEntry = {
  id: "doctor-dodo",
  name: "Dr. DoDo",
  title: "2nd place at QHacks 2024",
  blurb:
    "Browser pet that tutors from highlighted text, watches posture and mood, and nags you to take care of yourself.",
  dates: "2024",
  section: "hackathons",
  hackathon: { event: "QHacks", year: 2024, placement: "2nd place", notes: "Also Best Use of AI in Education" },
  labels: [
      "hackathon",
      "award",
      "featured",
      "education",
      "vision",
      "extension",
    ],
  stack: [
      "Flask",
      "JavaScript",
      "MediaPipe",
      "ChatGPT",
      "Chrome extension",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/doctor-dodo",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/Qhacks2024",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Dr. DoDo took 2nd place and Best Use of AI in Education at QHacks 2024. The Chrome pet teaches from whatever you highlight, reads facial emotion, checks posture with MediaPipe, and reminds you to actually take a break.",
  contributions: [
    "Tied highlight-to-tutor Q&A into a wandering on-page pet.",
    "Added emotion, face verify, voice, and MediaPipe posture checks so the pet can nag with context.",
  ],
  outcomes: [
    "2nd place overall at QHacks 2024.",
    "Best Use of AI in Education at QHacks 2024.",
  ],
};

export default doctor_dodo;
