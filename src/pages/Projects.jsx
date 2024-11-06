import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectItem from '../components/ProjectItem';
import Modal from '../components/Modal';

export default function Projects () {

    // State varibale to track the selected project
    const [selectedProject, setSelectedProject] = useState(null);
    // State variable to track the modal state
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Array of project data
    const projects = [{
        id: '1c491e0f-cbaa-4c41-8839-1a45242dbc74',
        name:'tumorido fittrack' ,
        description:'Full stack MERN fit tracking application.',
        img: '/portfolioImages/bodyGraph.png',
        githubUrl: 'https://github.com/fabricioGuac/tumorido-fittrack',
        deployedUrl: 'https://tumorido-fittrack.onrender.com/' ,
        technologies: ['MERN', 'JWT', 'Socket.io', 'Chart.js', 'AWS S3'],
    },
    {
        id:'2a5f1de4-8bdc-4862-856f-1bc4dbd41156' ,
        name:'book api refacto GraphQL' ,
        description: 'A full-stack MERN application that helps book lovers track their reading lists.',
        img:'/portfolioImages/screeshot.png' ,
        githubUrl:'https://github.com/fabricioGuac/book-api-refactor-graphql' ,
        deployedUrl:'https://book-api-refactor-graphql.onrender.com/' ,
        technologies: ['MERN', 'GraphQL', 'JWT'],
    },
    {
        id:'ca33d2e9-7715-4d89-ad88-74f8efa9d113' ,
        name:'dayjs task tracker' ,
        description:'Simple task manager web app.',
        img: '/portfolioImages/fabricioguac.github.io_dayjs-task-tracker_.png' ,
        githubUrl:'https://github.com/fabricioGuac/dayjs-task-tracker' ,
        deployedUrl:'https://fabricioguac.github.io/dayjs-task-tracker/' ,
        technologies:['JQuery, Bootstrap, Day.js'] ,
    },
    {
        id:'9f5c765a-5c97-47f4-afca-34d4280b6090'  ,
        name: 'spring news hub api',
        img: '/portfolioImages/springnews.png',
        description: 'The Spring News Hub API is a Java web application designed for tech news enthusiasts.',
        githubUrl:'https://github.com/fabricioGuac/spring-news-hub-api' ,
        technologies:['Java','Spring Data JPA','Spring Web','Spring Session','Thymeleaf','PostgreSQL',] ,
    },
    {
        id:'e53a5ed9-02e1-431f-af88-7113de29eeac' ,
        name: 'psql business manager',
        description:"A command line interface (CLI) application designed to function as a content management system (CMS) for managing a company's departments, roles, and employees.",
        img: '/portfolioImages/psql-bussiness-manager.png',
        githubUrl:'https://github.com/fabricioGuac/psql-business-manager' ,
        technologies:['Node.js', 'PostgreSQL', 'Inquirer.js'] ,
    },
]


// Function to handle opening the modal
const openModal = (project) => {
    // Sets the selected project to the clicked project
    setSelectedProject(project);
    // Sets the isModalOpen state variable to true
    setIsModalOpen(true);
};

const closeModal = () => {
    // Clears the selected project by setting it to null
    setSelectedProject(null);
    // Sets the isModalOpen state variable to false
    setIsModalOpen(false);
};


    return (<>
    <Header title={"Projects"}/>
    <div className="sea-island">
        {projects.map((project) => {
    return (
        <ProjectItem key={project.id} project={project} onClick={openModal}  />
    );
})}
    </div>
    {isModalOpen && <Modal project={selectedProject} onClose={closeModal} />}
    <Footer/>
    </>)
};