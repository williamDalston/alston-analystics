'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

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
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-deep-void" />}>
            <ParticleTree />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 glow-electric text-electric-moss"
          >
            Data is organic.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-soft-clay mb-4"
          >
            We prune the chaos.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-soft-clay/70 max-w-2xl mx-auto font-sans"
          >
            Alston Analytics transforms raw complexity into executive clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Link
              href="/contact"
              className="glass-heavy px-8 py-4 rounded-full text-electric-moss font-mono font-bold hover:bg-electric-moss/10 transition-all duration-300 inline-block glow-electric"
            >
              Book Strategic Audit
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
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
