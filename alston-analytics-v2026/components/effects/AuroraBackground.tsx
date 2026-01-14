'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AuroraBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplified version for mobile - fewer animations, better performance
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single static gradient for mobile */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 30%,
                rgba(0, 240, 255, 0.12) 0%,
                rgba(125, 211, 252, 0.08) 30%,
                transparent 60%
              )
            `,
          }}
        />
        {/* Simple pulsing glow */}
        <motion.div
          className="absolute top-1/4 right-0 w-[50%] h-[50%] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary aurora wave */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%,
              rgba(0, 240, 255, 0.15) 0%,
              rgba(125, 211, 252, 0.1) 25%,
              rgba(138, 43, 226, 0.08) 50%,
              transparent 70%
            )
          `,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
          scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Secondary aurora ribbon */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            linear-gradient(
              135deg,
              transparent 0%,
              rgba(0, 240, 255, 0.05) 20%,
              rgba(125, 211, 252, 0.08) 40%,
              rgba(138, 43, 226, 0.05) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary pulsing nebula */}
      <motion.div
        className="absolute top-1/4 right-0 w-[60%] h-[60%]"
        style={{
          background: `
            radial-gradient(circle at 70% 30%,
              rgba(0, 240, 255, 0.12) 0%,
              rgba(138, 43, 226, 0.08) 30%,
              transparent 60%
            )
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          x: ['0%', '10%', '0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom accent glow */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%,
              rgba(125, 211, 252, 0.1) 0%,
              rgba(0, 240, 255, 0.05) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating light orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${30 + i * 20}px`,
            height: `${30 + i * 20}px`,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(0, 240, 255, 0.3)' : 'rgba(138, 43, 226, 0.3)'
            } 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}
