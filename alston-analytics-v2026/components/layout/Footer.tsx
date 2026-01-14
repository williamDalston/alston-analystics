'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Compass, Database, BookOpen } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Strategic Advisory', icon: Compass, href: '#services' },
    { name: 'Power BI Engineering', icon: Database, href: '#services' },
    { name: 'The Sovereign Mind', icon: BookOpen, href: '#dojo' },
  ];

  return (
    <footer className="relative z-20 border-t border-white/5 bg-deep-void/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <p className="text-stellar-white font-semibold text-lg mb-2">
              Alston Analytics
            </p>
            <p className="text-soft-clay/60 font-sans text-sm leading-relaxed mb-4">
              Power BI engineering and strategic advisory for organizations that need their data to work.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-data-cyan font-mono text-sm hover:text-stellar-white transition-colors group"
              whileHover={{ x: 4 }}
            >
              Start a conversation
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-stellar-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="flex items-center gap-2 text-soft-clay/60 hover:text-data-cyan text-sm transition-colors group"
                  >
                    <service.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h4 className="text-stellar-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#work"
                  className="text-soft-clay/60 hover:text-data-cyan text-sm transition-colors link-underline"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-soft-clay/60 hover:text-data-cyan text-sm transition-colors link-underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-soft-clay/60 hover:text-data-cyan text-sm transition-colors link-underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-stellar-white font-semibold text-sm mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@alstonanalytics.com"
                  className="text-soft-clay/60 hover:text-data-cyan text-sm transition-colors link-underline"
                >
                  info@alstonanalytics.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/william-alston/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-soft-clay/60 hover:text-data-cyan text-sm transition-colors link-underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-soft-clay/40 text-xs font-mono"
          >
            © {currentYear} Alston Analytics LLC
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-soft-clay/30 text-xs font-mono"
          >
            50+ dashboards delivered · $10M+ in identified savings
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
