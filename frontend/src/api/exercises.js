import api from './axios';

export const exercisesService = {
    getExercises: (params) => api.get('/api/exercises', { params }),
    getExerciseById: (id) => api.get(`/api/exercises/${id}`),
    getCategories: () => api.get('/api/exercises/categories'),
};
