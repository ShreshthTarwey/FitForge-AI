import React from 'react';
import Card from '../ui/Card';
import { AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                    <Card className="max-w-md w-full border-red-500/30 text-center p-8">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                        <p className="text-slate-400 mb-8">
                            We're sorry, but an unexpected error occurred. Please try refreshing the page.
                        </p>
                        <Button 
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white border-slate-700" 
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </Button>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
