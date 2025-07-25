import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://task-manager-1-yzar.onrender.com/api",
});

// Add token to every request if available
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
