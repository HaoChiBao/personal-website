import boardyVideo from '../../assets/videos/boardy.mp4';
import nodesVideo from '../../assets/videos/nodes.mp4';
import uofthacksVideo from '../../assets/videos/uofthacks.mp4';

const entries = [
  {
    id: 'rbc',
    title: 'Presenting a fullstack solution for commercial banking clients to the Royal Bank of Canada',
    role: 'Software Developer Intern at the Royal Bank of Canada',
    date: '2025.04.30 - 2025.08.30',
    videoSrc: nodesVideo,
    description: 'Developed a comprehensive dashboard for commercial banking clients to manage their portfolios and visualize data.',
  },
  {
    id: 'boardy',
    title: 'Making the worlds most connected ai, Boardy, even more connected',
    role: 'Contract Work at Boardy',
    date: '2025.02.30 - 2025.05.30',
    videoSrc: boardyVideo,
    description: 'Enhanced the connectivity of Boardy AI by integrating new APIs and improving real-time data processing capabilities.',
  },
  {
    id: 'extension',
    title: 'Shipped a Chrome extension used by 1,000+ people to source emails',
    role: 'My Own Projects',
    date: '2025.02.30 - 2025.05.30',
    videoSrc: nodesVideo,
    description: 'Built a productivity tool that helps users find contact information efficiently directly from their browser.',
  },
  {
    id: 'uofthacks',
    title: 'Built a voice-enabled hardware AI desk companion that won 1st place at UofTHacks',
    role: 'My Own Projects',
    date: '2025.02.30 - 2025.05.30',
    videoSrc: uofthacksVideo,
    description: 'Created a physical AI assistant that interacts via voice commands, featuring a custom-built enclosure and local LLM inference.',
  }
];

export default entries;
