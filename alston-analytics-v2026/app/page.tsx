'use client';

import { motion } from 'framer-motion';
import { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Error Boundary for ParticleTree components
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ParticleTree error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full bg-deep-void flex items-center justify-center">
          <div className="text-soft-clay/50 font-mono text-sm">Scene unavailable</div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Use the advanced particle tree with HDR Bloom and particles
const AdvancedParticleTree = dynamic(() => import('@/components/hero/AdvancedParticleTree').then((mod) => mod.AdvancedParticleTree), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-deep-void flex items-center justify-center">
      <div className="text-stellar-white font-mono glow-electric">Loading visualization...</div>
    </div>
  ),
});

// Fallback to simpler particle tree if advanced fails
const ParticleTree = dynamic(() => import('@/components/hero/ParticleTree').then((mod) => mod.ParticleTree), {
  ssr: false,
});

const ServiceBentoGrid = dynamic(() => import('@/components/sections/ServiceBentoGrid').then((mod) => mod.ServiceBentoGrid));
const TrustTicker = dynamic(() => import('@/components/sections/TrustTicker').then((mod) => mod.TrustTicker));

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section: The Signal in the Noise */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Advanced 3D Bioluminescent Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-deep-void" />}>
            <ErrorBoundary fallback={<ParticleTree />}>
              <AdvancedParticleTree />
            </ErrorBoundary>
          </Suspense>
        </div>

        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(224, 242, 254, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(224, 242, 254, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Animated gradient orb behind text */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(224, 242, 254, 0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 70%, rgba(0, 240, 255, 0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 30%, rgba(125, 211, 252, 0.12) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(224, 242, 254, 0.12) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 relative"
          >
            <span className="relative inline-block">
              <span className="absolute inset-0 blur-3xl bg-stellar-white/50 opacity-50 animate-pulse" />
              <span className="relative bg-gradient-to-r from-stellar-white via-data-cyan to-stellar-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] glow-electric">
                Data is organic.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="text-xl sm:text-2xl md:text-3xl text-soft-clay mb-3 sm:mb-4 font-bold"
          >
            We prune the chaos.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
            className="text-base sm:text-lg md:text-xl text-soft-clay/70 max-w-2xl mx-auto font-sans px-4"
          >
            We transform raw complexity into executive clarity.
          </motion.p>

          {/* Animated stats or badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 px-4"
          >
            {['AI-Powered', 'Executive-Focused', 'Zero Fluff'].map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="glass-surface px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono text-stellar-white border border-stellar-white/30"
              >
                {badge}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group relative btn-primary glass-heavy px-6 sm:px-8 py-4 rounded-full text-stellar-white font-mono font-bold hover:bg-stellar-white/10 transition-all duration-300 inline-block glow-electric focus:outline-none focus:ring-2 focus:ring-stellar-white/50 overflow-hidden text-sm sm:text-base"
                aria-label="Book a strategic audit with Alston Analytics"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Schedule Strategic Audit
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-stellar-white/20 to-data-cyan/20 opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/portfolio"
                className="glass-surface px-6 sm:px-8 py-4 rounded-full text-soft-clay font-mono font-bold hover:bg-soft-clay/10 hover:border-stellar-white/30 border border-transparent transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-stellar-white/50 text-sm sm:text-base"
                aria-label="View our portfolio of work"
              >
                View Work
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 pb-safe"
        >
          <div className="flex flex-col items-center gap-2 text-soft-clay/50 text-sm font-mono">
            <span>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-12 bg-gradient-to-b from-soft-clay/50 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Ticker */}
      <TrustTicker />

      {/* Service Bento Grid */}
      <ServiceBentoGrid />
    </main>
  );
}
