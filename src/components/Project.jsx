import { useEffect, useRef, useState } from "react";

const ProjectItem = ({ project, video_index }) => {
    const itemRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <div
            className={`project-item${isMobile && inView ? " hover" : ""}`}
            id="projects"
            ref={itemRef}
        >
            {project.video ? (
                <video className="project-video" autoPlay loop muted playsInline>
                    <source src={project.video} type="video/mp4" />
                </video>
            ) : (
                <img className="project-image" src={project.image} alt={project.title} />
            )}
            <div className="project-content">
                <h2>{project.title}</h2>
                {/* <p>{project.description}</p> */}
                <div className="tags">
                    {Array.isArray(project.tags) &&
                        project.tags.map((tag, idx) => (
                            <span key={tag + idx} className="tag">
                                {tag}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;