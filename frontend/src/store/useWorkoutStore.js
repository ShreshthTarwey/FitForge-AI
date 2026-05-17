import { create } from 'zustand';
import { workoutsService } from '../api/workouts';

export const useWorkoutStore = create((set, get) => ({
    plans: [],
    activePlan: null,
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        try {
            const response = await workoutsService.getCategories();
            set({ categories: response.data });
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    },

    fetchPlans: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            // If backend isn't returning yet, we would mock it here. 
            // Assuming backend works or will return empty array gracefully.
            const response = await workoutsService.getPlans(filters);
            set({ plans: response.data.data || response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch plans', isLoading: false });
        }
    },

    generatePlan: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await workoutsService.generatePlan(formData);
            // Prepend new plan
            set(state => ({ 
                plans: [response.data, ...state.plans],
                isLoading: false 
            }));
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to generate plan', isLoading: false });
            return null;
        }
    },

    setActivePlan: (plan) => {
        set({ activePlan: plan });
    }
}));
