'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgenticChatInterface } from '@/components/contact/AgenticChatInterface';

export default function ContactPage() {
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {!chatStarted ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-6xl md:text-7xl font-bold mb-6 relative inline-block"
              >
                <span className="relative">
                  <span className="absolute inset-0 blur-3xl bg-electric-moss/50 opacity-50 animate-pulse" />
                  <span className="relative bg-gradient-to-r from-electric-moss via-data-cyan to-electric-moss bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient glow-electric">
                    The Command Line
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-soft-clay/70 text-xl font-sans max-w-2xl mx-auto mb-12"
              >
                We don't do discovery calls. We do strategic dialogues.
                Tell me what you're building.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChatStarted(true)}
                className="group relative btn-primary glass-heavy px-12 py-5 rounded-full text-electric-moss font-mono font-bold hover:bg-electric-moss/10 transition-all duration-300 inline-block glow-electric text-lg focus:outline-none focus:ring-2 focus:ring-electric-moss/50 overflow-hidden"
                aria-label="Start a conversation with Alston Analytics"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Initialize Conversation
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric-moss/20 to-data-cyan/20 opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* Alternative Contact Methods */}
              <div className="mt-16 pt-8 border-t border-soft-clay/10">
                <p className="text-soft-clay/50 font-mono text-sm mb-4">
                  Prefer the old ways?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:info@alstonanalytics.com"
                    className="text-data-cyan font-mono text-sm hover:glow-data transition-all focus:outline-none focus:ring-2 focus:ring-data-cyan/50 rounded px-2 py-1"
                    aria-label="Send email to info@alstonanalytics.com"
                  >
                    info@alstonanalytics.com
                  </a>
                  <span className="hidden sm:inline text-soft-clay/30" aria-hidden="true">|</span>
                  <a
                    href="https://linkedin.com/in/alstonanalytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-data-cyan font-mono text-sm hover:glow-data transition-all focus:outline-none focus:ring-2 focus:ring-data-cyan/50 rounded px-2 py-1"
                    aria-label="Visit Alston Analytics LinkedIn profile (opens in new tab)"
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
    </main>
  );
}
