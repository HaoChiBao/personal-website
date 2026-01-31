import nodes_video from '../../assets/videos/nodes.mp4';
import boardy_video from '../../assets/videos/boardy.mp4';
import uofthacks from '../../assets/videos/uofthacks.mp4';
import rbc from '../../assets/images/rbc-logo.jpg'

import boardy_tag from '../../assets/images/tag-boardy.png';
import nodes_tag from '../../assets/images/tag-nodes.png';
import rbc_tag from '../../assets/images/tag-rbc.png';

const Tag = (name, img_src = null) => {
    return (
        <span className={`tag ${name}`}>
            {img_src && <img src={img_src} alt={name} />}
            <p>{name}</p>
        </span>
    )
}

const highlight_projects = [
    {
        tags: [Tag("Boardy", boardy_tag), Tag("Feature Shipped")],
        video: boardy_video,
        title: "Making the worlds most connected ai even more connected",
        description: 'Enhanced the connectivity of Boardy AI by integrating new APIs and improving real-time data processing capabilities.',

        id: 'boardy',
        date: '2025.02.30 - 2025.05.30',
        role: 'Contract Work',
    },
    {
        title: "Building a chrome extension that can find you 1000+ emails in 1 second",
        description: 'Built a productivity tool that helps users find contact information efficiently directly from their browser.',
        tags: [Tag("Nodes", nodes_tag), Tag("Product Shipped")],
        video: nodes_video,

        role: 'My Own Projects',
        date: '2025.02.30 - 2025.05.30',
        id: 'nodes'
    },
    {
        title: "Solving commercial banking problems for executives at Canada’s largest bank",
        description: 'Developed a comprehensive dashboard for commercial banking clients to manage their portfolios and visualize data.',
        tags: [Tag("RBC", rbc_tag), Tag("Internship")],
        image: rbc,

        date: '2025.04.30 - 2025.08.30',
        id: 'rbc',
        role: 'Software Developer Intern',
    },
    {
        title: "1st place winner at UofT’s largest hackathon",
        description: 'Created a physical AI assistant that interacts via voice commands, featuring a custom-built enclosure and local LLM inference.',
        tags: [Tag("Winner"), Tag("Hackathons")],
        video: uofthacks,

        id: 'uofthacks',
        date: '2025.02.30 - 2025.05.30',
        role: 'Hackathon',

    }
]

export { highlight_projects}