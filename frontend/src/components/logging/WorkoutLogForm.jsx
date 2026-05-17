import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';

const logSchema = z.object({
    duration_minutes: z.number().min(1, 'Duration must be at least 1 minute'),
    calories_burned: z.number().min(0, 'Calories cannot be negative'),
    fatigue_level: z.string().min(1, 'Fatigue level is required'),
    notes: z.string().optional(),
});

const WorkoutLogForm = ({ onSubmit, isLoading, initialData = {} }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(logSchema),
        defaultValues: {
            duration_minutes: initialData.duration_minutes || 45,
            calories_burned: initialData.calories_burned || 300,
            fatigue_level: 'moderate',
            notes: '',
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Actual Duration (Minutes)"
                    type="number"
                    error={errors.duration_minutes?.message}
                    {...register('duration_minutes', { valueAsNumber: true })}
                />
                
                <Input
                    label="Estimated Calories Burned"
                    type="number"
                    error={errors.calories_burned?.message}
                    {...register('calories_burned', { valueAsNumber: true })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Fatigue / Difficulty Level</label>
                <select
                    {...register('fatigue_level')}
                    className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6"
                >
                    <option value="very_easy">Very Easy</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard (To Failure)</option>
                </select>
                {errors.fatigue_level && <p className="mt-1.5 text-sm text-red-400">{errors.fatigue_level.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Session Notes</label>
                <textarea
                    {...register('notes')}
                    rows={4}
                    className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6"
                    placeholder="How did the workout feel? Any PRs broken?"
                />
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
                Save & Complete Workout
            </Button>
        </form>
    );
};

export default WorkoutLogForm;
