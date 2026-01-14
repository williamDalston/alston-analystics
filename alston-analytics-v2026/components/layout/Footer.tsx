'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-white/5 bg-deep-void/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <p className="text-stellar-white font-semibold text-lg">
              Alston Analytics
            </p>
            <p className="text-soft-clay/50 font-mono text-xs mt-1">
              Data clarity. Executive decisions.
            </p>
          </motion.div>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            aria-label="Footer navigation"
          >
            <Link
              href="/privacy"
              className="text-soft-clay/60 hover:text-data-cyan text-sm font-mono transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-soft-clay/60 hover:text-data-cyan text-sm font-mono transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:info@alstonanalytics.com"
              className="text-soft-clay/60 hover:text-data-cyan text-sm font-mono transition-colors"
            >
              Contact
            </a>
            <a
              href="https://www.linkedin.com/in/william-alston/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-clay/60 hover:text-data-cyan text-sm font-mono transition-colors"
            >
              LinkedIn
            </a>
          </motion.nav>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-soft-clay/40 text-xs font-mono text-center sm:text-right"
          >
            © {currentYear} Alston Analytics LLC
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
