import { useEffect, useRef, useState } from "react";

const MOBILE_CENTER_THRESHOLD = 0.3; // 0.2 = center fifth of viewport, change as needed

const ProjectItem = ({ project, video_index }) => {
    const itemRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const [inView, setInView] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Update isMobile on resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 700);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // InView detection: center fifth of viewport for mobile, full for desktop
    useEffect(() => {
        const checkInView = () => {
            if (!itemRef.current) return;
            const rect = itemRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (isMobile) {
                // Center MOBILE_CENTER_THRESHOLD of viewport
                const centerStart = windowHeight * (0.5 - MOBILE_CENTER_THRESHOLD / 2);
                const centerEnd = windowHeight * (0.5 + MOBILE_CENTER_THRESHOLD / 2);
                const itemCenter = rect.top + rect.height / 2;
                setInView(itemCenter >= centerStart && itemCenter <= centerEnd);
            } else {
                // Desktop: any part visible
                setInView(
                    rect.bottom > 0 && rect.top < windowHeight
                );
            }
        };

        checkInView();
        window.addEventListener("scroll", checkInView, { passive: true });
        window.addEventListener("resize", checkInView);

        return () => {
            window.removeEventListener("scroll", checkInView);
            window.removeEventListener("resize", checkInView);
        };
    }, [isMobile]);

    // Mouse listeners for hover effect (desktop)
    useEffect(() => {
        const node = itemRef.current;
        if (!node) return;
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    const hoverActive = (isMobile && inView) || (!isMobile && isHovered);

    return (
        <div
            className={`project-item${hoverActive ? " hover" : ""}`}
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