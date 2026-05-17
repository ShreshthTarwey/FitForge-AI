import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { Sparkles, TrendingUp, AlertCircle, Droplet, Dumbbell, Zap } from 'lucide-react';
import { useDemoStore } from '../../store/useDemoStore';

const mockInsights = [
    { icon: TrendingUp, text: 'Leg splits increased by 25% this calendar month.', color: 'text-emerald-400 border-slate-900/60 bg-slate-950/30' },
    { icon: Zap, text: 'You are most active during the weekend recovery zone.', color: 'text-sky-400 border-slate-900/60 bg-slate-950/30' },
    { icon: Droplet, text: 'Your hydration intake has reached optimal metrics for 3 days.', color: 'text-cyan-400 border-slate-900/60 bg-slate-950/30' }
];

const mockRecommendations = [
    { action: 'Execute Pull hypertrophy sets to recover your quads.', target: 'Pushing recovery window' },
    { action: 'Increase water by 500ml to sustain high protein digestion.', target: 'Metabolic synthesis optimal' },
    { action: 'Log 8 hours of slow-wave sleep tonight to offset cortisol levels.', target: 'Somatic repair priority' }
];

const InsightsEngine = () => {
    const { demoMode, accentColor } = useDemoStore();

    if (!demoMode) return null;

    const accentHeaders = {
        emerald: 'text-neon-green',
        cyan: 'text-neon-blue',
        purple: 'text-purple-500'
    }[accentColor] || 'text-neon-green';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Insights panel */}
            <Card className="p-6 border-slate-900 bg-slate-900/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-neon-green/5 rounded-full blur-xl pointer-events-none" />
                
                <h3 className="text-xs font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <Sparkles className={`w-4 h-4 ${accentHeaders} animate-pulse`} /> AI Biometric Insights
                </h3>

                <div className="space-y-3.5">
                    {mockInsights.map((insight, idx) => {
                        const IconComponent = insight.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 3 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                                className={`p-4 rounded-xl border flex items-center gap-3.5 ${insight.color}`}
                            >
                                <div className="p-2 bg-slate-950 border border-slate-900/60 rounded-lg shrink-0">
                                    <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <p className="text-xs font-semibold leading-relaxed text-slate-300">{insight.text}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>

            {/* Recommendations panel */}
            <Card className="p-6 border-slate-900 bg-slate-900/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-neon-blue/5 rounded-full blur-xl pointer-events-none" />

                <h3 className="text-xs font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <Dumbbell className={`w-4 h-4 ${accentHeaders}`} /> Target Recommendations
                </h3>

                <div className="space-y-3.5">
                    {mockRecommendations.map((rec, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.05 }}
                            className="p-4 rounded-xl border border-slate-900/60 bg-slate-950/20 flex flex-col gap-1 hover:border-slate-800/80 transition-colors"
                        >
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{rec.target}</span>
                            <p className="text-xs font-semibold text-slate-300 leading-normal">{rec.action}</p>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default InsightsEngine;
