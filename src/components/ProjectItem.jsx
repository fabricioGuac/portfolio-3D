


export default function ProjectItem({ project, onClick }) {
    return (
        <div className="project-item" onClick={() => onClick(project)}>

                <img src={project.img} alt={project.name} className="project-img" />
                
            <div className="project-name-tag">{project.name}</div>
        </div>
    );
}
