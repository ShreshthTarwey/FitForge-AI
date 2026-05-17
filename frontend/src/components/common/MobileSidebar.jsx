import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useAuthStore } from '../../store/authStore';
import { LogOut } from 'lucide-react';

const MobileSidebar = ({ isOpen, setIsOpen, navItems }) => {
    const { logout } = useAuthStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden"
                    />

                    {/* Sidebar off-canvas menu */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 border-r border-slate-700/50 shadow-2xl lg:hidden"
                    >
                        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-700/50">
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                FitForge <span className="text-gradient">AI</span>
                            </h1>
                            <button
                                type="button"
                                className="p-2 text-slate-400 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        
                        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                            {navItems.map((item) => (
                                <SidebarItem 
                                    key={item.name} 
                                    {...item} 
                                    onClick={() => setIsOpen(false)}
                                />
                            ))}
                        </nav>

                        <div className="p-4 border-t border-slate-700/50">
                            <button 
                                onClick={logout}
                                className="flex items-center gap-x-3 w-full rounded-xl p-3 text-sm font-semibold leading-6 text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileSidebar;
