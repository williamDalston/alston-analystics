'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, Database, BookOpen } from 'lucide-react';
import { useRef } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`glass-surface rounded-3xl p-8 relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Icon */}
      <div className="relative z-10 mb-6 text-electric-moss w-12 h-12">
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-2xl font-bold text-soft-clay mb-3 glow-electric group-hover:text-electric-moss transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-soft-clay/70 font-sans leading-relaxed">
        {description}
      </p>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-electric-moss/5 to-data-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: 'translateZ(-1px)' }}
      />

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-3xl border border-electric-moss/0 group-hover:border-electric-moss/30 transition-all duration-500" />
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
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-electric-moss glow-electric mb-4">
            What We Do
          </h2>
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
              description="Data without clarity is noise. We build dashboards that executives actually use. Real-time insights. Zero clutter. Maximum impact."
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
              description="Leadership isn't taught in classrooms. We codify mental models, inversion frameworks, and leverage thinking for the modern executive."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
