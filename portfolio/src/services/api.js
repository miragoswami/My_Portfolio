const envUrl = import.meta.env.VITE_API_URL
    ? String(import.meta.env.VITE_API_URL).trim()
    : "";

const rawUrl =
    envUrl ||
    (import.meta.env.DEV ? "http://localhost:5000" : "");

const API_URL = rawUrl
    .replace(/\/+$/, "")
    .replace(/\/api$/, "");

export default API_URL;