import api from './axios';

export const nutritionService = {
    getNutritionData: () => api.get('/api/nutrition'),
    logMeal: (data) => api.post('/api/nutrition/meal', data),
    deleteMeal: (id) => api.delete(`/api/nutrition/meal/${id}`),
    logWater: (amountMl) => api.post('/api/nutrition/water', { amount_ml: amountMl }),
    resetWater: () => api.post('/api/nutrition/water/reset'),
    logSleep: (hours) => api.post('/api/nutrition/sleep', { hours }),
};
