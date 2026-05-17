import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WorkoutCategoryCard = ({ title, description, imageGradient, delay = 0, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            onClick={onClick}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${imageGradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-300" />
            
            <div className="relative p-6 h-48 flex flex-col justify-end border border-slate-700/50 rounded-2xl group-hover:border-slate-500/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-300 mb-4 line-clamp-2">{description}</p>
                
                <div className="flex items-center text-sm font-semibold text-white gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
};

export default WorkoutCategoryCard;
