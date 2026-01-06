# Email Notification Setup

## Overview
When someone purchases the Power BI Health Check, you'll receive an email notification and the customer will receive a confirmation email.

## Quick Setup (Recommended: Resend)

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your domain (or use their test domain for development)

### 2. Get API Key
1. Go to API Keys in Resend dashboard
2. Create a new API key
3. Copy the key (starts with `re_`)

### 3. Add to Environment Variables

**Local (.env.local):**
```env
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=your-email@alstonanalytics.com
```

**Vercel:**
1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` = `re_your_api_key_here`
   - `NOTIFICATION_EMAIL` = `your-email@alstonanalytics.com`
4. Redeploy

## Alternative: SendGrid

If you prefer SendGrid:

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Add to environment:
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   NOTIFICATION_EMAIL=your-email@alstonanalytics.com
   ```

## What Happens When Someone Purchases

1. **Customer completes payment** on Stripe Checkout
2. **Stripe sends webhook** to `/api/webhook/stripe`
3. **Two emails are sent:**
   - **To you:** Notification with customer email, product, amount, and Stripe link
   - **To customer:** Confirmation email with next steps

## Testing

### Test Without Email Provider
- Emails will be logged to console
- Check Vercel function logs to see email content

### Test With Resend
1. Use Resend's test mode (no domain verification needed)
2. Check your Resend dashboard for sent emails
3. Check spam folder if emails don't arrive

## Email Templates

The emails use HTML templates with:
- Professional styling
- Product details
- Customer information
- Next steps for customer
- Stripe dashboard link for you

## Troubleshooting

### Emails Not Sending
1. Check environment variables are set correctly
2. Verify API key is valid
3. Check Vercel function logs for errors
4. Ensure domain is verified (for production)

### Email Goes to Spam
1. Verify your domain with Resend/SendGrid
2. Set up SPF/DKIM records
3. Use a professional "from" address

## Next Steps

After setup:
1. Make a test purchase
2. Check your email for notification
3. Verify customer receives confirmation
4. Customize email templates in `lib/send-email.ts` if needed

