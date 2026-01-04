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
    <section className="relative py-16 overflow-hidden border-y border-soft-clay/10">
      <div className="relative">
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
            <div
              key={index}
              className="flex-shrink-0 text-soft-clay/30 font-mono text-xl tracking-wider select-none"
              style={{
                textShadow: '0 2px 10px rgba(226, 209, 195, 0.1)',
              }}
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
