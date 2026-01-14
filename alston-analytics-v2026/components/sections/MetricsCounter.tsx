'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { BarChart3, DollarSign, Users, TrendingUp, LucideIcon } from 'lucide-react';

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const metrics: Metric[] = [
  {
    value: 50,
    suffix: '+',
    label: 'Dashboards Delivered',
    description: 'Active in production today',
    icon: BarChart3,
    color: 'text-data-cyan',
  },
  {
    value: 10,
    suffix: 'M+',
    prefix: '$',
    label: 'Identified Savings',
    description: 'Found in client data',
    icon: DollarSign,
    color: 'text-emerald-400',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Return Engagements',
    description: 'Clients who come back',
    icon: Users,
    color: 'text-amber-400',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Average ROI',
    description: 'First-year returns',
    icon: TrendingUp,
    color: 'text-violet-400',
  },
];

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <div className="glass-surface rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden card-glow">
        {/* Background glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${metric.color}`} />

        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-glass-surface/50 mb-4 ${metric.color}`}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        {/* Counter */}
        <div className="mb-2">
          <span className={`text-4xl sm:text-5xl font-bold ${metric.color} glow-data`}>
            <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
          </span>
        </div>

        {/* Label */}
        <h3 className="text-stellar-white font-semibold text-lg mb-1">
          {metric.label}
        </h3>

        {/* Description */}
        <p className="text-soft-clay/60 font-mono text-xs">
          {metric.description}
        </p>

        {/* Decorative line */}
        <motion.div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent ${metric.color.replace('text-', 'via-')}/50 to-transparent`}
          initial={{ width: 0 }}
          whileInView={{ width: '60%' }}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

export function MetricsCounter() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-void via-glass-surface/20 to-deep-void pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(224, 242, 254, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224, 242, 254, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block text-data-cyan/80 font-mono text-xs uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            By The Numbers
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stellar-white glow-electric">
            Track Record
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
