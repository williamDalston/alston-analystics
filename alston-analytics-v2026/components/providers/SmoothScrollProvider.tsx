'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { initAnalytics } from '@/lib/analytics';
import { initErrorTracking } from '@/lib/error-logging';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize analytics and error tracking
    initAnalytics();
    initErrorTracking();

    // Initialize smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0.7,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
