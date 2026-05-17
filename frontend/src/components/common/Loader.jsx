import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

const Loader = ({ fullScreen = false, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const loaderElement = (
        <Loader2 className={clsx("animate-spin text-neon-green", sizeClasses[size])} />
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                {loaderElement}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center p-4">
            {loaderElement}
        </div>
    );
};

export default Loader;
