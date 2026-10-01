import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { 
  FiGrid, 
  FiBriefcase, 
  FiBookOpen, 
  FiMail, 
  FiLogOut, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiGithub, 
  FiUser,
  FiPhone,
  FiAward,
  FiCheckCircle
} from "react-icons/fi";

import API_URL from "../services/api";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectError, setProjectError] = useState("");

  // Add project state
  const [showAddForm, setShowAddForm] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTechnologies, setProjectTechnologies] = useState("");
  const [projectGithub, setProjectGithub] = useState("");
  const [addingProject, setAddingProject] = useState(false);
  const [addProjectError, setAddProjectError] = useState("");
  const [addProjectSuccess, setAddProjectSuccess] = useState("");

  // Edit project state
  const [editingProject, setEditingProject] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTechnologies, setEditTechnologies] = useState("");
  const [editGithub, setEditGithub] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  // Education state
  const [education, setEducation] = useState({
    course: "BE in Computer Engineering",
    university: "Gujarat Technological University",
    year: "2023 - 2027"
  });

  // Contact state
  const [contact, setContact] = useState({
    email: "miragoswami686@gmail.com",
    phone: "+91 9455941410"
  });

  // CHECK ADMIN LOGIN
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn !== "true") {
      window.location.href = "/admin";
      return;
    }
    setCheckingAuth(false);
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "/admin";
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      setProjectError("");

      const response = await fetch(`${API_URL}/api/projects`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjectError("Unable to load projects from backend.");
    } finally {
      setLoadingProjects(false);
    }
  };

  // FETCH EDUCATION
  const fetchEducation = async () => {
    try {
      const res = await fetch(`${API_URL}/api/education`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.course) {
          setEducation(data);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live education details:", err.message);
    }
  };

  // FETCH CONTACT
  const fetchContact = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contact`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.email) {
          setContact(data);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live contact details:", err.message);
    }
  };

  useEffect(() => {
    if (activePage === "projects" || activePage === "dashboard") {
      fetchProjects();
    }
    if (activePage === "education" || activePage === "dashboard") {
      fetchEducation();
    }
    if (activePage === "contact" || activePage === "dashboard") {
      fetchContact();
    }
  }, [activePage]);

  // ADD PROJECT
  const handleAddProject = async () => {
    setAddProjectError("");
    setAddProjectSuccess("");

    if (!projectTitle.trim()) {
      setAddProjectError("Project title is required.");
      return;
    }

    if (!projectDescription.trim()) {
      setAddProjectError("Project description is required.");
      return;
    }

    try {
      setAddingProject(true);

      const technologiesArray = projectTechnologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "");

      const projectData = {
        title: projectTitle.trim(),
        description: projectDescription.trim(),
        technologies: technologiesArray,
        github: projectGithub.trim(),
      };

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add project");
      }

      setAddProjectSuccess("Project added successfully!");
      setProjectTitle("");
      setProjectDescription("");
      setProjectTechnologies("");
      setProjectGithub("");

      setTimeout(() => {
        setShowAddForm(false);
        setAddProjectSuccess("");
      }, 1000);

      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      setAddProjectError(error.message || "Unable to add project.");
    } finally {
      setAddingProject(false);
    }
  };

  // DELETE PROJECT
  const handleDeleteProject = async (projectId) => {
    if (!projectId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      // Remove from state immediately
      setProjects((prev) => prev.filter((p) => (p._id || p.id) !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error.message || "Error deleting project.");
    }
  };

  // START EDITING PROJECT
  const handleStartEdit = (project) => {
    setEditingProject(project);
    setEditTitle(project.title || "");
    setEditDescription(project.description || "");
    setEditTechnologies(
      Array.isArray(project.technologies) ? project.technologies.join(", ") : ""
    );
    setEditGithub(project.github || "");
    setEditError("");
    setEditSuccess("");
  };

  // SAVE EDIT PROJECT
  const handleSaveEdit = async () => {
    if (!editingProject) return;

    setEditError("");
    setEditSuccess("");

    if (!editTitle.trim()) {
      setEditError("Project title is required.");
      return;
    }

    if (!editDescription.trim()) {
      setEditError("Project description is required.");
      return;
    }

    try {
      setSavingEdit(true);

      const technologiesArray = editTechnologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      const updatedData = {
        title: editTitle.trim(),
        description: editDescription.trim(),
        technologies: technologiesArray,
        github: editGithub.trim(),
      };

      const projectId = editingProject._id || editingProject.id;
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      setEditSuccess("Project updated successfully!");

      setTimeout(() => {
        setEditingProject(null);
        setEditSuccess("");
      }, 1000);

      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      setEditError(error.message || "Unable to update project.");
    } finally {
      setSavingEdit(false);
    }
  };

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* =========================
                SIDEBAR
          ========================= */}
      <aside className="admin-sidebar">
        <h2><FiBriefcase /> Admin Panel</h2>

        <nav className="admin-nav">
          <button 
            className={activePage === "dashboard" ? "active" : ""} 
            onClick={() => setActivePage("dashboard")}
          >
            <FiGrid /> Dashboard
          </button>

          <button 
            className={activePage === "projects" ? "active" : ""} 
            onClick={() => setActivePage("projects")}
          >
            <FiBriefcase /> Projects
          </button>

          <button 
            className={activePage === "education" ? "active" : ""} 
            onClick={() => setActivePage("education")}
          >
            <FiBookOpen /> Education
          </button>

          <button 
            className={activePage === "contact" ? "active" : ""} 
            onClick={() => setActivePage("contact")}
          >
            <FiMail /> Contact
          </button>
        </nav>

        {/* LOGOUT */}
        <button className="admin-logout" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* =========================
                MAIN CONTENT
          ========================= */}
      <main className="admin-content">
        {/* HEADER */}
        <header className="admin-header">
          <h1>
            {activePage === "dashboard" && "Dashboard"}
            {activePage === "projects" && "Projects"}
            {activePage === "education" && "Education"}
            {activePage === "contact" && "Contact"}
          </h1>

          <p><FiUser /> Welcome back, Admin</p>
        </header>

        {/* =========================
                    DASHBOARD
            ========================= */}
        {activePage === "dashboard" && (
          <div className="dashboard-cards">
            {/* PROJECTS */}
            <div className="dashboard-card">
              <h2><FiBriefcase /> Projects ({projects.length})</h2>
              <p>Manage your portfolio projects and showcase work.</p>
              <button onClick={() => setActivePage("projects")}>
                Manage Projects
              </button>
            </div>

            {/* EDUCATION */}
            <div className="dashboard-card">
              <h2><FiBookOpen /> Education</h2>
              <p>View qualification details and degree info.</p>
              <button onClick={() => setActivePage("education")}>
                Manage Education
              </button>
            </div>

            {/* CONTACT */}
            <div className="dashboard-card">
              <h2><FiMail /> Contact</h2>
              <p>Manage contact info and reach-out links.</p>
              <button onClick={() => setActivePage("contact")}>
                Manage Contact
              </button>
            </div>
          </div>
        )}

        {/* =========================
                    PROJECTS
            ========================= */}
        {activePage === "projects" && (
          <div className="admin-page">
            {/* PROJECT HEADER */}
            <div className="projects-header">
              <div>
                <h2>Manage Projects</h2>
                <p>Add, edit and delete your portfolio projects.</p>
              </div>

              <button
                className="add-project-btn"
                onClick={() => {
                  setShowAddForm(true);
                  setEditingProject(null);
                  setAddProjectError("");
                  setAddProjectSuccess("");
                }}
              >
                <FiPlus /> Add Project
              </button>
            </div>

            {/* ADD PROJECT FORM */}
            {showAddForm && (
              <div className="add-project-form">
                <h2>Add New Project</h2>

                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter project description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Technologies</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB"
                    value={projectTechnologies}
                    onChange={(e) => setProjectTechnologies(e.target.value)}
                  />
                  <small>Separate technologies with commas.</small>
                </div>

                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={projectGithub}
                    onChange={(e) => setProjectGithub(e.target.value)}
                  />
                </div>

                {addProjectError && (
                  <p className="form-error">{addProjectError}</p>
                )}

                {addProjectSuccess && (
                  <p className="form-success">{addProjectSuccess}</p>
                )}

                <div className="form-actions">
                  <button type="button" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleAddProject}
                    disabled={addingProject}
                  >
                    {addingProject ? "Adding..." : "Add Project"}
                  </button>
                </div>
              </div>
            )}

            {/* EDIT PROJECT FORM */}
            {editingProject && (
              <div className="add-project-form" style={{ borderColor: "var(--primary-color)" }}>
                <h2>Edit Project: {editingProject.title}</h2>

                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Technologies</label>
                  <input
                    type="text"
                    value={editTechnologies}
                    onChange={(e) => setEditTechnologies(e.target.value)}
                  />
                  <small>Separate technologies with commas.</small>
                </div>

                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="text"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                  />
                </div>

                {editError && (
                  <p className="form-error">{editError}</p>
                )}

                {editSuccess && (
                  <p className="form-success">{editSuccess}</p>
                )}

                <div className="form-actions">
                  <button type="button" onClick={() => setEditingProject(null)}>
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={savingEdit}
                  >
                    {savingEdit ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* LOADING */}
            {loadingProjects && (
              <div className="project-message">
                <p>Loading projects...</p>
              </div>
            )}

            {/* ERROR */}
            {projectError && (
              <div className="project-message error">
                <p>{projectError}</p>
              </div>
            )}

            {/* NO PROJECTS */}
            {!loadingProjects && !projectError && projects.length === 0 && (
              <div className="project-message">
                <h3>No Projects Found</h3>
                <p>You haven't added any projects yet.</p>
                <button
                  className="add-project-btn"
                  onClick={() => {
                    setShowAddForm(true);
                    setAddProjectError("");
                    setAddProjectSuccess("");
                  }}
                >
                  <FiPlus /> Add Project
                </button>
              </div>
            )}

            {/* PROJECT LIST */}
            {!loadingProjects && !projectError && projects.length > 0 && (
              <div className="admin-projects">
                {projects.map((project, idx) => (
                  <div className="admin-project-card" key={project._id || project.id || idx}>
                    <h3>{project.title}</h3>

                    <p className="project-description">{project.description}</p>

                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <div className="project-technologies">
                        <strong>Technologies:</strong>
                        <div className="technology-list">
                          {project.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="technology-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.github && (
                      <div className="project-github">
                        <strong>GitHub:</strong>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FiGithub /> View Project
                        </a>
                      </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="project-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleStartEdit(project)}
                      >
                        <FiEdit2 /> Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProject(project._id || project.id)}
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================
                    EDUCATION
            ========================= */}
        {activePage === "education" && (
          <div className="admin-page">
            <div className="projects-header">
              <div>
                <h2>Manage Education</h2>
                <p>Current education and qualification details.</p>
              </div>
            </div>

            <div className="admin-project-card" style={{ maxWidth: "600px", marginTop: "1rem" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiAward color="var(--primary-color)" /> {education.course}
              </h3>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: "500", margin: "0" }}>
                {education.university}
              </p>
              <div className="project-technologies" style={{ width: "fit-content" }}>
                <strong>Academic Year:</strong>
                <span style={{ fontWeight: "600", color: "var(--primary-color)" }}>{education.year}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success-color)", fontSize: "0.9rem" }}>
                <FiCheckCircle /> Synced from backend API
              </div>
            </div>
          </div>
        )}

        {/* =========================
                    CONTACT
            ========================= */}
        {activePage === "contact" && (
          <div className="admin-page">
            <div className="projects-header">
              <div>
                <h2>Manage Contact</h2>
                <p>Current contact information for visitors and recruiters.</p>
              </div>
            </div>

            <div className="admin-project-card" style={{ maxWidth: "600px", marginTop: "1rem" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiMail color="var(--primary-color)" /> Contact Information
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <FiMail />
                  <strong>Email:</strong>
                  <a href={`mailto:${contact.email}`} style={{ color: "var(--primary-color)", textDecoration: "none" }}>
                    {contact.email}
                  </a>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <FiPhone />
                  <strong>Phone:</strong>
                  <a href={`tel:${contact.phone}`} style={{ color: "var(--primary-color)", textDecoration: "none" }}>
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--success-color)", fontSize: "0.9rem", marginTop: "10px" }}>
                <FiCheckCircle /> Synced from backend API
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
