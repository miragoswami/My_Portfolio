import React, { useEffect, useState } from "react";

function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log("Projects:", data);
        setProjects(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <section className="page-section">

      <p className="section-small">MY WORK</p>

      <h1 className="section-title">Projects</h1>

      <div className="project-container">

        {projects.map((project) => (
          <div className="project-card" key={project.id}>

            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <p>
              Technologies: {project.technologies.join(", ")}
            </p>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View Project
            </a>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Project;