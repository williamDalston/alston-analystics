'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-glass-surface/80">
      <ImageOff className="w-12 h-12 text-soft-clay/30 mb-3" />
      <span className="text-soft-clay/50 font-mono text-sm">Case Study Visual</span>
      <span className="text-soft-clay/30 font-mono text-xs mt-1">{label}</span>
    </div>
  );
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);
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
        <div className="relative w-full h-full bg-glass-surface/50 overflow-hidden">
          {beforeError ? (
            <ImagePlaceholder label={beforeLabel} />
          ) : (
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale"
              priority={false}
              loading="lazy"
              onError={() => setBeforeError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-void/50 via-transparent to-deep-void/30 pointer-events-none" />
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
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-stellar-white/10 to-data-cyan/15">
          {afterError ? (
            <ImagePlaceholder label={afterLabel} />
          ) : (
            <Image
              src={afterImage}
              alt={afterLabel}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
              loading="lazy"
              onError={() => setAfterError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-deep-void/15 pointer-events-none" />
        </div>

        {/* Label */}
        <div className="absolute top-4 right-4 glass-heavy px-4 py-2 rounded-lg border border-stellar-white/30">
          <span className="text-stellar-white font-mono text-sm">{afterLabel}</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-stellar-white/50"
        style={{ left: `${sliderPosition}%` }}
      >
        <motion.div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-12 h-12 rounded-full glass-heavy border-2 border-stellar-white',
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
            <svg className="w-3 h-3 text-stellar-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
            </svg>
            <svg className="w-3 h-3 text-stellar-white" fill="currentColor" viewBox="0 0 20 20">
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
            Drag slider to compare
          </span>
        </motion.div>
      )}
    </div>
  );
}
