


export default function Modal({project, onClose}) {
    return (
        <div className="modal">

            <button onClick={onClose}>Close</button>

            <h2>{project.name}</h2>

            <p>{project.description}</p>

            <p>Technologies: {project.technologies.join(', ')}</p>

            <a href={project.githubUrl}>Github</a>

            {project.deployedUrl && <a href={project.deployedUrl}>Deployed</a>}
            
        </div>
    );
}