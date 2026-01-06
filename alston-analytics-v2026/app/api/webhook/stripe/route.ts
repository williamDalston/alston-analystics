import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Note: Webhooks must use Node.js runtime (not edge) due to Stripe SDK requirements
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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing stripe signature or webhook secret' },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Payment was successful
      // Here you can:
      // - Send confirmation email
      // - Update database
      // - Trigger service delivery workflow
      // - Notify team members
      
      // Log successful payment (in production, use proper logging service)
      console.log('Payment successful:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        metadata: session.metadata,
      });

      // TODO: Add your business logic here
      // Example: 
      // - Send confirmation email to customer
      // - Create order record in database
      // - Notify team members
      // - Trigger service delivery workflow

      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Payment intent succeeded (alternative to checkout.session.completed)
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      // TODO: Add business logic if using Payment Intents directly
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('Payment failed:', {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      });
      // TODO: Handle failed payment:
      // - Notify customer about payment failure
      // - Log error for review
      // - Attempt alternative payment method if applicable
      break;
    }

    default:
      // Log unhandled events for monitoring
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

