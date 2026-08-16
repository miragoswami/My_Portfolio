const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: "Job Portal",
    description: "A full-stack Job Portal web application built with Django that connects job seekers with employers and provides a complete platform for managing job opportunities and applications.",
    technologies: ["Django" , "HTML" , "SQlite" , "Bootstrap","CSS"],
    github: "https://github.com/miragoswami/Job_Portal_Django.git"
  },
   {
    id: 2,
    title: "React Mini Project",
    description: "A React mini project built using React and JavaScript.",
    technologies: ["React", "JavaScript", "CSS"],
    github: "https://github.com/miragoswami/React_MIni_Project.git"
  },
  {
    id: 3,
    title: "Portfolio",
    description: "A modern and responsive full-stack personal portfolio website built using React.js, Express.js, and MongoDB to showcase my technical skills, education, projects, experience, and contact information.",
    technologies: ["React","Node.js" , "Express.js" , "MongoDB" ,"JavaScript", "CSS" , "HTML" , "Git" , "GitHub",  "Bootsrap"],
    github: "https://github.com/miragoswami/TodoManager_Django.git"
  },
   {
    id: 3,
    title: "Todo list Manager",
    description: "A simple and responsive Todo Manager web application built with Django. Users can register, log in, create tasks, update task status, edit tasks, delete tasks, and manage daily activities efficiently.",
    technologies: ["Django", "JavaScript", "CSS" , "HTML" , "Bootsrap"],
    github: "https://github.com/miragoswami/TodoManager_Django.git"
  },

];

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is working!"
  });
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});