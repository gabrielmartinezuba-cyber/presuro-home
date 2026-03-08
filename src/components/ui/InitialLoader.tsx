import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InitialLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading sequence to ensure everything is visible
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-light/90 backdrop-blur-xl"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "easeInOut"
                        }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Heartbeat pulse effect on the logo */}
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                                className="absolute inset-0 bg-brand-red rounded-full blur-[30px]"
                            />
                            <img 
                                src="/logo.png" 
                                alt="PresuroHome Logo" 
                                className="relative w-48 md:w-64 h-auto object-contain drop-shadow-md"
                            />
                        </div>

                        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "circOut" }}
                                className="h-full bg-brand-red"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
