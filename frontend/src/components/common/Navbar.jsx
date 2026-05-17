import { LogOut, Menu, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 glass px-4 sm:gap-x-6 sm:px-6 lg:px-8 border-b-0 border-slate-700/50">
            <button type="button" className="-m-2.5 p-2.5 text-slate-400 lg:hidden hover:text-white">
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-white">
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-700" aria-hidden="true" />

                    <div className="flex items-center gap-x-4">
                        <div className="h-8 w-8 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green/50">
                            <span className="text-neon-green font-bold text-sm">{user?.name?.charAt(0) || 'U'}</span>
                        </div>
                        <span className="hidden lg:flex lg:items-center">
                            <span className="text-sm font-semibold leading-6 text-white" aria-hidden="true">
                                {user?.name || 'User'}
                            </span>
                        </span>
                        
                        <button 
                            onClick={() => logout()}
                            className="ml-2 p-2 text-slate-400 hover:text-red-400 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
