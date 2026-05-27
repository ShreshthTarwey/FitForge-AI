import api from './axios';

export const workoutsService = {
    // Core Generation
    generatePlan: (data) => api.post('/api/workout/generate', data),
    
    // Retrieval
    getPlans: (params) => api.get('/api/workouts', { params }),
    getPlanById: (id) => api.get(`/api/workouts/${id}`),
    
    // Status/Action
    activatePlan: (id) => api.post(`/api/workouts/${id}/activate`),
    completeWorkoutDay: (planId, dayId) => api.post(`/api/workouts/${planId}/days/${dayId}/complete`),
    
    getCategories: () => Promise.resolve({
        data: [
            { id: 1, title: 'Strength Training', description: 'Build muscle and get stronger', gradient: 'from-blue-500 to-indigo-600' },
            { id: 2, title: 'HIIT Cardio', description: 'Burn fat and improve endurance', gradient: 'from-orange-500 to-red-600' },
            { id: 3, title: 'Yoga & Mobility', description: 'Increase flexibility and recovery', gradient: 'from-emerald-400 to-teal-500' },
            { id: 4, title: 'Bodyweight Mastery', description: 'No equipment needed routines', gradient: 'from-purple-500 to-pink-600' },
            { id: 5, title: 'AI Generated Plans', description: 'Custom-synthesized plans using Gemini AI', gradient: 'from-fuchsia-500 to-purple-600' }
        ]
    })
};
