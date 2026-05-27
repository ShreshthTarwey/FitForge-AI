import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useExerciseStore } from '../../store/useExerciseStore';
import { Search, Dumbbell, Compass, Calendar, AlertCircle } from 'lucide-react';

const mockPlans = [
    { id: 1, title: 'Titan Hypertrophy', goal: 'Muscle Gain', difficulty_level: 'Advanced', description: 'A 4-week hypertrophy program targeting all major muscle groups.', duration_weeks: 4, days_per_week: 5, estimated_calories: 600, workout_type: 'Strength' },
    { id: 2, title: 'Spartan Shred', goal: 'Weight Loss', difficulty_level: 'Intermediate', description: 'HIIT and strength circuits to maximize fat loss while preserving muscle.', duration_weeks: 6, days_per_week: 4, estimated_calories: 750, workout_type: 'HIIT' },
    { id: 3, title: 'Foundation Builder', goal: 'General Fitness', difficulty_level: 'Beginner', description: 'Perfect for those just starting out. Focuses on form and foundational strength.', duration_weeks: 8, days_per_week: 3, estimated_calories: 400, workout_type: 'Strength' },
];

const appPages = [
    { name: 'Dashboard Home', path: '/dashboard', category: 'Navigation', desc: 'Overview of your biometric progress and streaks', keywords: ['home', 'dashboard', 'overview', 'streaks', 'biometrics', 'weight', 'activity'] },
    { name: 'Workout Library & Plans', path: '/workouts', category: 'Navigation', desc: 'Browse generated plans and exercises', keywords: ['workout', 'plan', 'library', 'split', 'schedule', 'routine', 'explore', 'generated', 'workplans', 'workplan'] },
    { name: 'AI Workout Generator', path: '/workouts/generate', category: 'Navigation', desc: 'Generate a personalized plan using Gemini AI', keywords: ['ai', 'generator', 'gemini', 'personalized', 'custom', 'create', 'generate', 'maker'] },
    { name: 'Exercise & Movement Library', path: '/exercises', category: 'Navigation', desc: 'Search 50+ movement demonstrations', keywords: ['exercise', 'movement', 'library', 'demonstration', 'form', 'technique', 'muscle', 'equipment', 'lift', 'workout'] },
    { name: 'Biometric Progress Tracker', path: '/progress', category: 'Navigation', desc: 'Unlocked achievements and weight charts', keywords: ['progress', 'tracker', 'chart', 'achievement', 'weight', 'history', 'stats', 'analytics'] },
    { name: 'Detailed Progress History', path: '/progress/history', category: 'Navigation', desc: 'Detailed log of weight entries and achievements', keywords: ['progress', 'history', 'weight log', 'achievements', 'unlocked', 'timeline', 'table'] },
    { name: 'Workout History Logs & Splits', path: '/logs', category: 'Navigation', desc: 'View, edit, and delete completed sessions', keywords: ['history', 'log', 'split', 'sessions', 'completed', 'past', 'workout log', 'notes'] },
    { name: 'Nutrition & Hydration Dashboard', path: '/nutrition', category: 'Navigation', desc: 'Log meals, sleep hours, and water intake', keywords: ['nutrition', 'hydration', 'dashboard', 'meal', 'sleep', 'water', 'calories', 'macro', 'protein', 'carbs', 'fats'] },
    { name: 'Meal & Hydration Tracker', path: '/nutrition/log', category: 'Navigation', desc: 'Track meals, macros, and water intake', keywords: ['nutrition', 'log meal', 'track meal', 'log water', 'hydration', 'macros', 'carbs', 'protein', 'fats', 'food'] },
    { name: 'Account Settings & Targets', path: '/settings', category: 'Navigation', desc: 'Manage your profile and target goals', keywords: ['settings', 'targets', 'account', 'profile', 'goals', 'customize', 'macros', 'water target', 'calorie goal', 'edit'] }
];

const GlobalSearch = () => {
    const navigate = useNavigate();
    const { plans, fetchPlans } = useWorkoutStore();
    const { exercises, fetchExercises } = useExerciseStore();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (Array.isArray(plans) && plans.length === 0) fetchPlans();
        if (Array.isArray(exercises) && exercises.length === 0) fetchExercises();
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const lowerQuery = query.toLowerCase().trim();

    // Filter features
    const filteredPages = lowerQuery
        ? appPages.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) || 
            p.desc.toLowerCase().includes(lowerQuery) ||
            (p.keywords && p.keywords.some(k => k.toLowerCase().includes(lowerQuery)))
          )
        : [];

    // Filter and deduplicate workout plans
    const plansList = Array.isArray(plans) ? plans : [];
    const allPlansCombined = [...plansList, ...mockPlans];
    
    const uniquePlans = [];
    const planIds = new Set();
    const planTitles = new Set();
    for (const plan of allPlansCombined) {
        if (!plan) continue;
        const idKey = plan.id;
        const titleKey = plan.title?.toLowerCase().trim();
        if (!planIds.has(idKey) && !planTitles.has(titleKey)) {
            planIds.add(idKey);
            planTitles.add(titleKey);
            uniquePlans.push(plan);
        }
    }

    const filteredPlans = lowerQuery
        ? uniquePlans.filter(p => 
            p.title?.toLowerCase().includes(lowerQuery) || 
            p.goal?.toLowerCase().includes(lowerQuery) ||
            p.workout_type?.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery) ||
            p.difficulty_level?.toLowerCase().includes(lowerQuery) ||
            p.intensity?.toLowerCase().includes(lowerQuery) ||
            p.exercises?.some(ex => 
                ex.exercise_name?.toLowerCase().includes(lowerQuery) ||
                ex.name?.toLowerCase().includes(lowerQuery)
            )
          )
        : [];

    // Filter exercises
    const exercisesList = Array.isArray(exercises) ? exercises : [];
    const filteredExercises = lowerQuery
        ? exercisesList.filter(ex => 
            ex.name?.toLowerCase().includes(lowerQuery) || 
            ex.category?.toLowerCase().includes(lowerQuery) ||
            ex.equipment?.toLowerCase().includes(lowerQuery) ||
            ex.difficulty?.toLowerCase().includes(lowerQuery) ||
            ex.target_muscles?.some(m => typeof m === 'string' && m.toLowerCase().includes(lowerQuery))
          )
        : [];

    const hasResults = filteredPages.length > 0 || filteredPlans.length > 0 || filteredExercises.length > 0;

    const handleSelectResult = (path) => {
        navigate(path);
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            {/* Search Input Trigger */}
            <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="text" 
                    placeholder="Search workouts, exercises, features..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full sm:w-72 bg-slate-900/60 border border-slate-800 rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-neon-green transition-all"
                />
            </div>

            {/* Intelligent Search Results Dropdown */}
            {isOpen && query.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-96 mt-2 bg-slate-950/95 border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl max-h-[420px] overflow-y-auto divide-y divide-slate-900">
                    
                    {/* 1. App Sections Matches */}
                    {filteredPages.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5 text-neon-green" /> App Navigation
                            </div>
                            <div className="space-y-1 mt-1">
                                {filteredPages.map((page, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => handleSelectResult(page.path)}
                                        className="px-3 py-2 rounded-xl hover:bg-slate-900 cursor-pointer transition-all group"
                                    >
                                        <div className="text-xs font-bold text-white group-hover:text-neon-green transition-colors">{page.name}</div>
                                        <div className="text-[10px] text-slate-500 mt-0.5">{page.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
 
                    {/* 2. Workout Plans Matches */}
                    {filteredPlans.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-neon-blue" /> Workout Plans
                            </div>
                            <div className="space-y-1 mt-1">
                                {filteredPlans.map((plan, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => handleSelectResult(`/workouts/${plan.id}`)}
                                        className="px-3 py-2 rounded-xl hover:bg-slate-900 cursor-pointer transition-all group"
                                    >
                                        <div className="text-xs font-bold text-white group-hover:text-neon-blue transition-colors flex items-center justify-between">
                                            <span className="line-clamp-1">{plan.title}</span>
                                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 group-hover:bg-neon-blue/10 group-hover:text-neon-blue transition-all shrink-0 ml-2">{plan.goal}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{plan.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3. Exercises Matches */}
                    {filteredExercises.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <Dumbbell className="w-3.5 h-3.5 text-orange-500" /> Exercises
                            </div>
                            <div className="space-y-1 mt-1">
                                {filteredExercises.map((ex, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => handleSelectResult(`/exercises/${ex.id}`)}
                                        className="px-3 py-2 rounded-xl hover:bg-slate-900 cursor-pointer transition-all group"
                                    >
                                        <div className="text-xs font-bold text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                                            <span>{ex.name}</span>
                                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-all shrink-0 ml-2">{ex.category}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-2">
                                            <span className="line-clamp-1">Target: {ex.target_muscles?.join(', ')}</span>
                                            <span>•</span>
                                            <span className="shrink-0">Equip: {ex.equipment}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results Fallback */}
                    {!hasResults && (
                        <div className="p-6 text-center text-slate-500 flex flex-col items-center gap-2">
                            <AlertCircle className="w-8 h-8 text-slate-700 animate-pulse" />
                            <div className="text-xs font-bold text-slate-400">No matching biometrics or plans found</div>
                            <p className="text-[10px] text-slate-500 max-w-[220px] leading-relaxed">Try typing 'Chest', 'Titan', 'HIIT', 'Meal', 'Water', or 'Settings'.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
