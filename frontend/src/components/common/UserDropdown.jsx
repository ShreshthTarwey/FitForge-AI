import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-x-2 outline-none group cursor-pointer"
            >
                <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 font-black text-xs transition-colors group-hover:border-slate-700/80">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden lg:flex lg:items-center">
                    <span className="text-xs font-bold leading-6 text-slate-300 group-hover:text-white transition-colors" aria-hidden="true">
                        {user?.name || 'User'}
                    </span>
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsOpen(false)} 
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute right-0 z-50 mt-2.5 w-48 rounded-xl bg-slate-950 border border-slate-900 shadow-2xl shadow-black/80 overflow-hidden"
                        >
                            <div className="px-4 py-3 border-b border-slate-900/60 bg-slate-950/40">
                                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                                <p className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">{user?.email}</p>
                            </div>
                            <div className="py-1">
                                <button
                                    onClick={() => { setIsOpen(false); navigate('/profile'); }}
                                    className="flex w-full items-center px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                                >
                                    <User className="mr-3 h-3.5 w-3.5 opacity-60" />
                                    Profile
                                </button>
                                <button
                                    onClick={() => { setIsOpen(false); navigate('/settings'); }}
                                    className="flex w-full items-center px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                                >
                                    <Settings className="mr-3 h-3.5 w-3.5 opacity-60" />
                                    Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-slate-900/40"
                                >
                                    <LogOut className="mr-3 h-3.5 w-3.5 opacity-80" />
                                    Sign out
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDropdown;
