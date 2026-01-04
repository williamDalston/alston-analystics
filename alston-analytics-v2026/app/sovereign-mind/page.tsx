'use client';

import { motion } from 'framer-motion';
import { ConstellationGraph } from '@/components/sovereign-mind/ConstellationGraph';

export default function SovereignMindPage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-electric-moss glow-electric mb-6"
          >
            The Digital Dojo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-soft-clay/70 text-xl font-sans max-w-3xl mx-auto mb-4"
          >
            Leadership is a science, not an art. Explore mental models, frameworks, and
            sovereign thinking for the modern executive.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-soft-clay/50 font-mono text-sm"
          >
            Click nodes to explore. Drag to navigate.
          </motion.p>
        </div>
      </section>

      {/* Constellation Interface */}
      <section className="relative h-[80vh] px-6">
        <div className="max-w-7xl mx-auto h-full">
          <ConstellationGraph />
        </div>
      </section>

      {/* Featured Content Preview */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-soft-clay mb-12 text-center">
            Core Frameworks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-surface rounded-2xl p-8 hover:border-electric-moss/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-electric-moss mb-3">
                Inversion
              </h3>
              <p className="text-soft-clay/70 font-sans mb-4">
                Don't solve problems. Avoid them. The ancient art of thinking backwards.
              </p>
              <a href="#" className="text-data-cyan font-mono text-sm hover:glow-data">
                Read Framework →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-surface rounded-2xl p-8 hover:border-electric-moss/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-electric-moss mb-3">
                Leverage
              </h3>
              <p className="text-soft-clay/70 font-sans mb-4">
                Give me a lever long enough, and I'll move the world. Naval's trinity applied.
              </p>
              <a href="#" className="text-data-cyan font-mono text-sm hover:glow-data">
                Read Framework →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-surface rounded-2xl p-8 hover:border-electric-moss/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-electric-moss mb-3">
                Pareto
              </h3>
              <p className="text-soft-clay/70 font-sans mb-4">
                80% of results from 20% of effort. The mathematics of disproportionate returns.
              </p>
              <a href="#" className="text-data-cyan font-mono text-sm hover:glow-data">
                Read Framework →
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
