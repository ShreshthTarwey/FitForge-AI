import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Settings, Play, BrainCircuit } from 'lucide-react';

export default function WorkoutGeneratorPage() {
    const [formData, setFormData] = useState({
        goal: 'Weight Loss',
        workout_type: 'Cardio',
        intensity: 'Intermediate',
        duration: 30
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/api/workout/generate', formData);
            // Save plan to local state/storage and navigate
            navigate('/workout-result', { state: { result: res.data } });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl glass-panel p-8 rounded-2xl box-glow"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-blue-600 p-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                        <Settings size={28} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">AI Workout Generator</h1>
                        <p className="text-blue-200">Customize your next session</p>
                    </div>
                </div>

                <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Fitness Goal</label>
                        <select name="goal" className="w-full bg-surface/50 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} value={formData.goal}>
                            <option>Weight Loss</option>
                            <option>Muscle Gain</option>
                            <option>Endurance</option>
                            <option>Flexibility</option>
                            <option>General Fitness</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Workout Type</label>
                        <select name="workout_type" className="w-full bg-surface/50 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} value={formData.workout_type}>
                            <option>Strength</option>
                            <option>Cardio</option>
                            <option>HIIT</option>
                            <option>Yoga</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Intensity</label>
                        <select name="intensity" className="w-full bg-surface/50 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} value={formData.intensity}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Duration</label>
                        <select name="duration" className="w-full bg-surface/50 border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-blue-500" onChange={handleChange} value={formData.duration}>
                            <option value="15">15 mins</option>
                            <option value="30">30 mins</option>
                            <option value="45">45 mins</option>
                            <option value="60">60 mins</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)] disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2 animate-pulse">
                                    <BrainCircuit className="animate-spin" /> Generating AI Plan...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Play fill="currentColor" /> Generate Workout
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
