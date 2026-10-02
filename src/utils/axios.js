import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // If the data is FormData, let browser set Content-Type with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Automatically redirect to login if token is invalid or expired
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      // Define public paths where 401 should NOT trigger forced redirect to /login
      const publicPaths = ['/', '/login', '/register', '/privacy-policy'];
      const isPublicPage = publicPaths.includes(window.location.pathname) || window.location.pathname.startsWith('/kiosk');
      if (!isPublicPage) {
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
