# Environment Variables Setup

## ⚠️ SECURITY WARNING

You've shared LIVE Stripe API keys. These are sensitive credentials that can process real payments.

**What to do:**
1. ✅ Use these keys in `.env.local` (already in `.gitignore` - safe)
2. ✅ Add them to Vercel environment variables for production
3. ❌ Never commit them to Git
4. ⚠️ If you're concerned about security, regenerate the keys in Stripe Dashboard

---

## Step 1: Update `.env.local` File

Your `.env.local` file already exists. Open it and add/update these values:

```env
# Stripe Configuration (LIVE KEYS - Use your actual keys from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Stripe Price ID (Create product in Stripe Dashboard first - see Step 2)
NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK=price_YOUR_PRICE_ID_HERE

# Stripe Webhook Secret (Set up webhook - see Step 3)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# OpenAI API (if you have one)
OPENAI_API_KEY=your-openai-key-here
```

---

## Step 2: Create Product in Stripe Dashboard

You need to create a product and get the Price ID:

1. Go to: https://dashboard.stripe.com/products
2. Click **"+ Add product"**
3. Fill in:
   - **Name:** Power BI Health Check
   - **Description:** 2-hour assessment call + dashboard audit report with priority recommendations
   - **Pricing:**
     - **Price:** $1,000.00
     - **Billing:** One time
     - **Currency:** USD
4. Click **"Save product"**
5. **Copy the Price ID** (starts with `price_...`)
6. Add it to `.env.local` as `NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK`

---

## Step 3: Set Up Webhook

**For Local Development:**
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhook/stripe
# Copy the webhook secret (whsec_...) that appears
# Add it to .env.local as STRIPE_WEBHOOK_SECRET
```

**For Production:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"+ Add endpoint"**
3. Endpoint URL: `https://alstonanalytics.com/api/webhook/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy webhook secret (starts with `whsec_...`)
6. Add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

## Step 4: Test Locally

1. Make sure `.env.local` has all the keys
2. Start dev server: `npm run dev`
3. Go to homepage → Power BI Architecture card
4. Click "Purchase Now $1,000"
5. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
6. Complete checkout

---

## Step 5: Add to Vercel (Production)

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these (same values from `.env.local`):
   - `STRIPE_SECRET_KEY` = (your secret key from Stripe Dashboard)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = (your publishable key from Stripe Dashboard)
   - `NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK` = (your price ID)
   - `STRIPE_WEBHOOK_SECRET` = (your webhook secret)
5. Select **"Production"** environment
6. Click **Save**
7. Redeploy

---

## Current Status

✅ Stripe keys provided (LIVE)  
⏳ Product creation needed (get Price ID)  
⏳ Webhook setup needed (get webhook secret)  
⏳ `.env.local` file needs to be updated manually  
⏳ Vercel environment variables need to be added  

---

## Quick Checklist

- [ ] Update `.env.local` with Stripe keys
- [ ] Create product in Stripe Dashboard
- [ ] Get Price ID and add to `.env.local`
- [ ] Set up webhook (local or production)
- [ ] Get webhook secret and add to `.env.local`
- [ ] Test checkout locally
- [ ] Add all variables to Vercel
- [ ] Redeploy to production

---

## Security Reminder

Since you shared LIVE keys in chat:
- ✅ They're only in `.env.local` (safe)
- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ⚠️ Consider regenerating keys if you're concerned about security
- ⚠️ Don't share keys in chat/messages in the future

