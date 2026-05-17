import { Inbox } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ 
    title = "No data found", 
    description, 
    icon: Icon = Inbox, 
    actionLabel, 
    onAction 
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-slate-400 text-sm max-w-sm mb-6">{description}</p>
            )}
            {actionLabel && onAction && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
