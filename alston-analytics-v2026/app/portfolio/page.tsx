'use client';

import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider';

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-electric-moss glow-electric mb-4 sm:mb-6">
            Evidence of Order
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-soft-clay/70 font-sans max-w-3xl mx-auto px-4">
            We don't just clean data. We transform chaos into executive weapons.
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
              <h2 className="text-3xl font-bold text-soft-clay mb-3">
                Fortune 500 Supply Chain Overhaul
              </h2>
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
                <div className="text-3xl sm:text-4xl font-bold text-electric-moss mb-2">87%</div>
                <div className="text-sm sm:text-base text-soft-clay/70 font-sans">
                  Reduction in reporting time
                </div>
              </div>
              <div className="glass-heavy rounded-xl p-6">
                <div className="text-4xl font-bold text-data-cyan mb-2">$2.4M</div>
                <div className="text-soft-clay/70 font-sans">
                  Annual cost savings identified
                </div>
              </div>
              <div className="glass-heavy rounded-xl p-6">
                <div className="text-4xl font-bold text-electric-moss mb-2">Real-time</div>
                <div className="text-soft-clay/70 font-sans">
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
              <h2 className="text-3xl font-bold text-soft-clay mb-3">
                Healthcare Analytics Platform
              </h2>
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

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-heavy rounded-xl p-6">
                <div className="text-4xl font-bold text-electric-moss mb-2">15+</div>
                <div className="text-soft-clay/70 font-sans">
                  Data sources integrated
                </div>
              </div>
              <div className="glass-heavy rounded-xl p-6">
                <div className="text-4xl font-bold text-data-cyan mb-2">60%</div>
                <div className="text-soft-clay/70 font-sans">
                  Faster strategic insights
                </div>
              </div>
              <div className="glass-heavy rounded-xl p-6">
                <div className="text-4xl font-bold text-electric-moss mb-2">100%</div>
                <div className="text-soft-clay/70 font-sans">
                  Executive adoption rate
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/contact"
            className="glass-heavy px-8 sm:px-12 py-4 sm:py-5 rounded-full text-electric-moss font-mono font-bold hover:bg-electric-moss/10 transition-all duration-300 inline-block glow-electric text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-electric-moss/50"
            aria-label="Start your transformation with Alston Analytics"
          >
            Start Your Transformation
          </a>
        </motion.div>
      </div>
    </main>
  );
}
