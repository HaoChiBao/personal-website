import { useEffect, useRef } from "react";
import Glass from './Glass';
import ProjectItem from "./Project";
import './css/Projects.css';

import { highlight_projects } from "../resources/highlight_projects";

const projectsData = highlight_projects

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
            <div className="heading">
                <h1>The Things I Do</h1>
                <p>a showcase of highlight experiences</p>
            </div>
            <div className="project-list" ref={listRef}>
                {projectsData.map((project, idx) => (
                    <ProjectItem key={project.title + idx} project={project} />
                ))}
            </div>
            <div className="more-projects">
                <h2>WANNA SEE MORE PROJECTS?!</h2>
                <button>Click Here For More Projects</button>
            </div>
        </div>
    );
};

export default Projects;