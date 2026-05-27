import React from 'react';
import { Trophy, Flame, Zap, Award, Target, Star } from 'lucide-react';

const iconsMap = {
    streak_7: { icon: Flame, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
    cal_10k: { icon: Trophy, color: 'text-neon-blue bg-neon-blue/10 border-neon-blue/20' },
    warrior: { icon: Zap, color: 'text-neon-green bg-neon-green/10 border-neon-green/20' },
    nutri_master: { icon: Award, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    perfect_week: { icon: Star, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
    
    // DB Icons Mapping
    flame: { icon: Flame, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
    trophy: { icon: Trophy, color: 'text-neon-blue bg-neon-blue/10 border-neon-blue/20' },
    medal: { icon: Zap, color: 'text-neon-green bg-neon-green/10 border-neon-green/20' },
    award: { icon: Award, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    star: { icon: Star, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' }
};

const BadgeCard = ({ badgeId, title, description, isUnlocked, icon }) => {
    const config = iconsMap[badgeId] || iconsMap[icon] || { icon: Target, color: 'text-slate-500 bg-slate-800/50 border-slate-700/50' };
    const IconComponent = config.icon;

    return (
        <div className={`relative overflow-hidden p-4 rounded-xl border backdrop-blur-md transition-all duration-300 ${
            isUnlocked 
            ? 'bg-slate-800/40 border-slate-700 hover:border-neon-green/30 hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]' 
            : 'bg-slate-900/40 border-slate-800/80 opacity-40'
        }`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${config.color}`}>
                    <IconComponent className="w-6 h-6" />
                </div>
                
                <div>
                    <h5 className="font-bold text-white leading-tight mb-1">{title}</h5>
                    <p className="text-xs text-slate-400 leading-snug">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BadgeCard;
