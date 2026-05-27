import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useAuthStore } from '../../store/authStore';
import { useDemoStore } from '../../store/useDemoStore';
import { dashboardService } from '../../api/dashboard';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';
import DashboardChart from '../../components/dashboard/DashboardChart';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import XPProgressBar from '../../components/gamification/XPProgressBar';
import InsightsEngine from '../../components/dashboard/InsightsEngine';
import Card from '../../components/ui/Card';
import { Flame, Dumbbell, Trophy, Target, Sparkles, Sliders, Check, Settings, ShieldCheck, HeartPulse, Sparkle, ArrowUpRight, Compass, Timer, Activity } from 'lucide-react';

const mockChartData = [
    { name: 'Mon', calories: 300, workouts: 1 },
    { name: 'Tue', calories: 450, workouts: 1 },
    { name: 'Wed', calories: 0, workouts: 0 },
    { name: 'Thu', calories: 500, workouts: 2 },
    { name: 'Fri', calories: 350, workouts: 1 },
    { name: 'Sat', calories: 600, workouts: 1 },
    { name: 'Sun', calories: 200, workouts: 1 },
];

const mockActivities = [
    { id: 1, type: 'workout', title: 'Completed Full Body HIIT', description: 'Burned 450 calories in 45 minutes', time: '2 hours ago' },
    { id: 2, type: 'streak', title: '3 Day Streak!', description: 'You are on fire, keep it up!', time: '1 day ago' },
    { id: 3, type: 'achievement', title: 'Level Up', description: 'Reached Intermediate Status', time: '3 days ago' },
];

const quotes = [
    "Your health index has expanded by 12% over the last 7 calendar days. Keep pushing!",
    "Success isn't always about greatness. It's about consistency. Daily effort wins.",
    "FitForge AI synthesized a perfect push day for you. Tap Floating Actions to start!",
    "You burned 20% more calories this week compared to your standard index."
];

const DashboardOverview = () => {
    const { user, level, xp, xpNextLevel } = useAuthStore();
    const { accentColor, demoMode, widgets, setAccentColor, toggleWidget, toggleDemoMode } = useDemoStore();
    const navigate = useNavigate();
    const [consoleOpen, setConsoleOpen] = useState(false);
    const [dbData, setDbData] = useState(null);
    const [loadingDb, setLoadingDb] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const response = await dashboardService.getDashboardData();
                setDbData(response.data);
            } catch (err) {
                console.error("Failed to load dashboard statistics:", err);
            } finally {
                setLoadingDb(false);
            }
        };
        loadDashboardData();
    }, []);

    // Select motivational quote based on date
    const randomQuote = quotes[new Date().getDay() % quotes.length];

    // Theme color mappings
    const activeText = {
        emerald: 'text-neon-green',
        cyan: 'text-neon-blue',
        purple: 'text-purple-500'
    }[accentColor] || 'text-neon-green';

    const activeBorder = {
        emerald: 'border-neon-green/20 hover:border-neon-green/40 shadow-[0_4px_20px_-5px_rgba(16,185,129,0.06)]',
        cyan: 'border-neon-blue/20 hover:border-neon-blue/40 shadow-[0_4px_20px_-5px_rgba(14,165,233,0.06)]',
        purple: 'border-purple-500/20 hover:border-purple-500/40 shadow-[0_4px_20px_-5px_rgba(168,85,247,0.06)]'
    }[accentColor] || 'border-neon-green/20 hover:border-neon-green/40';

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <PageHeader 
                title={`Welcome back, ${user?.name || 'Athlete'}`} 
                subtitle="Evaluate your training index, biometrics, and achievement metrics."
                action={
                    <div className="flex gap-2.5">
                        <Button 
                            variant="outline" 
                            onClick={() => setConsoleOpen(!consoleOpen)}
                            className="flex items-center gap-2 border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white"
                        >
                            <Sliders className="w-3.5 h-3.5" /> Presenter Controller
                        </Button>
                        <Button onClick={() => navigate('/workouts/generate')} className="bg-white text-slate-950 hover:bg-slate-100 font-bold">
                            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate AI Plan
                        </Button>
                    </div>
                }
            />

            {/* Customizer Ribbon Console */}
            {consoleOpen && (
                <Card className="p-5 border-slate-900 bg-slate-950/95 backdrop-blur-2xl space-y-5 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                            <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                                <Settings className="w-3.5 h-3.5 text-neon-blue animate-spin" /> LIVE PRESENTATION CONTROLLER
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Rearrange, recolor, and inject telemetry parameters on the fly.</p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-bold bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-neon-green" /> Demo Engine Persistent
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-slate-900/60">
                        {/* Accent Themes selector */}
                        <div>
                            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Accent Styles</span>
                            <div className="flex gap-1.5">
                                {[
                                    { id: 'emerald', bg: 'bg-neon-green', text: 'Emerald' },
                                    { id: 'cyan', bg: 'bg-neon-blue', text: 'Cyan' },
                                    { id: 'purple', bg: 'bg-purple-500', text: 'Purple' }
                                ].map((col) => (
                                    <button
                                        key={col.id}
                                        onClick={() => setAccentColor(col.id)}
                                        className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                            accentColor === col.id 
                                            ? 'bg-slate-900 border-slate-800 text-white' 
                                            : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${col.bg}`} />
                                        {col.text}
                                        {accentColor === col.id && <Check className="w-3 h-3 text-neon-green" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Layout Widget Toggles */}
                        <div>
                            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Widget Arrangement</span>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { key: 'stats', label: 'Stats' },
                                    { key: 'charts', label: 'Charts' },
                                    { key: 'insights', label: 'AI Coach' },
                                    { key: 'feed', label: 'Activity' }
                                ].map((t) => {
                                    const active = widgets[t.key];
                                    return (
                                        <button
                                            key={t.key}
                                            onClick={() => toggleWidget(t.key)}
                                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                                                active 
                                                ? 'bg-slate-900 border-slate-800 text-white' 
                                                : 'bg-slate-950/40 border-slate-900 text-slate-500'
                                            }`}
                                        >
                                            {t.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Telemetry settings */}
                        <div>
                            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Biometrics State</span>
                            <button
                                onClick={toggleDemoMode}
                                className={`py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all w-full text-center cursor-pointer ${
                                    demoMode 
                                    ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' 
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                                }`}
                            >
                                {demoMode ? 'Live Telemetry Active' : 'Offline Telemetry'}
                            </button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Asymmetrical High-Hierarchy Hero Dashboard Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Asymmetric Left Panel: Action Focus Centre */}
                <Card className={`lg:col-span-2 p-6 border-slate-900 bg-slate-900/10 backdrop-blur-xl relative overflow-hidden group flex flex-col justify-between ${activeBorder}`}>
                    <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent rounded-full blur-2xl pointer-events-none" />
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400">
                                Today's Schedule Focus
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                            <span className="text-[10px] font-semibold text-slate-500">Live Calibration</span>
                        </div>
                        <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                            {demoMode ? 'Hypertrophy Day 2: Chest & Lateral Core splits' : (dbData?.recent_workouts?.[0]?.workout_plan ? `Active Program: ${dbData.recent_workouts[0].workout_plan.title}` : (dbData?.recent_workouts?.[0]?.custom_name ? `Custom Session: ${dbData.recent_workouts[0].custom_name}` : 'No active training session configured'))}
                        </h2>
                        <p className="text-xs text-slate-400 mt-1.5 max-w-lg leading-relaxed">
                            {demoMode ? randomQuote : (dbData?.ai_tips || "Generate a personalized AI workout plan or log your first session to receive smart biological insights.")}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6 mt-6 border-t border-slate-900/60">
                        <div className="flex gap-4 text-xs">
                            <div>
                                <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">Scheduled duration</span>
                                <span className="font-extrabold text-white flex items-center gap-1 mt-0.5">
                                    <Timer className="w-3.5 h-3.5 text-slate-400" /> {demoMode ? '60 mins' : `${dbData?.recent_workouts?.[0]?.workout_plan?.duration || dbData?.recent_workouts?.[0]?.duration_completed || 45} mins`}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">Target load</span>
                                <span className="font-extrabold text-white flex items-center gap-1 mt-0.5">
                                    <Dumbbell className="w-3.5 h-3.5 text-slate-400" /> {demoMode ? 'Hypertrophy' : (dbData?.recent_workouts?.[0]?.workout_plan?.workout_type || (dbData?.recent_workouts?.[0]?.custom_name ? 'Custom Split' : 'General'))}
                                </span>
                            </div>
                        </div>

                        {demoMode ? (
                            <button
                                onClick={() => navigate('/workouts/1/live')}
                                className="px-3.5 py-1.5 text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                                Start Live Workout HUD <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                        ) : dbData?.recent_workouts?.[0]?.workout_plan ? (
                            <button
                                onClick={() => navigate(`/workouts/${dbData.recent_workouts[0].workout_plan.id}`)}
                                className="px-3.5 py-1.5 text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                                View Current Program <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                        ) : dbData?.recent_workouts?.[0]?.custom_name ? (
                            <button
                                onClick={() => navigate('/logs')}
                                className="px-3.5 py-1.5 text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                                View Workout Logs <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/workouts')}
                                className="px-3.5 py-1.5 text-xs font-bold border border-slate-800 text-slate-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                Setup Custom Plan →
                            </button>
                        )}
                    </div>
                </Card>

                {/* Asymmetric Right Panel: Calibration Index Widget */}
                <Card className="p-5 border-slate-900 bg-slate-900/10 backdrop-blur-xl flex flex-col justify-between relative">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">BIOMETRIC STATUS</span>
                            <span className="text-[10px] text-slate-500 font-semibold">Last synced 2m ago</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-900/50">
                                <div>
                                    <span className="text-xs text-slate-400 font-semibold">Recovery Rate</span>
                                    <span className="block text-[10px] text-slate-500 mt-0.5">Based on sleep + strain indices</span>
                                </div>
                                <span className={`text-sm font-black uppercase ${activeText}`}>
                                    {demoMode ? '88% OPTIMAL' : `${dbData?.stats?.recovery_rate ?? 92}% ${dbData?.stats?.recovery_rate >= 85 ? 'OPTIMAL' : 'RECOVERING'}`}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pb-3 border-b border-slate-900/50">
                                <div>
                                    <span className="text-xs text-slate-400 font-semibold">Hydration Tracker</span>
                                    <span className="block text-[10px] text-slate-500 mt-0.5">Logged current target splits</span>
                                </div>
                                <span className="text-sm font-black text-slate-200">
                                    {demoMode ? '2,000 / 3,500 ml' : `${(dbData?.stats?.today_water_intake ?? 0).toLocaleString()} / ${(dbData?.stats?.daily_water_target ?? 3000).toLocaleString()} ml`}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-900/50">
                        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-slate-400" /> Active Split Streak
                        </span>
                        <span className="text-xs font-black bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-white">
                            {demoMode ? '5 Days Active' : `${dbData?.stats?.streak_count || user?.streak_count || 0} Days`}
                        </span>
                    </div>
                </Card>
            </div>

            {/* XP Level Progress Indicator */}
            {widgets.gamification && (
                <XPProgressBar 
                    level={demoMode ? level : (1 + Math.floor(((dbData?.stats?.total_workouts ?? 0) * 500) / 1000))} 
                    xp={demoMode ? xp : (((dbData?.stats?.total_workouts ?? 0) * 500) % 1000)} 
                    xpNextLevel={demoMode ? xpNextLevel : 1000} 
                    rankName={demoMode ? 'Elite Specialist' : dbData?.stats?.avatar_level}
                />
            )}

            {/* Top Stats Widgets */}
            {widgets.stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Total Workouts" value={demoMode ? "24" : String(dbData?.stats?.total_workouts ?? 0)} icon={Dumbbell} colorVariant="blue" trend={demoMode ? 12 : 0} delay={0.05} />
                    <StatsCard title="Calories Burned" value={demoMode ? "12,450" : String(dbData?.stats?.calories_burned ?? 0)} icon={Flame} colorVariant="green" trend={demoMode ? 8 : 0} delay={0.1} />
                    <StatsCard title="Current Streak" value={demoMode ? "5 Days" : `${dbData?.stats?.streak_count || user?.streak_count || 0} Days`} icon={Trophy} colorVariant="orange" trend={0} delay={0.15} />
                    <StatsCard title="Active Plan" value={demoMode ? "Hypertrophy Split" : (dbData?.recent_workouts?.[0]?.workout_plan?.title ?? dbData?.recent_workouts?.[0]?.custom_name ?? "None")} icon={Target} colorVariant="purple" delay={0.2} />
                </div>
            )}

            {/* AI Insights & Bio recommendation engine */}
            {widgets.insights && (
                <InsightsEngine />
            )}

            {/* Charts & Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {widgets.charts && (
                    <div className="lg:col-span-2">
                        <DashboardChart data={demoMode ? mockChartData : (dbData?.charts?.weekly_activity ?? [])} title="Weekly Calorie Index" />
                    </div>
                )}
                
                {widgets.feed && (
                    <div>
                        <ActivityFeed activities={demoMode ? mockActivities : (dbData?.recent_workouts || []).map(workout => ({
                            id: workout.id,
                            type: 'workout',
                            title: `Completed ${workout.workout_plan?.title || workout.custom_name || 'Workout'}`,
                            description: `Burned ${workout.calories_burned} calories in ${workout.duration_completed} minutes`,
                            time: workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'Just now'
                        }))} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardOverview;
