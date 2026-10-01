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
import Footer from "./components/Footer";
import FloatingTools from "./components/FloatingTools";

import "./App.css";

function App() {
    const [mode, setMode] = useState("dark");

    const currentPath =
        window.location.pathname.replace(/\/+$/, "") || "/";

    // ADMIN LOGIN
    if (currentPath === "/admin") {
        return <AdminLogin />;
    }

    // ADMIN DASHBOARD
    if (currentPath === "/admin/dashboard") {
        return <AdminDashboard />;
    }

    // PUBLIC PORTFOLIO
    return (
        <div className={`app ${mode}`}>

            {/* Floating technology icons */}
            <FloatingTools />

            {/* Navbar */}
            <Navbar
                mode={mode}
                setMode={setMode}
            />

            {/* Home */}
            <section id="home">
                <Home mode={mode} />
            </section>

            {/* About */}
            <section id="about">
                <About mode={mode} />
            </section>

            {/* Experience */}
            <section id="experience">
                <Experience mode={mode} />
            </section>

            {/* Projects */}
            <section id="project">
                <Project mode={mode} />
            </section>

            {/* Education */}
            <section id="education">
                <Education mode={mode} />
            </section>

            {/* Contact */}
            <section id="contact">
                <Contact mode={mode} />
            </section>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default App;