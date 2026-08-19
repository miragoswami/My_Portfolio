import React from "react";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";

function Home() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="home">
      <div className="home-content">
        <p className="hello">Hello 👋, I'm</p>

        <h1>Mira Goswami</h1>

        <h2>Full Stack Web Developer</h2>

        <p className="experience-text">
          I build modern and responsive web applications using React, Django,
          Express and MongoDB.
        </p>

        <a
          href="#contact"
          className="contact-btn"
          onClick={scrollToContact}
          style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}
        >
          Contact 
        </a>

        <div className="social-icons">
          <a href="https://www.linkedin.com/in/mira-goswami-2175452a5/" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>

          <a href="https://github.com/miragoswami" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="home-image">
        <img src="/developer.png" alt="Developer illustration" />
      </div>
    </section>
  );
}

export default Home;
