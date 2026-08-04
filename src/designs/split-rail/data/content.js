import resume from '../../../assets/files/James_Yang-Resume.pdf';

export const profile = {
  name: 'James Yang',
  bioLead: 'Chronic builder that ',
  bioArc: 'builds',
  bioTail: ' with code.',
};

export const work = [
  {
    org: 'Boardy',
    href: null,
    role: 'Contract Software Developer',
    dates: '2025',
  },
  {
    org: 'RBC',
    href: 'https://www.rbcroyalbank.com/',
    role: 'Software Developer Intern',
    dates: '2025',
  },
  {
    org: 'Nodes',
    href: null,
    role: 'Indie Developer',
    dates: '2025',
  },
];

export const links = {
  email: 'mailto:jamesyang663@gmail.com',
  github: 'https://github.com/HaoChiBao',
  linkedin: 'https://www.linkedin.com/in/jamesyang03/',
  resume,
};

export const featured = [
  {
    id: 'boardy',
    title: 'Boardy',
    meta: '2025',
    description:
      'Making the world’s most connected AI even more connected — real-time agent plumbing and production reliability.',
    stack: 'TypeScript · Python · Supabase · GraphQL',
    links: [{ label: 'github', href: 'https://github.com/HaoChiBao' }],
  },
  {
    id: 'nodes',
    title: 'Nodes',
    meta: '2025',
    description:
      'Chrome extension that finds 1000+ emails on a page in about a second — outreach without leaving the tab.',
    stack: 'JavaScript · Chrome Extension · HTML/CSS',
    links: [{ label: 'github', href: 'https://github.com/HaoChiBao' }],
  },
  {
    id: 'rbc',
    title: 'RBC Commercial',
    meta: 'Internship',
    description:
      'Commercial banking dashboards for executives — clearer portfolio views, charts, and faster data workflows.',
    stack: 'React · Java · Spring Boot · SQL',
    links: [],
  },
];

export const hackathons = [
  {
    id: 'uofthacks',
    title: 'Physical Voice AI',
    meta: 'UofTHacks · 1st Place',
    description:
      'A desk companion with on-device LLM inference — embodied AI you can talk to, not another browser tab.',
    stack: 'Python · LLMs · Hardware · 3D Print',
    links: [{ label: 'github', href: 'https://github.com/HaoChiBao' }],
    featured: true,
  },
];

export const awards =
  'UofTHacks 1st Place · Boardy contract shipped · Nodes on Chrome Web Store';
