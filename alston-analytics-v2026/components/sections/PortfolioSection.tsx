'use client';

import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider';

export function PortfolioSection() {
    return (
        <section id="work" className="relative min-h-screen py-12 sm:py-24 px-4 sm:px-6 nav-section">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-20 text-center"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stellar-white glow-electric mb-4 sm:mb-6">
                        Case Studies
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-soft-clay/70 font-sans max-w-3xl mx-auto px-4">
                        Before and after: what data clarity looks like in practice.
                    </p>
                </motion.div>

                {/* Case Study 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="glass-surface rounded-3xl p-8 md:p-12">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-soft-clay mb-3">
                                Fortune 500 Supply Chain Overhaul
                            </h3>
                            <p className="text-soft-clay/60 font-sans">
                                From spreadsheet hell to real-time clarity
                            </p>
                        </div>

                        <BeforeAfterSlider
                            beforeImage="/portfolio/before-spreadsheet.png"
                            afterImage="/portfolio/after-dashboard.png"
                            beforeLabel="The Chaos"
                            afterLabel="The Clarity"
                        />

                        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="glass-heavy rounded-xl p-4 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-stellar-white mb-2">87%</div>
                                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                                    Reduction in reporting time
                                </div>
                            </div>
                            <div className="glass-heavy rounded-xl p-4 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-data-cyan mb-2">$2.4M</div>
                                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                                    Annual cost savings identified
                                </div>
                            </div>
                            <div className="glass-heavy rounded-xl p-4 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-stellar-white mb-2">Real-time</div>
                                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                                    Decision-making capability
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Case Study 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="glass-surface rounded-3xl p-8 md:p-12">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-soft-clay mb-3">
                                Healthcare Analytics Platform
                            </h3>
                            <p className="text-soft-clay/60 font-sans">
                                Patient outcomes visualized for C-suite decisions
                            </p>
                        </div>

                        <BeforeAfterSlider
                            beforeImage="/portfolio/healthcare-before.png"
                            afterImage="/portfolio/healthcare-after.png"
                            beforeLabel="Disconnected Data"
                            afterLabel="Unified Intelligence"
                        />

                        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="glass-heavy rounded-xl p-4 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-stellar-white mb-2">15+</div>
                                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                                    Data sources integrated
                                </div>
                            </div>
                            <div className="glass-heavy rounded-xl p-4 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-data-cyan mb-2">60%</div>
                                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                                    Faster strategic insights
                                </div>
                            </div>
                            <div className="glass-heavy rounded-xl p-4 sm:p-6">
                                <div className="text-3xl sm:text-4xl font-bold text-stellar-white mb-2">100%</div>
                                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                                    Executive adoption rate
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Case Study 3 - Text-based for variety */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="glass-surface rounded-3xl p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <span className="text-data-cyan font-mono text-xs uppercase tracking-wider mb-4 block">
                                    Federal Agency
                                </span>
                                <h3 className="text-3xl font-bold text-soft-clay mb-4">
                                    Cross-Department Reporting Consolidation
                                </h3>
                                <p className="text-soft-clay/70 font-sans mb-6 leading-relaxed">
                                    A federal agency with 12 departments, each using different reporting tools
                                    and definitions. Leadership couldn't get a unified view of operations—reports
                                    contradicted each other, and decisions were made on incomplete data.
                                </p>
                                <p className="text-soft-clay/70 font-sans leading-relaxed">
                                    We built a semantic layer that standardized definitions across departments,
                                    created automated data quality checks, and deployed a single dashboard that
                                    the entire executive team now references in weekly meetings.
                                </p>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div className="glass-heavy rounded-xl p-6">
                                        <div className="text-4xl font-bold text-stellar-white mb-2">12 → 1</div>
                                        <div className="text-soft-clay/70 font-sans">
                                            Reporting systems consolidated
                                        </div>
                                    </div>
                                    <div className="glass-heavy rounded-xl p-6">
                                        <div className="text-4xl font-bold text-data-cyan mb-2">4 weeks</div>
                                        <div className="text-soft-clay/70 font-sans">
                                            From kickoff to first deployment
                                        </div>
                                    </div>
                                    <div className="glass-heavy rounded-xl p-6">
                                        <div className="text-4xl font-bold text-stellar-white mb-2">Zero</div>
                                        <div className="text-soft-clay/70 font-sans">
                                            Report discrepancies since launch
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-soft-clay/60 font-sans mb-6">
                        Ready to see what clarity looks like for your organization?
                    </p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 glass-surface border border-stellar-white/20 rounded-full text-stellar-white font-mono hover:border-data-cyan/50 hover:bg-data-cyan/5 transition-all"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Start a conversation
                        <span>→</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
