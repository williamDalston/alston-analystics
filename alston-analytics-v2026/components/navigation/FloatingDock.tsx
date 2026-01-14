'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Brain, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  id: string;
}

const dockItems: DockItem[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', href: '#home', id: 'home' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Work', href: '#work', id: 'work' },
  { icon: <Brain className="w-5 h-5" />, label: 'The Dojo', href: '#dojo', id: 'dojo' },
  { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#contact', id: 'contact' },
];

export function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Activate when section is in middle of screen
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
      transition={{ delay: 0.5, duration: 0.6 }}
      className={cn(
        "fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw] pb-safe",
        "transition-all duration-300"
      )}
      aria-label="Main navigation"
    >
      <div className="glass-heavy rounded-full px-4 sm:px-6 py-3 flex items-center gap-1 sm:gap-2 shadow-2xl border border-stellar-white/10">
        {dockItems.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
              className="focus:outline-none focus:ring-2 focus:ring-stellar-white/50 rounded-full"
            >
              <motion.div
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  "w-12 h-12 sm:w-12 sm:h-12 rounded-full",
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

                {/* Mobile label - always visible on small screens */}
                <span className="sm:hidden text-[9px] font-mono mt-0.5 opacity-70">
                  {item.label === 'The Dojo' ? 'Learn' : item.label === 'Contact' ? 'Talk' : item.label}
                </span>

                {/* Active page indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-page"
                    className="absolute -bottom-1 sm:-bottom-1 w-1.5 h-1.5 rounded-full bg-stellar-white shadow-[0_0_12px_rgba(224,242,254,0.9)]"
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
                  <div className="glass-surface px-3 py-1 rounded-lg text-xs font-mono text-soft-clay whitespace-nowrap border border-stellar-white/10">
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
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
