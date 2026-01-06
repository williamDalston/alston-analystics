# Vercel Deployment Setup

## ⚠️ IMPORTANT: Root Directory Configuration Required

Your Next.js app is located in the `alston-analytics-v2026` subdirectory, not at the repository root.

## Steps to Deploy:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (or create a new one)
3. **Go to Settings** (gear icon)
4. **Click "General"** tab
5. **Scroll down to "Root Directory"**
6. **Click "Edit"**
7. **Enter**: `alston-analytics-v2026`
8. **Click "Save"**

After saving, Vercel will:
- ✅ Detect Next.js automatically
- ✅ Build from the correct directory
- ✅ Deploy your enhanced app

## Alternative: Quick Deploy via Vercel CLI

If you prefer command line:

```bash
cd alston-analytics-v2026
vercel login
vercel --prod
```

## Troubleshooting

If you still get "No Next.js version detected":
- Double-check the Root Directory is set to exactly: `alston-analytics-v2026`
- Make sure there are no extra spaces
- Redeploy after changing the setting




