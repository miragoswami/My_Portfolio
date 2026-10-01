import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const DEFAULT_PROJECTS = [
    {
        _id: "default-1",
        title: "Portfolio Web Application",
        description:
            "A full-stack modern responsive portfolio built with React, Express, Node.js, and MongoDB.",
        technologies: [
            "React",
            "Express",
            "Node.js",
            "MongoDB",
            "Bootstrap"
        ],
        github: "https://github.com/miragoswami/My_Portfolio"
    }
];

function Project() {
    const [projects, setProjects] = useState(DEFAULT_PROJECTS);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const url = `${API_URL}/api/projects`;

                console.log("Fetching:", url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const data = await response.json();

                console.log("Projects from backend:", data);

                if (Array.isArray(data)) {
                    setProjects(data);
                } else if (data && Array.isArray(data.projects)) {
                    setProjects(data.projects);
                }
            } catch (error) {
                console.error("Project API Error:", error);
                setProjects(DEFAULT_PROJECTS);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="page-section">

            <p className="section-small">MY WORK</p>

            <h1 className="section-title">Projects</h1>

            <div className="project-container">

                {projects.map((project, index) => (
                    <div
                        className="project-card"
                        key={project._id || project.id || index}
                    >

                        <h2>{project.title}</h2>

                        <p>{project.description}</p>

                        {Array.isArray(project.technologies) &&
                            project.technologies.length > 0 && (
                                <div className="project-tech">
                                    {project.technologies.map((tech, techIdx) => (
                                        <span key={techIdx}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}

                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn"
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