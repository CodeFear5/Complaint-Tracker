// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://44.201.196.33/api',
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
