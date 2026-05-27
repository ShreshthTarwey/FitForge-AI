import React from 'react';
import Card from '../ui/Card';
import { Calendar, CheckCircle2, Flame, Clock } from 'lucide-react';

const WorkoutHistoryTimeline = ({ history = [] }) => {
    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-neon-blue" />
                Recent History
            </h3>

            <div className="space-y-6">
                {history.length === 0 ? (
                    <p className="text-slate-400 text-center py-4">No workout history found.</p>
                ) : (
                    history.map((session, index) => (
                        <div key={session.id} className="relative pl-6 pb-6 last:pb-0 border-l border-slate-700/50 last:border-transparent">
                            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-800 border-2 border-neon-blue flex items-center justify-center">
                                <CheckCircle2 className="w-2 h-2 text-neon-blue" />
                            </div>
                            
                            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-white">{session.name || session.workout_title || 'Workout Session'}</h4>
                                    <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                                        {session.date}
                                    </span>
                                </div>
                                
                                <div className="flex gap-4 text-xs font-medium text-slate-400">
                                    <span className="flex items-center text-orange-400">
                                        <Flame className="w-3 h-3 mr-1" />
                                        {session.calories ?? session.calories_burned ?? 0} cal
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {session.duration ?? session.duration_minutes ?? 0} min
                                    </span>
                                </div>
                                
                                {session.notes && (
                                    <p className="mt-3 text-sm text-slate-300 italic border-l-2 border-slate-600 pl-3">
                                        "{session.notes}"
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default WorkoutHistoryTimeline;
