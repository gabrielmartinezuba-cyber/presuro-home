import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    submit?: string;
}

export const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', phone: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone)) {
            newErrors.phone = 'Ingresa un número de teléfono válido';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Ingresa un email válido';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Por favor, dejanos un mensaje';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar el error de ese campo al tipear
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus('loading');

        try {
            // Simulate API Call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
            setErrors({ submit: 'Ocurrió un error al enviar el mensaje. Por favor, intentá nuevamente.' });
        }
    };

    return (
        <section id="contacto" className="py-24 sm:py-32 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
            {/* Premium dark mode background mesh */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] w-[40rem] h-[40rem] bg-brand-red opacity-10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[40rem] h-[40rem] bg-white opacity-[0.02] rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <div className="mb-8">
                            <img 
                                src="/logo.png" 
                                alt="PresuroHome Logo" 
                                className="w-48 md:w-64 h-auto object-contain drop-shadow-sm brightness-200 contrast-100" 
                            />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-white">
                            Solicitá tu <span className="text-brand-red">turno</span>.
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Dejanos tus datos o envianos un WhatsApp directamente. Nos pondremos en contacto a la brevedad para coordinar el estudio en la comodidad de tu domicilio.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <Send className="w-5 h-5 text-brand-red" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Email Directo</p>
                                    <p className="text-slate-400">turnos@presurohome.com.ar</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl relative"
                    >
                        <AnimatePresence mode="popLayout">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                                    <p className="text-slate-400">Nos comunicaremos con vos a la brevedad para confirmar tu turno.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 px-6 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Name Input */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nombre completo</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={status === 'loading'}
                                                className={cn(
                                                    "w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300",
                                                    errors.name ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
                                                )}
                                                placeholder="Juan Pérez"
                                            />
                                            <AnimatePresence>
                                                {errors.name && (
                                                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 text-sm text-red-400">{errors.name}</motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Phone Input */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Teléfono / Celular</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={status === 'loading'}
                                                className={cn(
                                                    "w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300",
                                                    errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
                                                )}
                                                placeholder="011 15 1234-5678"
                                            />
                                            <AnimatePresence>
                                                {errors.phone && (
                                                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 text-sm text-red-400">{errors.phone}</motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email (Opcional)</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                            className={cn(
                                                "w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300",
                                                errors.email ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
                                            )}
                                            placeholder="juan@ejemplo.com"
                                        />
                                        <AnimatePresence>
                                            {errors.email && (
                                                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 text-sm text-red-400">{errors.email}</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Message Textarea */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Consulta</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                            className={cn(
                                                "w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 resize-none",
                                                errors.message ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-brand-red focus:ring-1 focus:ring-brand-red/30"
                                            )}
                                            placeholder="Hola, me gustaría solicitar un turno para..."
                                        />
                                        <AnimatePresence>
                                            {errors.message && (
                                                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 text-sm text-red-400">{errors.message}</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Submit Error */}
                                    <AnimatePresence>
                                        {errors.submit && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                <div className="flex items-center gap-2 p-4 mb-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                                    <p className="text-sm">{errors.submit}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={cn(
                                            "w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-all duration-300",
                                            status === 'loading'
                                                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                                                : "bg-brand-red text-white hover:bg-brand-red-hover shadow-lg hover:shadow-brand-red/20"
                                        )}
                                    >
                                        {status === 'loading' ? (
                                            <div className="flex items-center gap-3">
                                                {/* Custom pulsing loader instead of native spinner */}
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                                <span>Procesando solicitud...</span>
                                            </div>
                                        ) : (
                                            <span>Solicitar Turno</span>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
