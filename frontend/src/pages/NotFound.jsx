import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-neon-green px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            
            <div className="mt-8 text-center text-slate-400 max-w-md">
                <p>The page you are looking for doesn't exist or has been moved.</p>
            </div>
            
            <div className="mt-8">
                <Link to="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
