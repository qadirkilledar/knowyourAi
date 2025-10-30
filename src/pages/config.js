// config.js
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/api"
    : process.env.REACT_APP_API_URL || "https://your-live-backend-url.com/api";

export { API_URL };
