import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Dialog Wrapper */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative"
                        >
                            {/* Warning Indicator */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight">{title || 'Confirm Action'}</h3>
                            </div>

                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                {message || 'Are you absolutely sure you want to proceed with this destructive action? This cannot be undone.'}
                            </p>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" size="sm" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button 
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold" 
                                    size="sm" 
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDialog;
