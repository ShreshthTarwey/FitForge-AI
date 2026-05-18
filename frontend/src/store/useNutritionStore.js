import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nutritionService } from '../api/nutrition';

const initialPresetMeals = [
    { id: 1, name: 'Oatmeal with Whey & Berries', calories: 450, protein: 35, carbs: 55, fats: 8, mealType: 'breakfast', time: '08:30 AM' },
    { id: 2, name: 'Grilled Chicken Breast with Brown Rice & Broccoli', calories: 620, protein: 55, carbs: 65, fats: 10, mealType: 'lunch', time: '01:15 PM' },
    { id: 3, name: 'Greek Yogurt with Honey & Almonds', calories: 280, protein: 22, carbs: 24, fats: 9, mealType: 'snack', time: '04:45 PM' }
];

export const useNutritionStore = create(
    persist(
        (set, get) => ({
            meals: initialPresetMeals,
            waterIntake: 2000, // in ml
            waterTarget: 3500, // in ml
            sleepHours: 7.5,
            sleepTarget: 8.0,
            isLoading: false,
            error: null,
            
            macroTarget: {
                calories: 2500,
                protein: 160,
                carbs: 250,
                fats: 70
            },

            fetchNutritionData: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await nutritionService.getNutritionData();
                    const { meals, waterIntake, sleepHours, waterTarget, sleepTarget, macroTarget } = response.data;
                    
                    // Map backend's snake_case meal_type to frontend's camelCase mealType
                    const mappedMeals = (meals || []).map(m => ({
                        ...m,
                        mealType: m.meal_type || m.mealType || 'breakfast'
                    }));

                    set({
                        meals: mappedMeals,
                        waterIntake: Number(waterIntake) || 0,
                        sleepHours: Number(sleepHours) || 7.0,
                        waterTarget: Number(waterTarget) || 3500,
                        sleepTarget: Number(sleepTarget) || 8.0,
                        macroTarget: macroTarget || get().macroTarget,
                        isLoading: false
                    });
                } catch (error) {
                    set({ isLoading: false });
                    console.log('Using offline nutrition fallback storage.');
                }
            },

            addMeal: async (meal) => {
                set({ isLoading: true });
                try {
                    // Map camelCase mealType from react-hook-form to backend's snake_case meal_type
                    const payload = {
                        name: meal.name,
                        calories: Number(meal.calories),
                        protein: Number(meal.protein),
                        carbs: Number(meal.carbs),
                        fats: Number(meal.fats),
                        meal_type: meal.mealType || 'breakfast',
                        time: meal.time
                    };
                    const response = await nutritionService.logMeal(payload);
                    if (response.data.status === 'success') {
                        // Refetch the fresh database set
                        await get().fetchNutritionData();
                    }
                } catch (error) {
                    // Fallback to local memory log if offline
                    const newMeal = {
                        id: Date.now(),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        ...meal
                    };
                    set((state) => ({
                        meals: [newMeal, ...state.meals],
                        isLoading: false
                    }));
                }
            },

            deleteMeal: async (id) => {
                set({ isLoading: true });
                try {
                    await nutritionService.deleteMeal(id);
                    await get().fetchNutritionData();
                } catch (error) {
                    set((state) => ({
                        meals: state.meals.filter((m) => m.id !== id),
                        isLoading: false
                    }));
                }
            },

            addWater: async (amount) => {
                try {
                    const response = await nutritionService.logWater(amount);
                    if (response.data.status === 'success') {
                        set({ waterIntake: response.data.waterIntake });
                    }
                } catch (error) {
                    set((state) => ({
                        waterIntake: Math.min(6000, state.waterIntake + amount)
                    }));
                }
            },

            resetWater: async () => {
                try {
                    await nutritionService.resetWater();
                    set({ waterIntake: 0 });
                } catch (error) {
                    set({ waterIntake: 0 });
                }
            },

            logSleep: async (hours) => {
                try {
                    const response = await nutritionService.logSleep(hours);
                    if (response.data.status === 'success') {
                        set({ sleepHours: response.data.sleepHours });
                    }
                } catch (error) {
                    set({ sleepHours: hours });
                }
            },

            getDailyTotals: () => {
                const { meals } = get();
                return meals.reduce(
                    (acc, meal) => {
                        acc.calories += Number(meal.calories) || 0;
                        acc.protein += Number(meal.protein) || 0;
                        acc.carbs += Number(meal.carbs) || 0;
                        acc.fats += Number(meal.fats) || 0;
                        return acc;
                    },
                    { calories: 0, protein: 0, carbs: 0, fats: 0 }
                );
            }
        }),
        {
            name: 'fitforge-nutrition-storage',
            partialize: (state) => ({
                meals: state.meals,
                waterIntake: state.waterIntake,
                sleepHours: state.sleepHours
            })
        }
    )
);
