'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { initAnalytics } from '@/lib/analytics';
import { initErrorTracking } from '@/lib/error-logging';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize analytics and error tracking
    initAnalytics();
    initErrorTracking();

    // Initialize smooth scroll with mobile-optimized settings
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Faster on mobile
      lerp: isMobile ? 0.15 : 0.1, // More responsive on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5, // More responsive touch
      wheelMultiplier: 1,
      syncTouch: true, // Better touch sync
      syncTouchLerp: 0.075, // Smooth touch interpolation
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('resize', checkMobile);
      lenis.destroy();
    };
  }, [isMobile]);

  return <>{children}</>;
}
