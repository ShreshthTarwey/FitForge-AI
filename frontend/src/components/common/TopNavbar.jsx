import { Menu, Bell, Search } from 'lucide-react';
import UserDropdown from './UserDropdown';
import GlobalSearch from './GlobalSearch';
import NotificationDropdown from '../notifications/NotificationDropdown';

const TopNavbar = ({ onOpenSidebar }) => {
    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-slate-950/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8 border-b border-slate-900/70">
            <button 
                type="button" 
                className="-m-2.5 p-2.5 text-slate-400 lg:hidden hover:text-white"
                onClick={onOpenSidebar}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1 items-center">
                    <GlobalSearch />
                </div>
                
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <NotificationDropdown />

                    <div className="hidden lg:block lg:h-5 lg:w-px lg:bg-slate-900" aria-hidden="true" />

                    <UserDropdown />
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
