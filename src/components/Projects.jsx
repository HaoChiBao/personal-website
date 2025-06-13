import { useState, useEffect } from "react";

import Glass from './Glass';
import ProjectItem from "./Project";

import './css/Projects.css';

const Projects = () => {
    return (
        <div className="projects">
            <h1>Here are a few of my projects</h1>
            <div className="project-list">
                <ProjectItem project={{ title: "Project 1", description: "Description of project 1.", tags: ["React", "Frontend"] }} />
                <ProjectItem project={{ title: "Project 2", description: "Description of project 2.", tags: ["Node.js", "Backend"] }} />
                <ProjectItem project={{ title: "Project 3", description: "Description of project 3.", tags: ["API", "Express"] }} />
                <ProjectItem project={{ title: "Project 4", description: "Description of project 4.", tags: ["Fullstack", "MongoDB"] }} />
            </div>
        </div>
    )
}

export default Projects;