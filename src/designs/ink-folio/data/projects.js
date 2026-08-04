import boardyVideo from '../../../assets/videos/boardy.mp4';
import nodesVideo from '../../../assets/videos/nodes.mp4';
import uofthacksVideo from '../../../assets/videos/uofthacks.mp4';
import rbcImage from '../../../assets/images/rbc-logo.jpg';

const projects = [
  {
    id: 'boardy',
    title: 'Boardy',
    status: 'Shipped',
    description:
      'Making the world’s most connected AI even more connected — real-time agent plumbing, APIs, and production reliability.',
    tags: ['TypeScript', 'Python', 'Supabase', 'GraphQL'],
    video: boardyVideo,
    href: 'https://github.com/HaoChiBao',
    live: null,
  },
  {
    id: 'nodes',
    title: 'Nodes',
    status: 'Live',
    description:
      'A Chrome extension that finds 1000+ emails on a page in about a second — lightweight outreach without leaving the tab.',
    tags: ['JavaScript', 'Chrome Ext', 'HTML/CSS'],
    video: nodesVideo,
    href: 'https://github.com/HaoChiBao',
    live: null,
  },
  {
    id: 'rbc',
    title: 'RBC Commercial',
    status: 'Internship',
    description:
      'Commercial banking dashboards for executives — clearer portfolio views, charts, and faster data workflows.',
    tags: ['React', 'Java', 'Spring Boot', 'SQL'],
    image: rbcImage,
    href: null,
    live: null,
  },
  {
    id: 'uofthacks',
    title: 'UofTHacks Winner',
    status: '1st Place',
    description:
      'Physical voice AI assistant with on-device LLM inference — embodied AI you can put on a desk.',
    tags: ['Python', 'LLMs', 'Hardware', '3D Print'],
    video: uofthacksVideo,
    href: 'https://github.com/HaoChiBao',
    live: null,
  },
];

export default projects;
