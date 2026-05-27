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
import { Activity, Flame, ShieldAlert, Award, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Dynamic data will be generated in the component body
const badgePresets = [
    { id: 'streak_7', title: '7 Day Streak', description: 'Log training splits 7 days in a row', icon: 'flame' },
    { id: 'cal_10k', title: 'Calorie Shredder', description: 'Surpass 1,000 total calories burned', icon: 'trophy' },
    { id: 'warrior', title: 'Workout Warrior', description: 'Complete your first training session', icon: 'medal' },
    { id: 'nutri_master', title: 'Macro Master', description: 'Log a balanced macro profile meal', icon: 'award' },
    { id: 'perfect_week', title: 'Perfect Week', description: 'Complete all active plans on schedule', icon: 'star' }
];

const ProgressDashboard = () => {
    const { fetchProgressData, isLoading, weightHistory, workoutHistory, goals, currentWeight, targetWeight, addWeightEntry, achievements, unlockedAchievements } = useProgressStore();
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
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        const wasCompleted = activeWorkoutHistory.some(log => log.date === dateString);
        return {
            day: index + 1,
            completed: wasCompleted
        };
    });

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
                                title="Monthly Calorie Burning"
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

                    {/* Consistency heatmap */}
                    <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                        <h3 className="text-md font-bold text-white mb-2">Consistency Heatmap</h3>
                        <p className="text-xs text-slate-500 mb-6">Your workout commit history over the last 24 days.</p>
                        <div className="grid grid-cols-12 gap-3 max-w-xl mx-auto">
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
                        
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-6 pt-4 border-t border-slate-900">
                            <span>Rest Day</span>
                            <span>Completed Session</span>
                        </div>
                    </Card>

                    {/* Timeline History */}
                    <WorkoutHistoryTimeline history={activeWorkoutHistory} />

                    {/* Premium Achievement Badge Grid */}
                    <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl">
                        <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-neon-green" /> Unlocked Achievements
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(achievements && achievements.length > 0 ? achievements : badgePresets).map((badge) => {
                                const isUnlocked = achievements && achievements.length > 0
                                    ? unlockedAchievements?.includes(badge.id)
                                    : unlockedBadges.includes(badge.id);
                                return (
                                    <BadgeCard 
                                        key={badge.id}
                                        badgeId={badge.id}
                                        icon={badge.icon}
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
