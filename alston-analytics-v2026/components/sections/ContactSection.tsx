'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgenticChatInterface } from '@/components/contact/AgenticChatInterface';

export function ContactSection() {
    const [chatStarted, setChatStarted] = useState(false);

    return (
        <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:pb-32 sm:pt-24 nav-section overflow-hidden">
            <div className="max-w-4xl w-full">
                <AnimatePresence mode="wait">
                    {!chatStarted ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 relative inline-block"
                            >
                                <span className="relative">
                                    <span className="absolute inset-0 blur-3xl bg-stellar-white/50 opacity-50 animate-pulse" />
                                    <span className="relative bg-gradient-to-r from-stellar-white via-data-cyan to-stellar-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient glow-electric">
                                        The Command Line
                                    </span>
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-base sm:text-lg md:text-xl text-soft-clay/70 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
                            >
                                Let's discuss what you're building.
                            </motion.p>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setChatStarted(true)}
                                className="group relative btn-primary glass-heavy px-8 sm:px-12 py-4 sm:py-5 rounded-full text-stellar-white font-mono font-bold hover:bg-stellar-white/10 transition-all duration-300 inline-block glow-electric text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-stellar-white/50 overflow-hidden"
                                aria-label="Start a conversation with Alston Analytics"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Begin Dialogue
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-stellar-white/20 to-data-cyan/20 opacity-0 group-hover:opacity-100"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.button>

                            {/* Alternative Contact Methods */}
                            <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-soft-clay/10 px-4">
                                <p className="text-soft-clay/50 font-mono text-xs sm:text-sm mb-3 sm:mb-4">
                                    Prefer the old ways?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                                    <a
                                        href="mailto:info@alstonanalytics.com"
                                        className="text-data-cyan font-mono text-sm hover:glow-data transition-all focus:outline-none focus:ring-2 focus:ring-data-cyan/50 rounded px-2 py-1"
                                        aria-label="Send email to info@alstonanalytics.com"
                                    >
                                        info@alstonanalytics.com
                                    </a>
                                    <span className="hidden sm:inline text-soft-clay/30" aria-hidden="true">|</span>
                                    <a
                                        href="https://www.linkedin.com/in/william-alston/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-data-cyan font-mono text-sm hover:glow-data transition-all focus:outline-none focus:ring-2 focus:ring-data-cyan/50 rounded px-2 py-1"
                                        aria-label="Visit Will Alston's LinkedIn profile (opens in new tab)"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AgenticChatInterface onBack={() => setChatStarted(false)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
