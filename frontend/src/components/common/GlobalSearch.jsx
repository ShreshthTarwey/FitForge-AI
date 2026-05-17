import React, { useState } from 'react';
import { Search } from 'lucide-react';

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Search Trigger for top nav */}
            <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="text" 
                    placeholder="Search workouts, exercises..."
                    className="w-full sm:w-64 bg-slate-800/80 border border-slate-700/50 rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all"
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                />
            </div>

            {/* Dropdown Results */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-80 mt-2 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Recent Searches
                    </div>
                    <div className="p-2 hover:bg-slate-800/50 cursor-pointer text-sm text-slate-300 transition-colors">
                        Hypertrophy plans
                    </div>
                    <div className="p-2 hover:bg-slate-800/50 cursor-pointer text-sm text-slate-300 transition-colors">
                        Bench press
                    </div>
                    <div className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-t border-slate-700/50 mt-2 pt-2">
                        Suggestions
                    </div>
                    <div className="p-2 hover:bg-slate-800/50 cursor-pointer text-sm text-white transition-colors">
                        Browse all exercises
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
