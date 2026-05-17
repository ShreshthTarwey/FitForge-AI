import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';

const generatorSchema = z.object({
    goal: z.string().min(1, 'Goal is required'),
    type: z.string().min(1, 'Workout type is required'),
    intensity: z.string().min(1, 'Intensity is required'),
    duration_weeks: z.number().min(1).max(12),
    days_per_week: z.number().min(1).max(7),
    experience_level: z.string().min(1, 'Experience level is required'),
    equipment: z.string().min(1, 'Equipment is required'),
    target_muscle_group: z.string().min(1, 'Target muscle group is required'),
});

const WorkoutGeneratorForm = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(generatorSchema),
        defaultValues: {
            duration_weeks: 4,
            days_per_week: 3,
        }
    });

    const SelectField = ({ label, name, options, error }) => (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            <select
                {...register(name)}
                className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6 transition-all duration-200"
            >
                <option value="">Select...</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="mt-1.5 text-sm text-red-400">{error.message}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Fitness Goal"
                    name="goal"
                    error={errors.goal}
                    options={[
                        { value: 'weight_loss', label: 'Weight Loss' },
                        { value: 'muscle_gain', label: 'Muscle Gain' },
                        { value: 'endurance', label: 'Endurance' },
                        { value: 'flexibility', label: 'Flexibility' },
                        { value: 'general_fitness', label: 'General Fitness' },
                    ]}
                />
                <SelectField
                    label="Workout Type"
                    name="type"
                    error={errors.type}
                    options={[
                        { value: 'strength', label: 'Strength Training' },
                        { value: 'cardio', label: 'Cardio' },
                        { value: 'hiit', label: 'HIIT' },
                        { value: 'yoga', label: 'Yoga/Pilates' },
                        { value: 'mixed', label: 'Mixed' },
                    ]}
                />
                <SelectField
                    label="Intensity Level"
                    name="intensity"
                    error={errors.intensity}
                    options={[
                        { value: 'low', label: 'Low (Recovery/Beginner)' },
                        { value: 'medium', label: 'Medium (Standard)' },
                        { value: 'high', label: 'High (Advanced/Athlete)' },
                    ]}
                />
                <SelectField
                    label="Experience Level"
                    name="experience_level"
                    error={errors.experience_level}
                    options={[
                        { value: 'beginner', label: 'Beginner' },
                        { value: 'intermediate', label: 'Intermediate' },
                        { value: 'advanced', label: 'Advanced' },
                    ]}
                />
                
                <Input
                    label="Duration (Weeks)"
                    type="number"
                    error={errors.duration_weeks?.message}
                    {...register('duration_weeks', { valueAsNumber: true })}
                />
                <Input
                    label="Days per Week"
                    type="number"
                    error={errors.days_per_week?.message}
                    {...register('days_per_week', { valueAsNumber: true })}
                />

                <SelectField
                    label="Available Equipment"
                    name="equipment"
                    error={errors.equipment}
                    options={[
                        { value: 'none', label: 'No Equipment (Bodyweight)' },
                        { value: 'basic', label: 'Basic (Dumbbells/Bands)' },
                        { value: 'full_gym', label: 'Full Gym Access' },
                    ]}
                />
                <SelectField
                    label="Target Muscle Group"
                    name="target_muscle_group"
                    error={errors.target_muscle_group}
                    options={[
                        { value: 'full_body', label: 'Full Body' },
                        { value: 'upper_body', label: 'Upper Body' },
                        { value: 'lower_body', label: 'Lower Body' },
                        { value: 'core', label: 'Core' },
                    ]}
                />
            </div>

            <div className="pt-4 border-t border-slate-700/50 flex justify-end">
                <Button type="submit" isLoading={isLoading} className="w-full md:w-auto md:min-w-[200px]">
                    Generate AI Workout Plan
                </Button>
            </div>
        </form>
    );
};

export default WorkoutGeneratorForm;
