'use client';

import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseCancelPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-heavy rounded-3xl p-8 sm:p-12 border border-stellar-white/10"
        >
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <XCircle className="w-20 h-20 text-soft-clay/50" />
          </motion.div>

          {/* Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-soft-clay mb-4"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-soft-clay/70 font-sans text-lg mb-8"
          >
            No charges were made. Your payment was cancelled.
          </motion.p>

          {/* Alternative Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            <div className="flex items-start gap-3 text-left">
              <Mail className="w-5 h-5 text-star-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-soft-clay font-medium mb-1">
                  Have questions?
                </p>
                <p className="text-soft-clay/70 text-sm">
                  We're here to help. Contact us at{' '}
                  <a
                    href="mailto:info@alstonanalytics.com"
                    className="text-data-cyan hover:glow-data transition-all"
                  >
                    info@alstonanalytics.com
                  </a>{' '}
                  to discuss your needs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="glass-surface px-6 py-3 rounded-full text-stellar-white font-mono font-medium hover:bg-stellar-white/10 transition-all inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-stellar-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="glass-heavy px-6 py-3 rounded-full text-stellar-white font-mono font-bold hover:bg-stellar-white/10 transition-all inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-stellar-white/50 glow-electric"
            >
              Start Conversation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}



