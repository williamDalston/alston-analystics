'use client';

import { motion } from 'framer-motion';

const clients = [
  'Fortune 500',
  'Startups',
  'Healthcare',
  'Finance',
  'Technology',
  'Manufacturing',
  'Retail',
  'Government',
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
            duration: 30,
            ease: 'linear',
          }}
          className="flex gap-16"
        >
          {/* Duplicate the array for seamless loop */}
          {[...clients, ...clients, ...clients].map((client, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 text-soft-clay/30 font-mono text-xl tracking-wider select-none hover:text-stellar-white/50 transition-colors"
              style={{
                textShadow: '0 2px 10px rgba(226, 209, 195, 0.1)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              {client}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
