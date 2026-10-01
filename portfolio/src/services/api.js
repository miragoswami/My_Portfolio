const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Ensure no trailing slash or /api at the end
const API_URL = rawUrl.replace(/\/+$/, "").replace(/\/api$/, "");

export default API_URL;
