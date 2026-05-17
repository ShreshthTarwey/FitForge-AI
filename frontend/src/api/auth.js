import api from './axios';

export const authService = {
    // Get CSRF Cookie for Sanctum SPA Auth
    csrfCookie: () => api.get('/sanctum/csrf-cookie'),

    // Login user
    login: (credentials) => api.post('/api/login', credentials),

    // Register user
    register: (userData) => api.post('/api/register', userData),

    // Logout user
    logout: () => api.post('/api/logout'),

    // Get current authenticated user
    getUser: () => api.get('/api/user'),
};
