import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, MapPin, FileCheck2 } from 'lucide-react';

const TIMELINE_DATA = [
    {
        id: 1,
        title: 'Contacto vía WhatsApp',
        description: 'Envianos un mensaje para coordinar la fecha, hora y el estudio que necesitás realizar. Asignaremos un turno ágilmente.',
        icon: MessageCircle,
    },
    {
        id: 2,
        title: 'Visita en Domicilio',
        description: 'Nuestros técnicos especializados asisten a tu domicilio en el horario acordado para colocar el equipo con la máxima higiene y profesionalismo.',
        icon: MapPin,
    },
    {
        id: 3,
        title: 'Retiro y Resultados',
        description: 'Pasadas las 24hs, retiramos el equipo. El informe es analizado por cardiólogos y enviado digitalmente en formato PDF seguro.',
        icon: FileCheck2,
    }
];

export const Timeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the container for the vertical line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"] // Start animation when container hits center, end when container ends at center
    });

    const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="como-funciona" className="py-24 sm:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-6">
                        Proceso simple, ágil y transparente.
                    </h2>
                    <p className="text-lg text-slate-600">
                        Diseñamos un flujo sin burocracia pensando en tu comodidad.
                    </p>
                </motion.div>

                <div ref={containerRef} className="relative">
                    {/* Static Background Line */}
                    <div className="absolute left-[39px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 sm:-translate-x-1/2 rounded-full overflow-hidden">
                        {/* Animated Fill Line */}
                        <motion.div
                            className="absolute top-0 w-full bg-brand-red origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <div className="space-y-16">
                        {TIMELINE_DATA.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div key={step.id} className="relative flex items-center justify-between flex-col sm:flex-row w-full group">

                                    {/* Left Side Content (Empty if odd) */}
                                    <div className={`w-full sm:w-5/12 ml-[80px] sm:ml-0 flex ${isEven ? 'sm:justify-end' : 'sm:justify-start order-1 sm:order-2'}`}>
                                        {isEven && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-10%" }}
                                                transition={{ duration: 0.5 }}
                                                className="text-left sm:text-right pr-0 sm:pr-8"
                                            >
                                                <h3 className="text-2xl font-display font-semibold text-slate-900 mb-2">{step.title}</h3>
                                                <p className="text-slate-600">{step.description}</p>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Center Node: Must "Pop" precisely when scrolled into view */}
                                    <div className="absolute left-0 sm:left-1/2 flex items-center justify-center w-[80px] h-[80px] -translate-x-0 sm:-translate-x-1/2 z-10">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-45%" }} // Pops exactly when the scrolling line reaches it
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 group-hover:border-brand-red shadow-sm flex items-center justify-center transition-colors duration-300 relative"
                                        >
                                            {/* Inner dot / icon */}
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-red">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Right Side Content (Empty if even) */}
                                    <div className={`w-full sm:w-5/12 ml-[80px] sm:ml-0 flex ${!isEven ? 'sm:justify-start' : 'sm:hidden sm:group-even:flex'}`}>
                                        {!isEven && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-10%" }}
                                                transition={{ duration: 0.5 }}
                                                className="text-left pl-0 sm:pl-8"
                                            >
                                                <h3 className="text-2xl font-display font-semibold text-slate-900 mb-2">{step.title}</h3>
                                                <p className="text-slate-600">{step.description}</p>
                                            </motion.div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
