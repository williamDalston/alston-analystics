'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Alston transformed our fragmented data into a single source of truth. Our board meetings went from confusion to clarity overnight.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "Regional Health Network"
  },
  {
    quote: "The ROI was immediate. We identified $2.4M in savings within the first dashboard review.",
    name: "Marcus Thompson",
    title: "Director of Analytics",
    company: "Fortune 500 Manufacturing"
  },
  {
    quote: "Finally, a consultant who speaks executive, not just technical. Our leadership team actually uses the dashboards now.",
    name: "Jennifer Walsh",
    title: "Chief Data Officer",
    company: "Federal Agency"
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="glass-surface rounded-2xl p-6 sm:p-8 relative group hover:border-stellar-white/20 transition-all"
    >
      {/* Quote icon */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-data-cyan/20 flex items-center justify-center">
        <Quote className="w-4 h-4 text-data-cyan" />
      </div>

      {/* Quote text */}
      <blockquote className="text-soft-clay/90 font-sans text-base sm:text-lg leading-relaxed mb-6">
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution */}
      <div className="border-t border-stellar-white/10 pt-4">
        <p className="text-stellar-white font-semibold text-sm">
          {testimonial.name}
        </p>
        <p className="text-soft-clay/60 font-mono text-xs mt-1">
          {testimonial.title}, {testimonial.company}
        </p>
      </div>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stellar-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stellar-white glow-electric mb-4">
            What Leaders Say
          </h2>
          <p className="text-soft-clay/70 font-sans text-base sm:text-lg max-w-2xl mx-auto">
            Results that speak for themselves.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
