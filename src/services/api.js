// src/services/api.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- SERVICIOS DE AUTENTICACIÓN ---
export const login = (username, password) => {
  return apiClient.post('/auth/login', { username, password });
};
export const register = (username, email, password) => {
  return apiClient.post('/auth/register', { username, email, password });
};
export const getMyProfile = () => {
  return apiClient.get('/api/users/me');
};

// --- SERVICIOS DE PRODUCTOS ---
export const getProducts = () => {
  return apiClient.get('/api/productos');
};

// --- ¡NUEVAS FUNCIONES PARA PRODUCTOS! ---
export const createProduct = (productData) => {
  return apiClient.post('/api/productos', productData);
};
export const updateProduct = (productId, productData) => {
  return apiClient.put(`/api/productos/${productId}`, productData);
};
export const deleteProduct = (productId) => {
  return apiClient.delete(`/api/productos/${productId}`);
};

// --- SERVICIOS DE ADMINISTRACIÓN DE USUARIOS ---
export const getAllUsers = () => {
  return apiClient.get('/api/admin/users');
};
export const createUser = (userData) => {
  return apiClient.post('/api/admin/users', userData);
};
export const updateUser = (userId, userData) => {
  return apiClient.put(`/api/admin/users/${userId}`, userData);
};
export const deleteUser = (userId) => {
  return apiClient.delete(`/api/admin/users/${userId}`);
};

// src/services/api.js

// ... (código existente)

// --- ¡NUEVA FUNCIÓN! ---
export const updateMyProfile = (userData) => {
  // Hacemos una petición PUT al nuevo endpoint del backend
  return apiClient.put('/api/users/me', userData);
};



export default apiClient;