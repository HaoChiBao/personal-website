import type { ProjectEntry } from "../types";

const swipify: ProjectEntry = {
  id: "swipify",
  name: "Swipify",
  title: "Tinder-style shopping overlay at SpurHacks",
  blurb:
    "Chrome extension that turns any storefront into swipe-right / swipe-left product cards.",
  dates: "2025",
  section: "hackathons",
  hackathon: {
    event: "SpurHacks",
    year: 2025,
    notes: "Placement / awards TBD",
  },
  labels: ["hackathon", "extension"],
  stack: ["Chrome extension", "TypeScript", "React", "OpenAI", "Supabase"],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/swipify",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/Swipify",
      external: true,
    },
    {
      label: "site",
      href: "https://swipify-olive.vercel.app/",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Swipify (SpurHacks) overlays a swipe deck on e-commerce pages. Products become yes/no cards; saved items land in a gallery so shopping is faster than scrolling a grid.",
  contributions: [
    "Parsed product cards on live storefronts and turned them into a swipe deck.",
    "Saved likes to a gallery with Supabase auth so the session survives the tab.",
  ],
  outcomes: ["Working extension plus gallery site from SpurHacks."],
};

export default swipify;
