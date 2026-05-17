import { motion } from 'framer-motion';
import Card from '../ui/Card';
import MuscleGroupBadge from './MuscleGroupBadge';
import { PlayCircle } from 'lucide-react';

const ExerciseCard = ({ exercise, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onClick(exercise)}
            className="cursor-pointer h-full"
        >
            <Card className="h-full flex flex-col overflow-hidden p-0 group">
                {/* Image Placeholder */}
                <div className="relative h-40 bg-slate-800 flex items-center justify-center overflow-hidden">
                    {exercise.thumbnail ? (
                        <img 
                            src={exercise.thumbnail} 
                            alt={exercise.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-slate-500">
                            <PlayCircle className="w-12 h-12 mb-2 opacity-50 group-hover:opacity-100 group-hover:text-neon-blue transition-all duration-300" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Preview Available</span>
                        </div>
                    )}
                    
                    {/* Difficulty Badge absolute positioned */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-slate-900/80 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase border border-slate-700">
                        {exercise.difficulty || 'Beginner'}
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{exercise.name}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {exercise.target_muscles?.map(muscle => (
                            <MuscleGroupBadge key={muscle} muscle={muscle} />
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm text-slate-400">
                        <span>{exercise.equipment || 'Bodyweight'}</span>
                        <span className="text-neon-green group-hover:underline">View Details</span>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default ExerciseCard;
