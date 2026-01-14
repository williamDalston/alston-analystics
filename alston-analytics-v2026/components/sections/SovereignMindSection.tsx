'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ConstellationGraph } from '@/components/sovereign-mind/ConstellationGraph';
import { Send, Check, Loader2 } from 'lucide-react';

export function SovereignMindSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        // Simulate API call - in production, connect to email service
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStatus('success');
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section id="dojo" className="relative min-h-screen py-12 sm:py-24 nav-section">
            {/* Hero Section */}
            <div className="px-4 sm:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stellar-white glow-electric mb-4 sm:mb-6"
                    >
                        The Digital Dojo
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-base sm:text-lg md:text-xl text-soft-clay/70 font-sans max-w-3xl mx-auto mb-3 sm:mb-4 px-4"
                    >
                        The principles that shaped empires apply to boardrooms. Explore decision
                        frameworks drawn from Stoic philosophy, systems theory, and behavioral economics.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-soft-clay/50 font-mono text-sm"
                    >
                        Click nodes to explore. Drag to navigate.
                    </motion.p>
                </div>
            </div>

            {/* Constellation Interface */}
            <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] px-4 sm:px-6 mt-8">
                <div className="max-w-7xl mx-auto h-full">
                    <ConstellationGraph />
                </div>
            </div>

            {/* Featured Content Preview */}
            <div className="relative py-12 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-soft-clay mb-8 sm:mb-12 text-center">
                        Foundational Disciplines
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="glass-surface rounded-2xl p-6 sm:p-8 hover:border-stellar-white/30 transition-all duration-300"
                        >
                            <h4 className="text-xl sm:text-2xl font-bold text-stellar-white mb-2 sm:mb-3">
                                Via Negativa
                            </h4>
                            <p className="text-sm sm:text-base text-soft-clay/70 font-sans mb-3 sm:mb-4">
                                Addition by subtraction. Wisdom lies not in what you add, but what you refuse.
                                The discipline that built Berkshire and shaped Stoic philosophy.
                            </p>
                            <span className="text-data-cyan font-mono text-sm opacity-60">
                                Available Soon →
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="glass-surface rounded-2xl p-6 sm:p-8 hover:border-stellar-white/30 transition-all duration-300"
                        >
                            <h4 className="text-xl sm:text-2xl font-bold text-stellar-white mb-2 sm:mb-3">
                                Second-Order Effects
                            </h4>
                            <p className="text-sm sm:text-base text-soft-clay/70 font-sans mb-3 sm:mb-4">
                                Every action creates ripples. Train yourself to see the consequences of consequences—the
                                skill that separates strategists from tacticians.
                            </p>
                            <span className="text-data-cyan font-mono text-sm opacity-60">
                                Available Soon →
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="glass-surface rounded-2xl p-6 sm:p-8 hover:border-stellar-white/30 transition-all duration-300"
                        >
                            <h4 className="text-xl sm:text-2xl font-bold text-stellar-white mb-2 sm:mb-3">
                                Asymmetric Positioning
                            </h4>
                            <p className="text-sm sm:text-base text-soft-clay/70 font-sans mb-3 sm:mb-4">
                                Structure decisions where upside dwarfs downside. The operating principle behind
                                venture capital, options trading, and antifragile organizations.
                            </p>
                            <span className="text-data-cyan font-mono text-sm opacity-60">
                                Available Soon →
                            </span>
                        </motion.div>
                    </div>

                    {/* Newsletter Signup */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 sm:mt-16 max-w-xl mx-auto"
                    >
                        <div className="glass-surface rounded-2xl p-6 sm:p-8 text-center">
                            <h4 className="text-xl font-bold text-stellar-white mb-2">
                                Get notified when frameworks launch
                            </h4>
                            <p className="text-soft-clay/60 font-sans text-sm mb-6">
                                Join the list. No spam—just frameworks when they're ready.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    placeholder="your@email.com"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="flex-1 bg-deep-void/50 border border-stellar-white/10 rounded-lg px-4 py-3 text-stellar-white font-mono text-sm placeholder:text-soft-clay/30 focus:outline-none focus:border-data-cyan/50 focus:ring-1 focus:ring-data-cyan/20 transition-all disabled:opacity-50"
                                />
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success' || !email.trim()}
                                    className="px-6 py-3 bg-stellar-white/10 border border-stellar-white/20 rounded-lg text-stellar-white font-mono text-sm hover:bg-stellar-white/20 hover:border-stellar-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                                    whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                                >
                                    {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {status === 'success' && <Check className="w-4 h-4 text-emerald-400" />}
                                    {status === 'idle' && <Send className="w-4 h-4" />}
                                    {status === 'loading' ? 'Joining...' : status === 'success' ? 'You\'re in' : 'Notify Me'}
                                </motion.button>
                            </form>
                            {status === 'error' && (
                                <p className="text-signal-red text-xs font-mono mt-2">{errorMessage}</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
