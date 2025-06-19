import TEST from '../assets/videos/project test.mp4'

const ProjectItem = ({ project }) => {
    return (
        <div className='project-item' id ='projects'>
            {/* <video className="project-video" autoPlay loop muted playsInline>
                <source src={TEST} type="video/mp4" />
            </video> */}
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