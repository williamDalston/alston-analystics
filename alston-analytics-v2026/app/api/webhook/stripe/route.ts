import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendPurchaseNotification, sendCustomerConfirmation } from '@/lib/send-email';

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
      const productName = session.metadata?.productName || 'Service Purchase';
      const customerEmail = session.customer_email || session.customer_details?.email;
      const amount = session.amount_total || 0;

      // Send email notifications
      try {
        // Send notification to business owner
        if (customerEmail) {
          await sendPurchaseNotification(
            customerEmail,
            productName,
            amount,
            session.id
          );
        }

        // Send confirmation email to customer
        if (customerEmail) {
          await sendCustomerConfirmation(
            customerEmail,
            productName,
            amount
          );
        }
      } catch (emailError) {
        // Log email errors but don't fail the webhook
        console.error('Failed to send email notifications:', emailError);
      }

      // TODO: Add additional business logic here:
      // - Create order record in database
      // - Trigger service delivery workflow
      // - Update CRM
      // - Send to Slack/Discord

      break;
    }

    case 'payment_intent.succeeded': {
      // Payment intent succeeded (alternative to checkout.session.completed)
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
      // Unhandled event types are ignored
      break;
  }

  return NextResponse.json({ received: true });
}

