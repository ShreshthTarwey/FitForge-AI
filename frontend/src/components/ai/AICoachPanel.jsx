import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, X, Bot, Sparkles, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

const initialChat = [
    { sender: 'bot', text: 'Salutations! I am your neural FitForge AI Coach. Ask me about training overloads, target caloric quotients, or target muscle recovery rates.' }
];

const prefilledResponses = {
    'how to gain muscle': 'To optimize skeletal muscle gain (hypertrophy), target 1.6 to 2.2 grams of protein per kilogram of body weight, secure progressive overloading every 7 days, and maintain a caloric surplus of 300 to 500 kcal.',
    'how to lose weight': 'To shed body fat index, secure a progressive caloric deficit of 300 to 500 kcal, prioritize a high-protein intake (to spare lean tissue), and execute 3 to 5 hybrid HIIT or strength splits per week.',
    'how much sleep is optimal': 'Muscle protein synthesis and muscle tissue recovery peak during deep slow-wave sleep. Target 8 hours of sleep. Less than 7 hours decreases testosterone and increases cortisol indexes by up to 15%.',
    'how to recover faster': 'Speed up metabolic recovery rates through: (1) drinking 3.5 liters of water daily, (2) getting 8 hours of sleep, (3) completing active mobility/stretches, and (4) taking 5g of creatine daily.'
};

const AICoachPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(initialChat);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let responseText = "Excellent biometrics query. FitForge AI recommends securing progressive overload splits, sleeping 8 hours, and consuming 2g of protein per kg of bodyweight.";
            
            const normalizedQuery = userMsg.toLowerCase();
            for (const key in prefilledResponses) {
                if (normalizedQuery.includes(key)) {
                    responseText = prefilledResponses[key];
                    break;
                }
            }

            setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
            setIsTyping(false);
            toast.success('FitForge AI Coach has responded!');
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-neon-blue text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.5)] border border-neon-blue/30 focus:outline-none cursor-pointer"
            >
                <Brain className="w-7 h-7" />
            </motion.button>

            {/* Chat Box panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
                        className="absolute bottom-20 left-0 w-80 sm:w-96 h-[450px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
                    >
                        {/* Header */}
                        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue">
                                    <Bot className="w-5 h-5 animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">FitForge AI Coach <Sparkles className="w-3.5 h-3.5 text-neon-green" /></h4>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Neural Advisor Active</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white focus:outline-none">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages Board */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/40 scrollbar-thin">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold leading-relaxed border ${
                                        msg.sender === 'user' 
                                        ? 'bg-neon-blue text-slate-950 border-neon-blue/30 rounded-tr-none' 
                                        : 'bg-slate-950 border-slate-800/80 text-slate-300 rounded-tl-none shadow-md'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-950 border border-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input bar */}
                        <form onSubmit={handleSend} className="bg-slate-950/70 p-3 border-t border-slate-800 flex gap-2">
                            <input
                                type="text"
                                placeholder="Try: 'how to gain muscle'..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="block w-full rounded-lg border-0 bg-slate-900 py-2 px-3 text-xs sm:text-sm text-white ring-1 ring-inset ring-slate-800 focus:ring-2 focus:ring-neon-blue"
                            />
                            <button
                                type="submit"
                                className="w-9 h-9 bg-neon-blue text-slate-950 rounded-lg flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AICoachPanel;
