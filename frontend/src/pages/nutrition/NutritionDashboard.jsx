import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useNutritionStore } from '../../store/useNutritionStore';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Droplet, Moon, Trash2, TrendingUp, Apple, Award } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

const NutritionDashboard = () => {
    const navigate = useNavigate();
    const { meals, waterIntake, waterTarget, sleepHours, sleepTarget, macroTarget, addWater, resetWater, logSleep, deleteMeal, getDailyTotals, fetchNutritionData } = useNutritionStore();
    const { addXp, updateProfile } = useAuthStore();
    const [sleepInput, setSleepInput] = useState(sleepHours);
    const [isEditingMacros, setIsEditingMacros] = useState(false);
    const [calorieInput, setCalorieInput] = useState('');
    const [proteinInput, setProteinInput] = useState('');
    const [carbsInput, setCarbsInput] = useState('');
    const [fatsInput, setFatsInput] = useState('');

    useEffect(() => {
        fetchNutritionData();
    }, []);

    const handleStartEditMacros = () => {
        setCalorieInput(macroTarget.calories || 2500);
        setProteinInput(macroTarget.protein || 150);
        setCarbsInput(macroTarget.carbs || 250);
        setFatsInput(macroTarget.fats || 70);
        setIsEditingMacros(true);
    };

    const handleMacrosSubmit = async () => {
        const calVal = Number(calorieInput);
        const protVal = Number(proteinInput);
        const carbVal = Number(carbsInput);
        const fatVal = Number(fatsInput);

        if (isNaN(calVal) || calVal < 500 || calVal > 10000) {
            toast.error('Calorie goal must be between 500 and 10000 kcal');
            return;
        }
        if (isNaN(protVal) || protVal < 10 || protVal > 1000) {
            toast.error('Protein goal must be between 10g and 1000g');
            return;
        }
        if (isNaN(carbVal) || carbVal < 10 || carbVal > 2000) {
            toast.error('Carbs goal must be between 10g and 2000g');
            return;
        }
        if (isNaN(fatVal) || fatVal < 5 || fatVal > 500) {
            toast.error('Fats goal must be between 5g and 500g');
            return;
        }

        try {
            const success = await updateProfile({
                daily_calorie_target: calVal,
                daily_protein_target: protVal,
                daily_carbs_target: carbVal,
                daily_fats_target: fatVal
            });
            if (success) {
                toast.success('Macros and calorie targets updated successfully!');
                setIsEditingMacros(false);
                fetchNutritionData();
            } else {
                toast.error('Failed to update targets.');
            }
        } catch (err) {
            toast.error('Error updating targets.');
        }
    };

    const totals = getDailyTotals();
    const calPercentage = Math.round((totals.calories / macroTarget.calories) * 100) || 0;
    const proteinPercentage = Math.round((totals.protein / macroTarget.protein) * 100) || 0;
    const carbsPercentage = Math.round((totals.carbs / macroTarget.carbs) * 100) || 0;
    const fatsPercentage = Math.round((totals.fats / macroTarget.fats) * 100) || 0;

    const handleAddWater = (amount) => {
        addWater(amount);
        addXp(15); // Reward 15 XP for logging water
        toast.success(`Hydrated! +${amount}ml logged (+15 XP)`);
    };

    const handleSleepSubmit = () => {
        logSleep(Number(sleepInput));
        addXp(50); // Reward 50 XP for sleep log
        toast.success(`Sleep logged: ${sleepInput} hours (+50 XP)`);
    };

    const chartData = [
        { name: 'Consumed', value: totals.calories },
        { name: 'Remaining', value: Math.max(0, macroTarget.calories - totals.calories) }
    ];

    const COLORS = ['#39ff14', '#1e293b'];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <PageHeader 
                title="Nutrition & Wellness Tracker" 
                subtitle="Track daily calorie quotas, macronutrient distribution, sleep hygiene, and active hydration."
                action={
                    <Button onClick={() => navigate('/nutrition/log')}>
                        <Plus className="w-4 h-4 mr-2" /> Log Meal
                    </Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calories Progress Circle & Macros */}
                <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden group">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2">
                            <Apple className="w-5 h-5 text-neon-green" /> Daily Calorie Goal
                        </span>
                        {!isEditingMacros && (
                            <button
                                onClick={handleStartEditMacros}
                                className="text-xs font-bold text-neon-green flex items-center gap-1 hover:underline focus:outline-none"
                            >
                                Edit Goal
                            </button>
                        )}
                    </h3>
                    
                    <div className="h-48 relative flex items-center justify-center mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <span className="text-3xl font-black text-white">{totals.calories.toLocaleString()}</span>
                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">/ {macroTarget.calories} kcal</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Protein */}
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="font-semibold text-slate-300">Protein</span>
                                <span className="text-slate-400 font-medium">{totals.protein}g / <span className="text-slate-500">{macroTarget.protein}g</span></span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-neon-green" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, proteinPercentage)}%` }}
                                />
                            </div>
                        </div>

                        {/* Carbs */}
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="font-semibold text-slate-300">Carbs</span>
                                <span className="text-slate-400 font-medium">{totals.carbs}g / <span className="text-slate-500">{macroTarget.carbs}g</span></span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-neon-blue" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, carbsPercentage)}%` }}
                                />
                            </div>
                        </div>

                        {/* Fats */}
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="font-semibold text-slate-300">Fats</span>
                                <span className="text-slate-400 font-medium">{totals.fats}g / <span className="text-slate-500">{macroTarget.fats}g</span></span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-orange-500" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, fatsPercentage)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    {isEditingMacros && (
                        <div className="mt-4 p-4 bg-slate-950/60 rounded-xl border border-slate-900 space-y-3 animate-in slide-in-from-top-2 duration-300">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configure Daily Targets</h4>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Calories (kcal)</label>
                                    <input
                                        type="number"
                                        value={calorieInput}
                                        onChange={(e) => setCalorieInput(e.target.value)}
                                        className="block w-full rounded-lg border-0 bg-slate-900 py-1 px-2 text-white ring-1 ring-inset ring-slate-850 focus:ring-2 focus:ring-neon-green text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Protein (g)</label>
                                    <input
                                        type="number"
                                        value={proteinInput}
                                        onChange={(e) => setProteinInput(e.target.value)}
                                        className="block w-full rounded-lg border-0 bg-slate-900 py-1 px-2 text-white ring-1 ring-inset ring-slate-850 focus:ring-2 focus:ring-neon-green text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Carbs (g)</label>
                                    <input
                                        type="number"
                                        value={carbsInput}
                                        onChange={(e) => setCarbsInput(e.target.value)}
                                        className="block w-full rounded-lg border-0 bg-slate-900 py-1 px-2 text-white ring-1 ring-inset ring-slate-850 focus:ring-2 focus:ring-neon-green text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Fats (g)</label>
                                    <input
                                        type="number"
                                        value={fatsInput}
                                        onChange={(e) => setFatsInput(e.target.value)}
                                        className="block w-full rounded-lg border-0 bg-slate-900 py-1 px-2 text-white ring-1 ring-inset ring-slate-850 focus:ring-2 focus:ring-neon-green text-xs"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-1">
                                <button
                                    onClick={() => setIsEditingMacros(false)}
                                    className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleMacrosSubmit}
                                    className="px-2.5 py-1 rounded bg-neon-green text-slate-950 text-xs font-bold hover:bg-neon-green/90 transition-all cursor-pointer"
                                >
                                    Save Goals
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Hydration Tracker Card */}
                <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden group flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            <Droplet className="w-5 h-5 text-neon-blue animate-pulse" /> Hydration Status
                        </h3>
                        <p className="text-xs text-slate-400 mb-6">Stay hydrated to maintain cellular performance.</p>

                        <div className="flex items-baseline gap-2 mb-4 justify-center">
                            <span className="text-4xl font-extrabold text-white">{(waterIntake / 1000).toFixed(2)}</span>
                            <span className="text-sm font-bold text-slate-400">/ {(waterTarget / 1000).toFixed(2)} Liters</span>
                        </div>

                        {/* Glowing Glass Liquid container */}
                        <div className="w-32 h-44 bg-slate-950 border border-slate-800 rounded-2xl mx-auto overflow-hidden relative shadow-inner">
                            <motion.div 
                                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neon-blue/80 to-neon-blue rounded-b-2xl shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                                animate={{ height: `${Math.min(100, (waterIntake / waterTarget) * 100)}%` }}
                                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <Button variant="outline" size="sm" onClick={() => handleAddWater(250)}>+250ml</Button>
                        <Button variant="outline" size="sm" onClick={() => handleAddWater(500)}>+500ml</Button>
                    </div>
                </Card>

                {/* Sleep tracker & wellness targets */}
                <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden group flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            <Moon className="w-5 h-5 text-purple-500" /> Sleep Hygiene
                        </h3>
                        <p className="text-xs text-slate-400 mb-6">Repair muscle fibers and reset mental health index.</p>

                        <div className="flex items-baseline gap-2 mb-6 justify-center">
                            <span className="text-4xl font-extrabold text-white">{sleepHours}</span>
                            <span className="text-sm font-bold text-slate-400">/ {sleepTarget} Hours</span>
                        </div>

                        {/* Sleep logs setter */}
                        <div className="space-y-4 max-w-xs mx-auto">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Log Hours Slept</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        max="24" 
                                        step="0.5"
                                        value={sleepInput}
                                        onChange={(e) => setSleepInput(e.target.value)}
                                        className="block w-full rounded-lg border-0 bg-slate-950 py-2 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                                    />
                                    <Button size="sm" onClick={handleSleepSubmit}>Update</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-slate-950/50 p-4 border border-slate-800/80 rounded-xl flex items-center gap-3">
                        <Award className="w-6 h-6 text-neon-green shrink-0 animate-bounce" />
                        <p className="text-xs text-slate-400 leading-snug">
                            Maintaining <span className="font-bold text-white">8 hours of sleep</span> raises your protein synthesis rates by up to 20%.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Food Logs Timeline */}
            <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-6">Today's Logged Meals</h3>
                
                {meals.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                        <Apple className="w-10 h-10 mx-auto opacity-20 mb-3" />
                        No meals logged today. Take charge of your nutrition!
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800/80">
                        {meals.map((meal) => (
                            <div key={meal.id} className="py-4 flex justify-between items-center gap-4 hover:bg-slate-800/10 transition-colors px-2 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                                        <Apple className="w-5 h-5 text-neon-green" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white leading-tight">{meal.name}</h4>
                                        <p className="text-xs text-slate-500 capitalize mt-0.5">{meal.mealType} • {meal.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <div className="flex gap-3 text-xs font-semibold text-slate-400">
                                            <span>P: {meal.protein}g</span>
                                            <span>C: {meal.carbs}g</span>
                                            <span>F: {meal.fats}g</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <span className="font-black text-white text-sm">{meal.calories} kcal</span>
                                        <button 
                                            onClick={() => {
                                                deleteMeal(meal.id);
                                                toast.success('Meal entry deleted!');
                                            }}
                                            className="p-1 text-slate-500 hover:text-red-500 hover:scale-105 active:scale-95 transition-all focus:outline-none"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default NutritionDashboard;
