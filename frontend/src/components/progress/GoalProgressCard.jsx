import React from 'react';
import Card from '../ui/Card';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

const GoalProgressCard = ({ title, current, target, unit = '' }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100)) || 0;
    
    return (
        <Card>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-white">{title}</h3>
                </div>
                <span className="text-sm font-bold text-neon-green">{percentage}%</span>
            </div>

            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-green rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                />
            </div>
            
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
                <span>{current} {unit}</span>
                <span>{target} {unit} target</span>
            </div>
        </Card>
    );
};

export default GoalProgressCard;
