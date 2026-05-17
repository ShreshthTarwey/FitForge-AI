import React from 'react';
import { Bell } from 'lucide-react';

const NotificationDropdown = () => {
    return (
        <div className="relative group">
            <button className="relative p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right z-50">
                <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <button className="text-xs text-neon-blue hover:underline">Mark all read</button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                    {/* Mock Notification Item */}
                    <div className="p-4 border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors cursor-pointer">
                        <p className="text-sm font-medium text-white mb-1">Workout Reminder</p>
                        <p className="text-xs text-slate-400">It's time for your Titan Hypertrophy session!</p>
                        <p className="text-[10px] text-slate-500 mt-2">10 mins ago</p>
                    </div>
                    <div className="p-4 border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors cursor-pointer">
                        <p className="text-sm font-medium text-white mb-1 flex items-center">
                            Goal Achieved <span className="ml-2 w-2 h-2 rounded-full bg-neon-green" />
                        </p>
                        <p className="text-xs text-slate-400">You hit your weekly workout target!</p>
                        <p className="text-[10px] text-slate-500 mt-2">2 hours ago</p>
                    </div>
                </div>
                
                <div className="p-3 text-center border-t border-slate-700/50">
                    <button className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationDropdown;
