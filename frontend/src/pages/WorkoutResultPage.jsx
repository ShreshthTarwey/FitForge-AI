import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle, BrainCircuit } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function WorkoutResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;
    const [logging, setLogging] = useState(false);

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                No workout data found. <button className="ml-4 text-blue-400" onClick={() => navigate('/dashboard')}>Go Back</button>
            </div>
        );
    }

    const plan = result.plan;

    const handleComplete = async () => {
        setLogging(true);
        try {
            const res = await api.post('/api/progress/log', {
                workout_plan_id: plan.id,
                calories_burned: plan.calories,
                duration_completed: plan.duration
            });
            
            toast.success('Workout Logged Successfully!', { icon: '🔥' });
            if (res.data.new_achievements.length > 0) {
                res.data.new_achievements.forEach(ach => toast.success(`Achievement Unlocked: ${ach.title}`, { icon: '🏆' }));
            }
            toast(`AI Recovery: ${res.data.ai_recovery_advice}`, { icon: '💡' });
            
            setTimeout(() => navigate('/dashboard'), 3000);
        } catch (e) {
            toast.error('Failed to log workout.');
            setLogging(false);
        }
    };

    return (
        <div className="min-h-screen p-6 py-12">
            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 rounded-3xl mb-8 border border-blue-500/30">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{plan.title}</h1>
                            <p className="text-blue-200">{plan.description}</p>
                        </div>
                        <div className="bg-blue-600 px-4 py-2 rounded-full text-white font-semibold">
                            {plan.duration} mins
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Badge label="Type" value={plan.workout_type} />
                        <Badge label="Goal" value={plan.goal} />
                        <Badge label="Intensity" value={plan.intensity} />
                        <Badge label="Calories" value={`~${plan.calories} kcal`} />
                    </div>

                    {/* DNA Visualizer */}
                    <div className="mb-8">
                        <h3 className="text-gray-300 text-sm uppercase tracking-wider mb-3">Workout DNA</h3>
                        <div className="flex h-3 rounded-full overflow-hidden bg-surface/50">
                            <div className="bg-blue-500 h-full" style={{ width: '40%' }}></div>
                            <div className="bg-purple-500 h-full" style={{ width: '30%' }}></div>
                            <div className="bg-orange-500 h-full" style={{ width: '20%' }}></div>
                            <div className="bg-green-500 h-full" style={{ width: '10%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Strength</span>
                            <span>Cardio</span>
                            <span>Endurance</span>
                            <span>Recovery</span>
                        </div>
                    </div>

                    {/* AI Insights placeholder */}
                    <div className="glass-panel bg-blue-900/10 border-blue-500/20 p-5 rounded-2xl mb-8 flex gap-4">
                        <BrainCircuit className="text-purple-400 mt-1" />
                        <div>
                            <h4 className="text-purple-300 font-semibold mb-1">AI Fitness Coach Insights</h4>
                            <p className="text-gray-300 text-sm">
                                {result.ai_insights || "This workout matches your goal perfectly! Make sure to warm up properly before starting the first set. Keep your core tight during movements."}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-6">Exercises</h2>
                <div className="space-y-4">
                    {plan.exercises.map((ex, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={ex.id} 
                            className="glass-panel p-5 rounded-2xl flex items-center justify-between hover:bg-surface/60 transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-surface p-3 rounded-xl border border-gray-700 text-blue-400 font-bold">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">{ex.exercise_name}</h4>
                                    <div className="text-gray-400 text-sm flex gap-3 mt-1">
                                        <span>{ex.sets} Sets</span>
                                        <span>{ex.reps} Reps</span>
                                        <span>{ex.rest_time}s Rest</span>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-blue-600/20 text-blue-400 p-3 rounded-full hover:bg-blue-600/40 transition">
                                <Play size={20} fill="currentColor" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <button 
                        onClick={handleComplete} 
                        disabled={logging}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold transition shadow-[0_0_15px_rgba(16,185,129,0.4)] disabled:opacity-50"
                    >
                        <CheckCircle /> {logging ? 'Logging...' : 'Complete & Log Workout'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Badge({ label, value }) {
    return (
        <div className="bg-surface/40 p-3 rounded-xl border border-gray-700 text-center">
            <div className="text-gray-400 text-xs uppercase mb-1">{label}</div>
            <div className="text-white font-semibold">{value}</div>
        </div>
    );
}
