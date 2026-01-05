# Stripe Quick Setup - Your Keys Are Configured

## ⚠️ Security Note

**IMPORTANT:** Your Stripe live API keys have been configured. These keys should:
- ✅ Only exist in `.env.local` (already in `.gitignore`)
- ✅ Never be committed to Git
- ✅ Be added to Vercel environment variables for production
- ❌ Never be shared in chat/messages again

If these keys were exposed, you should:
1. Go to [Stripe Dashboard → Developers → API keys](https://dashboard.stripe.com/apikeys)
2. Click "Reveal live key token" and then "Roll key" to regenerate
3. Update all places where the key is used

---

## What's Already Done

✅ Stripe packages installed  
✅ API routes created  
✅ Purchase button component ready  
✅ Success/cancel pages created  
✅ CSP headers configured for Stripe  

---

## Next Steps

### Step 1: Create Your First Product in Stripe (5 minutes)

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Click **"+ Add product"**
3. Fill in:
   - **Name:** Power BI Health Check
   - **Description:** 2-hour assessment call + dashboard audit report with priority recommendations
   - **Pricing:**
     - **Price:** $1,000.00
     - **Billing:** One time
     - **Currency:** USD
4. Click **"Save product"**
5. **Copy the Price ID** (starts with `price_...`) - you'll need this!

### Step 2: Get Webhook Secret (For Production)

**For Local Development:**
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhook/stripe
# Copy the webhook secret (whsec_...) that appears
```

**For Production:**
1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"+ Add endpoint"**
3. Endpoint URL: `https://yourdomain.com/api/webhook/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy webhook secret (starts with `whsec_...`)

### Step 3: Create `.env.local` File

Create a file named `.env.local` in the `alston-analytics-v2026/` directory with:

```env
# Stripe Configuration (LIVE KEYS - Use your actual keys from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Stripe Price ID (Get this from Step 1 above)
NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK=price_YOUR_PRICE_ID_HERE

# Stripe Webhook Secret (Get this from Step 2 above)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# OpenAI API (if you have one)
OPENAI_API_KEY=your-openai-key-here
```

**Replace:**
- `price_YOUR_PRICE_ID_HERE` with the Price ID from Step 1
- `whsec_YOUR_WEBHOOK_SECRET_HERE` with webhook secret from Step 2

### Step 4: Test It Locally

1. Start dev server: `npm run dev`
2. Go to homepage
3. Scroll to "Power BI Architecture" service card
4. Click "Purchase Now $1,000"
5. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
6. Complete checkout
7. You should be redirected to `/purchase/success`

**Note:** Even with live keys, you can test with test card numbers in test mode, but since these are LIVE keys, you'll be processing real payments. Be careful!

### Step 5: Add to Vercel (For Production)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables (use the same values from `.env.local`):
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK`
   - `STRIPE_WEBHOOK_SECRET`
5. Select **"Production"** environment (or all environments)
6. Click **Save**
7. Redeploy your app

---

## Testing Checklist

- [ ] Created product in Stripe Dashboard
- [ ] Copied Price ID
- [ ] Set up webhook (local or production)
- [ ] Created `.env.local` file with all keys
- [ ] Tested checkout flow locally
- [ ] Verified success page works
- [ ] Added keys to Vercel (for production)
- [ ] Tested with real card (small amount, then refund)

---

## Current Configuration Status

✅ **Stripe Keys:** Configured (LIVE keys)  
⏳ **Price ID:** Need to create product in Stripe Dashboard  
⏳ **Webhook Secret:** Need to set up webhook  
⏳ **Environment File:** Need to create `.env.local`  

---

## Need Help?

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- See `STRIPE_SETUP_INSTRUCTIONS.md` for detailed guide

