# Setup Guide for Analytics & Error Tracking

## 📊 Analytics Setup

The site supports multiple analytics providers. Choose one or more:

### Google Analytics 4 (Recommended)

1. Get your GA4 Measurement ID from [Google Analytics](https://analytics.google.com/)
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Analytics will automatically initialize when the app loads

### Plausible Analytics (Privacy-Friendly)

1. Get your domain from [Plausible](https://plausible.io/)
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alstonanalytics.com
   ```
3. Analytics will automatically initialize when the app loads

### Vercel Analytics

1. Install package: `npm install @vercel/analytics`
2. Import in `app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   // Add to your component:
   <Analytics />
   ```

---

## 🔍 Error Tracking Setup

### Sentry (Recommended)

1. Create account at [sentry.io](https://sentry.io/)
2. Create a project and get your DSN
3. Install package: `npm install @sentry/nextjs`
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   ```
5. Uncomment the Sentry initialization code in `lib/error-logging.ts` (lines 59-82)

### LogRocket (Alternative)

1. Create account at [logrocket.com](https://logrocket.com/)
2. Install package: `npm install logrocket`
3. Add initialization to `lib/error-logging.ts`:
   ```ts
   import LogRocket from 'logrocket';
   LogRocket.init('your-app-id');
   ```

---

## 🔐 Environment Variables

Create `.env.local` in the `alston-analytics-v2026` directory:

```env
# Analytics (optional - choose one or more)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alstonanalytics.com

# Error Tracking (optional)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# OpenAI API (required for chat)
OPENAI_API_KEY=sk-xxxxx
```

---

## 📝 Notes

- Analytics and error tracking are **optional** - the site works without them
- All tracking respects user privacy (no cookies for GA4, Plausible is GDPR-compliant)
- Error logging always uses console.log as fallback
- Security headers are automatically applied (no configuration needed)

---

## ✅ Verification

After setup, verify:

1. **Analytics:** Check your analytics dashboard after visiting the site
2. **Error Tracking:** Test by triggering an error in the browser console
3. **Security Headers:** Use [Security Headers](https://securityheaders.com/) to verify

---

For questions, see the audit report: `COMPREHENSIVE_SITE_AUDIT.md`


