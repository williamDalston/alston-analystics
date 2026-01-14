'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, Database, BookOpen } from 'lucide-react';
import { useRef } from 'react';
import { PurchaseButton } from '@/components/services/PurchaseButton';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  showPurchaseButton?: boolean;
  priceId?: string;
  price?: number;
  ctaText?: string;
  ctaAction?: 'contact' | 'purchase';
}

function ServiceCard({ title, description, icon, className, showPurchaseButton, priceId, price, ctaText, ctaAction }: ServiceCardProps) {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`glass-surface rounded-3xl p-8 relative overflow-hidden group cursor-pointer flex flex-col ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        backgroundColor: 'rgba(15, 23, 42, 0.3)', // clearer glass
      }}
    >
      {/* Animated gradient background - Holographic Shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-stellar-white/5 via-transparent to-data-cyan/5 opacity-0 group-hover:opacity-100"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Animated border - Crisper definition */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-stellar-white/10 group-hover:border-stellar-white/40"
        animate={{
          boxShadow: [
            'inset 0 0 0px rgba(224, 242, 254, 0)',
            'inset 0 0 20px rgba(125, 211, 252, 0.1)',
            'inset 0 0 0px rgba(224, 242, 254, 0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Icon with animation */}
      <motion.div
        className="relative z-10 mb-6 text-stellar-white w-12 h-12"
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>

      {/* Title with gradient on hover */}
      <h3 className="relative z-10 text-2xl font-bold text-soft-clay mb-3 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-stellar-white group-hover:via-data-cyan group-hover:to-stellar-white group-hover:bg-clip-text group-hover:text-transparent">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-soft-clay/70 font-sans leading-relaxed group-hover:text-soft-clay transition-colors mb-6 flex-grow">
        {description}
      </p>

      {/* Purchase Button */}
      {showPurchaseButton && priceId && price && (
        <div className="relative z-10 mt-auto pt-4 border-t border-stellar-white/10 group-hover:border-stellar-white/20 transition-colors">
          <PurchaseButton
            priceId={priceId}
            productName={title}
            amount={price}
            description="Includes: 2-hour assessment, architecture review, performance analysis, and actionable deliverable report"
            variant="secondary"
            className="w-full"
          />
        </div>
      )}

      {/* Contact CTA for non-purchase cards */}
      {ctaAction === 'contact' && ctaText && (
        <div className="relative z-10 mt-auto pt-4 border-t border-stellar-white/10 group-hover:border-stellar-white/20 transition-colors">
          <button
            onClick={scrollToContact}
            className="w-full py-3 px-4 rounded-lg border border-stellar-white/20 text-stellar-white/80 font-mono text-sm hover:bg-stellar-white/5 hover:border-stellar-white/40 hover:text-stellar-white transition-all flex items-center justify-center gap-2 group/btn"
          >
            {ctaText}
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-stellar-white/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Arrow indicator on hover */}
      <motion.div
        className="absolute bottom-6 right-6 text-stellar-white opacity-0 group-hover:opacity-100"
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function ServiceBentoGrid() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center relative"
        >
          {/* Decorative lines */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-16 bg-gradient-to-b from-stellar-white/50 to-transparent" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-px bg-gradient-to-r from-transparent via-stellar-white/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.h2
            className="text-5xl font-bold mb-4 relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="relative">
              <span className="absolute inset-0 blur-2xl bg-stellar-white/30" />
              <span className="relative bg-gradient-to-r from-stellar-white via-data-cyan to-stellar-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient glow-electric">
                What We Do
              </span>
            </span>
          </motion.h2>
          <p className="text-soft-clay/70 text-lg font-sans max-w-2xl mx-auto">
            Three pillars of transformation. Each engineered for executive clarity.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ServiceCard
              icon={<Compass className="w-full h-full" />}
              title="Strategic Foresight"
              description="We don't predict the future. We architect it. From market landscapes to organizational restructuring, we turn complexity into competitive advantage."
              ctaText="Start Conversation"
              ctaAction="contact"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ServiceCard
              icon={<Database className="w-full h-full" />}
              title="Power BI Architecture"
              description="Data without clarity is noise. We build dashboards executives actually use. Real-time insights. Zero clutter. Maximum impact."
              showPurchaseButton={!!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
              priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK || ''}
              price={1000}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1"
          >
            <ServiceCard
              icon={<BookOpen className="w-full h-full" />}
              title="The Sovereign Mind"
              description="Leadership isn't taught in classrooms. We codify mental models, inversion frameworks, and leverage principles for modern executives."
              ctaText="Learn More"
              ctaAction="contact"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
