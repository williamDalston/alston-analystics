'use client';

import { motion } from 'framer-motion';

const trustSignals = [
  'Federal Agencies',
  'Fortune 500 Supply Chain',
  'Healthcare Systems',
  'Financial Services',
  '50+ Engagements',
  '98% Client Retention',
  'Public Sector Certified',
  'Executive-Ready Delivery',
];

export function TrustTicker() {
  return (
    <section
      className="relative py-16 overflow-hidden border-y border-soft-clay/10 bg-gradient-to-r from-transparent via-stellar-white/5 to-transparent"
      aria-label="Trusted by various industries"
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-deep-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-deep-void to-transparent z-10 pointer-events-none" />

      <div className="relative" aria-hidden="true">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: 'linear',
          }}
          className="flex gap-20"
        >
          {/* Duplicate the array for seamless loop */}
          {[...trustSignals, ...trustSignals, ...trustSignals].map((signal, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 text-soft-clay/40 font-mono text-xl sm:text-2xl font-bold tracking-widest uppercase select-none hover:text-stellar-white transition-colors duration-300"
              style={{
                textShadow: '0 0 15px rgba(226, 209, 195, 0.1)',
              }}
              whileHover={{ scale: 1.15, textShadow: '0 0 25px rgba(224, 242, 254, 0.6)' }}
            >
              {signal}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
