import axios from "axios";

const api = axios.create({
  // Corporate Standard: CloudFront behavior handle karega is path ko
  baseURL: "/api/rest", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
