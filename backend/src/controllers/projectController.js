const mongoose = require("mongoose");
const Project = require("../models/projectModel");

// In-memory fallback cache in case MongoDB is offline/unreachable
let inMemoryProjects = [
    {
        _id: "default-1",
        title: "Portfolio Web Application",
        description: "A full-stack modern responsive portfolio built with React, Express, Node.js, and MongoDB.",
        technologies: ["React", "Express", "Node.js", "MongoDB", "Bootstrap"],
        github: "https://github.com/miragoswami/My_Portfolio"
    }
];

// GET ALL PROJECTS
const getProjects = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const projects = await Project.find();
            if (projects && projects.length > 0) {
                return res.json(projects);
            }
            return res.json(projects.length === 0 && inMemoryProjects.length > 0 ? inMemoryProjects : projects);
        }

        // Database is offline -> return fallback data immediately without buffering hang
        return res.json(inMemoryProjects);
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        res.json(inMemoryProjects);
    }
};

// CREATE PROJECT
const createProject = async (req, res) => {
    try {
        const { title, description, technologies, github } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const techArray = Array.isArray(technologies)
            ? technologies
            : (technologies ? String(technologies).split(",").map(t => t.trim()).filter(Boolean) : []);

        if (mongoose.connection.readyState === 1) {
            const project = new Project({
                title,
                description,
                technologies: techArray,
                github: github || ""
            });

            const savedProject = await project.save();

            return res.status(201).json({
                success: true,
                message: "Project created successfully",
                project: savedProject
            });
        }

        // In-memory fallback
        const newProject = {
            _id: "local-" + Date.now(),
            title,
            description,
            technologies: techArray,
            github: github || ""
        };
        inMemoryProjects.unshift(newProject);

        res.status(201).json({
            success: true,
            message: "Project created successfully (in-memory mode)",
            project: newProject
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error creating project"
        });
    }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technologies, github } = req.body;

        const techArray = Array.isArray(technologies)
            ? technologies
            : (technologies ? String(technologies).split(",").map(t => t.trim()).filter(Boolean) : undefined);

        const updateData = {
            ...(title && { title }),
            ...(description && { description }),
            ...(techArray && { technologies: techArray }),
            ...(github !== undefined && { github })
        };

        if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(id)) {
            const project = await Project.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            return res.json({
                success: true,
                message: "Project updated successfully",
                project
            });
        }

        // Fallback for in-memory or non-ObjectId projects
        const index = inMemoryProjects.findIndex(p => p._id === id);
        if (index !== -1) {
            inMemoryProjects[index] = {
                ...inMemoryProjects[index],
                ...updateData
            };
            return res.json({
                success: true,
                message: "Project updated successfully",
                project: inMemoryProjects[index]
            });
        }

        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating project"
        });
    }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(id)) {
            const project = await Project.findByIdAndDelete(id);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found"
                });
            }

            return res.json({
                success: true,
                message: "Project deleted successfully"
            });
        }

        // Fallback for in-memory
        const index = inMemoryProjects.findIndex(p => p._id === id);
        if (index !== -1) {
            inMemoryProjects.splice(index, 1);
            return res.json({
                success: true,
                message: "Project deleted successfully"
            });
        }

        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error deleting project"
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};