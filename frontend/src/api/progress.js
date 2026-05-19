import api from './axios';

export const progressService = {
    getDashboardData: () => api.get('/api/progress/dashboard'),
    getHistory: (params) => api.get('/api/progress/history', { params }),
    logWorkout: (data) => api.post('/api/progress/log', data),
    logWeight: (data) => api.post('/api/progress/weight', data),
    updateGoals: (data) => api.put('/api/progress/goals', data),
};
