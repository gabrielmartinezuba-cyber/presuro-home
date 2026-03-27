import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from '../ui/ServiceCard';

const SERVICES_DATA = [
    {
        id: 1,
        title: 'Holter 24hs',
        description: 'Monitoreo continuo de la actividad eléctrica del corazón durante 24 horas. Indoloro y no invasivo, con equipo de última generación ultra liviano.',
        duration: '24 Horas',
        icon: 'holter' as const,
    },
    {
        id: 2,
        title: 'Presurometría (MAPA)',
        description: 'Monitoreo Ambulatorio de Presión Arterial para detectar hipertensión oculta o controlar tratamientos, midiendo la presión automática en su entorno habitual.',
        duration: '24 Horas',
        icon: 'mapa' as const,
    },
    {
        id: 3,
        title: 'Estudio Combinado',
        description: (
            <>
                En caso de ser combinado, el procedimiento es secuencial para garantizar tu comodidad:
                <div className="mt-3 space-y-2">
                    <div className="flex flex-col"><span><strong>Día 1 - Colocación:</strong> Instalamos el primer equipo.</span></div>
                    <div className="flex flex-col"><span><strong>Día 2 - Cambio:</strong> Retiramos el primero y colocamos el segundo dispositivo.</span></div>
                    <div className="flex flex-col"><span><strong>Día 3 - Retiro final:</strong> Se retira el último equipo para descargar todos los datos.</span></div>
                </div>
            </>
        ),
        duration: 'Procedimiento 72hs',
        icon: 'combinado' as const,
    }
];

export const Services = () => {
    return (
        <section id="estudios" className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
            {/* Subtle organic background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-slate-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-[40rem] h-[40rem] bg-slate-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-sm font-semibold tracking-wide text-brand-red uppercase mb-3">Nuestros Estudios</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-6">
                        Diagnóstico cardiológico especializado.
                    </h3>
                    <p className="text-lg text-slate-600">
                        Equipamiento de precisión y tecnología compacta para garantizar la exactitud de los datos sin comprometer tu comodidad.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {SERVICES_DATA.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            duration={service.duration}
                            icon={service.icon}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
