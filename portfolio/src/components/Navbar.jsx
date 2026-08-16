import React from "react";

function Navbar(props) {
  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          {" Mira Goswami "}
        </div>

        {/* NAVIGATION */}
        <div className="nav-links">

          <button
            className={props.page === "home" ? "active" : ""}
            onClick={() => props.setPage("home")}
          >
            HOME
          </button>

          <button
            className={props.page === "about" ? "active" : ""}
            onClick={() => props.setPage("about")}
          >
            ABOUT ME
          </button>

          <button
            className={props.page === "experience" ? "active" : ""}
            onClick={() => props.setPage("experience")}
          >
            EXPERIENCE
          </button>

          <button
            className={props.page === "project" ? "active" : ""}
            onClick={() => props.setPage("project")}
          >
            PROJECT
          </button>

          <button
            className={props.page === "education" ? "active" : ""}
            onClick={() => props.setPage("education")}
          >
            EDUCATION
          </button>

          <button
            className={props.page === "contact" ? "active" : ""}
            onClick={() => props.setPage("contact")}
          >
            CONTACT
          </button>

        </div>

        {/* DARK MODE */}
        <button
          className="theme-toggle"
          onClick={() =>
            props.setMode(
              props.mode === "light" ? "dark" : "light"
            )
          }
        >
          <span
            className={
              props.mode === "dark"
                ? "toggle-circle dark-circle"
                : "toggle-circle"
            }
          ></span>
        </button>

        {/* RESUME */}
        <button className="resume-btn">
          RESUME
        </button>

      </div>

    </nav>
  );
}

export default Navbar;