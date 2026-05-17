import { motion } from 'framer-motion';

const PageContainer = ({ children, title, subtitle }) => {
    return (
        <motion.main 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 py-8 px-4 sm:px-6 lg:px-8"
        >
            {(title || subtitle) && (
                <div className="mb-8">
                    {title && <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">{title}</h2>}
                    {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
                </div>
            )}
            {children}
        </motion.main>
    );
};

export default PageContainer;
