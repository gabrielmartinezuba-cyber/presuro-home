import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Activity } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50">
            {/* Background with subtle Mesh Gradient using branch-red very lightly */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Parallax blobs */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-[#8A1515]/[0.03] rounded-full blur-[100px] mix-blend-multiply"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-slate-300/[0.3] rounded-full blur-[80px] mix-blend-multiply"
                />

                {/* Grid pattern overlay for technical feel */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CgkJPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSIgZmlsbD0icmdiYSgxNSwgMjMsIDQyLCAwLjA1KSIvPgoJPC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-700">Servicio disponible en CABA y GBA Oeste</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-display font-bold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
                >
                    Diagnóstico cardiológico donde estés. <br className="hidden md:block" />
                    <span className="text-slate-400">Sin traslados.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                >
                    Especialistas en Holter y Presurometría a domicilio. Resultados rápidos, precisos y con la máxima comodidad.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <MagneticButton>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-medium shadow-premium hover:shadow-lg transition-all overflow-hidden w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <Phone className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Solicitá tu turno hoy</span>
                        </a>
                    </MagneticButton>

                    <MagneticButton>
                        <a
                            href="#estudios"
                            className="group flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-slate-700 px-8 py-4 rounded-full font-medium border border-slate-200 hover:border-slate-300 hover:bg-white transition-all shadow-sm w-full sm:w-auto"
                        >
                            <Activity className="w-5 h-5 text-brand-red group-hover:scale-110 transition-transform" />
                            <span>Ver estudios</span>
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
};
