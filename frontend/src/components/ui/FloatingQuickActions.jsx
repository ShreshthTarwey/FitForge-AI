import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Utensils, Droplet, Moon, Dumbbell, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNutritionStore } from '../../store/useNutritionStore';
import toast from 'react-hot-toast';

const FloatingQuickActions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { addWater } = useNutritionStore();

    const handleQuickWater = () => {
        addWater(250);
        toast.success('Logged 250ml of water!');
        setIsOpen(false);
    };

    const actions = [
        { icon: Utensils, label: 'Log Meal', color: 'bg-emerald-500 hover:bg-emerald-600', action: () => { navigate('/nutrition/log'); setIsOpen(false); } },
        { icon: Droplet, label: 'Log Water (250ml)', color: 'bg-cyan-500 hover:bg-cyan-600', action: handleQuickWater },
        { icon: Dumbbell, label: 'Log Workout', color: 'bg-blue-500 hover:bg-blue-600', action: () => { navigate('/workouts'); setIsOpen(false); } },
        { icon: Sparkles, label: 'Generate Plan', color: 'bg-indigo-500 hover:bg-indigo-600', action: () => { navigate('/workouts/generate'); setIsOpen(false); } },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col items-end gap-3 mb-3">
                        {actions.map((act, index) => (
                            <motion.div
                                key={act.label}
                                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.05 }}
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={act.action}
                            >
                                <span className="text-xs font-bold text-white bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                                    {act.label}
                                </span>
                                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xl border border-white/10 transition-colors ${act.color}`}>
                                    <act.icon className="w-5 h-5" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Core toggle button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-14 h-14 bg-neon-green text-slate-900 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.5)] border border-neon-green/30 hover:scale-105 active:scale-95 transition-transform focus:outline-none"
            >
                <Plus className="w-8 h-8 stroke-[2.5]" />
            </motion.button>
        </div>
    );
};

export default FloatingQuickActions;
