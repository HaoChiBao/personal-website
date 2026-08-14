import type { ProjectEntry } from "../types";

const nodes: ProjectEntry = {
  id: "nodes",
  name: "Nodes",
  title: "LinkedIn outreach Chrome extension (1,000+ installs)",
  blurb:
    "Solo-built LinkedIn outreach extension: 1,000+ installs and 17,000+ profiles indexed, with client-side queued extraction.",
  dates: "2025",
  section: "projects",
  labels: ["indie", "tooling", "shipped", "featured"],
  stack: ["React", "TypeScript", "Firebase", "Chrome APIs"],
  links: [
    { label: "site", href: "https://thenodes.ca", external: true },
    { label: "github", href: "https://github.com/HaoChiBao", external: true },
  ],
  role: "Indie Developer",
  summary:
    "Built and shipped a LinkedIn outreach Chrome extension solo in under a month, growing to 1,000+ installs and 17,000+ profiles indexed to date. Extraction runs client-side through a queue that opens each search results page in a hidden iframe inside the user's own logged-in session, parsing against fallback selector chains so a LinkedIn markup change drops single fields instead of failing the run.",
  story: `I built Nodes because I was tired of wasting time doing the same outreach prep steps over and over. I'd open a company site, scroll the footer, check the about page, search "contact," and still miss emails hiding in random places. Multiply that by dozens of websites and it turns into a painfully slow process.

At first, I tried a few popular email-finder tools. Some were accurate but expensive. Others were slow, locked behind accounts, or required exporting and cleaning results. I wanted something simple: just show me every email that's already visible on the page.

So I started with a barebones Chrome extension: a button, a scan function, and a list. The first prototype worked in minutes, but the real work started immediately after. Real websites are messy.

I iterated by testing on lots of sites and collecting failure cases. Each time it missed something, I'd add a new pattern or fix a parsing edge case. Then I focused on making it feel fast: no laggy UI, no long blocking scans, and no noisy duplicates.

Once it felt reliable, I added quality-of-life features: copy all, export options, and a clean UI that doesn't distract from the page you're on.`,
  contributions: [
    "Ran extraction client-side via a hidden-iframe queue inside the user's logged-in session.",
    "Used fallback selector chains so markup changes drop single fields instead of failing the whole run.",
    "Paced the queue with delays between loads to keep activity within ordinary manual browsing rhythm, prioritizing account safety over extraction speed.",
  ],
  outcomes: [
    "1,000+ Chrome Web Store installs.",
    "17,000+ LinkedIn profiles indexed to date.",
    "Shipped end-to-end solo in under a month.",
  ],
  media: {
    video: "/media/nodes.mp4",
    caption: "Nodes extension in action",
  },
  caseStudy: {
    headline: "Nodes",
    hero: {
      video: "/media/nodes.mp4",
      caption: "Nodes extension in action",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Built and shipped a LinkedIn outreach Chrome extension solo in under a month, growing to 1,000+ installs and 17,000+ profiles indexed to date.",
      },
      {
        type: "heading",
        text: "Why I built it",
      },
      {
        type: "paragraph",
        text: "I built Nodes because I was tired of wasting time doing the same outreach prep steps over and over. I'd open a company site, scroll the footer, check the about page, search \"contact,\" and still miss emails hiding in random places. Multiply that by dozens of websites and it turns into a painfully slow process.",
      },
      {
        type: "paragraph",
        text: "At first, I tried a few popular email-finder tools. Some were accurate but expensive. Others were slow, locked behind accounts, or required exporting and cleaning results. I wanted something simple: just show me every email that's already visible on the page.",
      },
      {
        type: "heading",
        text: "Building the extension",
      },
      {
        type: "paragraph",
        text: "So I started with a barebones Chrome extension: a button, a scan function, and a list. The first prototype worked in minutes, but the real work started immediately after. Real websites are messy.",
      },
      {
        type: "paragraph",
        text: "I iterated by testing on lots of sites and collecting failure cases. Each time it missed something, I'd add a new pattern or fix a parsing edge case. Then I focused on making it feel fast: no laggy UI, no long blocking scans, and no noisy duplicates.",
      },
      {
        type: "paragraph",
        text: "Once it felt reliable, I added quality-of-life features: copy all, export options, and a clean UI that doesn't distract from the page you're on.",
      },
      {
        type: "heading",
        text: "How extraction works",
      },
      {
        type: "list",
        items: [
          "Ran extraction client-side via a hidden-iframe queue inside the user's logged-in session.",
          "Used fallback selector chains so markup changes drop single fields instead of failing the whole run.",
          "Paced the queue with delays between loads to keep activity within ordinary manual browsing rhythm, prioritizing account safety over extraction speed.",
        ],
      },
      {
        type: "heading",
        text: "Outcomes",
      },
      {
        type: "list",
        items: [
          "1,000+ Chrome Web Store installs.",
          "17,000+ LinkedIn profiles indexed to date.",
          "Shipped end-to-end solo in under a month.",
        ],
      },
    ],
  },
};

export default nodes;
