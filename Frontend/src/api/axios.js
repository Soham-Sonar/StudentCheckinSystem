import axios from 'axios';

// --- Render backend URL ---
export const API_BASE = 'http://localhost:5000'; // <-- Replace with your Render link

// --- Authenticated Axios instance ---
export const authAxios = axios.create({
  baseURL: API_BASE,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
