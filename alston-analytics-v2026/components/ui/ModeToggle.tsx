'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

type ViewMode = 'immersive' | 'executive';

export function ModeToggle() {
  const [mode, setMode] = useState<ViewMode>('immersive');

  useEffect(() => {
    // Apply mode to document
    if (mode === 'executive') {
      document.documentElement.classList.add('executive-mode');
    } else {
      document.documentElement.classList.remove('executive-mode');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'immersive' ? 'executive' : 'immersive'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-6 right-6 z-50"
    >
      <button
        onClick={toggleMode}
        className="glass-heavy rounded-full p-3 flex items-center gap-2 text-soft-clay hover:text-electric-moss transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-electric-moss/50"
        aria-label={`Switch to ${mode === 'immersive' ? 'executive' : 'immersive'} mode`}
        aria-pressed={mode === 'executive'}
      >
        {mode === 'immersive' ? (
          <>
            <Eye className="w-5 h-5" />
            <span className="hidden md:inline font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Executive
            </span>
          </>
        ) : (
          <>
            <EyeOff className="w-5 h-5" />
            <span className="hidden md:inline font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Immersive
            </span>
          </>
        )}
      </button>

      {/* Mode Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-full mt-2 right-0 glass-surface px-3 py-1 rounded-lg pointer-events-none"
      >
        <span className="text-xs font-mono text-soft-clay/70">
          {mode === 'immersive' ? 'Immersive Mode' : 'Executive Mode'}
        </span>
      </motion.div>
    </motion.div>
  );
}
