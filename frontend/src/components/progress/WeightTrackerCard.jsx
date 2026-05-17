import React, { useState } from 'react';
import Card from '../ui/Card';
import { Scale, ArrowDown, ArrowUp, Plus } from 'lucide-react';
import Button from '../ui/Button';

const WeightTrackerCard = ({ currentWeight, targetWeight, history, onAddWeight }) => {
    const [weightInput, setWeightInput] = useState('');

    const latest = history[history.length - 1]?.weight || currentWeight;
    const previous = history[history.length - 2]?.weight || currentWeight;
    const diff = latest - previous;
    const isLoss = diff < 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!weightInput || isNaN(weightInput)) return;
        onAddWeight(weightInput);
        setWeightInput('');
    };

    return (
        <Card className="relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Weight Tracker</h3>
                    <p className="text-sm text-slate-400">Add entries to track metrics</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-blue-400" />
                </div>
            </div>

            <div className="flex items-end justify-between gap-4 mb-6">
                <div className="flex items-end gap-2">
                    <div className="flex items-baseline">
                        <span className="text-4xl font-extrabold text-white">{currentWeight}</span>
                        <span className="text-sm font-medium text-slate-400 ml-1">kg</span>
                    </div>

                    {diff !== 0 && !isNaN(diff) && (
                        <div className={`flex items-center text-sm font-semibold mb-1 ${isLoss ? 'text-neon-green' : 'text-red-400'}`}>
                            {isLoss ? <ArrowDown className="w-4 h-4 mr-1" /> : <ArrowUp className="w-4 h-4 mr-1" />}
                            {Math.abs(diff).toFixed(1)} kg
                        </div>
                    )}
                </div>

                <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Target Goal</span>
                    <span className="text-sm font-bold text-white">{targetWeight} kg</span>
                </div>
            </div>

            {/* Quick entry form */}
            <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-slate-800/80">
                <input 
                    type="number" 
                    step="0.1"
                    placeholder="Log weight (e.g. 79.5)"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="block w-full rounded-lg border-0 bg-slate-950 py-2 px-3 text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-green text-sm"
                />
                <Button size="sm" type="submit">
                    <Plus className="w-4 h-4" />
                </Button>
            </form>
        </Card>
    );
};

export default WeightTrackerCard;
