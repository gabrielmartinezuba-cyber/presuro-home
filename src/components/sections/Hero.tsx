import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Activity } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const LiveEKG = () => {
    return (
        <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none flex items-center overflow-hidden">
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
                className="w-[200%] h-[300px] min-w-[1400px]" // Extra width to allow flow
            >
                <defs>
                    <linearGradient id="ekg-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8A1515" stopOpacity="0" />
                        <stop offset="20%" stopColor="#8A1515" stopOpacity="0.2" />
                        <stop offset="80%" stopColor="#8A1515" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8A1515" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M-500 150 L0 150 L100 150 L115 135 L130 150 L150 150 L160 170 L180 30 L200 270 L210 150 L240 150 L270 110 L300 150 L400 150 L415 135 L430 150 L450 150 L460 170 L480 60 L500 240 L510 150 L540 150 L570 115 L600 150 L750 150 L765 135 L780 150 L800 150 L810 170 L830 20 L850 280 L860 150 L890 150 L920 105 L950 150 L1000 150 L1100 150 L1115 135 L1130 150 L1150 150 L1160 170 L1180 30 L1200 270 L1210 150 L1240 150 L1270 110 L1300 150 L1400 150 L1500 150"
                    fill="none"
                    stroke="url(#ekg-fade)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, x: 0 }}
                    animate={{ 
                        pathLength: [0, 1],
                        x: [0, -400] // Physically move it leftwards while drawing to fake infinite scroll
                    }}
                    transition={{
                        pathLength: { duration: 4, ease: "linear", repeat: Infinity },
                        x: { duration: 4, ease: "linear", repeat: Infinity }
                    }}
                />
            </motion.svg>
        </div>
    );
};

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

                {/* Dramatic ECG Background Layer (Live Tracing) */}
                <LiveEKG />
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
