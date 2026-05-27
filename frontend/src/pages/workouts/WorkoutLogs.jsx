import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useProgressStore } from '../../store/useProgressStore';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Flame, ShieldAlert, Sparkles, Smile, Trash2, Edit3, Save, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const WorkoutLogs = () => {
    const { workoutHistory, deleteWorkoutLog, updateWorkoutLog, addWorkoutLog, fetchProgressData } = useProgressStore();
    const { addXp } = useAuthStore();
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        fetchProgressData();
    }, [fetchProgressData]);
    
    // Fallback history array
    const activeHistory = workoutHistory || [];
    
    // Logging Modal state
    const [isLogFormOpen, setIsLogFormOpen] = useState(false);
    const [newLogName, setNewLogName] = useState('');
    const [newLogDuration, setNewLogDuration] = useState('');
    const [newLogCalories, setNewLogCalories] = useState('');
    const [newLogFatigue, setNewLogFatigue] = useState('medium');
    const [newLogNotes, setNewLogNotes] = useState('');

    // Editing Notes state
    const [editingLogId, setEditingLogId] = useState(null);
    const [editingNotes, setEditingNotes] = useState('');

    // Stats
    const totalDuration = activeHistory.reduce((sum, item) => sum + Number(item.duration || item.duration_completed || 0), 0);
    const totalCalories = activeHistory.reduce((sum, item) => sum + Number(item.calories || item.calories_burned || 0), 0);
    
    const calculateRecoveryRating = (history) => {
        if (!history || history.length === 0) return 'No Data';
        
        let totalScore = 0;
        let count = 0;
        
        history.forEach(log => {
            const fatigue = (log.fatigue || log.user_feedback || 'medium').toLowerCase();
            if (fatigue === 'low' || fatigue === 'very_easy' || fatigue === 'easy') {
                totalScore += 3;
                count++;
            } else if (fatigue === 'medium' || fatigue === 'moderate') {
                totalScore += 2;
                count++;
            } else if (fatigue === 'high' || fatigue === 'hard' || fatigue === 'very_hard') {
                totalScore += 1;
                count++;
            }
        });
        
        if (count === 0) return 'Optimal Recovery';
        
        const avgScore = totalScore / count;
        if (avgScore >= 2.5) return 'Excellent Recovery';
        if (avgScore >= 1.6) return 'Optimal Recovery';
        return 'High Strain Alert';
    };

    const avgFatigue = calculateRecoveryRating(activeHistory);

    const handleDeleteClick = (id) => {
        setSelectedLogId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteWorkoutLog(selectedLogId);
        toast.success('Workout log permanently removed.');
    };

    const handleEditNotesClick = (log) => {
        setEditingLogId(log.id);
        setEditingNotes(log.notes);
    };

    const handleSaveNotes = (id) => {
        updateWorkoutLog(id, { notes: editingNotes });
        setEditingLogId(null);
        toast.success('Workout notes updated!');
    };

    const handleCustomLogSubmit = (e) => {
        e.preventDefault();
        if (!newLogName || !newLogDuration || !newLogCalories) {
            toast.error('All essential metrics are required!');
            return;
        }

        const newLog = {
            name: newLogName,
            duration: Number(newLogDuration),
            calories: Number(newLogCalories),
            fatigue: newLogFatigue,
            notes: newLogNotes
        };

        addWorkoutLog(newLog);
        addXp(150); // Reward 150 XP for completing/logging a session
        toast.success('Session committed! +150 XP');

        // Reset
        setNewLogName('');
        setNewLogDuration('');
        setNewLogCalories('');
        setNewLogFatigue('medium');
        setNewLogNotes('');
        setIsLogFormOpen(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <PageHeader 
                title="Workout Logs & Splits" 
                subtitle="Analyze and update your progressive training logs, muscular fatigue ratings, and notes."
                action={
                    <Button onClick={() => setIsLogFormOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Log Custom Split
                    </Button>
                }
            />

            {/* Quick Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-5 border-slate-800 bg-slate-900/30 flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-300" />
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Clock className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-white">{totalDuration} <span className="text-sm font-semibold text-slate-500">mins</span></span>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5">Total Training Time</p>
                    </div>
                </Card>

                <Card className="p-5 border-slate-800 bg-slate-900/30 flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-neon-green/5 rounded-full blur-xl pointer-events-none group-hover:bg-neon-green/10 transition-all duration-300" />
                    <div className="w-11 h-11 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
                        <Flame className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-white">{totalCalories.toLocaleString()} <span className="text-sm font-semibold text-slate-500">kcal</span></span>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5">Calories Burned</p>
                    </div>
                </Card>

                <Card className="p-5 border-slate-800 bg-slate-900/30 flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-orange-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/10 transition-all duration-300" />
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                        <Smile className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-white">{avgFatigue}</span>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5">Recovery Rating</p>
                    </div>
                </Card>
            </div>

            {/* Custom Logging Modal Dialog */}
            <AnimatePresence>
                {isLogFormOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsLogFormOpen(false)}
                            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl relative"
                            >
                                <h3 className="text-xl font-black text-white uppercase tracking-wide mb-6">Log Custom Training Session</h3>
                                <form onSubmit={handleCustomLogSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Workout Name / Focus</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Pull Day Hypertrophy"
                                            value={newLogName}
                                            onChange={(e) => setNewLogName(e.target.value)}
                                            className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Duration (minutes)</label>
                                            <input 
                                                type="number" 
                                                placeholder="60"
                                                value={newLogDuration}
                                                onChange={(e) => setNewLogDuration(e.target.value)}
                                                className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Calories Burned (kcal)</label>
                                            <input 
                                                type="number" 
                                                placeholder="450"
                                                value={newLogCalories}
                                                onChange={(e) => setNewLogCalories(e.target.value)}
                                                className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fatigue & Intensity Level</label>
                                        <select
                                            value={newLogFatigue}
                                            onChange={(e) => setNewLogFatigue(e.target.value)}
                                            className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                                        >
                                            <option value="low">Low (Extremely Rested)</option>
                                            <option value="medium">Medium (Standard Muscle Soreness)</option>
                                            <option value="high">High (Maximum Exhaustion)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Session Notes / Overloads</label>
                                        <textarea 
                                            rows="3"
                                            placeholder="Write comments about set progression, strength records, etc..."
                                            value={newLogNotes}
                                            onChange={(e) => setNewLogNotes(e.target.value)}
                                            className="block w-full rounded-lg border-0 bg-slate-950 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm resize-none"
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end gap-3">
                                        <Button variant="outline" size="sm" type="button" onClick={() => setIsLogFormOpen(false)}>Cancel</Button>
                                        <Button size="sm" type="submit">Commit Log</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* List of workout logs */}
            <Card className="p-6 border-slate-800/80 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-6">Chronological History Split</h3>

                {activeHistory.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">
                        <Calendar className="w-12 h-12 mx-auto opacity-20 mb-3" />
                        No training history found. Complete a plan split to hydration!
                    </div>
                ) : (
                    <div className="space-y-6">
                        {activeHistory.map((log) => {
                            const isEditing = editingLogId === log.id;
                            const fatigueVal = (log.fatigue || log.user_feedback || 'medium').toLowerCase();
                            const fatigueColors = {
                                low: 'text-neon-green bg-neon-green/5 border-neon-green/20',
                                medium: 'text-neon-blue bg-neon-blue/5 border-neon-blue/20',
                                high: 'text-red-500 bg-red-500/5 border-red-500/20'
                            };
                            return (
                                <div key={log.id} className="relative overflow-hidden border border-slate-800 bg-slate-950/40 rounded-xl p-5 hover:border-slate-700/50 transition-all">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-neon-green shrink-0">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-white leading-tight">{log.name}</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">{log.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 self-start sm:self-auto">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${fatigueColors[fatigueVal] || fatigueColors.medium}`}>
                                                {fatigueVal} fatigue
                                            </span>
                                            <button 
                                                onClick={() => handleDeleteClick(log.id)}
                                                className="p-1 text-slate-500 hover:text-red-500 hover:scale-105 active:scale-95 transition-all focus:outline-none"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6 border-b border-slate-900 pb-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm font-semibold text-slate-300">{log.duration || log.duration_completed} mins</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Flame className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm font-semibold text-slate-300">{log.calories || log.calories_burned} kcal</span>
                                        </div>
                                    </div>

                                    {/* Inline Notes Editor */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Session Overloads & Notes</span>
                                            {!isEditing && (
                                                <button 
                                                    onClick={() => handleEditNotesClick(log)}
                                                    className="text-xs font-bold text-neon-green flex items-center gap-1 hover:underline focus:outline-none"
                                                >
                                                    <Edit3 className="w-3 h-3" /> Edit Notes
                                                </button>
                                            )}
                                        </div>
                                        
                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <textarea 
                                                    rows="2"
                                                    value={editingNotes}
                                                    onChange={(e) => setEditingNotes(e.target.value)}
                                                    className="block w-full rounded-lg border-0 bg-slate-950 py-2 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm resize-none"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setEditingLogId(null)}
                                                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleSaveNotes(log.id)}
                                                        className="px-3 py-1.5 rounded-lg bg-neon-green text-slate-950 text-xs font-bold hover:bg-neon-green/90 transition-all cursor-pointer animate-pulse"
                                                    >
                                                        Save Notes
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-slate-400 italic bg-slate-900/50 p-3 rounded-lg border border-slate-900/80 leading-relaxed">
                                                {log.notes || 'No notes added to this session.'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>

            <ConfirmDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Remove Workout Log"
                message="Are you absolutely sure you want to permanently delete this logged workout split? This will update your daily calories stats."
            />
        </div>
    );
};

export default WorkoutLogs;
