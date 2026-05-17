import React from 'react';
import Card from '../ui/Card';
import { Clock, Flame, Dumbbell } from 'lucide-react';

const WorkoutHeader = ({ title, goal, duration, calories, difficulty }) => {
    return (
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-neon-blue/30 relative overflow-hidden">
            {/* Background glowing effect */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">{title}</h1>
                        <p className="text-lg text-slate-400 capitalize">{goal}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-900 rounded-md text-xs font-bold text-neon-blue uppercase border border-slate-700 shadow-lg">
                        {difficulty}
                    </span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm font-medium">
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <Clock className="w-4 h-4 text-neon-blue" />
                        </div>
                        <span>{duration} Minutes</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <span>{calories} Calories</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <Dumbbell className="w-4 h-4 text-neon-green" />
                        </div>
                        <span>Full Body</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default WorkoutHeader;
