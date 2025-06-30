import nodes_video from '../assets/videos/nodes.mp4';
import boardy_video from '../assets/videos/boardy.mp4';
import uofthacks from '../assets/videos/uofthacks.mp4';
import rbc from '../assets/images/rbc-logo.jpg'

import boardy_tag from '../assets/images/tag-boardy.png';
import nodes_tag from '../assets/images/tag-nodes.png';
import rbc_tag from '../assets/images/tag-rbc.png';

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
        title: "Making the worlds most connected ai even more connected",
        description: "Description of project 1.",
        tags: [Tag("Boardy", boardy_tag), Tag("Feature Shipped")],
        video: boardy_video
    },
    {
        title: "Building a chrome extension that can find you 1000+ emails in 1 second",
        description: "Description of project 2.",
        tags: [Tag("Nodes", nodes_tag), Tag("Product Shipped")],
        video: nodes_video
    },
    {
        title: "Solving commercial banking problems for executives at Canada’s largest bank",
        description: "Description of project 3.",
        tags: [Tag("RBC", rbc_tag), Tag("Internship")],
        image: rbc,
    },
    {
        title: "1st place winner at UofT’s largest hackathon",
        description: "Description of project 4.",
        tags: [Tag("Winner"), Tag("Hackathons")],
        video: uofthacks
    }
]

export { highlight_projects}