import axios from "axios";

const api = axios.create({
  baseURL: "https://job-project-0o0j.onrender.com/api",
});

export default api;
