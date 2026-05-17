import api from './axios';

export const exercisesService = {
    getExercises: (params) => api.get('/exercises', { params }),
    getExerciseById: (id) => api.get(`/exercises/${id}`),
    getCategories: () => api.get('/exercises/categories'),
};
