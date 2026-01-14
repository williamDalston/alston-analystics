'use client';

import { motion } from 'framer-motion';
import { ConstellationGraph } from '@/components/sovereign-mind/ConstellationGraph';

export function SovereignMindSection() {
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
                </div>
            </div>
        </section>
    );
}
