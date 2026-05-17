import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neon-green/20 rounded-full blur-3xl" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center">
                <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-6 text-center text-4xl font-extrabold text-white tracking-tight"
                >
                    FitForge <span className="text-gradient">AI</span>
                </motion.h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Your intelligent fitness companion
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="glass-card py-8 px-4 sm:px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
