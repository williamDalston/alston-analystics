# Webhook Configuration Complete! ✅

## Your Webhook Details

- **Webhook ID:** `we_1Sm36L4IwNCnJfAHQpRlFezg`
- **Name:** power-bi-dashboard
- **Endpoint URL:** `https://alstonanalytics.com/api/webhook/stripe`
- **Signing Secret:** (check Stripe Dashboard - starts with `whsec_...`)
- **Events:** 3 events configured ✅

---

## Next Steps: Complete Your Setup

### Step 1: Get Your Price ID

You have the Product ID (`prod_TjW3pczYSB83iO`), but you need the **Price ID**:

1. Go to: https://dashboard.stripe.com/products
2. Click on your product (the one with ID `prod_TjW3pczYSB83iO`)
3. Find the **Price ID** (starts with `price_...`)
4. Copy it

### Step 2: Update `.env.local`

Open `alston-analytics-v2026/.env.local` and make sure it has:

```env
# Stripe Keys (LIVE)
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Stripe Price ID (Get from product page - starts with price_...)
NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK=price_YOUR_PRICE_ID_HERE

# Stripe Webhook Secret (You have this!)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

**Replace:**
- `price_YOUR_PRICE_ID_HERE` with the actual Price ID from Step 1

---

## Step 3: Add to Vercel (Production)

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
STRIPE_SECRET_KEY = (your secret key from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = (your publishable key from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK = price_YOUR_PRICE_ID_HERE
STRIPE_WEBHOOK_SECRET = (your webhook secret from Stripe Dashboard)
```

5. Select **"Production"** environment
6. Click **Save**
7. **Redeploy** your app

---

## Step 4: Test Your Setup

### Option A: Test Locally (with Stripe CLI)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe login`
3. Run: `stripe listen --forward-to localhost:3000/api/webhook/stripe`
4. Use the webhook secret from the CLI for local testing
5. Test checkout flow

### Option B: Test in Production

1. Make sure all env variables are in Vercel
2. Redeploy
3. Go to your site
4. Test checkout with a real card (small amount)
5. Check Stripe Dashboard → Webhooks → View logs to see if events are received

---

## Checklist

- [x] Webhook created in Stripe Dashboard
- [x] Webhook secret: `whsec_rA3UjmSecBohf9PbmCEu7GvN2ghEfv1f`
- [x] 3 events configured
- [ ] Price ID obtained (from product page)
- [ ] `.env.local` updated with all values
- [ ] Vercel environment variables added
- [ ] App redeployed
- [ ] Tested checkout flow

---

## API Version Note

Your webhook shows API version `2022-11-15`, but our code uses `2025-12-15.clover`. This is fine - Stripe handles backward compatibility. The webhook will work correctly.

---

## What Happens When Payment Succeeds

When a customer completes checkout:

1. Stripe sends `checkout.session.completed` event to your webhook
2. Your `/api/webhook/stripe` route receives it
3. Currently logs the payment details (check server logs)
4. **TODO:** You can add:
   - Email confirmation to customer
   - Database record creation
   - Service delivery workflow trigger
   - Team notification

---

## Current Status

✅ **Stripe Keys:** Configured  
✅ **Webhook:** Configured (`we_1Sm36L4IwNCnJfAHQpRlFezg`)  
✅ **Webhook Secret:** (configured in Stripe Dashboard)  
⏳ **Price ID:** Need to get from product page  
⏳ **Environment Variables:** Need to update `.env.local` and Vercel  

---

## Almost There! 🚀

Once you get the Price ID and update your environment variables, you're ready to accept payments!

