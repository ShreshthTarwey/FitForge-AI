import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { Activity, Flame, Trophy, User, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        api.get('/api/dashboard').then(res => setData(res.data)).catch(console.error);
    }, []);

    if (!data) return <div className="h-screen flex items-center justify-center text-blue-400">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome, {user.name}</h1>
                    <div className="flex gap-4">
                        <button onClick={() => window.location.href='/workout-generate'} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded border border-blue-500 transition shadow-[0_0_10px_rgba(59,130,246,0.5)]">Generate AI Workout</button>
                        <button onClick={logout} className="bg-red-500/20 text-red-400 px-4 py-2 rounded border border-red-500/50 hover:bg-red-500/40 transition">Logout</button>
                    </div>
                </div>

                {/* AI Tip Section */}
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel p-6 rounded-2xl mb-8 flex items-center gap-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Sparkles className="text-blue-400" size={32} />
                    <div>
                        <h3 className="text-blue-200 font-semibold mb-1">AI Fitness Coach Tip</h3>
                        <p className="text-gray-300">{data.ai_tips}</p>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Activity />} title="Workouts" value={data.stats.total_workouts} color="blue" />
                    <StatCard icon={<Flame />} title="Calories Burned" value={data.stats.calories_burned} color="orange" />
                    <StatCard icon={<Trophy />} title="Streak Count" value={`${data.stats.streak_count} Days`} color="yellow" />
                    <StatCard icon={<User />} title="Avatar Level" value={data.stats.avatar_level} color="purple" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-xl text-white font-semibold mb-4">Weekly Activity (mins)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.charts.weekly_activity}>
                                    <XAxis dataKey="day" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                                    <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-xl text-white font-semibold mb-4">Workout Categories</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data.charts.category_distribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {data.charts.category_distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatCard({ icon, title, value, color }) {
    const colorMap = {
        blue: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
        orange: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
        yellow: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
        purple: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    };

    return (
        <motion.div whileHover={{ scale: 1.05 }} className={`glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center border ${colorMap[color].split(' ')[2]} shadow-lg`}>
            <div className={`p-3 rounded-full mb-3 ${colorMap[color]}`}>
                {icon}
            </div>
            <h4 className="text-gray-400 text-sm">{title}</h4>
            <div className="text-2xl font-bold text-white mt-1">{value}</div>
        </motion.div>
    );
}
