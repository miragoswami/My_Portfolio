import React from "react";

function Experience() {
  return (
    <section className="experience-section">

      {/* Heading */}
      <div className="experience-heading">

        <p className="experience-small-title">
          MY JOURNEY
        </p>

        <h1>Experience</h1>

        <p className="experience-subtitle">
          My professional journey and the experience I have gained
          through development and projects.
        </p>

      </div>


      {/* Experience Cards */}
      <div className="experience-container">

        {/* Card 1 */}
        <div className="experience-card">
 

          <h2>Full Stack Developer Intern</h2>

          <h3>Ignitralabs</h3>

          <p className="experience-date">
            2025 - Present
          </p>

          <p className="experience-description">
            Worked as a Full Stack Developer Intern at Ignitralabs, developing web applications using React, Node.js, Express and MongoDB.
            Gained hands-on experience in frontend, backend, API integration and database management.
            Improved my problem-solving skills while working on real-world development projects.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Experience;