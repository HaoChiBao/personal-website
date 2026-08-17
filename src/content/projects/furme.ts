import type { ProjectEntry } from "../types";

const furme: ProjectEntry = {
  id: "furme",
  name: "FurMe",
  title: "1st overall at UofTHacks 11 (600+ hackers)",
  blurb:
    "Face-tracking Arduino companion with emotion-aware conversation and Spotify playlists.",
  dates: "2025",
  section: "hackathons",
  hackathon: { event: "UofTHacks 11", year: 2025, placement: "1st overall", notes: "600+ hackers" },
  labels: ["hackathon", "hardware", "award", "featured", "vision"],
  stack: [
    "Python",
    "OpenCV",
    "Arduino",
    "React",
    "DeepFace",
    "WebSockets",
    "Cohere",
    "OpenAI",
  ],
  links: [
    { label: "devpost", href: "https://devpost.com/software/furme", external: true },
    { label: "github", href: "https://github.com/HaoChiBao/uofthacks11", external: true },
  ],
  role: "Builder",
  summary:
    "FurMe won 1st overall at UofTHacks 11. It combines OpenCV face-tracking with an Arduino servo controller so the device physically rotates to keep the user centered, then layers emotion detection and LLMs for conversational context and Spotify playlist curation.",
  contributions: [
    "Closed-loop OpenCV face-tracking with Arduino servos to center the user in the camera viewport in real time.",
    "DeepFace emotion detection with Cohere and OpenAI for verbal responses and live sentiment-based Spotify playlists.",
    "IoT teleoperation dashboard in React and WebSockets for camera feed, keyboard servo control, and authenticated remote access.",
  ],
  outcomes: [
    "1st overall at UofTHacks 11 among 600+ hackers.",
    "Working embodied AI demo with hardware, vision, and conversational layers.",
  ],
  media: {
    video: "/media/uofthacks.mp4",
    caption: "Winning moment at UofTHacks",
  },
};

export default furme;
