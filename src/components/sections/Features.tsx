import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/utils/cn';

const FEATURES_DATA = [
    {
        id: 1,
        title: 'Comodidad Total',
        description: 'Evitá los traslados y largas esperas en salas clínicas. Realizamos el estudio en la tranquilidad y privacidad de tu hogar.',
        icon: Clock,
    },
    {
        id: 2,
        title: 'Tecnología Avanzada',
        description: 'Utilizamos registradores ultra ligeros de última generación que no interfieren con tu rutina diaria ni tu descanso nocturno.',
        icon: Cpu,
    },
    {
        id: 3,
        title: 'Resultados Seguros',
        description: 'Informes validados por cardiólogos especialistas, entregados de forma rápida y segura en formato digital tras finalizar el estudio.',
        icon: ShieldCheck,
    }
];

export const Features = () => {
    return (
        <section id="por-que-elegirnos" className="relative py-24 sm:py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-6">
                        Calidad clínica, <br className="hidden sm:block" />
                        <span className="text-slate-400">sin pisar la clínica.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {FEATURES_DATA.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className={cn(
                                    "p-8 rounded-3xl group bg-white border border-slate-100 shadow-sm",
                                    "hover:shadow-premium hover:border-slate-200 transition-all duration-300"
                                )}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 font-body leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
