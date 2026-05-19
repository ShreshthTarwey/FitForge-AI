import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.number().min(12, 'Must be at least 12 years old'),
    height: z.number().min(50, 'Height in cm required'),
    weight: z.number().min(20, 'Weight in kg required'),
    goal: z.string().min(1, 'Goal is required')
});

const ProfileForm = ({ user, onSubmit }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            age: user?.age || 25,
            height: user?.height || 180,
            weight: user?.weight || 75,
            goal: user?.fitness_goal || 'muscle_gain'
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Full Name"
                error={errors.name?.message}
                {...register('name')}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Age"
                    type="number"
                    error={errors.age?.message}
                    {...register('age', { valueAsNumber: true })}
                />
                <Input
                    label="Height (cm)"
                    type="number"
                    error={errors.height?.message}
                    {...register('height', { valueAsNumber: true })}
                />
                <Input
                    label="Weight (kg)"
                    type="number"
                    error={errors.weight?.message}
                    {...register('weight', { valueAsNumber: true })}
                />
                
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Primary Fitness Goal</label>
                    <select
                        {...register('goal')}
                        className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6"
                    >
                        <option value="weight_loss">Weight Loss</option>
                        <option value="muscle_gain">Muscle Gain</option>
                        <option value="endurance">Endurance</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
            </div>

            <Button type="submit" isLoading={isSubmitting}>
                Save Profile
            </Button>
        </form>
    );
};

export default ProfileForm;
