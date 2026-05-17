import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/ui/EmptyState';
import { ArrowLeft, Play } from 'lucide-react';
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
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch
        const timer = setTimeout(() => {
            setWorkout(mockWorkoutDetails);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

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
                <div className="lg:col-span-2">
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
