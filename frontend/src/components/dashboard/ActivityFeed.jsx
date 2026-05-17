import Card from '../ui/Card';
import { Dumbbell, Trophy, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const getIcon = (type) => {
    switch(type) {
        case 'workout': return <Dumbbell className="w-3.5 h-3.5 text-neon-blue" />;
        case 'achievement': return <Trophy className="w-3.5 h-3.5 text-amber-500" />;
        case 'goal': return <Target className="w-3.5 h-3.5 text-purple-500" />;
        case 'streak': return <Flame className="w-3.5 h-3.5 text-orange-500" />;
        default: return <Dumbbell className="w-3.5 h-3.5 text-neon-blue" />;
    }
};

const ActivityFeed = ({ activities = [] }) => {
    return (
        <Card className="p-6 border-slate-900 bg-slate-900/10 backdrop-blur-xl relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">TELEMETRY</span>
                    <h3 className="text-md font-bold text-white tracking-tight">Recent Activity</h3>
                </div>
            </div>
            
            {activities.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                    No recent activity to show.
                </div>
            ) : (
                <div className="space-y-5">
                    {activities.map((activity, index) => (
                        <motion.div 
                            key={activity.id || index}
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex gap-3 relative"
                        >
                            {/* Connector line for feed */}
                            {index !== activities.length - 1 && (
                                <div className="absolute left-4 top-8 bottom-[-20px] w-[1px] bg-slate-900/60" />
                            )}
                            
                            <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-900/80 flex items-center justify-center shrink-0 z-10">
                                {getIcon(activity.type)}
                            </div>
                            
                            <div className="flex-1 pb-1">
                                <div className="flex justify-between items-start gap-2">
                                    <p className="text-xs font-bold text-slate-200">
                                        {activity.title}
                                    </p>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider shrink-0 bg-slate-900 px-2 py-0.5 rounded border border-slate-800/50">
                                        {activity.time}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    {activity.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default ActivityFeed;
