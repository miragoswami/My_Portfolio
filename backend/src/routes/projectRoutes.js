const express = require("express");

const router = express.Router();

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// GET all projects

router.get("/", getProjects);

// ADD project

router.post("/", createProject);

// UPDATE project

router.put("/:id", updateProject);

// DELETE project

router.delete("/:id", deleteProject);

module.exports = router;
