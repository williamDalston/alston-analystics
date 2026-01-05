'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Briefcase, Brain, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const dockItems: DockItem[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Work', href: '/portfolio' },
  { icon: <Brain className="w-5 h-5" />, label: 'The Dojo', href: '/sovereign-mind' },
  { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '/contact' },
];

export function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw] pb-safe"
      aria-label="Main navigation"
    >
      <div className="glass-heavy rounded-full px-4 sm:px-6 py-3 flex items-center gap-1 sm:gap-2">
        {dockItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
              className="focus:outline-none focus:ring-2 focus:ring-stellar-white/50 rounded-full"
            >
              <motion.div
                className={cn(
                  "relative flex items-center justify-center",
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                  "transition-colors duration-300",
                  "cursor-pointer group",
                  isActive ? "text-stellar-white" : "text-soft-clay hover:text-stellar-white"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: isActive ? 1.15 : hoveredIndex === index ? 1.25 : 1,
                  y: isActive ? -3 : hoveredIndex === index ? -6 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                  mass: 0.5,
                }}
              >
                {item.icon}

                {/* Active page indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-page"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-stellar-white shadow-[0_0_12px_rgba(224,242,254,0.9)]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.4 }}
                  />
                )}

                {/* Label tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? -50 : -40,
                  }}
                  role="tooltip"
                  aria-hidden={hoveredIndex !== index}
                  className="absolute pointer-events-none"
                >
                  <div className="glass-surface px-3 py-1 rounded-lg text-xs font-mono text-soft-clay whitespace-nowrap">
                    {item.label}
                  </div>
                </motion.div>

                {/* Glow effect on hover or active */}
                {(hoveredIndex === index || isActive) && (
                  <motion.div
                    layoutId={isActive ? "active-glow" : "dock-glow"}
                    className={cn(
                      "absolute inset-0 rounded-full blur-lg",
                      isActive ? "bg-stellar-white/25" : "bg-stellar-white/15"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
