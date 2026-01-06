'use client';

import { useState } from 'react';
import { loadStripe, Stripe as StripeType } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Loader2 } from 'lucide-react';

interface PurchaseButtonProps {
  priceId: string;
  productName: string;
  amount: number;
  description?: string;
  customerEmail?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

// Initialize Stripe (will be undefined if key is missing)
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export function PurchaseButton({
  priceId,
  productName,
  amount,
  description,
  customerEmail,
  className = '',
  variant = 'primary',
}: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!priceId) {
      setError('Price configuration missing. Please contact support.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setError('Payment processing is currently unavailable. Please contact support at info@alstonanalytics.com');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          productName,
          customerEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Direct redirect to Stripe Checkout URL (more reliable than redirectToCheckout)
      if (data.url) {
        window.location.href = data.url;
        return; // Don't set loading to false, we're redirecting
      }

      // Fallback to redirectToCheckout if URL not provided
      if (!stripePromise) {
        throw new Error('Payment processing is currently unavailable. Please contact support.');
      }
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load. Please refresh the page.');
      }

      // redirectToCheckout redirects or returns an error
      try {
        const result = await (stripe as any).redirectToCheckout({
          sessionId: data.sessionId,
        });

        // If there's an error, it will be in result.error
        if (result && result.error) {
          throw new Error(result.error.message);
        }
      } catch (err: any) {
        // If redirectToCheckout fails, it might be because redirect already happened
        // or there was an actual error
        if (err.message && !err.message.includes('redirect')) {
          throw err;
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Unable to process payment. Please try again.');
      setIsLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const baseClasses =
    variant === 'primary'
      ? 'glass-heavy px-6 py-3 rounded-full text-stellar-white font-mono font-bold hover:bg-stellar-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-stellar-white/50 glow-electric'
      : 'glass-surface px-6 py-3 rounded-full text-stellar-white font-mono font-semibold hover:bg-stellar-white/10 border border-stellar-white/30 hover:border-stellar-white/60 hover:shadow-[0_0_20px_rgba(224,242,254,0.2)] transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-stellar-white/50 backdrop-blur-sm';

  return (
    <div className="flex flex-col items-stretch gap-2 w-full">
      <motion.button
        onClick={handlePurchase}
        disabled={isLoading || !priceId}
        className={`${baseClasses} ${className} disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group w-full`}
        whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label={`Purchase ${productName} for ${formatPrice(amount)}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span className="flex-1 text-center">
              {variant === 'primary' ? 'Purchase Now' : 'Start Assessment'}
            </span>
            <span className="font-bold">{formatPrice(amount)}</span>
          </>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-stellar-white/20 via-data-cyan/20 to-stellar-white/20 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {description && (
        <p className="text-xs text-soft-clay/70 font-sans text-center leading-relaxed">
          {description}
        </p>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-signal-red font-mono text-center py-2 px-3 rounded-lg bg-signal-red/10 border border-signal-red/20"
          role="alert"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

