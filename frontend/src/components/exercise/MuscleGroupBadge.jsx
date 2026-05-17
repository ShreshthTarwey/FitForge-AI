import React from 'react';
import clsx from 'clsx';

const MuscleGroupBadge = ({ muscle }) => {
    // Map muscles to specific neon/dark colors for visual distinction
    const colorMap = {
        chest: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        back: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        legs: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        core: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        arms: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        shoulders: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        full_body: 'bg-neon-green/20 text-neon-green border-neon-green/30'
    };

    const defaultColor = 'bg-slate-700/50 text-slate-300 border-slate-600';
    
    // Normalize muscle string for matching
    const normalizedMuscle = muscle.toLowerCase().replace(' ', '_');
    const colorClass = colorMap[normalizedMuscle] || defaultColor;

    return (
        <span className={clsx(
            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
            colorClass
        )}>
            {muscle}
        </span>
    );
};

export default MuscleGroupBadge;
