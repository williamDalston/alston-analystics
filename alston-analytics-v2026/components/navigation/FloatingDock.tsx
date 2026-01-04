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

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-heavy rounded-full px-6 py-3 flex items-center gap-2">
        {dockItems.map((item, index) => (
          <Link 
            key={item.href} 
            href={item.href}
            aria-label={`Navigate to ${item.label}`}
            className="focus:outline-none focus:ring-2 focus:ring-electric-moss/50 rounded-full"
          >
            <motion.div
              className={cn(
                "relative flex items-center justify-center",
                "w-12 h-12 rounded-full",
                "text-soft-clay hover:text-electric-moss",
                "transition-colors duration-300",
                "cursor-pointer group",
                "focus-within:ring-2 focus-within:ring-electric-moss/50"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: hoveredIndex === index ? 1.3 : 1,
                y: hoveredIndex === index ? -8 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {item.icon}

              {/* Label tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? -50 : -40,
                }}
                className="absolute pointer-events-none"
              >
                <div className="glass-surface px-3 py-1 rounded-lg text-xs font-mono text-soft-clay whitespace-nowrap">
                  {item.label}
                </div>
              </motion.div>

              {/* Glow effect on hover */}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="dock-glow"
                  className="absolute inset-0 rounded-full bg-electric-moss/20 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
