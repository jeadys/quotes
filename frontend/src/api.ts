import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_URL,
});

export default api;
