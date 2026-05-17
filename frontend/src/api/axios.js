import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:8000',
=======
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
>>>>>>> feature/advanced-fitforge-ui
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
<<<<<<< HEAD
    withCredentials: true, // required for Sanctum cookie-based auth if using same domain, or for tokens.
=======
    withCredentials: true,
>>>>>>> feature/advanced-fitforge-ui
});

// Interceptor to add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

<<<<<<< HEAD
=======
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

>>>>>>> feature/advanced-fitforge-ui
export default api;
