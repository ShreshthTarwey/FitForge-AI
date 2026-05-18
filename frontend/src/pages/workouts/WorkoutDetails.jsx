import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Card from '../../components/ui/Card';
import { ArrowLeft, Play, Brain, Sparkles } from 'lucide-react';
import WorkoutHeader from '../../components/workout/WorkoutHeader';
import ExerciseTimeline from '../../components/workout/ExerciseTimeline';

// Mock detailed workout data
const mockWorkoutDetails = {
    id: 1,
    title: 'Titan Hypertrophy - Day 1',
    goal: 'Muscle Gain',
    difficulty: 'Advanced',
    duration_minutes: 60,
    estimated_calories: 500,
    exercises: [
        { exercise: { name: 'Barbell Bench Press', target_muscles: ['Chest'] }, sets: 4, reps: '8-10', rest_seconds: 90 },
        { exercise: { name: 'Incline Dumbbell Press', target_muscles: ['Chest', 'Shoulders'] }, sets: 3, reps: '10-12', rest_seconds: 60 },
        { exercise: { name: 'Pull-ups', target_muscles: ['Back', 'Lats'] }, sets: 4, reps: 'To failure', rest_seconds: 90 },
        { exercise: { name: 'Barbell Rows', target_muscles: ['Back'] }, sets: 3, reps: '10-12', rest_seconds: 60 },
    ]
};

const WorkoutDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If a real plan was passed in routing state
        if (location.state?.plan) {
            const plan = location.state.plan;
            // Map real backend exercise schema to what ExerciseTimeline expects
            const formattedExercises = (plan.exercises || []).map(ex => ({
                exercise: {
                    name: ex.exercise_name || 'Exercise',
                    target_muscles: [plan.workout_type || 'General']
                },
                sets: ex.sets || 3,
                reps: ex.reps || '10',
                rest_seconds: ex.rest_time || 60
            }));

            setWorkout({
                id: plan.id,
                title: plan.title,
                goal: plan.goal || 'General Fitness',
                difficulty: plan.difficulty_level || 'Intermediate',
                duration_minutes: plan.duration || 45,
                estimated_calories: plan.calories || 300,
                ai_insights: plan.ai_insights,
                exercises: formattedExercises
            });
            setLoading(false);
            return;
        }

        // Fallback to simulated fetch for mock plans
        const timer = setTimeout(() => {
            setWorkout(mockWorkoutDetails);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id, location.state]);

    if (loading) return <Loader fullScreen />;
    
    if (!workout) return (
        <div className="pt-12">
            <EmptyState title="Workout Not Found" description="This workout might have been deleted." actionLabel="Go Back" onAction={() => navigate('/workouts')} />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-24">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-sm font-semibold text-neon-green hover:text-neon-green/80 transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Plans
            </button>

            <WorkoutHeader 
                title={workout.title}
                goal={workout.goal}
                duration={workout.duration_minutes}
                calories={workout.estimated_calories}
                difficulty={workout.difficulty}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Render Gemini AI Coach Insights if available */}
                    {workout.ai_insights && (
                        <Card className="border-neon-blue/20 bg-slate-950/40 backdrop-blur-md p-6 relative overflow-hidden group">
                            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-neon-blue/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue shrink-0 animate-pulse">
                                    <Brain className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5 uppercase tracking-wider">
                                        FitForge AI Coach Insights <Sparkles className="w-4 h-4 text-neon-green" />
                                    </h4>
                                    <p className="text-sm font-semibold leading-relaxed text-slate-300">
                                        {workout.ai_insights}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}
                    <ExerciseTimeline exercises={workout.exercises} />
                </div>
                
                <div className="space-y-6">
                    <div className="sticky top-24">
                        <Button className="w-full h-14 text-lg font-bold shadow-[0_0_15px_rgba(57,255,20,0.4)]" onClick={() => navigate(`/workouts/${id}/active`)}>
                            <Play className="w-5 h-5 mr-2 fill-current" />
                            Start Workout
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-4">
                            Starting will begin the active tracking timer and log your progress.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetails;
