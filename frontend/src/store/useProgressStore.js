import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { progressService } from '../api/progress';

const getLocalDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const initialWorkoutHistory = [
    { id: 1, date: '2026-05-16', name: 'Hypertrophy Push Workout', duration: 60, calories: 520, fatigue: 'medium', notes: 'Pushed bench press to 80kg for 8 reps. Feeling strong.' },
    { id: 2, date: '2026-05-14', name: 'Lower Body Strength Split', duration: 75, calories: 650, fatigue: 'high', notes: 'Squat depth was perfect today. Quads are destroyed.' },
    { id: 3, date: '2026-05-13', name: 'Active Recovery Cardio HIIT', duration: 35, calories: 380, fatigue: 'low', notes: 'Heart rate average was 145 bpm. Clean sweating session.' }
];

const initialWeightHistory = [
    { date: 'May 10', weight: 81.5 },
    { date: 'May 12', weight: 81.1 },
    { date: 'May 14', weight: 80.8 },
    { date: 'May 16', weight: 80.5 }
];

const initialGoals = {
    weeklyWorkouts: { current: 3, target: 5, unit: 'sessions' },
    monthlyCalories: { current: 1550, target: 12000, unit: 'kcal' },
    waterIntake: { current: 2000, target: 3500, unit: 'ml' }
};

export const useProgressStore = create(
    persist(
        (set, get) => ({
            weightHistory: initialWeightHistory,
            workoutHistory: initialWorkoutHistory,
            goals: initialGoals,
            currentWeight: 80.5,
            targetWeight: 75.0,
            achievements: [],
            unlockedAchievements: [],
            isLoading: false,
            error: null,

            fetchProgressData: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await progressService.getDashboardData();
                    const data = response?.data?.data || response?.data;
                    if (data && typeof data === 'object') {
                        set({ 
                            weightHistory: data.weightHistory || get().weightHistory || initialWeightHistory,
                            workoutHistory: data.workoutHistory !== undefined ? data.workoutHistory : (get().workoutHistory || initialWorkoutHistory),
                            goals: data.goals || get().goals || initialGoals,
                            currentWeight: Number(data.currentWeight || get().currentWeight || 80.5),
                            targetWeight: Number(data.targetWeight || get().targetWeight || 75.0),
                            achievements: data.achievements || [],
                            unlockedAchievements: data.unlockedAchievements || [],
                            isLoading: false 
                        });
                    } else {
                        set({ 
                            weightHistory: get().weightHistory || initialWeightHistory,
                            workoutHistory: get().workoutHistory || initialWorkoutHistory,
                            goals: get().goals || initialGoals,
                            isLoading: false 
                        });
                    }
                } catch (error) {
                    // Safe resilient fallback
                    set({ 
                        weightHistory: get().weightHistory || initialWeightHistory,
                        workoutHistory: get().workoutHistory || initialWorkoutHistory,
                        goals: get().goals || initialGoals,
                        isLoading: false 
                    });
                    console.log("Laravel API not running. Loaded rich offline biometrics dataset.");
                }
            },

            addWorkoutLog: async (log) => {
                set({ isLoading: true, error: null });
                try {
                    const payload = {
                        workout_plan_id: log.workout_plan_id || null,
                        custom_name: log.name,
                        calories_burned: Number(log.calories),
                        duration_completed: Number(log.duration),
                        user_feedback: log.fatigue,
                        notes: log.notes,
                        date: log.date || getLocalDateString()
                    };
                    const response = await progressService.logWorkout(payload);
                    await get().fetchProgressData();
                    return response.data;
                } catch (error) {
                    console.error("Error adding workout log, falling back to local memory:", error);
                    const newLog = {
                        id: Date.now(),
                        date: getLocalDateString(),
                        ...log
                    };
                    set((state) => ({
                        workoutHistory: [newLog, ...state.workoutHistory],
                        isLoading: false
                    }));
                }
            },

            deleteWorkoutLog: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    await progressService.deleteWorkoutLog(id);
                    await get().fetchProgressData();
                } catch (error) {
                    console.error("Error deleting workout log, falling back to local memory:", error);
                    set((state) => ({
                        workoutHistory: state.workoutHistory.filter(log => log.id !== id),
                        isLoading: false
                    }));
                }
            },

            updateWorkoutLog: async (id, updatedData) => {
                set({ isLoading: true, error: null });
                try {
                    const payload = {
                        notes: updatedData.notes,
                        user_feedback: updatedData.fatigue
                    };
                    await progressService.updateWorkoutLog(id, payload);
                    await get().fetchProgressData();
                } catch (error) {
                    console.error("Error updating workout log, falling back to local memory:", error);
                    set((state) => ({
                        workoutHistory: state.workoutHistory.map(log => 
                            log.id === id ? { ...log, ...updatedData } : log
                        ),
                        isLoading: false
                    }));
                }
            },

            addWeightEntry: async (weight) => {
                set({ isLoading: true });
                try {
                    const response = await progressService.logWeight({ 
                        weight: Number(weight),
                        date: getLocalDateString()
                    });
                    if (response.data.status === 'success') {
                        // Dynamically refresh progress dashboard stats to update trend charts
                        const dashboardResponse = await progressService.getDashboardData();
                        const data = dashboardResponse?.data?.data || dashboardResponse?.data;
                        if (data && typeof data === 'object') {
                            set({ 
                                weightHistory: data.weightHistory,
                                workoutHistory: data.workoutHistory,
                                goals: data.goals,
                                currentWeight: Number(data.currentWeight),
                                targetWeight: Number(data.targetWeight),
                                achievements: data.achievements || [],
                                unlockedAchievements: data.unlockedAchievements || [],
                                isLoading: false 
                            });
                        } else {
                            set({ isLoading: false });
                        }
                        return true;
                    }
                    set({ isLoading: false });
                    return false;
                } catch (error) {
                    // Highly resilient offline session fallback
                    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    set((state) => {
                        const newEntry = { date: today, weight: Number(weight) };
                        return {
                            currentWeight: Number(weight),
                            weightHistory: [...state.weightHistory, newEntry],
                            isLoading: false
                        };
                    });
                    console.log("Laravel API not running. Logged weight entry to offline session storage.");
                    return true;
                }
            }
        }),
        {
            name: 'fitforge-progress-storage',
        }
    )
);
