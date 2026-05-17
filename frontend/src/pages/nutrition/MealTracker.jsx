import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNutritionStore } from '../../store/useNutritionStore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ChevronLeft, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const mealSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    calories: z.number().min(1, 'Calories must be greater than 0'),
    protein: z.number().min(0, 'Protein cannot be negative'),
    carbs: z.number().min(0, 'Carbs cannot be negative'),
    fats: z.number().min(0, 'Fats cannot be negative'),
    mealType: z.string().min(1, 'Select a meal classification'),
});

const presetFoods = [
    { name: 'Grilled Chicken Breast (200g)', calories: 330, protein: 62, carbs: 0, fats: 7 },
    { name: 'Brown Rice (Cooked, 150g)', calories: 170, protein: 4, carbs: 36, fats: 1.5 },
    { name: 'Whole Eggs (3 Large)', calories: 210, protein: 18, carbs: 1.5, fats: 15 },
    { name: 'Oatmeal (100g, Raw)', calories: 380, protein: 13, carbs: 67, fats: 7 },
    { name: 'Whey Protein Isolate (1 Scoop)', calories: 120, protein: 26, carbs: 2, fats: 1 },
];

const MealTracker = () => {
    const navigate = useNavigate();
    const { addMeal } = useNutritionStore();
    const { addXp } = useAuthStore();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(mealSchema),
        defaultValues: {
            protein: 0,
            carbs: 0,
            fats: 0,
            mealType: 'breakfast'
        }
    });

    const handleApplyPreset = (food) => {
        setValue('name', food.name);
        setValue('calories', food.calories);
        setValue('protein', food.protein);
        setValue('carbs', food.carbs);
        setValue('fats', food.fats);
        toast.success(`Applied preset: ${food.name}`);
    };

    const onSubmit = (data) => {
        addMeal(data);
        addXp(120); // Reward 120 XP for logging a full meal
        toast.success('Meal successfully logged! +120 XP');
        navigate('/nutrition');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8 max-w-4xl mx-auto">
            <button 
                onClick={() => navigate('/nutrition')}
                className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
                <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <PageHeader 
                title="Log New Meal" 
                subtitle="Select from active macro presets or register customized ingredient parameters."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Presets List */}
                <Card className="lg:col-span-1 p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                    <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-neon-green" /> Common Presets
                    </h3>
                    <div className="space-y-3">
                        {presetFoods.map((food) => (
                            <button
                                key={food.name}
                                onClick={() => handleApplyPreset(food)}
                                className="w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all text-xs flex flex-col gap-1 focus:outline-none"
                            >
                                <span className="font-bold text-white">{food.name}</span>
                                <span className="text-slate-400">
                                    {food.calories} kcal • P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g
                                </span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Logging Form */}
                <Card className="lg:col-span-2 p-6 sm:p-8 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-2">
                                <Input 
                                    label="Meal Description / Food Item"
                                    type="text"
                                    error={errors.name?.message}
                                    {...register('name')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Meal Type</label>
                                <select
                                    {...register('mealType')}
                                    className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green sm:text-sm transition-all"
                                >
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                    <option value="snack">Snack</option>
                                </select>
                                {errors.mealType && <p className="mt-1.5 text-xs text-red-400">{errors.mealType.message}</p>}
                            </div>

                            <Input 
                                label="Calories (kcal)"
                                type="number"
                                error={errors.calories?.message}
                                {...register('calories', { valueAsNumber: true })}
                            />

                            <Input 
                                label="Protein (g)"
                                type="number"
                                error={errors.protein?.message}
                                {...register('protein', { valueAsNumber: true })}
                            />

                            <Input 
                                label="Carbohydrates (g)"
                                type="number"
                                error={errors.carbs?.message}
                                {...register('carbs', { valueAsNumber: true })}
                            />

                            <Input 
                                label="Fats (g)"
                                type="number"
                                error={errors.fats?.message}
                                {...register('fats', { valueAsNumber: true })}
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-800/80 flex justify-end">
                            <Button type="submit" className="w-full sm:w-auto px-8">
                                Commit Log Entry
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default MealTracker;
