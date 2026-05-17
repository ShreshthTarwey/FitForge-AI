import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { Play } from 'lucide-react';

const ExerciseTimeline = ({ exercises = [] }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Exercise Sequence</h3>
            
            <div className="relative border-l-2 border-slate-700/50 ml-4 space-y-8">
                {exercises.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-neon-green border-4 border-slate-900 shadow-[0_0_10px_rgba(57,255,20,0.5)]" />
                        
                        <Card className="hover:border-neon-green/30 transition-colors group cursor-pointer p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-neon-green transition-colors">{item.exercise.name}</h4>
                                    <p className="text-sm text-slate-400">
                                        Target: {item.exercise.target_muscles?.join(', ')}
                                    </p>
                                </div>
                                
                                <div className="flex flex-wrap gap-3 sm:gap-6">
                                    <div className="text-center bg-slate-800 rounded-lg px-4 py-2 border border-slate-700/50">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Sets</p>
                                        <p className="text-lg font-bold text-white">{item.sets}</p>
                                    </div>
                                    <div className="text-center bg-slate-800 rounded-lg px-4 py-2 border border-slate-700/50">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Reps</p>
                                        <p className="text-lg font-bold text-white">{item.reps}</p>
                                    </div>
                                    <div className="text-center bg-slate-800 rounded-lg px-4 py-2 border border-slate-700/50">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Rest</p>
                                        <p className="text-lg font-bold text-neon-blue">{item.rest_seconds}s</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseTimeline;
