import React from "react";

function About() {
  return (
    <section className="about-section">

      <div className="about-container">

        {/* LEFT SIDE */}
        <div className="about-text">

          <h1>About me</h1>

          <p>
            Welcome to my portfolio! I’m Mira Goswami, a passionate full
            stack developer specializing in modern web development.
            I enjoy building scalable applications and transforming ideas
            into seamless digital experiences.
          </p>

          <p>
            Throughout my journey, I have expanded my skill set from
            building robust web platforms to exploring different areas
            of application development. I enjoy creating user-friendly
            interfaces and efficient backend systems.
          </p>

          <p>
            As a quick learner and highly adaptable professional, I embrace
            new technologies with ease. My skills include React, Django,
            Express, MongoDB, Python, JavaScript, HTML, CSS, Bootstrap,
            MySQL.
          </p>

        </div>


        {/* RIGHT SIDE - SKILLS */}
        <div className="about-skills">

          <h2>My Skills</h2>

          <div className="skills-logos">

            {/* React */}
            <div className="skill-logo">
              <i className="devicon-react-original colored"></i>
              <span>React</span>
            </div>

            {/* JavaScript */}
            <div className="skill-logo">
              <i className="devicon-javascript-plain colored"></i>
              <span>JavaScript</span>
            </div>

            {/* Python */}
            <div className="skill-logo">
              <i className="devicon-python-plain colored"></i>
              <span>Python</span>
            </div>

            {/* Django */}
            <div className="skill-logo">
              <i className="devicon-django-plain colored"></i>
              <span>Django</span>
            </div>

            {/* Node.js */}
            <div className="skill-logo">
              <i className="devicon-nodejs-plain colored"></i>
              <span>Node.js</span>
            </div>

            {/* Express */}
            <div className="skill-logo">
              <i className="devicon-express-original"></i>
              <span>Express</span>
            </div>

            {/* MongoDB */}
            <div className="skill-logo">
              <i className="devicon-mongodb-plain colored"></i>
              <span>MongoDB</span>
            </div>

            {/* MySQL */}
            <div className="skill-logo">
              <i className="devicon-mysql-original colored"></i>
              <span>MySQL</span>
            </div>

            {/* HTML */}
            <div className="skill-logo">
              <i className="devicon-html5-plain colored"></i>
              <span>HTML</span>
            </div>

            {/* CSS */}
            <div className="skill-logo">
              <i className="devicon-css3-plain colored"></i>
              <span>CSS</span>
            </div>

            {/* Bootstrap */}
            <div className="skill-logo">
              <i className="devicon-bootstrap-plain colored"></i>
              <span>Bootstrap</span>
            </div>


          </div>

        </div>

      </div>

    </section>
  );
}

export default About;