import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import WorkoutLogForm from '../../components/logging/WorkoutLogForm';
import { Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import { progressService } from '../../api/progress';
import { useProgressStore } from '../../store/useProgressStore';

const LogWorkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    
    const handleLogSubmit = async (data) => {
        setSubmitting(true);
        try {
            const response = await progressService.logWorkout({
                workout_plan_id: id,
                calories_burned: data.calories_burned,
                duration_completed: data.duration_minutes,
                user_feedback: data.fatigue_level,
                notes: data.notes
            });

            toast.success('Workout logged successfully to database! Great job!');

            // If achievements are unlocked, notify the user visually
            if (response.data.new_achievements && response.data.new_achievements.length > 0) {
                response.data.new_achievements.forEach(ach => {
                    toast.success(`🏆 Achievement Unlocked: ${ach.title}! ${ach.description}`, {
                        duration: 6000
                    });
                });
            }

            // Route to dashboard so they can immediately see updated stats
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to log workout:', error);
            toast.error(error.response?.data?.message || 'Failed to save workout to database.');
        } finally {
            setSubmitting(false);
        }
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
                <WorkoutLogForm onSubmit={handleLogSubmit} isLoading={submitting} />
            </Card>
        </div>
    );
};

export default LogWorkout;
