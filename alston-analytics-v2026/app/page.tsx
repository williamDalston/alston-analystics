'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, Suspense } from 'react';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { SovereignMindSection } from '@/components/sections/SovereignMindSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { MetricsCounter } from '@/components/sections/MetricsCounter';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { AuroraBackground } from '@/components/effects/AuroraBackground';
import { SectionDivider } from '@/components/effects/SectionDivider';

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
        {/* Aurora/Nebula effect */}
        <AuroraBackground />
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
                  Data clarity.<br />Executive decisions.
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl text-soft-clay/80 font-mono tracking-wide mb-6 md:mb-8 max-w-4xl mx-auto"
              >
                Power BI architecture that speaks your language.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl text-soft-clay/60 font-sans mb-10 md:mb-14 max-w-3xl mx-auto"
              >
                We build the reporting infrastructure that leadership teams trust. Power BI engineering for organizations that need their data to work.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="#work"
                  className="group relative px-10 py-5 bg-gradient-to-r from-stellar-white via-white to-stellar-white text-deep-void font-bold rounded-full overflow-hidden transition-all text-lg ripple shadow-[0_0_30px_rgba(224,242,254,0.3)] hover:shadow-[0_0_50px_rgba(224,242,254,0.5)]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Our Work
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-data-cyan/20 via-transparent to-data-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>

                <motion.a
                  href="#contact"
                  className="group px-10 py-5 glass-surface border border-stellar-white/20 text-stellar-white font-semibold rounded-full transition-all text-lg ripple-cyan hover:border-stellar-white/40"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    Start Dialogue
                    <span className="w-2 h-2 rounded-full bg-data-cyan animate-pulse" />
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-soft-clay/50 font-mono">Scroll</span>
            <motion.div
              className="relative w-6 h-10 rounded-full border border-stellar-white/30 flex justify-center"
              animate={{ borderColor: ['rgba(224,242,254,0.3)', 'rgba(224,242,254,0.5)', 'rgba(224,242,254,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-stellar-white/70 rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Trust Ticker Section */}
        <section className="relative z-20 py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <TrustTicker />
        </section>

        {/* Metrics Counter */}
        <MetricsCounter />

        {/* Services Section */}
        <section id="services" className="relative z-20 py-24 sm:py-32 px-4">
          <ServiceBentoGrid />
        </section>

        {/* Divider */}
        <SectionDivider variant="gradient" className="max-w-4xl mx-auto px-8" />

        {/* Work Section */}
        <PortfolioSection />

        {/* Divider */}
        <SectionDivider variant="pulse" />

        {/* Sovereign Mind Section */}
        <SovereignMindSection />

        {/* Divider */}
        <SectionDivider variant="dots" />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <ContactSection />

      </main>
    </div>
  );
}
