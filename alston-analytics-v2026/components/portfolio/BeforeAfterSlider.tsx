'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Before Image (Grayscale, Left Side) */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-glass-surface/50 flex items-center justify-center">
          <div className="text-soft-clay/30 text-6xl font-mono">
            {beforeLabel}
          </div>
          {/* In production, replace with actual image */}
          {/* <Image src={beforeImage} alt="Before" fill className="object-cover grayscale" /> */}
        </div>

        {/* Label */}
        <div className="absolute top-4 left-4 glass-heavy px-4 py-2 rounded-lg">
          <span className="text-soft-clay/50 font-mono text-sm">{beforeLabel}</span>
        </div>
      </div>

      {/* After Image (Color, Right Side) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-electric-moss/20 to-data-cyan/20 flex items-center justify-center">
          <div className="text-electric-moss text-6xl font-mono glow-electric">
            {afterLabel}
          </div>
          {/* In production, replace with actual image */}
          {/* <Image src={afterImage} alt="After" fill className="object-cover" /> */}
        </div>

        {/* Label */}
        <div className="absolute top-4 right-4 glass-heavy px-4 py-2 rounded-lg border border-electric-moss/30">
          <span className="text-electric-moss font-mono text-sm">{afterLabel}</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-electric-moss/50"
        style={{ left: `${sliderPosition}%` }}
      >
        <motion.div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-12 h-12 rounded-full glass-heavy border-2 border-electric-moss',
            'flex items-center justify-center cursor-ew-resize',
            isDragging && 'scale-110'
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Arrows */}
          <div className="flex gap-1">
            <svg className="w-3 h-3 text-electric-moss" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
            </svg>
            <svg className="w-3 h-3 text-electric-moss" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      {!isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 glass-surface px-4 py-2 rounded-lg"
        >
          <span className="text-soft-clay/70 font-mono text-xs">
            Drag to compare
          </span>
        </motion.div>
      )}
    </div>
  );
}
