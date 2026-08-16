import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Education from "./components/Education";
import Contact from "./components/Contact";

import "./App.css";


function App() {

  const [mode, setMode] = useState("dark");

  const [page, setPage] = useState("home");


  return (

    <div className={`app ${mode}`}>

      <Navbar
        mode={mode}
        setMode={setMode}
        page={page}
        setPage={setPage}
      />


      {page === "home" && (
        <Home
          mode={mode}
          setPage={setPage}
        />
      )}


      {page === "about" && (
        <About
          mode={mode}
        />
      )}


      {page === "experience" && (
        <Experience
          mode={mode}
        />
      )}


      {page === "project" && (
        <Project
          mode={mode}
        />
      )}


      {page === "education" && (
        <Education
          mode={mode}
        />
      )}


      {page === "contact" && (
        <Contact
          mode={mode}
        />
      )}

    </div>
  );
}

export default App;