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

  // Simplified version for mobile - fewer animations, better performance, contained within viewport
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single static gradient for mobile - contained within bounds */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 70% 40% at 50% 30%,
                rgba(0, 240, 255, 0.12) 0%,
                rgba(125, 211, 252, 0.08) 30%,
                transparent 60%
              )
            `,
          }}
        />
        {/* Simple pulsing glow - positioned away from edges */}
        <motion.div
          className="absolute top-[20%] right-[5%] w-[40%] h-[40%] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary aurora wave - contained with transform-origin center */}
      <motion.div
        className="absolute inset-[-25%] opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%,
              rgba(0, 240, 255, 0.15) 0%,
              rgba(125, 211, 252, 0.1) 25%,
              rgba(138, 43, 226, 0.08) 50%,
              transparent 70%
            )
          `,
          transformOrigin: 'center center',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
          scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Secondary aurora ribbon - constrained movement */}
      <motion.div
        className="absolute inset-0"
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
          x: ['-10%', '10%', '-10%'],
          y: ['-5%', '5%', '-5%'],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary pulsing nebula - constrained to prevent edge overflow */}
      <motion.div
        className="absolute top-[15%] right-[5%] w-[50%] h-[50%]"
        style={{
          background: `
            radial-gradient(circle at 60% 40%,
              rgba(0, 240, 255, 0.12) 0%,
              rgba(138, 43, 226, 0.08) 30%,
              transparent 60%
            )
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: ['0%', '5%', '0%'],
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

      {/* Floating light orbs - constrained positions and movement */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${25 + i * 15}px`,
            height: `${25 + i * 15}px`,
            // Keep orbs away from edges: 10-70% range
            left: `${15 + i * 15}%`,
            top: `${25 + (i % 2) * 20}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(0, 240, 255, 0.25)' : 'rgba(138, 43, 226, 0.25)'
            } 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}
