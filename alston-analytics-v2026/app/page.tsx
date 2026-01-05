'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, Suspense } from 'react';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SovereignMindSection } from '@/components/sections/SovereignMindSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

const AdvancedParticleTree = dynamic(
  () => import('@/components/hero/AdvancedParticleTree').then((mod) => mod.AdvancedParticleTree),
  { 
    ssr: false,
    loading: () => <LoadingSkeleton variant="particle" className="w-full h-full" />
  }
);

const ParticleTree = dynamic(
  () => import('@/components/hero/ParticleTree').then((mod) => mod.ParticleTree),
  { 
    ssr: false,
    loading: () => <LoadingSkeleton variant="particle" className="w-full h-full min-h-[400px]" />
  }
);

const ServiceBentoGrid = dynamic(
  () => import('@/components/sections/ServiceBentoGrid').then((mod) => mod.ServiceBentoGrid),
  { ssr: false }
);

const TrustTicker = dynamic(
  () => import('@/components/sections/TrustTicker').then((mod) => mod.TrustTicker),
  { ssr: false }
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative bg-deep-void min-h-screen">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.4),rgba(2,4,10,0.8))]" />
        <div className="hidden md:block absolute top-0 right-0 w-full h-full opacity-40 mix-blend-screen">
          <Suspense fallback={<LoadingSkeleton variant="particle" className="w-full h-full" />}>
            <AdvancedParticleTree />
          </Suspense>
        </div>
        {/* Mobile simplified background */}
        <div className="md:hidden absolute top-0 right-0 w-full h-full opacity-30 mix-blend-screen">
          <Suspense fallback={<LoadingSkeleton variant="particle" className="w-full h-full min-h-[400px]" />}>
            <ParticleTree />
          </Suspense>
        </div>

        {/* Subtle noise texture using CSS */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <main className="relative z-10 flex flex-col">
        {/* Navigation Anchor */}
        <div id="home" className="absolute top-0" />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full text-center relative z-10">

            {/* Ambient Background Glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-star-blue/10 rounded-full blur-[120px] pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              style={{ opacity, scale }}
              className="relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8 relative inline-block"
              >
                <div className="absolute inset-0 bg-stellar-white/20 blur-[60px] rounded-full opacity-50" />
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-stellar-white to-gray-400 tracking-tight leading-[0.9] glow-electric relative z-10 mix-blend-lighten">
                  Data is<br />organic
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl text-soft-clay/80 font-mono tracking-wide mb-6 md:mb-8 max-w-4xl mx-auto"
              >
                We prune the chaos.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl text-soft-clay/60 font-sans mb-10 md:mb-14 max-w-3xl mx-auto"
              >
                Transform raw complexity into executive clarity. Strategic consulting. Power BI engineering. Sovereign thinking.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <a
                  href="#work"
                  className="group relative px-8 py-4 bg-stellar-white text-deep-void font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Our Work
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="#contact"
                  className="group px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-stellar-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 text-lg"
                >
                  Start Dialogue
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-soft-clay/40">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-stellar-white/50 to-transparent" />
          </motion.div>
        </section>

        {/* Trust Ticker Section */}
        <section className="relative z-20 py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <TrustTicker />
        </section>

        {/* Services Section */}
        <section id="services" className="relative z-20 py-24 sm:py-32 px-4">
          <ServiceBentoGrid />
        </section>

        {/* Work Section */}
        <PortfolioSection />

        {/* Sovereign Mind Section */}
        <SovereignMindSection />

        {/* Contact Section */}
        <ContactSection />

      </main>
    </div>
  );
}
