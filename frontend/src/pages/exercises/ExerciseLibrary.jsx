import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ExerciseSearchBar from '../../components/exercise/ExerciseSearchBar';
import ExerciseCard from '../../components/exercise/ExerciseCard';
import { useExerciseStore } from '../../store/useExerciseStore';
import { useDemoStore } from '../../store/useDemoStore';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Activity, Dumbbell, Award, Flame, Star, Compass, Filter } from 'lucide-react';

const categoriesList = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Cardio', 'HIIT', 'Yoga', 'Full Body'];
const difficultiesList = ['Beginner', 'Intermediate', 'Advanced'];
const equipmentsList = ['Barbell', 'Dumbbells', 'Cables', 'Bodyweight', 'Kettlebell', 'Yoga Mat'];

const ExerciseLibrary = () => {
    const { fetchExercises, isLoading, setSearchQuery, getFilteredExercises } = useExerciseStore();
    const { accentColor } = useDemoStore();
    const navigate = useNavigate();

    // Local filters state
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedEquipment, setSelectedEquipment] = useState('All');

    useEffect(() => {
        fetchExercises();
    }, [fetchExercises]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleExerciseClick = (exercise) => {
        navigate(`/exercises/${exercise.id}`);
    };

    // Filter exercises dynamically combining search bar + tags
    const allFiltered = getFilteredExercises().filter(ex => {
        if (!ex) return false;
        const matchesCategory = selectedCategory === 'All' || (ex.category && typeof ex.category === 'string' && ex.category.toLowerCase() === selectedCategory.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'All' || (ex.difficulty && typeof ex.difficulty === 'string' && ex.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
        const matchesEquipment = selectedEquipment === 'All' || (ex.equipment && typeof ex.equipment === 'string' && ex.equipment.toLowerCase().includes(selectedEquipment.toLowerCase()));
        return matchesCategory && matchesDifficulty && matchesEquipment;
    });

    const activeColors = {
        emerald: 'bg-neon-green/10 border-neon-green/30 text-neon-green shadow-[0_0_10px_rgba(57,255,20,0.15)]',
        cyan: 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.15)]',
        purple: 'bg-purple-500/10 border-purple-500/30 text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
    };

    const activePill = activeColors[accentColor] || activeColors.emerald;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <PageHeader 
                title="Exercise Library" 
                subtitle="Evaluate structured guides, target muscles, equipment, and calibration sets."
            />

            {/* Trending & Spotlight Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-5 border-slate-800 bg-slate-900/20 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-neon-green/5 rounded-full blur-xl pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest block mb-1">Spotlight Guide</span>
                            <h3 className="text-xl font-extrabold text-white">Barbell Squats Mechanics</h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-md">Learn safety alignments, progressive quadriceps target, and core bracing techniques.</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
                            <Compass className="w-5 h-5 animate-pulse" />
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/exercises/12')} 
                        className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 hover:text-neon-green transition-colors mt-4 cursor-pointer"
                    >
                        Learn Mechanics →
                    </button>
                </Card>

                <Card className="p-5 border-slate-800 bg-slate-900/20 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-neon-blue/5 rounded-full blur-xl pointer-events-none" />
                    <div>
                        <span className="text-[10px] font-bold text-neon-blue uppercase tracking-widest block mb-1">Trending Exercises</span>
                        <div className="space-y-2 mt-3">
                            <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>1. Deadlifts (Back)</span>
                                <span className="text-neon-blue">+15% log</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>2. Dumbbell Lateral Raises</span>
                                <span className="text-neon-blue">+12% log</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300">
                                <span>3. Burpees Overload</span>
                                <span className="text-neon-blue">+8% log</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filter Dashboard Card */}
            <Card className="p-6 border-slate-800 bg-slate-900/30 backdrop-blur-xl space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                    <Filter className="w-4 h-4 text-neon-green" /> Biometric Filter Console
                </div>

                <div className="space-y-4">
                    {/* Categories Row */}
                    <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Muscular Categories</span>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 transition-all cursor-pointer ${
                                    selectedCategory === 'All' 
                                    ? activePill 
                                    : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white'
                                }`}
                            >
                                All Categories
                            </button>
                            {categoriesList.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 transition-all cursor-pointer ${
                                        selectedCategory === cat 
                                        ? activePill 
                                        : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-900/50">
                        {/* Difficulties */}
                        <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Difficulty Scale</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedDifficulty('All')}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                        selectedDifficulty === 'All' 
                                        ? activePill 
                                        : 'bg-slate-950 border-slate-900 text-slate-400'
                                    }`}
                                >
                                    All Difficulties
                                </button>
                                {difficultiesList.map(diff => (
                                    <button
                                        key={diff}
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                            selectedDifficulty === diff 
                                            ? activePill 
                                            : 'bg-slate-950 border-slate-900 text-slate-400'
                                        }`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Equipments */}
                        <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Calibration Equipment</span>
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                <button
                                    onClick={() => setSelectedEquipment('All')}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                                        selectedEquipment === 'All' 
                                        ? activePill 
                                        : 'bg-slate-950 border-slate-900 text-slate-400'
                                    }`}
                                >
                                    All Equipments
                                </button>
                                {equipmentsList.map(eq => (
                                    <button
                                        key={eq}
                                        onClick={() => setSelectedEquipment(eq)}
                                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                                            selectedEquipment === eq 
                                            ? activePill 
                                            : 'bg-slate-950 border-slate-900 text-slate-400'
                                        }`}
                                    >
                                        {eq}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="mb-6">
                <ExerciseSearchBar onSearch={handleSearch} />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : allFiltered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {allFiltered.map((exercise, index) => (
                        <div 
                            key={exercise.id}
                            className="animate-in fade-in slide-in-from-bottom-4" 
                            style={{ animationDelay: `${(index % 8) * 50}ms`, animationFillMode: 'both' }}
                        >
                            <ExerciseCard exercise={exercise} onClick={handleExerciseClick} />
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState 
                    title="No exercises matched criteria" 
                    description="Try adjusting your biometric filters or search query." 
                />
            )}
        </div>
    );
};

export default ExerciseLibrary;
