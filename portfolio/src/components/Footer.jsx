import {
    FaLinkedin,
    FaGithub,
    FaReact
} from "react-icons/fa";

import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <h2>Mira Goswami</h2>

                <p>
                    Full Stack Web Developer
                </p>

                <p className="footer-text">
                    I build modern and responsive web applications
                    using React, Django, Express and MongoDB.
                </p>

                <div className="footer-socials">

                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </a>

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </a>

                </div>

                <div className="footer-line"></div>

                <p className="copyright">
                    © {new Date().getFullYear()} Mira Goswami. All rights reserved.
                </p>

                <p className="made-with">
                    This website was made with <FaReact />
                </p>

            </div>

        </footer>
    );
}

export default Footer;