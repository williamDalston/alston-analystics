import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use Node.js runtime for Stripe API (required for full SDK features)
export const runtime = 'nodejs';

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-12-15.clover',
  });
};

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { priceId, customerEmail, productName } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // 'subscription' for recurring payments
      success_url: `${req.nextUrl.origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/purchase/cancel`,
      customer_email: customerEmail || undefined,
      metadata: {
        productName: productName || 'Service Purchase',
      },
      // Customize the checkout experience
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

