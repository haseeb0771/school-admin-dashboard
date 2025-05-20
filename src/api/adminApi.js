// src/api/adminApi.js
import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
});

// Request interceptor to add auth token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin-specific API methods
export const getAdminDashboardData = () => adminApi.get('/dashboard');
export const manageUsers = (payload) => adminApi.post('/users', payload);
// Add more admin API methods as needed

export default adminApi;