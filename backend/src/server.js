const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
    console.warn("DNS server setup warning:", err.message);
}

const contactRoute = require("./routes/contactRoutes");
const projectRoute = require("./routes/projectRoutes");
const educationRoute = require("./routes/educationRoutes");
const authRoute = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/projects", projectRoute);
app.use("/api/contact", contactRoute);
app.use("/api/education", educationRoute);
app.use("/api/auth", authRoute);

// Serve Frontend Static Files in Production
const distPath = path.join(__dirname, "../../portfolio/dist");
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));

    app.get("/{*splat}", (req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next();
        }
        res.sendFile(path.join(distPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.json({
            message: "Portfolio API is working!",
            databaseStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected / Offline fallback"
        });
    });
}

// 404 handler for unknown API routes
app.use("/api", (req, res) => {
    res.status(404).json({ success: false, message: `API route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled server error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

if (process.env.MONGO_URI) {
    mongoose
        .connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            console.warn("MongoDB connection notice:");
            console.warn("Reason:", error.message);
            console.warn("Tip: Check MongoDB Atlas Network Access IP Whitelist (add 0.0.0.0/0) if you wish to use cloud database.");
        });
} else {
    console.warn("MONGO_URI not set. Running with default in-memory portfolio data.");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});