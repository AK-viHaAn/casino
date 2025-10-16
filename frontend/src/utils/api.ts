import axios from "axios";

const API_BASE = "http://localhost:7070";

export const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically if stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};