// Resilient API base URL configuration
// 1. Explicit VITE_API_URL if set and non-empty
// 2. Localhost 5000 in development
// 3. Same-origin relative path in production
const envUrl = import.meta.env.VITE_API_URL ? String(import.meta.env.VITE_API_URL).trim() : "";
const rawUrl = envUrl || (import.meta.env.DEV ? "http://localhost:5000" : "");

// Ensure no trailing slash or /api at the end
const API_URL = rawUrl.replace(/\/+$/, "").replace(/\/api$/, "");

export default API_URL;
