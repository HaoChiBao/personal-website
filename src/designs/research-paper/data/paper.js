import resume from '../../../assets/files/James_Yang-Resume.pdf';
import boardyVideo from '../../../assets/videos/boardy.mp4';
import nodesVideo from '../../../assets/videos/nodes.mp4';
import uofthacksVideo from '../../../assets/videos/uofthacks.mp4';
import rbcImage from '../../../assets/images/rbc-logo.jpg';

export const meta = {
  journal: 'Personal Transactions on Software & Systems',
  volume: 'Vol. 1',
  shortTitle: 'Yang — Chronic Builder',
  title: 'On Building Clearly: Notes from a Chronic Builder',
  author: 'James Yang',
  affiliation: 'Toronto, Canada',
  email: 'jamesyang663@gmail.com',
  date: '2025',
  doi: 'jamesyang.ca',
};

export const abstract =
  'This note surveys a practice of shipping software under real constraints: agent platforms, browser utilities, enterprise dashboards, and embodied AI. The author argues that clarity of interface and speed of feedback matter more than novelty for its own sake. Selected work is presented as results, with brief methods and outcomes.';

export const keywords = [
  'software engineering',
  'agent systems',
  'product design',
  'hackathons',
  'developer tools',
];

export const figures = [
  {
    id: 'fig1',
    label: 'Figure 1',
    caption:
      'Boardy — real-time agent connectivity work during a production contract.',
    video: boardyVideo,
  },
  {
    id: 'fig2',
    label: 'Figure 2',
    caption:
      'Nodes — a Chrome extension that extracts emails from the current page in ~1s.',
    video: nodesVideo,
  },
  {
    id: 'fig3',
    label: 'Figure 3',
    caption:
      'RBC commercial banking dashboard context (internship).',
    image: rbcImage,
  },
  {
    id: 'fig4',
    label: 'Figure 4',
    caption:
      'UofTHacks 1st place — physical voice AI with on-device LLM inference.',
    video: uofthacksVideo,
  },
];

export const results = [
  {
    id: 'boardy',
    title: 'Boardy',
    cite: 1,
    body: 'Contract work expanding agent-to-agent connectivity: integrations, streaming updates, retries, and observability so multi-agent sessions felt reliable rather than demo-fragile.',
    stack: 'TypeScript, Python, Supabase, GraphQL',
    figure: 'fig1',
  },
  {
    id: 'nodes',
    title: 'Nodes',
    cite: 2,
    body: 'An indie Chrome extension that scans the active page for email addresses, deduplicates noisily formatted matches, and presents a copy-friendly panel for outreach workflows.',
    stack: 'JavaScript, Chrome Extension APIs, HTML/CSS',
    figure: 'fig2',
  },
  {
    id: 'rbc',
    title: 'RBC Commercial',
    cite: 3,
    body: 'Internship building React surfaces for commercial banking teams: portfolio views, charts, and performance work so executives could trust what they saw.',
    stack: 'React, Java, Spring Boot, SQL',
    figure: 'fig3',
  },
  {
    id: 'uofthacks',
    title: 'UofTHacks winner',
    cite: 4,
    body: 'Team-led physical voice assistant with local inference — listen, transcribe, respond — packaged in a 3D-printed enclosure. Awarded 1st place.',
    stack: 'Python, LLMs, hardware, 3D printing',
    figure: 'fig4',
  },
];

export const references = [
  {
    id: 1,
    text: 'Yang, J. Boardy contract notes — agent connectivity & real-time pipelines. 2025.',
    href: 'https://github.com/HaoChiBao',
  },
  {
    id: 2,
    text: 'Yang, J. Nodes: page-local email extraction for the browser. Chrome Web Store / GitHub. 2025.',
    href: 'https://github.com/HaoChiBao',
  },
  {
    id: 3,
    text: 'Royal Bank of Canada. Commercial banking internship — dashboard engineering. 2025.',
    href: 'https://www.rbcroyalbank.com/',
  },
  {
    id: 4,
    text: 'Yang, J. et al. Embodied voice AI desk companion. UofTHacks (1st place). 2025.',
    href: 'https://github.com/HaoChiBao',
  },
  {
    id: 5,
    text: 'Yang, J. Curriculum vitae (PDF).',
    href: resume,
  },
  {
    id: 6,
    text: 'Yang, J. LinkedIn profile.',
    href: 'https://www.linkedin.com/in/jamesyang03/',
  },
];

export const correspondence = {
  email: `mailto:${meta.email}`,
  github: 'https://github.com/HaoChiBao',
  linkedin: 'https://www.linkedin.com/in/jamesyang03/',
  resume,
};
