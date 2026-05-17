import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', 
        age: '', gender: 'Male', fitness_goal: 'Weight Loss', 
        experience_level: 'Beginner', weekly_workout_frequency: 3
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Check inputs or email might be taken.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6 py-12 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-background/85 backdrop-blur-sm"></div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 w-full max-w-2xl glass-panel p-8 rounded-2xl box-glow"
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-600 p-3 rounded-full mb-3 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                        <Activity size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-blue-200 mt-1">Start your AI-powered fitness journey</p>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                        <input name="name" type="text" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input name="email" type="email" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input name="password" type="password" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Age</label>
                        <input name="age" type="number" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Gender</label>
                        <select name="gender" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Fitness Goal</label>
                        <select name="fitness_goal" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange}>
                            <option>Weight Loss</option>
                            <option>Muscle Gain</option>
                            <option>Endurance</option>
                            <option>Flexibility</option>
                            <option>General Fitness</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Experience Level</label>
                        <select name="experience_level" className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm text-gray-300 mb-1">Weekly Workout Frequency (days)</label>
                        <input name="weekly_workout_frequency" type="number" min="1" max="7" defaultValue={3} className="w-full bg-surface/50 border border-gray-600 rounded p-2.5 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} required />
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
                </div>
            </motion.div>
        </div>
    );
}
