import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import WorkoutGeneratorForm from '../../components/workout/WorkoutGeneratorForm';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const generationSteps = [
    { text: 'Analyzing physical goals & body parameters...', duration: 1500 },
    { text: 'Configuring target split & muscle recovery zones...', duration: 1500 },
    { text: 'Optimizing progressive overload resistance protocols...', duration: 1500 },
    { text: 'Finalizing custom biometric dashboard metrics...', duration: 1000 }
];

const WorkoutGenerator = () => {
    const { generatePlan } = useWorkoutStore();
    const { addXp } = useAuthStore();
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleGenerate = async (formData) => {
        setIsGenerating(true);
        setCurrentStepIndex(0);

        // Run the animated stepper process
        for (let i = 0; i < generationSteps.length; i++) {
            setCurrentStepIndex(i);
            await new Promise((resolve) => setTimeout(resolve, generationSteps[i].duration));
        }

        const plan = await generatePlan(formData);
        setIsGenerating(false);

        if (plan) {
            addXp(400); // Reward XP for generating a plan
            toast.success('FitForge AI successfully synthesized your plan! +400 XP');
            navigate('/workouts');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8 max-w-4xl mx-auto">
            <PageHeader 
                title="AI Workout Plan Generator" 
                subtitle="Provide your criteria and let FitForge AI design a premium fitness routine personalized for your genetic threshold."
            />

            <AnimatePresence mode="wait">
                {!isGenerating ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <Card className="p-6 sm:p-8 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden group">
                            {/* Decorative glass glow background */}
                            <div className="absolute -left-36 -top-36 w-72 h-72 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-blue/10 transition-all duration-500" />
                            <WorkoutGeneratorForm onSubmit={handleGenerate} isLoading={false} />
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center py-20 px-6 text-center"
                    >
                        <div className="relative mb-8">
                            {/* Cosmic AI pulsing rings */}
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                                className="absolute inset-0 rounded-full bg-neon-green/20 blur-xl"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                                className="w-24 h-24 rounded-full border-2 border-dashed border-neon-green/40 flex items-center justify-center"
                            >
                                <Brain className="w-10 h-10 text-neon-green animate-pulse" />
                            </motion.div>
                            
                            <motion.div 
                                className="absolute -bottom-2 -right-2 bg-slate-850 p-1.5 rounded-lg border border-slate-700/80 text-neon-blue"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            >
                                <Sparkles className="w-5 h-5" />
                            </motion.div>
                        </div>

                        <h3 className="text-2xl font-black text-white tracking-wide mb-2 uppercase">Synthesizing Biometrics</h3>
                        <p className="text-sm text-slate-400 max-w-sm mb-8">
                            Please wait while FitForge AI engineers your premium routine based on scientific workout principles.
                        </p>

                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left relative overflow-hidden">
                            <div className="space-y-4">
                                {generationSteps.map((step, idx) => {
                                    const isDone = idx < currentStepIndex;
                                    const isActive = idx === currentStepIndex;
                                    return (
                                        <div key={idx} className={`flex items-center gap-3 transition-opacity duration-300 ${isDone || isActive ? 'opacity-100' : 'opacity-30'}`}>
                                            {isDone ? (
                                                <CheckCircle2 className="w-5 h-5 text-neon-green shrink-0" />
                                            ) : isActive ? (
                                                <Cpu className="w-5 h-5 text-neon-blue animate-spin shrink-0" />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                                            )}
                                            <span className={`text-sm font-semibold ${isActive ? 'text-neon-blue' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                                                {step.text}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Continuous loading bar */}
                            <div className="h-1 w-full bg-slate-950 mt-6 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-neon-green to-neon-blue"
                                    animate={{ 
                                        width: `${((currentStepIndex + 1) / generationSteps.length) * 100}%` 
                                    }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorkoutGenerator;
