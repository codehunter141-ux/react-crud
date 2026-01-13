import axios from "axios";

const api = axios.create({
  baseURL: "http://3.108.54.197/:8080/api/rest",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
