import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExerciseStore } from '../../store/useExerciseStore';
import { useDemoStore } from '../../store/useDemoStore';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/common/Loader';
import MuscleGroupBadge from '../../components/exercise/MuscleGroupBadge';
import { ArrowLeft, PlayCircle, Info, Flame, Clock, Award, CheckCircle, HelpCircle, Dumbbell } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';
import toast from 'react-hot-toast';

const ExerciseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getExerciseById, fetchExercises, exercises } = useExerciseStore();
    const { accentColor } = useDemoStore();
    const [exercise, setExercise] = useState(null);
    const [activeTab, setActiveTab] = useState('instructions');

    useEffect(() => {
        if (exercises.length === 0) {
            fetchExercises();
        } else {
            setExercise(getExerciseById(id));
        }
    }, [id, exercises, fetchExercises, getExerciseById]);

    if (exercises.length === 0) return <Loader fullScreen />;
    
    if (!exercise) return (
        <div className="pt-12">
            <EmptyState 
                title="Exercise Not Found" 
                description="The exercise you are looking for doesn't exist." 
                actionLabel="Back to Library" 
                onAction={() => navigate('/exercises')} 
            />
        </div>
    );

    // Dynamic Similar / Related Exercises in same category
    const relatedExercises = exercises
        .filter(ex => ex.category === exercise.category && ex.id !== exercise.id)
        .slice(0, 3);

    const handleAddToCustomPlan = () => {
        toast.success(`${exercise.name} added to your active routine!`);
    };

    // Color choices mapping
    const themeColors = {
        emerald: 'text-neon-green border-neon-green/30 bg-neon-green/10',
        cyan: 'text-neon-blue border-neon-blue/30 bg-neon-blue/10',
        purple: 'text-purple-500 border-purple-500/30 bg-purple-500/10'
    };

    const textColors = {
        emerald: 'text-neon-green',
        cyan: 'text-neon-blue',
        purple: 'text-purple-500'
    };

    const hoverColors = {
        emerald: 'hover:text-neon-green',
        cyan: 'hover:text-neon-blue',
        purple: 'hover:text-purple-500'
    };

    const activeColor = textColors[accentColor] || textColors.emerald;
    const activeHover = hoverColors[accentColor] || hoverColors.emerald;
    const activeBadge = themeColors[accentColor] || themeColors.emerald;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <button 
                onClick={() => navigate('/exercises')}
                className={`flex items-center text-sm font-semibold transition-colors mb-4 cursor-pointer ${activeColor}`}
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
            </button>

            <PageHeader 
                title={exercise.name} 
                subtitle={`Equipment Target: ${exercise.equipment} | Category: ${exercise.category}`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Media & Interactive Tab Board */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-0 overflow-hidden relative group">
                        <div className="aspect-video bg-slate-900 relative flex items-center justify-center cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                            <PlayCircle className="w-20 h-20 text-white/40 group-hover:text-neon-blue group-hover:scale-110 transition-all duration-300 relative z-10" />
                            <span className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase tracking-widest relative z-10 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                                View Interactive Tutorial
                            </span>
                        </div>
                    </Card>

                    {/* Tabs system */}
                    <div className="flex border-b border-slate-900 gap-6">
                        {['instructions', 'tips', 'calibration'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-extrabold capitalize border-b-2 transition-all cursor-pointer ${
                                    activeTab === tab 
                                    ? `border-b-white text-white` 
                                    : 'border-b-transparent text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="pt-2">
                        {activeTab === 'instructions' && (
                            <Card className="p-6 border-slate-800 bg-slate-900/20 backdrop-blur-xl">
                                <h4 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                                    <Info className={`w-5 h-5 ${activeColor}`} /> Execution Instructions
                                </h4>
                                <ol className="space-y-4">
                                    {exercise.instructions?.map((step, idx) => (
                                        <li key={idx} className="flex gap-4 text-slate-300">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-bold text-white">
                                                {idx + 1}
                                            </span>
                                            <span className="mt-0.5 text-sm sm:text-base leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </Card>
                        )}

                        {activeTab === 'tips' && (
                            <Card className="p-6 border-slate-800 bg-slate-900/20 backdrop-blur-xl">
                                <h4 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                                    <Award className={`w-5 h-5 ${activeColor}`} /> Pro Performance Tips
                                </h4>
                                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 text-sm font-semibold text-slate-300 leading-relaxed">
                                    {exercise.tips || 'Keep a strong, controlled eccentric contraction phase during lower intervals.'}
                                </div>
                            </Card>
                        )}

                        {activeTab === 'calibration' && (
                            <Card className="p-6 border-slate-800 bg-slate-900/20 backdrop-blur-xl space-y-4">
                                <h4 className="text-md font-bold text-white flex items-center gap-2">
                                    <Clock className={`w-5 h-5 ${activeColor}`} /> Biometrics Calibration Data
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Recommended Sets</span>
                                        <span className="text-lg font-bold text-white">{exercise.sets || 4} Heavy Sets</span>
                                    </div>
                                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Recommended Reps</span>
                                        <span className="text-lg font-bold text-white">{exercise.reps || '10-12'} Reps</span>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Right Column: Specifications & Similar Exercises */}
                <div className="space-y-6">
                    <Card className="p-5 border-slate-800 bg-slate-900/40 backdrop-blur-xl">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">SPECIFICATIONS</h4>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm py-2 border-b border-slate-900">
                                <span className="font-semibold text-slate-400">Calories Burned</span>
                                <span className="font-extrabold text-neon-green flex items-center gap-1">
                                    <Flame className="w-4 h-4 text-neon-green" /> {exercise.calories || 120} kcal
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-b border-slate-900">
                                <span className="font-semibold text-slate-400">Target Muscle</span>
                                <span className="font-extrabold text-white capitalize">{exercise.target_muscles?.[0] || 'Target'}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-b border-slate-900">
                                <span className="font-semibold text-slate-400">Difficulty Limit</span>
                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${activeBadge}`}>
                                    {exercise.difficulty || 'Intermediate'}
                                </span>
                            </div>
                        </div>

                        <Button onClick={handleAddToCustomPlan} className="w-full mt-6 py-3 font-bold uppercase tracking-wide">
                            <Dumbbell className="w-4 h-4 mr-2" /> Add to Routine
                        </Button>
                    </Card>

                    {/* Similar Exercises list */}
                    {relatedExercises.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">SIMILAR EXERCISES</h4>
                            <div className="space-y-3">
                                {relatedExercises.map(rel => (
                                    <div
                                        key={rel.id}
                                        onClick={() => navigate(`/exercises/${rel.id}`)}
                                        className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-slate-700/60 cursor-pointer flex justify-between items-center group transition-all"
                                    >
                                        <div>
                                            <span className="text-sm font-bold text-white block group-hover:text-neon-blue transition-colors">{rel.name}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{rel.equipment}</span>
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${activeHover}`}>View →</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetails;
