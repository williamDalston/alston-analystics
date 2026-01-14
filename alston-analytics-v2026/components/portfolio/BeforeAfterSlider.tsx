'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImageOff, Sparkles } from 'lucide-react';

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

// Glitch effect on the divider line
function GlitchLine({ position, isActive }: { position: number; isActive: boolean }) {
  return (
    <div className="absolute top-0 bottom-0 z-15 pointer-events-none" style={{ left: `${position}%` }}>
      {/* Main chromatic aberration effect */}
      <motion.div
        className="absolute top-0 bottom-0 w-[3px] -left-[1px]"
        style={{
          background: 'rgba(255, 0, 0, 0.3)',
          filter: 'blur(2px)',
        }}
        animate={isActive ? {
          opacity: [0, 0.5, 0],
          x: [-4, -2, -4],
        } : { opacity: 0 }}
        transition={{ duration: 0.15, repeat: isActive ? Infinity : 0 }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-[3px] left-[1px]"
        style={{
          background: 'rgba(0, 240, 255, 0.3)',
          filter: 'blur(2px)',
        }}
        animate={isActive ? {
          opacity: [0, 0.5, 0],
          x: [4, 2, 4],
        } : { opacity: 0 }}
        transition={{ duration: 0.15, repeat: isActive ? Infinity : 0 }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 w-full h-[2px] bg-data-cyan/50"
        style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
        animate={isActive ? {
          top: ['0%', '100%'],
          opacity: [0, 1, 0],
        } : { top: '50%', opacity: 0 }}
        transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, ease: 'linear' }}
      />
    </div>
  );
}

// Particle burst effect
function ParticleBurst({ isActive, position }: { isActive: boolean; position: number }) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-data-cyan"
          style={{
            left: `${position}%`,
            top: '50%',
            boxShadow: '0 0 6px rgba(0, 240, 255, 0.8)',
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos((i * 30 * Math.PI) / 180) * (40 + Math.random() * 30),
            y: Math.sin((i * 30 * Math.PI) / 180) * (40 + Math.random() * 30),
            opacity: [1, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.02,
            ease: 'easeOut',
          }}
        />
      ))}
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
  const [showBurst, setShowBurst] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef(50);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newPosition = Math.min(Math.max(percentage, 0), 100);

    // Trigger burst when crossing the midpoint
    if ((lastPosition.current < 50 && newPosition >= 50) || (lastPosition.current > 50 && newPosition <= 50)) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 600);
    }

    lastPosition.current = newPosition;
    setSliderPosition(newPosition);
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
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none group"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { handleMouseUp(); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-data-cyan/20 via-stellar-white/10 to-data-cyan/20 blur-xl pointer-events-none"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

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
              className="object-cover grayscale contrast-90"
              priority={false}
              loading="lazy"
              onError={() => setBeforeError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-void/50 via-transparent to-deep-void/30 pointer-events-none" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(2,4,10,0.4)_100%)] pointer-events-none" />
        </div>

        {/* Label with icon */}
        <motion.div
          className="absolute top-4 left-4 glass-heavy px-4 py-2 rounded-lg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-2 h-2 rounded-full bg-soft-clay/50" />
          <span className="text-soft-clay/70 font-mono text-sm">{beforeLabel}</span>
        </motion.div>
      </div>

      {/* After Image (Color, Right Side) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {afterError ? (
            <ImagePlaceholder label={afterLabel} />
          ) : (
            <Image
              src={afterImage}
              alt={afterLabel}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover saturate-110"
              priority={false}
              loading="lazy"
              onError={() => setAfterError(true)}
            />
          )}
          {/* Enhanced overlay with cyan tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-data-cyan/5 via-transparent to-stellar-white/5 pointer-events-none" />
          {/* Subtle scan lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.1) 2px, rgba(0, 240, 255, 0.1) 4px)',
            }}
          />
        </div>

        {/* Label with glow */}
        <motion.div
          className="absolute top-4 right-4 glass-heavy px-4 py-2 rounded-lg border border-data-cyan/30 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: isDragging
              ? '0 0 20px rgba(0, 240, 255, 0.3)'
              : '0 0 10px rgba(0, 240, 255, 0.1)',
          }}
        >
          <Sparkles className="w-3 h-3 text-data-cyan" />
          <span className="text-stellar-white font-mono text-sm">{afterLabel}</span>
        </motion.div>
      </div>

      {/* Glitch effect on divider */}
      <GlitchLine position={sliderPosition} isActive={isDragging} />

      {/* Particle burst */}
      <ParticleBurst isActive={showBurst} position={sliderPosition} />

      {/* Slider Handle - Enhanced */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Main line with glow */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] -left-[1px] bg-stellar-white"
          animate={{
            boxShadow: isDragging
              ? '0 0 20px rgba(224, 242, 254, 0.8), 0 0 40px rgba(0, 240, 255, 0.4)'
              : '0 0 10px rgba(224, 242, 254, 0.5)',
          }}
        />

        {/* Handle */}
        <motion.div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-14 h-14 rounded-full glass-heavy border-2',
            'flex items-center justify-center cursor-ew-resize',
            'transition-colors duration-200'
          )}
          style={{
            borderColor: isDragging ? 'rgba(0, 240, 255, 0.8)' : 'rgba(224, 242, 254, 0.8)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isDragging
              ? '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.2)'
              : '0 0 15px rgba(224, 242, 254, 0.3)',
          }}
        >
          {/* Animated arrows */}
          <div className="flex gap-1">
            <motion.svg
              className="w-4 h-4 text-stellar-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              animate={isDragging ? { x: [-2, 0, -2] } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
            </motion.svg>
            <motion.svg
              className="w-4 h-4 text-stellar-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              animate={isDragging ? { x: [2, 0, 2] } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
            </motion.svg>
          </div>

          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-data-cyan/50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Instructions - Enhanced */}
      <AnimatePresence>
        {!isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 glass-surface px-5 py-2.5 rounded-full border border-stellar-white/10"
          >
            <span className="text-soft-clay/80 font-mono text-xs flex items-center gap-2">
              <motion.span
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ←
              </motion.span>
              Drag to compare
              <motion.span
                animate={{ x: [3, -3, 3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-stellar-white/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-data-cyan/30 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-stellar-white/20 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-data-cyan/30 rounded-br-2xl pointer-events-none" />
    </div>
  );
}
