import type { ProjectEntry } from "../types";

const booking_cancellations: ProjectEntry = {
  id: "booking-cancellations",
  name: "Booking Cancellations",
  title: "1st place at DataQuest",
  blurb:
    "Hotel-booking model that predicts cancel risk and which features actually drive it.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "DataQuest", year: 2023, placement: "1st place" },
  labels: ["hackathon", "award", "featured"],
  stack: [
      "Python",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Seaborn",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/the-best-solution",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/rachelchxn/dataquest",
      external: true,
    },
    {
      label: "pitch",
      href: "https://pitch.com/public/43beb03c-aa89-4983-81ab-6c08b79769d9",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "First place at DataQuest. We trained a hotel-booking cancellation model, ranked feature importance, and turned the drivers into business recommendations instead of stopping at a leaderboard score.",
  contributions: [
    "Preprocessed booking data and compared models (including logistic regression and trees).",
    "Used feature importance to write concrete recommendations for cutting cancel rates.",
  ],
  outcomes: [
    "First place at DataQuest.",
  ],
};

export default booking_cancellations;
