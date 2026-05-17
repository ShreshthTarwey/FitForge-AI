import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import WorkoutLogForm from '../../components/logging/WorkoutLogForm';
import { Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import { useProgressStore } from '../../store/useProgressStore';

const LogWorkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // Assuming we would fetch the active workout plan details via useWorkoutStore
    // Here we just mock it for the logging flow
    
    // We would normally fire an API call here to save
    const handleLogSubmit = (data) => {
        console.log('Logging workout:', data);
        toast.success('Workout logged successfully! Great job!');
        
        // Refresh progress data if needed
        navigate('/progress');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-green/20 mb-4 border border-neon-green/50">
                    <Trophy className="w-8 h-8 text-neon-green" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Workout Complete!</h1>
                <p className="text-slate-400">Log your actual performance metrics to track your progress accurately.</p>
            </div>

            <Card className="p-4 sm:p-8 border-neon-blue/30 shadow-[0_0_20px_rgba(0,243,255,0.05)]">
                <WorkoutLogForm onSubmit={handleLogSubmit} isLoading={false} />
            </Card>
        </div>
    );
};

export default LogWorkout;
