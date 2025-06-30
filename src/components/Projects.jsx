import { useRef } from "react";
import Glass from './Glass';
import ProjectItem from "./Project";
import './css/Projects.css';
import { highlight_projects } from "../resources/highlight_projects";
import useScramble from "../hooks/useScramble";

const projectsData = highlight_projects;

const Projects = () => {
    const listRef = useRef(null);
    const [scrambledH1, h1Ref] = useScramble("The Things I Do", 500);
    const [scrambledP, pRef] = useScramble("A showcase of highlight experiences", 300);

    return (
        <div className="projects">
            <div className="heading">
                <h1 ref={h1Ref}>{scrambledH1}</h1>
                <p ref={pRef}>{scrambledP}</p>
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
