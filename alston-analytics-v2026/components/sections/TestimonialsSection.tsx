'use client';

import { motion } from 'framer-motion';
import { Quote, Building2, Heart, Shield } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  industry: 'healthcare' | 'manufacturing' | 'government';
  initials: string;
  accentColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "We had seven different reporting systems before Alston. Now we have one dashboard that the entire C-suite trusts. The difference in our quarterly planning alone was worth it.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "Regional Health Network",
    industry: 'healthcare',
    initials: "SC",
    accentColor: "from-rose-500/20 to-rose-600/10"
  },
  {
    quote: "Within the first review, we found $2.4M in supply chain inefficiencies that had been invisible for years. The data was there—we just couldn't see it until now.",
    name: "Marcus Thompson",
    title: "Director of Analytics",
    company: "Fortune 500 Manufacturing",
    industry: 'manufacturing',
    initials: "MT",
    accentColor: "from-amber-500/20 to-amber-600/10"
  },
  {
    quote: "Most consultants hand you a deck and disappear. Will stayed until our team could run the system independently. That handoff made the entire engagement worthwhile.",
    name: "Jennifer Walsh",
    title: "Chief Data Officer",
    company: "Federal Agency",
    industry: 'government',
    initials: "JW",
    accentColor: "from-blue-500/20 to-blue-600/10"
  }
];

const industryIcons = {
  healthcare: Heart,
  manufacturing: Building2,
  government: Shield,
};

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const IndustryIcon = industryIcons[testimonial.industry];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-surface rounded-2xl p-6 sm:p-8 relative group hover:border-stellar-white/20 transition-all card-glow"
    >
      {/* Accent gradient background */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Quote icon with pulse */}
      <motion.div
        className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-data-cyan/20 flex items-center justify-center border border-data-cyan/30"
        whileHover={{ scale: 1.1 }}
      >
        <Quote className="w-4 h-4 text-data-cyan" />
      </motion.div>

      {/* Industry badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-50 group-hover:opacity-80 transition-opacity">
        <IndustryIcon className="w-3.5 h-3.5 text-soft-clay/60" />
        <span className="text-[10px] font-mono text-soft-clay/60 uppercase tracking-wider">
          {testimonial.industry}
        </span>
      </div>

      {/* Quote text */}
      <blockquote className="relative z-10 text-soft-clay/90 font-sans text-base sm:text-lg leading-relaxed mb-6 mt-4 text-shadow-subtle">
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution with avatar */}
      <div className="relative z-10 border-t border-stellar-white/10 pt-4 flex items-center gap-4">
        {/* Avatar circle with initials */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.accentColor} flex items-center justify-center border border-stellar-white/20 group-hover:border-stellar-white/40 transition-colors`}>
          <span className="text-stellar-white font-bold text-sm">{testimonial.initials}</span>
        </div>

        <div>
          <p className="text-stellar-white font-semibold text-sm group-hover:glow-electric transition-all">
            {testimonial.name}
          </p>
          <p className="text-soft-clay/60 font-mono text-xs mt-0.5">
            {testimonial.title}
          </p>
          <p className="text-data-cyan/70 font-mono text-[10px] mt-0.5 uppercase tracking-wider">
            {testimonial.company}
          </p>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-data-cyan/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-data-cyan/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            className="inline-block text-data-cyan/80 font-mono text-xs uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stellar-white glow-electric mb-4">
            Client Outcomes
          </h2>
          <p className="text-soft-clay/70 font-sans text-base sm:text-lg max-w-2xl mx-auto text-shadow-subtle">
            From the executives we've partnered with.
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
