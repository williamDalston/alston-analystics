'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'particle' | 'card' | 'text';
}

export function LoadingSkeleton({ className = '', variant = 'default' }: LoadingSkeletonProps) {
  const baseClasses = 'bg-glass-surface rounded-2xl overflow-hidden relative';
  
  if (variant === 'particle') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="relative w-full h-full min-h-[400px] sm:min-h-[600px]">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-star-blue/5 via-transparent to-data-cyan/5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          {/* Pulsing particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-2">
              {[0, 0.2, 0.4].map((delay) => (
                <motion.div
                  key={delay}
                  className="w-2 h-2 rounded-full bg-star-blue/40"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    );
  }
  
  if (variant === 'card') {
    return (
      <div className={`${baseClasses} p-6 ${className}`}>
        <div className="space-y-4">
          <div className="h-6 bg-glass-heavy rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-glass-heavy rounded w-full animate-pulse" />
          <div className="h-4 bg-glass-heavy rounded w-5/6 animate-pulse" />
        </div>
      </div>
    );
  }
  
  if (variant === 'text') {
    return (
      <div className={`${baseClasses} p-4 ${className}`}>
        <div className="space-y-2">
          <div className="h-4 bg-glass-heavy rounded w-full animate-pulse" />
          <div className="h-4 bg-glass-heavy rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-glass-heavy rounded w-10/12 animate-pulse" />
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={`${baseClasses} ${className}`}>
      <motion.div
        className="w-full h-full bg-glass-heavy"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}



