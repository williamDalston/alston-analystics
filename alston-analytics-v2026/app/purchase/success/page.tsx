'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-heavy rounded-3xl p-8 sm:p-12 border border-stellar-white/10"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <CheckCircle2 className="w-20 h-20 text-data-cyan" />
              <motion.div
                className="absolute inset-0 bg-data-cyan/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-stellar-white mb-4 glow-electric"
          >
            Payment Successful
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-soft-clay/80 font-sans text-lg mb-6"
          >
            Thank you for your purchase. We've received your payment and will
            be in touch shortly.
          </motion.p>

          {/* Session ID */}
          {sessionId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-surface rounded-lg p-4 mb-6 border border-stellar-white/10"
            >
              <p className="text-xs text-soft-clay/50 font-mono mb-2">
                Transaction ID
              </p>
              <p className="text-sm text-data-cyan font-mono break-all">
                {sessionId}
              </p>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <div className="flex items-start gap-3 text-left">
              <Mail className="w-5 h-5 text-star-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-soft-clay font-medium mb-1">
                  What happens next?
                </p>
                <p className="text-soft-clay/70 text-sm">
                  You'll receive a confirmation email within a few minutes with
                  next steps and how to schedule your session.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
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

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
        <div className="text-soft-clay/50 font-mono">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}

