import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4444/api', // or from .env.local
  withCredentials: false,
});

// Attach token automatically (if stored in localStorage or cookie manually)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
