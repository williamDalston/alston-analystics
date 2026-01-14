'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Briefcase, Brain, Mail, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DockItem {
  Icon: LucideIcon;
  label: string;
  href: string;
  id: string;
  shortLabel: string;
}

const dockItems: DockItem[] = [
  { Icon: Home, label: 'Home', shortLabel: 'Home', href: '#home', id: 'home' },
  { Icon: Briefcase, label: 'Work', shortLabel: 'Work', href: '#work', id: 'work' },
  { Icon: Brain, label: 'The Dojo', shortLabel: 'Learn', href: '#dojo', id: 'dojo' },
  { Icon: Mail, label: 'Contact', shortLabel: 'Talk', href: '#contact', id: 'contact' },
];

// Individual dock item with macOS-style magnification
function DockItemComponent({
  item,
  index,
  mouseX,
  isActive,
  onNavigate
}: {
  item: DockItem;
  index: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  // Calculate distance from mouse for magnification effect
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Magnification based on distance (macOS dock style)
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Icon = item.Icon;

  return (
    <a
      ref={ref}
      key={item.id}
      href={item.href}
      onClick={(e) => onNavigate(e, item.id)}
      aria-label={`Navigate to ${item.label}`}
      aria-current={isActive ? 'page' : undefined}
      className="focus:outline-none focus:ring-2 focus:ring-stellar-white/50 rounded-full"
    >
      <motion.div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "aspect-square rounded-full",
          "transition-colors duration-200",
          "cursor-pointer group",
          isActive ? "text-stellar-white" : "text-soft-clay hover:text-stellar-white"
        )}
        style={{ width, height: width }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Icon with rotation on active */}
        <motion.div
          animate={isActive ? {
            rotate: [0, -10, 10, -5, 5, 0],
          } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>

        {/* Mobile label */}
        <span className="sm:hidden text-[9px] font-mono mt-0.5 opacity-70">
          {item.shortLabel}
        </span>

        {/* Active indicator - animated dot */}
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-data-cyan"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              boxShadow: [
                '0 0 8px rgba(0, 240, 255, 0.6)',
                '0 0 16px rgba(0, 240, 255, 0.8)',
                '0 0 8px rgba(0, 240, 255, 0.6)',
              ]
            }}
            transition={{
              scale: { type: "spring", stiffness: 500, damping: 30 },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          />
        )}

        {/* Hover tooltip - desktop only */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          whileHover={{ opacity: 1, y: -55, scale: 1 }}
          className="hidden sm:block absolute pointer-events-none"
        >
          <div className="glass-surface px-3 py-1.5 rounded-lg text-xs font-mono text-stellar-white whitespace-nowrap border border-data-cyan/20 shadow-lg">
            {item.label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass-surface border-r border-b border-data-cyan/20" />
          </div>
        </motion.div>

        {/* Background glow on hover/active */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full -z-10",
            isActive ? "bg-data-cyan/20" : "bg-stellar-white/0"
          )}
          whileHover={{
            backgroundColor: isActive ? 'rgba(0, 240, 255, 0.25)' : 'rgba(224, 242, 254, 0.1)',
            scale: 1.1
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full bg-stellar-white/20 -z-10"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.5, opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </a>
  );
}

// Need React import for useRef
import React from 'react';

export function FloatingDock() {
  const [activeId, setActiveId] = useState('home');
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    dockItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100 }}
      className={cn(
        "fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw] pb-safe"
      )}
      aria-label="Main navigation"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {/* Ambient glow behind dock */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-data-cyan/10 blur-2xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glass-heavy rounded-full px-3 sm:px-5 py-2.5 flex items-center gap-0.5 sm:gap-1 shadow-2xl border border-stellar-white/10 backdrop-blur-xl">
        {dockItems.map((item, index) => (
          <DockItemComponent
            key={item.id}
            item={item}
            index={index}
            mouseX={mouseX}
            isActive={activeId === item.id}
            onNavigate={handleNavClick}
          />
        ))}
      </div>
    </motion.nav>
  );
}
