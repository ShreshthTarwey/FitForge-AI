import { Search, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ExerciseSearchBar = ({ onSearch, placeholder = "Search exercises..." }) => {
    const [query, setQuery] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                className="block w-full rounded-xl border-0 bg-slate-800/80 py-3 pl-10 pr-10 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6 transition-all backdrop-blur-sm"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default ExerciseSearchBar;
