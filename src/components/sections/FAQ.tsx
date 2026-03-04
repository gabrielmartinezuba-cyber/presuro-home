import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const FAQ_DATA = [
    {
        id: 1,
        question: '¿Tengo que prepararme de forma especial para los estudios?',
        answer: 'Para el Holter, sugerimos tomar una ducha previa ya que no podrás mojarte durante las 24hs que dura el estudio. Para ambos estudios (Holter y MAPA), te recomendamos usar ropa holgada y cómoda.'
    },
    {
        id: 2,
        question: '¿El servicio incluye el informe médico?',
        answer: 'Sí. Todos nuestros estudios incluyen un informe detallado firmado por médicos cardiólogos habilitados, el cual enviaremos en formato PDF a tu WhatsApp o correo electrónico.'
    },
    {
        id: 3,
        question: '¿Los equipos dificultan el sueño?',
        answer: 'Utilizamos tecnología de última generación diseñada para ser ultra compacta y liviana. Están pensados específicamente para interferir lo menos posible con tu descanso y tu rutina diaria.'
    },
    {
        id: 4,
        question: '¿Qué formas de pago aceptan?',
        answer: 'Podés abonar mediante transferencia bancaria, Mercado Pago o en efectivo al momento de la colocación del equipo en tu domicilio.'
    }
];

export const FAQ = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq" className="py-24 sm:py-32 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-display font-bold text-slate-900 tracking-tight mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-slate-600">
                        Resolvemos tus dudas habituales sobre nuestros servicios.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {FAQ_DATA.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                key={item.id}
                                className={cn(
                                    "border border-slate-200 rounded-2xl bg-white overflow-hidden transition-colors duration-300",
                                    isOpen && "border-slate-300 shadow-sm"
                                )}
                            >
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    className="flex items-center justify-between w-full px-6 py-5 text-left bg-transparent"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-lg font-medium text-slate-900 pr-4">
                                        {item.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-500"
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                                opacity: { duration: 0.25, delay: 0.1 }
                                            }}
                                        >
                                            <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
