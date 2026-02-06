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
        
        overview: {
            summary: "Boardy is a platform that lets different AI agents talk to each other. Instead of working alone, agents can now share information and work together in real-time. We built this for developers who want to create more powerful, connected AI systems without the headache of building custom integrations.",
            worked_as: "Contract Software Developer",
            worked_with: ["Typescript", "Agentic Voice Agents", "Python", "Railway Deployment", "SQL", "Supabase", "GraphQL"]
        },
        caption: "Figure 1. pulling an all-nighter at the Boardy offices",
        story: `I participated in a Hackathon (Qhacks 2025) with my friend Owen Gretzinger.
        We didn't win any prize.
        He posted about it.
        Boardy team reached out to us to implement a similar feature to what we built.
        Over the span of the contract, we integrated real-time data processing capabilities.
        Today, the world is much safer. But the human brain hasn't changed much since those hunter-gatherer days. It's still stuck in the Stone Age. That's why, if you don't resist, the brain chooses the easiest paths to solve problems.`,
        contributions: `Today, the world is much safer. But the human brain hasn't changed much since those hunter-gatherer days. It's still stuck in the Stone Age. That's why, if you don't resist, the brain chooses the easiest paths to solve problems.`,
        outcomes: `Deployed on Railway`
    },
    {
        title: "Building a chrome extension that can find you 1000+ emails in 1 second",
        description: 'Built a productivity tool that helps users find contact information efficiently directly from their browser.',
        tags: [Tag("Nodes", nodes_tag), Tag("Product Shipped")],
        video: nodes_video,

        role: 'My Own Projects',
        date: '2025.02.30 - 2025.05.30',
        id: 'nodes',
        
        overview: {
            summary: "Finding emails on websites is usually slow and boring. Nodes is a Chrome extension that does it for you in one second. It scans the page you're on, finds every email address, and lists them for you. It's perfect for salespeople, recruiters, or anyone who needs to build a contact list fast.",
            worked_as: "Indie Developer",
            worked_with: ["Chrome Extension API", "Javascript", "HTML/CSS", "Supabase"]
        },
        caption: "Figure 1. Nodes extension in action",
        story: `I needed a way to find emails quickly.
        Existing tools were too slow or expensive.
        I decided to build my own solution using a simple Chrome extension format.
        It scans the page for email patterns and aggregates them.`,
        contributions: `Built the entire extension from scratch. Implemented the email regex and UI overlay.`,
        outcomes: `Published on Chrome Web Store. 100+ users.`
    },
    {
        title: "Solving commercial banking problems for executives at Canada’s largest bank",
        description: 'Developed a comprehensive dashboard for commercial banking clients to manage their portfolios and visualize data.',
        tags: [Tag("RBC", rbc_tag), Tag("Internship")],
        image: rbc,

        date: '2025.04.30 - 2025.08.30',
        id: 'rbc',
        role: 'Software Developer Intern',

        overview: {
            summary: "I built a new dashboard for executives at RBC to help them manage commercial banking portfolios. Before this, they had to rely on complex spreadsheets and raw data. This tool turns that messy data into clear, interactive charts, making it much easier for them to make big financial decisions quickly.",
            worked_as: "Software Developer Intern",
            worked_with: ["React", "Java", "Spring Boot", "SQL"]
        },
        caption: "Figure 1. RBC Internship",
        story: `Worked with the commercial banking team.
        Helped optimize data visualization for executives.
        Learned valid corporate software development practices.`,
        contributions: `Developed dashboard components. Integrated with backend APIs.`,
        outcomes: `Improved dashboard load time by 20%.`
    },
    {
        title: "1st place winner at UofT’s largest hackathon",
        description: 'Created a physical AI assistant that interacts via voice commands, featuring a custom-built enclosure and local LLM inference.',
        tags: [Tag("Winner"), Tag("Hackathons")],
        video: uofthacks,

        id: 'uofthacks',
        date: '2025.02.30 - 2025.05.30',
        role: 'Hackathon',

        overview: {
            summary: "Most AI lives on a screen, but we wanted to build one you could actually hold. We created a physical, voice-controlled assistant using a 3D-printed body and a local AI model. It listens to you, thinks on its own hardware (no internet needed!), and talks back. It was a fun experiment to see how personal AI could be.",
            worked_as: "Team Lead",
            worked_with: ["Python", "Hardware", "LLMs", "3D Printing"]
        },
        caption: "Figure 1. Winning moment at UofT Hacks",
        story: `We wanted to build something physical.
        Used a local LLM to run on a limited device.
        Designed and printed a custom enclosure.`,
        contributions: `Wrote the firmware for the device. Handled the LLM integration.`,
        outcomes: `Won 1st place out of 500+ participants.`

    }
]

export { highlight_projects}