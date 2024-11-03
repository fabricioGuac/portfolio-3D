import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';


export default function Footer() {
    return (
        <footer>
            <h3>Thank you for visiting</h3>
            <div className="icons">
                <a href="https://github.com/fabricioGuac" target="_blank"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/fabricio-guacuto" target="_blank"><FaLinkedin /></a>
                <a href="mailto:guacutofabricio@gmail.com"><FaEnvelope /></a>
            </div>
        </footer>
    )
}