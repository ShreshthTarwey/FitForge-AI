import Card from '../ui/Card';
import { Clock, Flame, Dumbbell } from 'lucide-react';
import Button from '../ui/Button';

const WorkoutCard = ({ plan, onView }) => {
    return (
        <Card className="flex flex-col h-full hover:border-neon-blue/30 hover:shadow-neon-blue/10 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{plan.title || 'Workout Plan'}</h3>
                    <p className="text-sm text-slate-400 capitalize">{plan.goal || 'General Fitness'}</p>
                </div>
                <div className="px-2 py-1 bg-slate-800 rounded text-xs font-semibold text-neon-blue uppercase border border-slate-700">
                    {plan.difficulty_level || 'Beginner'}
                </div>
            </div>

            <p className="text-sm text-slate-300 mb-6 line-clamp-2 flex-1">
                {plan.description || 'A comprehensive workout plan generated to help you achieve your fitness goals.'}
            </p>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-6">
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>{plan.duration_weeks || 4} Weeks</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-4 h-4 text-slate-500" />
                    <span>{plan.days_per_week || 3} Days/wk</span>
                </div>
                {plan.estimated_calories && (
                    <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span>{plan.estimated_calories} cal</span>
                    </div>
                )}
            </div>

            <Button variant="outline" className="w-full hover:bg-neon-blue/10 border-neon-blue text-neon-blue focus:ring-neon-blue" onClick={() => onView(plan)}>
                View Details
            </Button>
        </Card>
    );
};

export default WorkoutCard;
