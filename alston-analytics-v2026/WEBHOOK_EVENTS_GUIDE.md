# Stripe Webhook Events Guide

## Required Webhook Events

When setting up your Stripe webhook endpoint, add these events:

### ✅ Required Events:

1. **`checkout.session.completed`**
   - Fires when a customer completes the checkout
   - Use this to confirm the purchase and send confirmation emails
   - This is the PRIMARY event you need

2. **`payment_intent.succeeded`** (Optional but recommended)
   - Fires when payment is successfully processed
   - Good for tracking successful payments

3. **`payment_intent.payment_failed`** (Optional but recommended)
   - Fires when payment fails
   - Good for tracking failed payments and sending notifications

---

## Quick Setup Steps

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"+ Add endpoint"**
3. Endpoint URL: `https://alstonanalytics.com/api/webhook/stripe`
4. Click **"Select events"**
5. Add these events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded` (recommended)
   - ✅ `payment_intent.payment_failed` (recommended)
6. Click **"Add endpoint"**
7. Copy the webhook secret (starts with `whsec_...`)
8. Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

## Minimum Required

**At minimum, you MUST add:**
- `checkout.session.completed`

This is the only event currently required for your checkout flow to work.

---

## Product ID vs Price ID

**⚠️ Important:** You provided a Product ID (`prod_TjW3pczYSB83iO`), but you need a **Price ID** for checkout.

### Product ID: `prod_...`
- The product/service itself
- Not used directly in checkout

### Price ID: `price_...` (Required for checkout)
- The pricing tier for a product
- This is what you need in `.env.local`
- Each product can have multiple prices

### How to Get Price ID:

1. Go to: https://dashboard.stripe.com/products
2. Click on your product (the one with `prod_TjW3pczYSB83iO`)
3. You'll see the Price ID(s) listed (starts with `price_...`)
4. Copy the Price ID
5. Add to `.env.local` as `NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK`

---

## Summary

**Webhook Events to Add:**
- ✅ `checkout.session.completed` (REQUIRED)
- ✅ `payment_intent.succeeded` (recommended)
- ✅ `payment_intent.payment_failed` (recommended)

**What You Need:**
- ❌ Product ID: `prod_TjW3pczYSB83iO` (not used for checkout)
- ✅ Price ID: `price_...` (needed for checkout - get from product page)

