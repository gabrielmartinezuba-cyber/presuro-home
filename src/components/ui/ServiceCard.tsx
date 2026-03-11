import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Activity, HeartPulse, Stethoscope } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    duration: string;
    icon: 'holter' | 'mapa' | 'combinado';
    delay?: number;
}

const iconMap = {
    holter: Activity,
    mapa: HeartPulse,
    combinado: Stethoscope,
};

export const ServiceCard = ({ title, description, duration, icon, delay = 0 }: ServiceCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for the cursor position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs to make the tilt feel natural
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Map mouse position to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Floating highlight effect based on cursor
    const highlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const highlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized mouse position from -0.5 to 0.5
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        // Reset to initial state
        x.set(0);
        y.set(0);
    };

    const IconComponent = iconMap[icon];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            style={{ perspective: 1000 }} // Required for 3D effect
            className="w-full"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileTap={{ scale: 0.98 }} // Haptic-like feedback on touch
                style={{ 
                    // Use a slightly different approach for tilt on mobile (keep it subtle or off)
                    // Framer motion transforms apply to the element's style
                    rotateX: typeof window !== 'undefined' && window.innerWidth >= 768 ? rotateX : 0, 
                    rotateY: typeof window !== 'undefined' && window.innerWidth >= 768 ? rotateY : 0, 
                    transformStyle: "preserve-3d" 
                }}
                className={cn(
                    "relative w-full p-8 rounded-3xl cursor-pointer group active:bg-slate-50/50",
                    "bg-white/40 backdrop-blur-xl shadow-premium border border-white/60",
                    "md:hover:border-slate-300 transition-all duration-300"
                )}
            >
                {/* Dynamic Highlight following cursor */}
                <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${highlightX.get()} ${highlightY.get()}, rgba(255,255,255,0.8) 0%, transparent 50%)`,
                    }}
                />

                {/* Content lifted in Z axis for 3D separation */}
                <motion.div style={{ translateZ: "50px" }} className="relative z-10 flex flex-col items-start gap-4 pointer-events-none">
                    <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 text-brand-red">
                        <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    <div>
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-brand-red bg-brand-red/5 rounded-full">
                            {duration}
                        </div>
                        <h3 className="text-2xl font-display font-semibold tracking-tight text-slate-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-slate-600 font-body leading-relaxed">
                            {description}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
