import { Activity, Dumbbell, LayoutDashboard, Settings, List, Target, Apple } from 'lucide-react';
import SidebarItem from './SidebarItem';

export const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Workout Plans', icon: Target, path: '/workouts' },
    { name: 'Exercise Library', icon: Dumbbell, path: '/exercises' },
    { name: 'Progress Tracking', icon: Activity, path: '/progress' },
    { name: 'Workout Logs', icon: List, path: '/logs' },
    { name: 'Nutrition Tracker', icon: Apple, path: '/nutrition' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
    return (
        <div className="hidden lg:flex w-64 flex-col bg-slate-950/90 border-r border-slate-900/80">
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-900/60">
                <h1 className="text-lg font-black tracking-wider text-white uppercase">
                    FitForge <span className="text-gradient">AI</span>
                </h1>
            </div>
            
            <nav className="flex flex-1 flex-col px-3 pt-6 pb-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <SidebarItem key={item.name} {...item} />
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
