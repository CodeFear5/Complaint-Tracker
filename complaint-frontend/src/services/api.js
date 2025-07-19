// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://44.201.196.33:8080/api',
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
