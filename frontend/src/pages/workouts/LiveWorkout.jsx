import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Play, Pause, RotateCcw, CheckCircle, Zap, Dumbbell, Award, Flame, Smile, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/useProgressStore';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import toast from 'react-hot-toast';

const mockExercises = [
    { name: 'Incline Dumbbell Bench Press', sets: 4, reps: '8-10', target: 'Upper Chest', weight: '26kg' },
    { name: 'Decline Chest Press Machine', sets: 3, reps: '10-12', target: 'Lower Chest', weight: '55kg' },
    { name: 'Incline Cable Flyes', sets: 3, reps: '12-15', target: 'Pectoral Squeeze', weight: '15kg' },
    { name: 'Dumbbell Overhead Extensions', sets: 4, reps: '10-12', target: 'Triceps', weight: '22kg' }
];

const LiveWorkout = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addXp, streak } = useAuthStore();
    const { addWorkoutLog } = useProgressStore();

    // Session Timers
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    // Active Exercise
    const [currentExIndex, setCurrentExIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);

    // Rest Mode circular count down
    const [restSeconds, setRestSeconds] = useState(0);
    const [isRestActive, setIsRestActive] = useState(false);

    // Completion modal state
    const [isFinished, setIsFinished] = useState(false);
    const [loggedFatigue, setLoggedFatigue] = useState('medium');
    const [loggedNotes, setLoggedNotes] = useState('');

    useEffect(() => {
        let interval = null;
        if (isActive && !isFinished) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, isFinished]);

    useEffect(() => {
        let restInterval = null;
        if (isRestActive && restSeconds > 0) {
            restInterval = setInterval(() => {
                setRestSeconds((prev) => prev - 1);
            }, 1000);
        } else if (restSeconds === 0 && isRestActive) {
            setIsRestActive(false);
            toast.success('Rest completed! Set active.');
        } else {
            clearInterval(restInterval);
        }
        return () => clearInterval(restInterval);
    }, [isRestActive, restSeconds]);

    const formatTime = (totalSec) => {
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSetComplete = () => {
        const activeEx = mockExercises[currentExIndex];
        if (currentSet < activeEx.sets) {
            setCurrentSet((prev) => prev + 1);
            // Trigger Rest Period (e.g. 45 seconds)
            setRestSeconds(45);
            setIsRestActive(true);
            toast.success(`Set ${currentSet} completed! Dynamic rest triggered.`);
        } else {
            // Exercise completed
            if (currentExIndex < mockExercises.length - 1) {
                setCurrentExIndex((prev) => prev + 1);
                setCurrentSet(1);
                setRestSeconds(60);
                setIsRestActive(true);
                toast.success(`${activeEx.name} fully completed! Switching exercises.`);
            } else {
                // Workout fully completed!
                setIsFinished(true);
                setIsActive(false);
            }
        }
    };

    const handleSaveWorkout = () => {
        // Record split history log
        const newLog = {
            name: `Live Session: Hypertrophy Split`,
            duration: Math.round(seconds / 60) || 1,
            calories: Math.round(seconds * 0.15) || 50,
            fatigue: loggedFatigue,
            notes: loggedNotes || 'Completed live training session inside FitForge Elite Live Mode.'
        };
        addWorkoutLog(newLog);
        addXp(350); // Reward 350 XP for completing live session!
        toast.success('Workout split saved to metrics timeline! +350 XP');
        navigate('/logs');
    };

    const activeExercise = mockExercises[currentExIndex];
    const totalSetsCompleted = currentExIndex * 4 + (currentSet - 1);
    const totalSetsProgress = Math.min(100, Math.round((totalSetsCompleted / 14) * 100)) || 0;

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 relative overflow-hidden">
            {/* Visual background decorations */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Navigation Header */}
            <div className="flex justify-between items-center z-10 border-b border-slate-900 pb-4 mb-4">
                <button 
                    onClick={() => {
                        if (window.confirm('Are you sure you want to exit active live training? Progress will be lost.')) {
                            navigate('/workouts');
                        }
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" /> Exit Session
                </button>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">LIVE TELEMETRY ACTIVE</span>
                </div>
            </div>

            {/* Main Interactive Screen */}
            <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-center z-10">
                {/* Active timers */}
                <Card className="lg:col-span-1 p-6 border-slate-900 bg-slate-900/20 backdrop-blur-xl flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">TOTAL TRAINING TIME</span>
                    <span className="text-5xl font-black font-mono text-white mb-6">{formatTime(seconds)}</span>

                    <div className="flex gap-4">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsActive(!isActive)}
                            className="w-28 flex items-center justify-center gap-1.5"
                        >
                            {isActive ? (
                                <><Pause className="w-4 h-4" /> Pause</>
                            ) : (
                                <><Play className="w-4 h-4" /> Resume</>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Rest / Active set Circular Telemetry */}
                <div className="lg:col-span-2 flex flex-col justify-center items-center text-center py-6">
                    <AnimatePresence mode="wait">
                        {isRestActive ? (
                            <motion.div 
                                key="rest"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <div className="relative w-48 h-48 rounded-full border-4 border-slate-800/80 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,243,255,0.15)] bg-slate-900/10">
                                    {/* Rotating countdown circular path */}
                                    <div className="absolute inset-0 rounded-full border-4 border-t-neon-blue border-r-neon-blue border-transparent animate-spin duration-3000" />
                                    <div className="text-center">
                                        <span className="text-4xl font-black font-mono text-neon-blue">{restSeconds}s</span>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">REST TIMER</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Take deep diaphragmatic breaths</h3>
                                <p className="text-xs text-slate-500 max-w-xs">Hydrate with water. Next set: {currentSet} of {activeExercise.name}.</p>
                                <Button size="sm" variant="outline" className="mt-4" onClick={() => setIsRestActive(false)}>Skip Rest</Button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="active"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full space-y-6"
                            >
                                <Card className="p-6 border-slate-800 bg-slate-900/30 backdrop-blur-xl relative overflow-hidden group text-left">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest block mb-1">Exercise {currentExIndex + 1} of 4</span>
                                            <h2 className="text-2xl font-black text-white">{activeExercise.name}</h2>
                                            <p className="text-xs text-slate-400 mt-1 capitalize">Target Focus: <span className="font-bold text-white">{activeExercise.target}</span></p>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green shrink-0">
                                            <Dumbbell className="w-6 h-6 animate-bounce" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-4 mt-4 text-center">
                                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Current Set</span>
                                            <span className="text-lg font-bold text-white">{currentSet} / {activeExercise.sets}</span>
                                        </div>
                                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Target Reps</span>
                                            <span className="text-lg font-bold text-white">{activeExercise.reps}</span>
                                        </div>
                                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Intensity Weight</span>
                                            <span className="text-lg font-bold text-white">{activeExercise.weight}</span>
                                        </div>
                                    </div>
                                </Card>

                                <Button 
                                    size="lg" 
                                    onClick={handleSetComplete}
                                    className="w-full max-w-sm py-4 shadow-[0_0_20px_rgba(57,255,20,0.3)] font-black uppercase tracking-wide"
                                >
                                    Complete Set {currentSet} <CheckCircle className="w-5 h-5 ml-2" />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="z-10 border-t border-slate-900 pt-4 mt-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase mb-2">
                    <span>Live Progress Tracker</span>
                    <span>{totalSetsProgress}% Completed</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                        animate={{ width: `${totalSetsProgress}%` }}
                    />
                </div>
            </div>

            {/* High Impact Completion Modal */}
            <AnimatePresence>
                {isFinished && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
                        />
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl relative text-center flex flex-col justify-between"
                            >
                                {/* Explosive glowing crown decoration */}
                                <div className="relative mb-6 mx-auto">
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 rounded-full bg-neon-green/20 blur-xl"
                                    />
                                    <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
                                        <Award className="w-10 h-10 animate-bounce" />
                                    </div>
                                    <motion.div 
                                        className="absolute -top-1 -right-1 text-neon-blue bg-slate-850 p-1.5 rounded-lg border border-slate-700/80"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <Sparkles className="w-5 h-5 animate-pulse" />
                                    </motion.div>
                                </div>

                                <h2 className="text-3xl font-black text-white tracking-wide mb-2 uppercase">Workout Synthesized!</h2>
                                <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
                                    Congratulations! You completed all 14 heavy sets on the hypertrophy schedule. Let's record metrics.
                                </p>

                                <div className="space-y-4 text-left mb-6 bg-slate-950/60 p-4 rounded-2xl border border-slate-900/80">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <Flame className="w-5 h-5 text-neon-green" />
                                            <div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase block">Calories</span>
                                                <span className="text-sm font-bold text-white">{Math.round(seconds * 0.15)} kcal</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Smile className="w-5 h-5 text-neon-blue" />
                                            <div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase block">Time Active</span>
                                                <span className="text-sm font-bold text-white">{Math.round(seconds / 60)} mins</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-900" />

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fatigue Rating</label>
                                        <select
                                            value={loggedFatigue}
                                            onChange={(e) => setLoggedFatigue(e.target.value)}
                                            className="block w-full rounded-lg border-0 bg-slate-900 py-2 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                                        >
                                            <option value="low">Low (Extremely Rested)</option>
                                            <option value="medium">Medium (Standard Muscle Soreness)</option>
                                            <option value="high">High (Maximum Overload Exhaustion)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Workout Splitting Notes</label>
                                        <textarea
                                            rows="2"
                                            placeholder="Write details about sets progression, bench press targets, etc..."
                                            value={loggedNotes}
                                            onChange={(e) => setLoggedNotes(e.target.value)}
                                            className="block w-full rounded-lg border-0 bg-slate-900 py-2 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm resize-none"
                                        />
                                    </div>
                                </div>

                                <Button 
                                    onClick={handleSaveWorkout}
                                    className="w-full py-4 shadow-[0_0_20px_rgba(57,255,20,0.3)] font-black uppercase tracking-wide flex items-center justify-center gap-2"
                                >
                                    Commit Session Telemetry <ArrowRight className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveWorkout;
