import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import { dashboardService } from '../../api/dashboard';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { useAuthStore } from '../../store/authStore';
import { Flame, Activity, TrendingUp, Award } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const response = await dashboardService.getDashboardData();
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) return <Loader fullScreen />;
    if (error) return <ErrorState message={error} onRetry={fetchDashboard} />;

    const stats = data?.stats || {};

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <PageHeader 
                title={`Welcome back, ${user?.name}`} 
                subtitle="Here is your fitness overview for today."
                action={
                    <Button onClick={() => navigate('/workouts/generate')}>
                        Generate Workout
                    </Button>
                }
            />

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center">
                        <Activity className="text-neon-green w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Total Workouts</p>
                        <p className="text-2xl font-bold text-white">{stats.total_workouts || 0}</p>
                    </div>
                </Card>
                
                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Flame className="text-orange-500 w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Calories Burned</p>
                        <p className="text-2xl font-bold text-white">{stats.calories_burned || 0}</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center">
                        <TrendingUp className="text-neon-blue w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Current Streak</p>
                        <p className="text-2xl font-bold text-white">{stats.streak_count || 0} days</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Award className="text-purple-500 w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Avatar Level</p>
                        <p className="text-xl font-bold text-white">{stats.avatar_level || 'Beginner'}</p>
                    </div>
                </Card>
            </div>

            {/* AI Insights & Recent Activity Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4">Weekly Activity</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-700/50 rounded-lg">
                        <p className="text-slate-500">Charts will be implemented in the next phase</p>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-neon-green/30">
                    <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                        AI Coach Insight
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                        {data?.ai_tips || "Stay consistent! Generating a new workout plan targeted at your goals can help break through plateaus."}
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default DashboardHome;
