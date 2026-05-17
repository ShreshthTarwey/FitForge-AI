import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = React.forwardRef(({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    disabled, 
    type = 'button',
    ...props 
}, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-white text-slate-950 hover:bg-slate-100 focus:ring-slate-400 shadow-sm",
        secondary: "bg-slate-900 text-slate-200 hover:bg-slate-850 hover:text-white border border-slate-800 focus:ring-slate-700",
        outline: "bg-transparent text-slate-300 border border-slate-800 hover:bg-slate-900 hover:text-white focus:ring-slate-700",
        ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 focus:ring-slate-700",
        danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 focus:ring-red-500",
    };

    const sizes = {
        sm: "text-[10px] px-3 py-1.5 tracking-wider",
        md: "text-xs px-4 py-2 tracking-wider",
        lg: "text-sm px-5 py-2.5 tracking-wider",
        icon: "p-2",
    };

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
