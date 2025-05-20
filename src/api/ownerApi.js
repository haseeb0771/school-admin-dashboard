// src/api/ownerApi.js
import axios from 'axios';

const ownerApi = axios.create({
  baseURL: import.meta.env.VITE_OWNER_API_BASE_URL,
});

// Request interceptor to add auth token
ownerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Owner-specific API methods
export const getOwnerProperties = () => ownerApi.get('/properties');
export const updateProperty = (id, payload) => ownerApi.put(`/properties/${id}`, payload);
// Add more owner API methods as needed

export default ownerApi;