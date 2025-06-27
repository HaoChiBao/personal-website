import nodes_video from '../assets/videos/nodes.mp4';
import boardy_video from '../assets/videos/boardy.mp4';
import uofthacks from '../assets/videos/uofthacks.mp4';

import rbc from '../assets/images/rbc-logo.jpg'

const highlight_projects = [
    {
        title: "Making the worlds most connected ai even more connected",
        description: "Description of project 1.",
        tags: ["Boardy.ai", "Feature Shipped", "Contract Work"],
        video: boardy_video
    },
    {
        title: "Building a chrome extension that can find you 1000+ emails in 1 second",
        description: "Description of project 2.",
        tags: ["Nodes", "Product Shipped", "Co-Founded"],
        video: nodes_video
    },
    {
        title: "Solving commercial banking problems executives at Canada’s largest bank",
        description: "Description of project 3.",
        tags: ["RBC", "Internship"],
        image: rbc,
    },
    {
        title: "1st place winner at UofT’s largest hackathon",
        description: "Description of project 4.",
        tags: ["Winner", "Hackathon"],
        video: uofthacks
    }
]

export { highlight_projects}