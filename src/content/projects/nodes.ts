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
  links: [{ label: "site", href: "https://thenodes.ca", external: true }],
  role: "Indie Developer",
  summary:
    "Built and shipped a LinkedIn outreach Chrome extension solo in under a month, growing to 1,000+ installs and 17,000+ profiles indexed to date. Extraction runs client-side through a queue that opens each search results page in a hidden iframe inside the user's own logged-in session, parsing against fallback selector chains so a LinkedIn markup change drops single fields instead of failing the run.",
  story: `I built Nodes because LinkedIn outreach prep was eating my week. Open a search, click into each profile, copy the name, title, and company into a sheet, repeat — then lose the thread when a selector changed or a tab crashed. Multiply that by hundreds of prospects and the work stops being outreach and becomes data entry.

Existing scrapers were either blocked, brittle, or shipped data off-device. I wanted extraction that stayed inside my own logged-in Chrome session, respected ordinary browsing rhythm, and failed gracefully when LinkedIn tweaked markup.

So I shipped a Chrome extension that queues LinkedIn search-result pages, opens each one in a hidden iframe in-session, and parses profile fields through fallback selector chains. The first pass worked on happy-path results; the real work was surviving layout churn without aborting the whole run when a single field disappeared.

I tuned pacing between loads so the queue looked like careful manual browsing, not a burst scraper — account safety over raw throughput. Then I hardened the UI around copy/export flows so the extracted list was something I could actually use the same afternoon.`,
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
    mark: "/media/tag-nodes.png",
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
        text: "LinkedIn outreach prep was eating my week: open a search, click each profile, copy name/title/company into a sheet, repeat. Existing scrapers were blocked, brittle, or shipped data off-device. I needed extraction that stayed inside my own logged-in Chrome session and survived markup churn.",
      },
      {
        type: "heading",
        text: "What I built",
      },
      {
        type: "paragraph",
        text: "A Chrome extension that queues LinkedIn search-result pages, opens each in a hidden iframe in-session, and parses profile fields through fallback selector chains so a single missing field does not abort the run.",
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
