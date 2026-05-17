import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
            
            macroTarget: {
                calories: 2500,
                protein: 160,
                carbs: 250,
                fats: 70
            },

            addMeal: (meal) => {
                const newMeal = {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    ...meal
                };
                set((state) => ({
                    meals: [newMeal, ...state.meals]
                }));
            },

            deleteMeal: (id) => {
                set((state) => ({
                    meals: state.meals.filter((m) => m.id !== id)
                }));
            },

            addWater: (amount) => {
                set((state) => ({
                    waterIntake: Math.min(6000, state.waterIntake + amount)
                }));
            },

            resetWater: () => {
                set({ waterIntake: 0 });
            },

            logSleep: (hours) => {
                set({ sleepHours: hours });
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
        }
    )
);
