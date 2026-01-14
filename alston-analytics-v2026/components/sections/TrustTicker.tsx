'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const trustSignals = [
  'Federal & State Agencies',
  'Fortune 500 Supply Chain',
  'Regional Health Systems',
  'Financial Services',
  '50+ Engagements Delivered',
  'Zero-Downtime Migrations',
  'Executive-Ready Reporting',
  'DAX & Semantic Model Specialists',
];

export function TrustTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Calculate the width of one set of items to know how far to animate
        const scrollWidth = containerRef.current.scrollWidth / 3;
        setTickerWidth(scrollWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section
      className="relative py-12 sm:py-16 overflow-hidden border-y border-soft-clay/10 bg-gradient-to-r from-transparent via-stellar-white/5 to-transparent"
      aria-label="Trusted by various industries"
    >
      {/* Gradient overlays for fade effect - responsive width */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-deep-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-deep-void to-transparent z-10 pointer-events-none" />

      <div className="relative" aria-hidden="true">
        <motion.div
          ref={containerRef}
          animate={{ x: tickerWidth > 0 ? [0, -tickerWidth] : 0 }}
          transition={{
            repeat: Infinity,
            duration: Math.max(30, tickerWidth / 50), // Scale duration with width
            ease: 'linear',
          }}
          className="flex gap-10 sm:gap-20"
        >
          {/* Duplicate the array for seamless loop */}
          {[...trustSignals, ...trustSignals, ...trustSignals].map((signal, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 text-soft-clay/40 font-mono text-base sm:text-xl md:text-2xl font-bold tracking-widest uppercase select-none hover:text-stellar-white transition-colors duration-300"
              style={{
                textShadow: '0 0 15px rgba(226, 209, 195, 0.1)',
              }}
              whileHover={{ scale: 1.1, textShadow: '0 0 25px rgba(224, 242, 254, 0.6)' }}
            >
              {signal}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
