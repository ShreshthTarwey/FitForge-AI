import React from 'react';
import { motion } from 'framer-motion';

const XPProgressBar = ({ level, xp, xpNextLevel, rankName }) => {
    const percentage = Math.min(100, Math.round((xp / xpNextLevel) * 100)) || 0;

    const calculatedRank = rankName || {
        1: 'Beginner Athlete',
        2: 'Active Warrior',
        3: 'Advanced Crusher',
    }[level] || 'Elite Specialist';

    return (
        <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group">
            {/* Background decorative glow */}
            <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-neon-green/10 rounded-full blur-2xl pointer-events-none group-hover:bg-neon-green/20 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h4 className="text-xs font-bold text-neon-green uppercase tracking-wider mb-1">Rank Progress</h4>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-white">Level {level}</span>
                        <span className="text-sm font-semibold text-slate-400">{calculatedRank}</span>
                    </div>
                </div>
                
                <div className="text-right sm:text-right">
                    <p className="text-sm font-bold text-slate-300">{xp.toLocaleString()} <span className="text-slate-500">/ {xpNextLevel.toLocaleString()} XP</span></p>
                    <p className="text-xs text-slate-500 mt-1">{xpNextLevel - xp} XP to Level {level + 1}</p>
                </div>
            </div>

            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                />
            </div>
        </div>
    );
};

export default XPProgressBar;
