import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';

const resetSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

const ForgotPasswordForm = () => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(resetSchema),
    });

    const onSubmit = async (data) => {
        // Mock API call since not explicitly defined in backend yet
        return new Promise((resolve) => {
            setTimeout(() => {
                toast.success('If an account exists, a reset link was sent.');
                resolve(true);
            }, 1500);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                label="Email address"
                type="email"
                icon={Mail}
                error={errors.email?.message}
                {...register('email')}
                placeholder="you@example.com"
            />

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Send Reset Link
            </Button>

            <div className="text-center text-sm">
                <Link to="/login" className="font-semibold text-neon-green hover:text-neon-green/80">
                    Return to Login
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
