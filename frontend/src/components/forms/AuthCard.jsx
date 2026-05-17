import Card from '../ui/Card';

const AuthCard = ({ children, title, subtitle }) => {
    return (
        <Card className="w-full max-w-md mx-auto relative overflow-hidden group">
            {/* Ambient hover effect inner */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" pointerEvents="none" />
            
            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
                </div>
                {children}
            </div>
        </Card>
    );
};

export default AuthCard;
