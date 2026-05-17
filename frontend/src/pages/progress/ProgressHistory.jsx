import React, { useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useProgressStore } from '../../store/useProgressStore';
import Loader from '../../components/common/Loader';
import WorkoutHistoryTimeline from '../../components/progress/WorkoutHistoryTimeline';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressHistory = () => {
    const { fetchProgressData, isLoading, workoutHistory } = useProgressStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProgressData();
    }, [fetchProgressData]);

    if (isLoading) return <Loader fullScreen />;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8 max-w-3xl mx-auto">
            <button 
                onClick={() => navigate('/progress')}
                className="flex items-center text-sm font-semibold text-neon-green hover:text-neon-green/80 transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </button>

            <PageHeader 
                title="Full Workout History" 
                subtitle="A chronological log of all your completed sessions."
            />

            <WorkoutHistoryTimeline history={workoutHistory} />
            
            {/* Pagination or Load More could go here */}
            <div className="text-center pt-8">
                <p className="text-sm text-slate-500">You've reached the end of your history.</p>
            </div>
        </div>
    );
};

export default ProgressHistory;
