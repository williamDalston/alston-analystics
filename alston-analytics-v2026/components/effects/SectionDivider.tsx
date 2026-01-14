'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'pulse' | 'gradient' | 'dots';
  className?: string;
}

export function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            initial={{ d: "M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z" }}
            animate={{
              d: [
                "M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z",
                "M0,80 C300,20 600,100 900,40 C1050,70 1150,80 1200,80 L1200,120 L0,120 Z",
                "M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.1)" />
              <stop offset="50%" stopColor="rgba(138, 43, 226, 0.1)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`relative py-8 flex items-center justify-center overflow-hidden ${className}`}>
        <div className="relative w-full max-w-4xl mx-auto px-4">
          {/* Center pulse */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-data-cyan"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0.4, 0.8],
              boxShadow: [
                '0 0 20px rgba(0, 240, 255, 0.5)',
                '0 0 40px rgba(0, 240, 255, 0.8)',
                '0 0 20px rgba(0, 240, 255, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Expanding rings - constrained max size for mobile */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border border-data-cyan/30"
              style={{ maxWidth: 'min(400px, 90vw)', maxHeight: 'min(400px, 90vw)' }}
              initial={{ width: 16, height: 16, opacity: 0.8 }}
              animate={{
                width: [16, 'min(200px, 45vw)', 'min(400px, 90vw)'],
                height: [16, 'min(200px, 45vw)', 'min(400px, 90vw)'],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Side lines */}
          <motion.div
            className="absolute left-4 right-1/2 top-1/2 h-px mr-8"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5))',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-1/2 right-4 top-1/2 h-px ml-8"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.5), transparent)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`relative py-6 ${className}`}>
        <div className="flex items-center justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-stellar-white/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                backgroundColor: [
                  'rgba(224, 242, 254, 0.3)',
                  'rgba(0, 240, 255, 0.8)',
                  'rgba(224, 242, 254, 0.3)',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: gradient variant
  return (
    <div className={`relative h-px my-8 ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), rgba(138, 43, 226, 0.3), rgba(0, 240, 255, 0.5), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 blur-sm"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), rgba(138, 43, 226, 0.2), rgba(0, 240, 255, 0.3), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
