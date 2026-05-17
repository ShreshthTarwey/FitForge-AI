import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDemoStore } from '../../store/useDemoStore';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-950 border border-slate-900 px-3.5 py-2.5 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center gap-4 text-xs font-semibold text-slate-200 mt-1">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.name}
                        </span>
                        <span className="font-extrabold text-white">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const DashboardChart = ({ data, title, height = 300 }) => {
    const { accentColor } = useDemoStore();

    // Map theme colors
    const strokeColors = {
        emerald: {
            primary: '#10b981', // Emerald
            secondary: '#0ea5e9' // sky blue
        },
        cyan: {
            primary: '#0ea5e9', // Cyan
            secondary: '#a855f7' // Purple
        },
        purple: {
            primary: '#a855f7', // Purple
            secondary: '#10b981' // Emerald
        }
    }[accentColor] || { primary: '#10b981', secondary: '#0ea5e9' };

    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <Card className="p-6 border-slate-900 bg-slate-900/10 backdrop-blur-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">TRAINING TRENDS</span>
                        <h3 className="text-md font-bold text-white tracking-tight">{title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-slate-400">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: strokeColors.primary }} />
                            <span>Calories</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: strokeColors.secondary }} />
                            <span>Workouts</span>
                        </div>
                    </div>
                </div>
                
                <div style={{ height }} className="w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={strokeColors.primary} stopOpacity={0.12}/>
                                    <stop offset="95%" stopColor={strokeColors.primary} stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={strokeColors.secondary} stopOpacity={0.12}/>
                                    <stop offset="95%" stopColor={strokeColors.secondary} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                stroke="rgba(255,255,255,0.3)" 
                                fontSize={10} 
                                fontWeight={600}
                                tickLine={false} 
                                axisLine={false} 
                            />
                            <YAxis 
                                stroke="rgba(255,255,255,0.3)" 
                                fontSize={10} 
                                fontWeight={600}
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            
                            <Area 
                                type="monotone" 
                                dataKey="calories" 
                                name="Calories Burned"
                                stroke={strokeColors.primary} 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorCalories)" 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="workouts" 
                                name="Workouts"
                                stroke={strokeColors.secondary} 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorWorkouts)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </motion.div>
    );
};

export default DashboardChart;
