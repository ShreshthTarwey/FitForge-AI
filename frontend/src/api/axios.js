import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor to add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized globally
        if (error.response && error.response.status === 401) {
            // Check if we are already on login to avoid infinite loops
            if (window.location.pathname !== '/login') {
                localStorage.removeItem('token');
                // Use Zustand store method to clear state if possible, or just force redirect
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
