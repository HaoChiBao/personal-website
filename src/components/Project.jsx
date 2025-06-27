const ProjectItem = ({ project, video_index}) => {
    return (
        <div className='project-item' id ='projects'>
            { project.video ? 
                <video className="project-video" autoPlay loop muted playsInline>
                    <source src={project.video} type="video/mp4" />
                </video>
                :
                <img className="project-image" src={project.image} alt={project.title} />
            }
            <div className="project-content">
                <h2>{project.title}</h2>
                {/* <p>{project.description}</p> */}
                <div className='tags'>
                    {Array.isArray(project.tags) && project.tags.map((tag, idx) => (
                        <span key={tag + idx} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;