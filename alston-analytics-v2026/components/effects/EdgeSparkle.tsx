'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function EdgeSparkle() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start animation after a brief delay for page load
    const startTimer = setTimeout(() => {
      setHasPlayed(true);
    }, 300);

    // Hide component after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {/* The spark that travels around the edge */}
      <motion.div
        className="absolute"
        initial={{
          top: 0,
          left: '-2%',
          opacity: 0
        }}
        animate={hasPlayed ? {
          // Animate around the perimeter: top -> right -> bottom -> left -> top
          top: ['0%', '0%', '100%', '100%', '0%'],
          left: ['-2%', '100%', '100%', '-2%', '-2%'],
          opacity: [0, 1, 1, 1, 0],
        } : {}}
        transition={{
          duration: 2.2,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {/* Main spark glow */}
        <div
          className="relative"
          style={{
            width: '80px',
            height: '80px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Core bright point */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 240, 255, 0.8) 30%, transparent 70%)',
              filter: 'blur(2px)',
            }}
          />
          {/* Outer glow */}
          <div
            className="absolute inset-[-50%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, rgba(0, 240, 255, 0.2) 40%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
          {/* Extended trail glow */}
          <div
            className="absolute inset-[-100%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 60%)',
              filter: 'blur(20px)',
            }}
          />
        </div>
      </motion.div>

      {/* Trail effect - follows slightly behind */}
      <motion.div
        className="absolute"
        initial={{
          top: 0,
          left: '-5%',
          opacity: 0
        }}
        animate={hasPlayed ? {
          top: ['0%', '0%', '100%', '100%', '0%'],
          left: ['-5%', '100%', '100%', '-5%', '-5%'],
          opacity: [0, 0.6, 0.6, 0.6, 0],
        } : {}}
        transition={{
          duration: 2.2,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.25, 0.5, 0.75, 1],
          delay: 0.05,
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      </motion.div>

      {/* Edge line glow that appears along the path */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 240, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Animated border path */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="url(#edgeGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={hasPlayed ? {
            pathLength: [0, 1],
            opacity: [0, 0.8, 0.8, 0],
          } : {}}
          transition={{
            pathLength: { duration: 2, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 2.5, times: [0, 0.1, 0.8, 1] },
          }}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.8))',
          }}
        />
      </svg>

      {/* Corner flares that appear as the spark passes */}
      {[
        { top: '0', left: '0', delay: 0 },
        { top: '0', right: '0', delay: 0.55 },
        { bottom: '0', right: '0', delay: 1.1 },
        { bottom: '0', left: '0', delay: 1.65 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32"
          style={{
            ...corner,
            background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={hasPlayed ? {
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
          } : {}}
          transition={{
            duration: 0.6,
            delay: corner.delay + 0.3,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
