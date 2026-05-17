import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import Input from '../ui/Input';
import PasswordInput from './PasswordInput';
import Button from '../ui/Button';

const signupSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    age: z.string().optional(),
    gender: z.string().optional(),
    fitness_goal: z.string().optional(),
    experience_level: z.string().optional(),
    weekly_workout_frequency: z.string().optional(),
});

const SignupForm = () => {
    const navigate = useNavigate();
    const { register: signup, isLoading } = useAuthStore();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        // Convert string inputs to appropriate types if needed for backend
        const payload = {
            ...data,
            age: data.age ? parseInt(data.age) : null,
            weekly_workout_frequency: data.weekly_workout_frequency ? parseInt(data.weekly_workout_frequency) : null,
        };

        const success = await signup(payload);
        if (success) {
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } else {
            toast.error('Registration failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Full Name"
                type="text"
                icon={User}
                error={errors.name?.message}
                {...register('name')}
                placeholder="John Doe"
            />

            <Input
                label="Email address"
                type="email"
                icon={Mail}
                error={errors.email?.message}
                {...register('email')}
                placeholder="you@example.com"
            />

            <PasswordInput
                label="Password"
                error={errors.password?.message}
                {...register('password')}
                placeholder="••••••••"
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Age (Optional)"
                    type="number"
                    error={errors.age?.message}
                    {...register('age')}
                    placeholder="25"
                />
                
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Gender (Optional)</label>
                    <select
                        {...register('gender')}
                        className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6 transition-all duration-200"
                    >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Goal (Optional)</label>
                    <select
                        {...register('fitness_goal')}
                        className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6"
                    >
                        <option value="">Select...</option>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Muscle Gain">Muscle Gain</option>
                        <option value="Endurance">Endurance</option>
                        <option value="Flexibility">Flexibility</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Experience (Optional)</label>
                    <select
                        {...register('experience_level')}
                        className="block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6"
                    >
                        <option value="">Select...</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                Create Account
            </Button>

            <div className="text-center text-sm text-slate-400 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-white hover:text-neon-green transition-colors">
                    Sign in here
                </Link>
            </div>
        </form>
    );
};

export default SignupForm;
