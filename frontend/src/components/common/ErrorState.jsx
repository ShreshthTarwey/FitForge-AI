import { AlertCircle } from 'lucide-react';

const ErrorState = ({ title = "Something went wrong", message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center glass-card">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border border-red-500/30">
                <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            {message && <p className="text-slate-400 text-sm max-w-md mb-6">{message}</p>}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorState;
