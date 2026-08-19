import React from "react";

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">{" Mira Goswami "}</div>

        {/* NAVIGATION */}
        <div className="nav-links">
          <a href ="#home" >HOME</a>
          <a href ="#about" >ABOUT</a>
          <a href ="#experience" >EXPERIENCE</a>
          <a href ="#project" >PROJECT</a>
          <a href ="#education" >EDUCATION</a>
          <a href ="#contact" >CONTACT</a>

        </div>

         {/* DARK MODE */}
        <button
          className="theme-toggle"
          onClick={() =>
            props.setMode(props.mode === "light" ? "dark" : "light")
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
        <a
          href="/Mira_Goswami_Resume.pdf"
          download="Mira_Goswami_Resume.pdf"
          className="resume-btn"
        >
           ↓ RESUME
        </a>
      </div>
    </nav>
  );
}

export default Navbar;



//Scrolling


// Navbar
//    ↓
// Home
//    ↓
// About
//    ↓
// Experience
//    ↓
// Project
//    ↓
// Education
//    ↓
// Contact


//we gieven section unique id'
// example : <section id="contact">

// we changed the button into href
//example : <a href="#education">EDUCATION</a>

//we used scroll-behavior to html
// example :
//          html {
//            scroll-behavior: smooth;
//          }

//with this : scroll-behaviour: smooth:
// browser can smoothly move down  like from home ----->About
