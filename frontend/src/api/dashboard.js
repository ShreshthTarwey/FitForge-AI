import api from './axios';

export const dashboardService = {
    // Get dashboard stats, charts, and recent workouts
    getDashboardData: () => api.get('/api/dashboard'),
};
