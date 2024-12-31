// frontend/src/services/api.js
import axios from 'axios';
import store from '../store';

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: apiBaseUrl,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  config => {
    const token = store.getters.getToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
