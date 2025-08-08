// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://complaintsystem-sius.onrender.com/api',
});

// Add Authorization header with token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
