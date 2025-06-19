import { useEffect, useRef, useState } from "react";
import Glass from './Glass';
import ProjectItem from "./Project";
import './css/Projects.css';

import { highlight_projects } from "../resources/highlight_projects";

const projectsData = highlight_projects;

const scrambleChars = "@#!$%^&*?<>~:;[]{}|+=-_`";

function scrambleText(text, revealCount = 0) {
    // Reveal the first revealCount letters, scramble the rest
    return text
        .split("")
        .map((char, i) => {
            if (char === " " || i < revealCount) return char;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");
}

const Projects = () => {
    const listRef = useRef(null);
    const [scrambledText, setScrambledText] = useState({
        h1: "The Things I Do",
        p: "a showcase of highlight experiences"
    });

    useEffect(() => {
        let scrambleInterval = null;
        let revealInterval = null;
        let isScrambling = false;

        // Use a ref to persist across renders and not trigger rerenders
        const hasScrambled = { current: false };

        const original = {
            h1: "The Things I Do",
            p: "a showcase of highlight experiences"
        };

        const handleScroll = () => {
            if (isScrambling || hasScrambled.current) return;
            isScrambling = true;
            hasScrambled.current = true;

            let revealH1 = 0;
            let revealP = 0;

            // Scramble for a short time (slower interval)
            scrambleInterval = setInterval(() => {
                setScrambledText({
                    h1: scrambleText(original.h1),
                    p: scrambleText(original.p)
                });
            }, 110); // slower scramble

            setTimeout(() => {
                clearInterval(scrambleInterval);

                // Reveal several characters at a time
                const revealStep = 2; // how many chars to reveal at once
                revealInterval = setInterval(() => {
                    revealH1 += revealStep;
                    revealP += revealStep;
                    setScrambledText({
                        h1: scrambleText(original.h1, revealH1),
                        p: scrambleText(original.p, revealP)
                    });
                    if (revealH1 >= original.h1.length && revealP >= original.p.length) {
                        clearInterval(revealInterval);
                        setScrambledText(original);
                        isScrambling = false;
                    }
                }, 80); // reveal speed, a bit slower
            }, 700); // how long to scramble before revealing
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(scrambleInterval);
            clearInterval(revealInterval);
        };
    }, []);

    return (
        <div className="projects">
            <div className="heading">
                <h1>{scrambledText.h1}</h1>
                <p>{scrambledText.p}</p>
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