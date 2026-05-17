import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef(({ 
    label, 
    error, 
    className,
    containerClassName,
    icon: Icon,
    ...props 
}, ref) => {
    return (
        <div className={twMerge("w-full", containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "block w-full rounded-lg border-0 bg-slate-800/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-slate-700/50 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6 transition-all duration-200 placeholder:text-slate-500",
                            Icon && "pl-10",
                            error && "ring-red-500/50 focus:ring-red-500",
                            props.disabled && "opacity-50 cursor-not-allowed bg-slate-800"
                        ),
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
