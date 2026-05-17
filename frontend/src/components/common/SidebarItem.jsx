import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useDemoStore } from '../../store/useDemoStore';

const SidebarItem = ({ name, path, icon: Icon, onClick }) => {
    const { accentColor } = useDemoStore();

    const activeStyles = {
        emerald: 'border-l-2 border-neon-green bg-slate-900/60 text-white font-medium shadow-[inset_1px_0_0_rgba(16,185,129,0.05)]',
        cyan: 'border-l-2 border-neon-blue bg-slate-900/60 text-white font-medium shadow-[inset_1px_0_0_rgba(14,165,233,0.05)]',
        purple: 'border-l-2 border-purple-500 bg-slate-900/60 text-white font-medium shadow-[inset_1px_0_0_rgba(168,85,247,0.05)]'
    };

    const activeStyle = activeStyles[accentColor] || activeStyles.emerald;

    return (
        <NavLink
            to={path}
            onClick={onClick}
            className={({ isActive }) => clsx(
                'flex items-center gap-x-3 rounded-r-lg pl-3 pr-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 border-l-2 border-transparent',
                isActive 
                    ? activeStyle 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 hover:border-l-slate-800'
            )}
        >
            <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
            {name}
        </NavLink>
    );
};

export default SidebarItem;
