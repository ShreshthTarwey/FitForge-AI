import React, { useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useProgressStore } from '../../store/useProgressStore';
import { useAuthStore } from '../../store/authStore';
import Loader from '../../components/common/Loader';
import WeightTrackerCard from '../../components/progress/WeightTrackerCard';
import GoalProgressCard from '../../components/progress/GoalProgressCard';
import MonthlyProgressChart from '../../components/progress/MonthlyProgressChart';
import WorkoutHistoryTimeline from '../../components/progress/WorkoutHistoryTimeline';
import BadgeCard from '../../components/gamification/BadgeCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Activity, Flame, ShieldAlert, Award, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Dynamic data will be generated in the component body
const badgePresets = [
    { id: 'streak_7', title: '7 Day Streak', description: 'Log training splits 7 days in a row' },
    { id: 'cal_10k', title: 'Calorie Shredder', description: 'Surpass 1,000 total calories burned' },
    { id: 'warrior', title: 'Workout Warrior', description: 'Complete your first training session' },
    { id: 'nutri_master', title: 'Macro Master', description: 'Log a balanced macro profile meal' },
    { id: 'perfect_week', title: 'Perfect Week', description: 'Complete all active plans on schedule' }
];

const ProgressDashboard = () => {
    const { fetchProgressData, isLoading, weightHistory, workoutHistory, goals, currentWeight, targetWeight, addWeightEntry } = useProgressStore();
    const { badges, addXp } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProgressData();
    }, [fetchProgressData]);

    const activeGoals = goals || {
        weeklyWorkouts: { current: 3, target: 5, unit: 'sessions' },
        monthlyCalories: { current: 1550, target: 12000, unit: 'kcal' },
        waterIntake: { current: 2000, target: 3500, unit: 'ml' }
    };

    const activeWeightHistory = weightHistory && weightHistory.length > 0 ? weightHistory : [
        { date: 'May 10', weight: 81.5 },
        { date: 'May 12', weight: 81.1 },
        { date: 'May 14', weight: 80.8 },
        { date: 'May 16', weight: 80.5 }
    ];

    const activeWorkoutHistory = workoutHistory && workoutHistory.length > 0 ? workoutHistory : [];

    // 1. Dynamic Consistency Heatmap for last 24 days
    const consistencyHeatmap = Array.from({ length: 24 }).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (23 - index));
        const dateString = date.toISOString().split('T')[0];
        const wasCompleted = activeWorkoutHistory.some(log => log.date === dateString);
        return {
            day: index + 1,
            completed: wasCompleted
        };
    });

    // 2. Dynamic Muscle Focus Split based on logged names
    const chestCount = activeWorkoutHistory.filter(log => /push|chest|bench/i.test(log.name)).length;
    const backCount = activeWorkoutHistory.filter(log => /pull|back|row/i.test(log.name)).length;
    const legsCount = activeWorkoutHistory.filter(log => /legs|lower|squat|quad/i.test(log.name)).length;
    const coreCount = activeWorkoutHistory.filter(log => /core|shoulder|hiit|cardio|abs/i.test(log.name)).length;
    const totalCount = chestCount + backCount + legsCount + coreCount || 4;

    const muscleData = [
        { name: 'Chest', value: Math.round(((chestCount || 1) / totalCount) * 100), color: '#39ff14' },
        { name: 'Back', value: Math.round(((backCount || 1) / totalCount) * 100), color: '#00f3ff' },
        { name: 'Legs', value: Math.round(((legsCount || 1) / totalCount) * 100), color: '#f97316' },
        { name: 'Core & Shoulders', value: Math.round(((coreCount || 1) / totalCount) * 100), color: '#a855f7' }
    ];

    // 3. Dynamic Achievement Badge Unlocking
    const totalCalBurned = activeWorkoutHistory.reduce((sum, log) => sum + (log.calories || 0), 0);
    
    const unlockedBadges = [];
    if (activeWorkoutHistory.length >= 1) unlockedBadges.push('warrior');
    if (totalCalBurned >= 1000) unlockedBadges.push('cal_10k');
    if (activeGoals.weeklyWorkouts.current >= 3) unlockedBadges.push('perfect_week');
    unlockedBadges.push('nutri_master'); // Unlocked by default when logging nutrition
    if (activeGoals.weeklyWorkouts.current >= 5) unlockedBadges.push('streak_7');

    const activeWeight = currentWeight || 80.5;
    const activeTargetWeight = targetWeight || 75.0;

    // Calculated BMI: weight (kg) / height (m)^2. Let's assume height is 1.80m (height^2 = 3.24)
    const bmi = (activeWeight / 3.24).toFixed(1);
    let bmiCategory = 'Normal';
    let bmiColor = 'text-neon-green';
    if (bmi >= 25) {
        bmiCategory = 'Overweight';
        bmiColor = 'text-orange-500';
    } else if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        bmiColor = 'text-neon-blue';
    }

    const handleAddWeight = async (weight) => {
        const success = await addWeightEntry(weight);
        if (success) {
            addXp(75); // Award 75 XP for logging weight
            toast.success(`Weight entry logged: ${weight} kg (+75 XP)`);
        } else {
            toast.error('Failed to log weight.');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <PageHeader 
                title="Biometric Progress Center" 
                subtitle="Evaluate your BMI trends, muscle training distribution, and unlocked achievements."
                action={
                    <Button variant="outline" onClick={() => navigate('/logs')}>
                        View Training Logs
                    </Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Metrics & Targets */}
                <div className="space-y-6">
                    <WeightTrackerCard 
                        currentWeight={activeWeight} 
                        targetWeight={activeTargetWeight} 
                        history={activeWeightHistory} 
                        onAddWeight={handleAddWeight}
                    />

                    {/* Premium BMI Status Card */}
                    <Card className="p-5 border-slate-800 bg-slate-900/30 flex items-center justify-between relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-neon-green/5 rounded-full blur-xl pointer-events-none group-hover:bg-neon-green/10 transition-all duration-300" />
                        <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Body Mass Index (BMI)</span>
                            <span className="text-3xl font-black text-white">{bmi}</span>
                            <p className="text-xs text-slate-400 mt-1">Classification: <span className={`font-bold ${bmiColor}`}>{bmiCategory}</span></p>
                        </div>
                        <div className="w-12 h-12 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-neon-green">
                            <Activity className="w-6 h-6 animate-pulse" />
                        </div>
                    </Card>
                    
                    {/* Active Goals Checklist */}
                    <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                        <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-neon-green" /> Goal Projections
                        </h3>
                        <div className="space-y-4">
                            <GoalProgressCard 
                                title="Weekly Workouts"
                                current={activeGoals.weeklyWorkouts.current}
                                target={activeGoals.weeklyWorkouts.target}
                                unit={activeGoals.weeklyWorkouts.unit}
                            />
                            <GoalProgressCard 
                                title="Monthly Calories"
                                current={activeGoals.monthlyCalories.current}
                                target={activeGoals.monthlyCalories.target}
                                unit={activeGoals.monthlyCalories.unit}
                            />
                            <GoalProgressCard 
                                title="Daily Hydration"
                                current={activeGoals.waterIntake.current}
                                target={activeGoals.waterIntake.target}
                                unit={activeGoals.waterIntake.unit}
                            />
                        </div>
                    </Card>
                </div>

                {/* Right/Middle Column: Charts & Heatmaps */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Weight Chart */}
                    <div className="h-80">
                        <MonthlyProgressChart data={activeWeightHistory} />
                    </div>

                    {/* Muscle focus distribution & Heatmap side-by-side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Muscle Distribution pie chart */}
                        <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                            <h3 className="text-md font-bold text-white mb-4">Muscle Focus Split</h3>
                            <div className="h-44 relative flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={muscleData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={45}
                                            outerRadius={60}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {muscleData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute text-center">
                                    <span className="text-2xl font-black text-white">4</span>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Target Zones</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold text-slate-400">
                                {muscleData.map(item => (
                                    <div key={item.name} className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                        <span>{item.name} ({item.value}%)</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Consistency heatmap */}
                        <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between">
                            <div>
                                <h3 className="text-md font-bold text-white mb-2">Consistency Heatmap</h3>
                                <p className="text-xs text-slate-500 mb-4">Your workout commit history over the last 24 days.</p>
                                <div className="grid grid-cols-6 gap-2 max-w-xs mx-auto">
                                    {consistencyHeatmap.map(cell => (
                                        <div 
                                            key={cell.day} 
                                            className={`aspect-square rounded-md border transition-all ${
                                                cell.completed 
                                                ? 'bg-neon-green/30 border-neon-green/40 shadow-[0_0_8px_rgba(57,255,20,0.15)]' 
                                                : 'bg-slate-950 border-slate-800/80'
                                            }`}
                                            title={`Day ${cell.day}: ${cell.completed ? 'Workout Completed' : 'Rest Day'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-4">
                                <span>Rest Day</span>
                                <span>Completed Session</span>
                            </div>
                        </Card>
                    </div>

                    {/* Timeline History */}
                    <WorkoutHistoryTimeline history={activeWorkoutHistory} />

                    {/* Premium Achievement Badge Grid */}
                    <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                        <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-neon-green" /> Unlocked Achievements
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {badgePresets.map((badge) => {
                                const isUnlocked = unlockedBadges.includes(badge.id);
                                return (
                                    <BadgeCard 
                                        key={badge.id}
                                        badgeId={badge.id}
                                        title={badge.title}
                                        description={badge.description}
                                        isUnlocked={isUnlocked}
                                    />
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProgressDashboard;
