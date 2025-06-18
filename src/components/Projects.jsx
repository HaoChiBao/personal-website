import { useEffect, useRef } from "react";
import Glass from './Glass';
import ProjectItem from "./Project";
import './css/Projects.css';

const projectsData = [
    { title: "Project 1", description: "Description of project 1.", tags: ["React", "Frontend"] },
    { title: "Project 2", description: "Description of project 2.", tags: ["Node.js", "Backend"] },
    { title: "Project 3", description: "Description of project 3.", tags: ["API", "Express"] },
    { title: "Project 4", description: "Description of project 4.", tags: ["Fullstack", "MongoDB"] },
    { title: "Project 1", description: "Description of project 1.", tags: ["React", "Frontend"] },
    { title: "Project 2", description: "Description of project 2.", tags: ["Node.js", "Backend"] },
    { title: "Project 3", description: "Description of project 3.", tags: ["API", "Express"] },
    { title: "Project 4", description: "Description of project 4.", tags: ["Fullstack", "MongoDB"] },
];

const Projects = () => {
    const listRef = useRef(null);

    useEffect(() => {
        // let ticking = false;

        // const handleScroll = () => {
        //     if (!ticking) {
        //         window.requestAnimationFrame(() => {
        //             const items = listRef.current.querySelectorAll('.project-item');
        //             const viewportHeight = window.innerHeight;
        //             const viewportCenter = window.scrollY + viewportHeight / 2;

        //             items.forEach(item => {
        //                 const rect = item.getBoundingClientRect();
        //                 const itemCenter = rect.top + window.scrollY + rect.height / 2;
        //                 const distance = Math.abs(viewportCenter - itemCenter);

        //                 const maxDistance = viewportHeight / 2;
        //                 const scale = 1 - Math.min(distance / maxDistance, 1) * 0.18;
        //                 item.style.transform = `scale(${scale})`;
        //                 item.style.transition = 'transform 0.18s cubic-bezier(.4,2,.6,1)';
        //                 item.style.zIndex = scale > 0.97 ? 2 : 1;
        //             });
        //             ticking = false;
        //         });
        //         ticking = true;
        //     }
        // };

        // window.addEventListener('scroll', handleScroll, { passive: true });
        // handleScroll();

        // return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="projects">
            <h1>Here are a few of my projects</h1>
            <div className="project-list" ref={listRef}>
                {projectsData.map((project, idx) => (
                    <ProjectItem key={project.title + idx} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;