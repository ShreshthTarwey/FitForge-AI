import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl glass-panel p-10 rounded-3xl box-glow"
            >
                <h1 className="text-5xl font-bold mb-6 text-glow">Train Smarter with AI</h1>
                <p className="text-xl text-color-text-secondary mb-10">Personalized workout generation, intelligent insights, and gamification systems for your fitness journey.</p>
                <div className="flex gap-4 justify-center">
                    <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        Get Started
                    </Link>
                    <Link to="/login" className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/30 px-8 py-3 rounded-full font-semibold transition-all">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
