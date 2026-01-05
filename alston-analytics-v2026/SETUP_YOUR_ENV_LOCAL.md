# Setup Instructions for Your Stripe Keys

## ⚠️ IMPORTANT: Your Keys Need to Be Added Locally

You've provided your Stripe LIVE API keys. They need to be added to `.env.local` file manually (this file is in `.gitignore` for security).

---

## Action Required: Create/Update `.env.local`

You've provided your Stripe LIVE API keys. Add them to `.env.local`:

1. Open the file: `alston-analytics-v2026/.env.local`
2. Add or update these lines (use your actual keys):

```env
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
NEXT_PUBLIC_STRIPE_PRICE_ID_POWER_BI_HEALTH_CHECK=price_YOUR_PRICE_ID_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

**Replace:**
- `price_YOUR_PRICE_ID_HERE` - Get this from Stripe Dashboard (create product first)
- `whsec_YOUR_WEBHOOK_SECRET_HERE` - Get this from Stripe webhook setup

---

## Next Steps

1. ✅ Add keys to `.env.local` (you have the keys above)
2. ⏳ Create product in Stripe Dashboard → Get Price ID
3. ⏳ Set up webhook → Get webhook secret
4. ⏳ Test locally
5. ⏳ Add to Vercel for production

See `ENV_SETUP.md` for detailed instructions.

