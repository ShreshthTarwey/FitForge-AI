import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import Input from '../ui/Input';
import PasswordInput from './PasswordInput';
import Button from '../ui/Button';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    remember: z.boolean().optional(),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        }
    });

    const onSubmit = async (data) => {
        const success = await login({ email: data.email, password: data.password });
        if (success) {
            toast.success('Welcome back!');
            navigate('/dashboard');
        } else {
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Email address"
                type="email"
                icon={Mail}
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
                placeholder="you@example.com"
            />

            <PasswordInput
                label="Password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register('password')}
                placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        {...register('remember')}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-neon-green focus:ring-neon-green focus:ring-offset-slate-900"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-slate-300">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link to="/forgot-password" className="font-semibold text-neon-green hover:text-neon-green/80">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign in
            </Button>

            <div className="text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-white hover:text-neon-green transition-colors">
                    Sign up for free
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
