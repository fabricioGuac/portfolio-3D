import Footer from "../components/Footer";
import Header from "../components/Header";


export default function AboutMe () {
    return (<>
    <Header title={"About me"}/>
    <div className="beach">
        <div className="curved-trunk"></div>
        <div className="coconut coconut-1"></div>
        <div className="coconut coconut-2"></div>
        <div className="coconut coconut-3"></div>
        <h3 className="about-me-text">
        Hello! I'm Fabricio Guacuto,
        an aspiring Full Stack Developer
        with a strong foundation in the MERN stack 
        and a keen focus on backend development.
        Having completed a rigorous bootcamp,
        I've built a solid skill set
        through hands-on projects and collaborative learning.
        Known for my dedication, attention to detail, and work ethic,
        I'm eager to contribute to a dynamic team where my passion for problem-solving
        and backend expertise can make a difference.
        </h3>
    </div>
    <Footer/>
    </>)
};