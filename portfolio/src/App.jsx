import React, { useState } from "react";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

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


    // ADMIN LOGIN

    if (window.location.pathname === "/admin") {
        return <AdminLogin />;
    }


    // ADMIN DASHBOARD

    if (window.location.pathname === "/admin/dashboard") {
        return <AdminDashboard />;
    }


    // PUBLIC PORTFOLIO

    return (

        <div className={`app ${mode}`}>

            <Navbar
                mode={mode}
                setMode={setMode}
            />

            <section id="home">
                <Home mode={mode} />
            </section>

            <section id="about">
                <About mode={mode} />
            </section>

            <section id="experience">
                <Experience mode={mode} />
            </section>

            <section id="project">
                <Project mode={mode} />
            </section>

            <section id="education">
                <Education mode={mode} />
            </section>

            <section id="contact">
                <Contact mode={mode} />
            </section>

        </div>
    );
}

export default App;




// ADMIN DASHBOARD

// Browser
//    │
//    ↓
// /admin/dashboard
//    │
//    ↓
// App.jsx
//    │
//    ↓
// <AdminDashboard />
//    │
//    ↓
// AdminDashboard.jsx