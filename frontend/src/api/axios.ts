import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token); // Debugging line
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
export default api;
