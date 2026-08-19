import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

const DEFAULT_PROJECTS = [
    {
        _id: "default-1",
        title: "Portfolio Web Application",
        description: "A full-stack modern responsive portfolio built with React, Express, Node.js, and MongoDB.",
        technologies: ["React", "Express", "Node.js", "MongoDB", "Bootstrap"],
        github: "https://github.com/miragoswami/My_Portfolio"
    }
];

function Project() {
    const [projects, setProjects] = useState(DEFAULT_PROJECTS);

    useEffect(() => {
        fetch(`${API_BASE_URL}/projects`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                } else if (data && Array.isArray(data.projects) && data.projects.length > 0) {
                    setProjects(data.projects);
                }
            })
            .catch((error) => {
                console.warn("Using default projects. Error:", error.message);
            });
    }, []);

    return (
        <section className="page-section">

            <p className="section-small">MY WORK</p>

            <h1 className="section-title">Projects</h1>

            <div className="project-container">

                {projects.map((project, index) => (
                    <div className="project-card" key={project._id || project.id || index}>

                        <h2>{project.title}</h2>

                        <p>{project.description}</p>

                        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                            <div className="project-tech">
                                {project.technologies.map((tech, techIdx) => (
                                    <span key={techIdx}>{tech}</span>
                                ))}
                            </div>
                        )}

                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn"
                                style={{ textDecoration: "none", display: "inline-block" }}
                            >
                                View Project
                            </a>
                        )}

                    </div>
                ))}

            </div>

        </section>
    );
}

export default Project;