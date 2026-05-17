import api from './axios';

export const progressService = {
    getDashboardData: () => api.get('/progress/dashboard'),
    getHistory: (params) => api.get('/progress/history', { params }),
    logWorkout: (data) => api.post('/progress/log', data),
    updateGoals: (data) => api.put('/progress/goals', data),
};
