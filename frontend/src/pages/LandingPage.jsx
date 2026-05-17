import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Dumbbell, Shield, ArrowRight, Zap, Target, Apple, Check, Star, Menu, X, Code } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    const stats = [
        { label: 'Active Athletes', value: '14,200+' },
        { label: 'AI Splits Generated', value: '250K+' },
        { label: 'Training Accuracy', value: '99.4%' },
        { label: 'Average Muscle Gain', value: '18%' }
    ];

    const features = [
        { icon: Brain, title: 'AI Genetic Engine', desc: 'Synthesize optimal daily overloads and split frequencies computed for your neural threshold.' },
        { icon: Dumbbell, title: 'Live Workout Telemetry', desc: 'Perform structured active workouts with responsive circular clocks, timer cues, and rest logs.' },
        { icon: Target, title: 'Progress Heatmaps', desc: 'Track consistency via GitHub-style training calendars, BMI status charts, and weight dials.' },
        { icon: Apple, title: 'Active Macro Logger', desc: 'Register nutrient quotas using pre-set dietary presets, hydration cups, and sleep indicators.' }
    ];

    const pricing = [
        { name: 'Apprentice', price: '$0', features: ['Standard AI Plans', 'Basic Exercise Library', 'Standard Workout Logs', 'Basic Metrics Tracker'], cta: 'Start Free', isPopular: false },
        { name: 'Elite Master', price: '$19', features: ['Unlimited AI Generation', 'Immersive Live Mode', 'Full Hydration & Nutrition', 'Personalized AI Coach Chat', 'Consistency Heatmaps', 'Badge Achievements'], cta: 'Upgrade to Elite', isPopular: true },
        { name: 'Gym Syndicate', price: '$49', features: ['Everything in Elite Master', 'Syndicate Group Sharing', 'Custom Diet Protocols', '24/7 Priority Biometrics Assistance', 'Custom Muscle Radial Focus'], cta: 'Contact Sales', isPopular: false }
    ];

    const faqs = [
        { q: 'How does the FitForge AI engine formulate workout splits?', a: 'Our engine applies advanced training principles (progressive overload, metabolic recovery windowing, and target volumes) mapping directly to your experience, duration, and equipment.' },
        { q: 'Is there a companion app required for the Live Workout Mode?', a: 'No, Live Mode runs directly in your web browser with a full-screen optimized mobile layout, custom active clocks, and countdown cue sounds!' },
        { q: 'Can I synchronize custom food presets with the Nutrition Tracker?', a: 'Yes! The Meal log form comes with a deep index of common fitness foods (Chicken breast, Oats, Whey, Brown Rice) and supports custom caloric additions.' }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden selection:bg-neon-green selection:text-slate-900">
            {/* Header Navbar */}
            <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900 px-6 sm:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
                        <Brain className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-xl font-black uppercase tracking-wider">FitForge <span className="text-neon-green">AI</span></span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#faqs" className="hover:text-white transition-colors">FAQ</a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Login</button>
                    <Button onClick={() => navigate('/login')} className="shadow-[0_0_15px_rgba(57,255,20,0.3)]">Launch App</Button>
                </div>

                {/* Mobile Burger */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-[73px] z-40 bg-slate-950/95 border-b border-slate-900 p-6 flex flex-col gap-6 md:hidden backdrop-blur-xl"
                    >
                        <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-slate-300">Features</a>
                        <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-slate-300">Pricing</a>
                        <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-slate-300">FAQ</a>
                        <div className="h-px bg-slate-900 w-full" />
                        <div className="flex flex-col gap-3">
                            <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                            <Button onClick={() => navigate('/login')}>Launch App</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Visual glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/20 bg-neon-green/5 text-xs font-bold text-neon-green tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5" /> Synthesized Athletic Intelligence
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white">
                        FORGE YOUR PHYSICAL <br />
                        <span className="text-gradient">ULTIMATE THRESHOLD</span>
                    </h1>

                    <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        An elite AI fitness SaaS platform engineered for absolute consistency. Synthesize optimized splits, log real-time active sets, and track biometric targets with neural insights.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button 
                            size="lg" 
                            onClick={() => navigate('/login')}
                            className="px-8 shadow-[0_0_25px_rgba(57,255,20,0.4)] border border-neon-green/30"
                        >
                            Forge Your Plan <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            onClick={() => navigate('/login')}
                            className="px-8"
                        >
                            Explore Live Demo
                        </Button>
                    </div>
                </motion.div>

                {/* Glassmorphic Mockup Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full max-w-5xl mt-16 rounded-2xl border border-slate-800 bg-slate-900/30 p-2 sm:p-4 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
                >
                    {/* Glowing neon borders */}
                    <div className="absolute inset-0 rounded-2xl border border-neon-green/10 pointer-events-none group-hover:border-neon-green/20 transition-colors" />
                    
                    <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-900 p-4 flex flex-col gap-4 text-left relative overflow-hidden">
                        {/* Simulation of App Dashboard */}
                        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs font-bold text-slate-500 tracking-wider">FITFORGE-AI // MASTER CORE</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 flex-1">
                            {/* Mock widgets */}
                            <div className="col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest block mb-1">Live Analytics Telemetry</span>
                                    <span className="text-2xl font-black">12,450 kcal</span>
                                    <p className="text-xs text-slate-400 mt-1">Caloric output increased 20% compared to baseline split.</p>
                                </div>
                                <div className="h-24 w-full bg-slate-950 rounded-lg flex items-end justify-between p-3 border border-slate-900">
                                    {[30, 45, 10, 50, 35, 60, 20].map((h, i) => (
                                        <div key={i} className="w-6 bg-neon-green rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue shrink-0">
                                        <Target className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold block leading-none">Hypertrophy Split</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Active Plan</span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-slate-950 rounded-lg border border-slate-900 p-3 flex flex-col justify-between">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">XP Rank Level 4</span>
                                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-neon-blue rounded-full w-3/4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300">2,450 / 5,000 XP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Statistics Counters */}
            <section className="bg-slate-950 border-y border-slate-900 py-16 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-1">
                            <span className="text-3xl sm:text-5xl font-black text-white">{stat.value}</span>
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Spotlight */}
            <section id="features" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">ENGINEERED FOR ABSOLUTE HYPERTROPHY</h2>
                    <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
                        FitForge AI provides high-end biometric utilities to secure progressive overloads.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 hover:border-slate-800 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-[0_0_20px_rgba(57,255,20,0.05)]"
                            >
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green group-hover:scale-105 transition-transform">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-extrabold text-white text-lg">{feat.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                                </div>
                                <div className="h-1 w-0 bg-neon-green group-hover:w-full transition-all duration-300 mt-6 rounded-full" />
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Simulated Live Workout Telemetry Spotlight */}
            <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-xs font-bold text-neon-blue tracking-wide uppercase">
                        <Zap className="w-3.5 h-3.5" /> Interactive Live Training
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">IMMERSIVE FULLSCREEN MODE</h2>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                        Never look at boring checklists. Load our full-screen Live Workout dashboard to execute training sets with real-time countdown progress dials, dynamic rest triggers, and explosive celebrations on split completion.
                    </p>
                    <div className="space-y-3 font-semibold text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                            <Check className="w-4 h-4 text-neon-green" /> Fluid Exercise Switching Telemetry
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <Check className="w-4 h-4 text-neon-green" /> Multi-Step Recovery Rest Timers
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <Check className="w-4 h-4 text-neon-green" /> Muscular Fatigue Logging Metrics
                        </div>
                    </div>
                </div>

                <div className="relative rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col items-center justify-center min-h-[350px]">
                    <div className="absolute inset-0 rounded-2xl border border-neon-blue/15 pointer-events-none" />
                    
                    {/* Simulated circular progress ring */}
                    <div className="relative w-44 h-44 rounded-full border-4 border-slate-800 flex items-center justify-center mb-6 shadow-2xl">
                        <div className="absolute inset-0 rounded-full border-4 border-t-neon-blue border-r-neon-blue border-transparent animate-spin duration-3000" />
                        <div className="text-center">
                            <span className="text-3xl font-black text-white">00:45</span>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">REST ACTIVE</p>
                        </div>
                    </div>
                    
                    <span className="text-sm font-bold text-white uppercase tracking-wide">Next: Incline Bench Press</span>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">PRICING TIERS</h2>
                    <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
                        Unlock infinite scaling limits matching your fitness lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricing.map((plan, idx) => (
                        <div 
                            key={idx} 
                            className={`p-6 sm:p-8 flex flex-col justify-between rounded-xl border border-slate-900 relative ${
                                plan.isPopular ? 'border-neon-green/30 shadow-[0_0_20px_rgba(57,255,20,0.08)] bg-slate-900/40' : 'bg-slate-900/10'
                            }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3.5 right-6 bg-neon-green text-slate-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.4)]">
                                    Highly Recommended
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                                        <span className="text-sm text-slate-500 font-semibold ml-2">/ month</span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-800" />

                                <div className="space-y-3 font-medium text-xs sm:text-sm text-slate-300">
                                    {plan.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-neon-green shrink-0" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button 
                                size="lg" 
                                variant={plan.isPopular ? 'default' : 'outline'}
                                onClick={() => navigate('/login')}
                                className="w-full mt-8"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs disclosure accordion */}
            <section id="faqs" className="py-24 px-6 sm:px-12 max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">FREQUENTLY ASKED INSIGHTS</h2>
                    <p className="text-sm sm:text-base text-slate-400">
                        Get instant details about FitForge AI algorithms.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                            <div key={idx} className="border border-slate-900 bg-slate-900/10 rounded-xl overflow-hidden">
                                <button 
                                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                                    className="w-full text-left p-5 font-bold text-white flex justify-between items-center hover:bg-slate-900/30 transition-colors focus:outline-none"
                                >
                                    <span>{faq.q}</span>
                                    <span className="text-neon-green shrink-0 ml-4">{isOpen ? <X className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}</span>
                                </button>
                                
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-900/50 pt-4"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Final CTA Showcase */}
            <section className="py-20 px-6 text-center max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-md mb-24">
                <div className="absolute inset-0 bg-neon-green/[0.01] pointer-events-none" />
                
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">READY TO FORGE YOUR PATH?</h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-sm mx-auto mb-8">
                    Gain immediate biometrics access, customize dashboards, and complete plans split.
                </p>
                
                <Button 
                    size="lg" 
                    onClick={() => navigate('/login')}
                    className="px-8 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                >
                    Synthesize Free Account Now
                </Button>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-semibold">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green shrink-0">
                            <Brain className="w-4 h-4" />
                        </div>
                        <span className="text-white font-black uppercase tracking-wider">FitForge AI</span>
                    </div>

                    <div>
                        © {new Date().getFullYear()} FitForge AI Syndicate. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

const PlusIcon = (props) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default LandingPage;
