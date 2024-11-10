import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Skills() {

    const skills = [
        {
            category: "Technical Languages",
            items: ["Javascript", "Java", "SQL"]
        },
        {
            category: "Frameworks/ Libraries",
            items: ["Node.js", "React", "Express", "MongoDB", "Mongoose", "GraphQL", "JWT", "SpringBoot", "Sequelize", "PostgreSQL"]
        },
        {
            category: "Tools",
            items: ["Git/GitHub", "VS Code", "Eclipse", "AWS"]
        },
        {
            category: "Testing",
            items: ["Jest"] //Hopefully JUnit soon
        }
    ]


    return (<>
        <Header title={"Skills"} />
        <div className="skills-chest">
            <div className="skills-groups">
                {skills.map((skillGroup, index) => (
                    <div key={index} className="skill-group">
                        <h2>{skillGroup.category}</h2>
                        <ul>
                            {skillGroup.items.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="resume-link">
                <h3>Download my <a href="https://docs.google.com/document/d/1WjgjUV_w6_VVo5JluFXzNau1pA5MiNYXWBmzB_ZpppA/export?format=pdf" download="FabricioGuacutoResume.pdf">resume</a></h3>
            </div>
        </div>
        <Footer />
    </>)
};