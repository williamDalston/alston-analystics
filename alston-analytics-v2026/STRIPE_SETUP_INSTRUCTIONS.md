# Stripe Setup Instructions

## Quick Setup Guide

Follow these steps to enable payments on your site:

### Step 1: Create Stripe Account (5 minutes)

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete business verification:
   - Business name: Alston Analytics
   - Business type: LLC (if filed)
   - Tax ID (EIN if you have one)
3. Add business bank account (required for payouts)

### Step 2: Get API Keys (2 minutes)

1. Go to [Stripe Dashboard → Developers → API keys](https://dashboard.stripe.com/apikeys)
2. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)
3. **Important:** Start with test mode keys (`pk_test_`, `sk_test_`) for development

### Step 3: Create Your First Product (5 minutes)

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Click **"+ Add product"**
3. Fill in:
   - **Name:** Power BI Health Check
   - **Description:** 2-hour assessment call + dashboard audit report
   - **Pricing:** 
     - **Price:** $1,000.00
     - **Billing:** One time
     - **Currency:** USD
4. Click **Save product**
5. **Copy the Price ID** (starts with `price_...`) - you'll need this!

### Step 4: Add Environment Variables

1. Create `.env.local` file in `alston-analytics-v2026/` directory:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK=price_YOUR_PRICE_ID_HERE

# Webhook Secret (see Step 5)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

2. **Important:** Never commit `.env.local` to git (it's already in `.gitignore`)

### Step 5: Set Up Webhooks (For Production)

Webhooks notify your server when payments succeed. For local testing:

**Option A: Stripe CLI (Recommended for Development)**

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe login`
3. Run: `stripe listen --forward-to localhost:3000/api/webhook/stripe`
4. Copy the webhook secret (starts with `whsec_...`) to `.env.local`

**Option B: Stripe Dashboard (For Production)**

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"+ Add endpoint"**
3. Endpoint URL: `https://yourdomain.com/api/webhook/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy webhook secret to `.env.local`

### Step 6: Test Your Integration

1. Start your dev server: `npm run dev`
2. Go to your homepage
3. Find the Power BI Architecture service card
4. Click "Purchase Now $1,000"
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
6. Complete the checkout
7. You should be redirected to `/purchase/success`

### Step 7: Go Live (When Ready)

1. Switch to live mode in Stripe Dashboard
2. Get live API keys (replace test keys in `.env.local`)
3. Update webhook endpoint to production URL
4. Test with a real card (small amount, then refund)

---

## Product Configuration

### Recommended Products to Create in Stripe:

1. **Power BI Health Check** - $1,000 (one-time)
   - Price ID env var: `NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK`

2. **Strategic Clarity Session** - $2,500 (one-time)
   - Price ID env var: `NEXT_PUBLIC_STRIPE_PRICE_ID_STRATEGIC_SESSION`

3. **Starter Dashboard Package** - $5,000 (one-time)
   - Price ID env var: `NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER_DASHBOARD`

4. **Sovereign Mind Newsletter** - $29/month (subscription)
   - Price ID env var: `NEXT_PUBLIC_STRIPE_PRICE_ID_NEWSLETTER`

---

## Testing Checklist

- [ ] Test successful payment with test card
- [ ] Test payment cancellation
- [ ] Verify success page displays correctly
- [ ] Verify cancel page displays correctly
- [ ] Test webhook receives events (check server logs)
- [ ] Test on mobile device
- [ ] Verify email confirmation (if implemented)

---

## Stripe Test Cards

Use these cards in test mode:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires Authentication:** `4000 0025 0000 3155`

More test cards: https://stripe.com/docs/testing

---

## Troubleshooting

### "Invalid API Key"
- Check that keys start with `pk_test_` / `sk_test_` (test mode)
- Ensure no extra spaces in `.env.local`
- Restart dev server after adding env variables

### "Price not found"
- Verify price ID in Stripe Dashboard → Products
- Ensure price ID is in correct environment (test vs live)

### Webhook not working
- Verify webhook secret matches Stripe Dashboard
- Check that webhook endpoint URL is correct
- For local testing, use Stripe CLI

### Payment succeeds but no confirmation
- Check webhook is configured correctly
- Verify webhook secret in environment variables
- Check server logs for webhook events

---

## Next Steps After Setup

1. **Add More Products:** Create additional products in Stripe and add price IDs to env
2. **Email Confirmation:** Set up email sending (SendGrid, Resend, etc.) in webhook handler
3. **Order Management:** Create database table to track orders
4. **Customer Portal:** Add Stripe Customer Portal for subscription management
5. **Analytics:** Track purchase events in your analytics tool

---

## Security Notes

- ✅ Never commit `.env.local` to git
- ✅ Use environment variables for all secrets
- ✅ Test in test mode before going live
- ✅ Verify webhook signatures (already implemented)
- ✅ Use HTTPS in production (required for Stripe)

---

## Support

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Stripe Discord: https://stripe.com/discord

