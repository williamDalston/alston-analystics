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
              <h1 className="text-6xl md:text-7xl font-bold text-electric-moss glow-electric mb-6">
                The Command Line
              </h1>

              <p className="text-soft-clay/70 text-xl font-sans max-w-2xl mx-auto mb-12">
                We don't do discovery calls. We do strategic dialogues.
                Tell me what you're building.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChatStarted(true)}
                className="glass-heavy px-12 py-5 rounded-full text-electric-moss font-mono font-bold hover:bg-electric-moss/10 transition-all duration-300 inline-block glow-electric text-lg"
              >
                Initialize Conversation
              </motion.button>

              {/* Alternative Contact Methods */}
              <div className="mt-16 pt-8 border-t border-soft-clay/10">
                <p className="text-soft-clay/50 font-mono text-sm mb-4">
                  Prefer the old ways?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:hello@alstonanalytics.com"
                    className="text-data-cyan font-mono text-sm hover:glow-data transition-all"
                  >
                    hello@alstonanalytics.com
                  </a>
                  <span className="hidden sm:inline text-soft-clay/30">|</span>
                  <a
                    href="https://linkedin.com/in/alstonanalytics"
                    className="text-data-cyan font-mono text-sm hover:glow-data transition-all"
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
