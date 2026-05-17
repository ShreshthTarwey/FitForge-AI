import Card from '../ui/Card';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, trend, colorVariant = 'green', delay = 0 }) => {
    const colorClasses = {
        green: { bg: 'bg-neon-green/5 border-neon-green/10', text: 'text-neon-green' },
        blue: { bg: 'bg-neon-blue/5 border-neon-blue/10', text: 'text-neon-blue' },
        orange: { bg: 'bg-orange-500/5 border-orange-500/10', text: 'text-orange-500' },
        purple: { bg: 'bg-purple-500/5 border-purple-500/10', text: 'text-purple-500' },
    };

    const variant = colorClasses[colorVariant] || colorClasses.green;

    return (
        <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay }}
        >
            <Card className="flex items-center gap-3.5 relative overflow-hidden group border-slate-900 bg-slate-900/10 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 relative z-10 bg-slate-950", variant.bg)}>
                    <Icon className={clsx("w-4 h-4", variant.text)} />
                </div>
                
                <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 truncate">{title}</p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                        <p className="text-xl font-black text-slate-100 tracking-tight">{value}</p>
                        {trend && (
                            <span className={clsx(
                                "text-[10px] font-extrabold uppercase tracking-wide",
                                trend > 0 ? "text-neon-green" : trend < 0 ? "text-red-500" : "text-slate-500"
                            )}>
                                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default StatsCard;
