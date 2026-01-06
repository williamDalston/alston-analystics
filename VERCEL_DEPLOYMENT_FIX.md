# Vercel Deployment 404 Fix

## The Problem

You're getting 404 errors because Vercel is trying to serve from the repository root, but your Next.js app is in the `alston-analytics-v2026` subdirectory.

## The Solution

You need to configure Vercel to use `alston-analytics-v2026` as the Root Directory.

---

## ✅ Fix Steps (Choose One Method)

### **Method 1: Vercel Dashboard (Recommended)**

1. Go to: https://vercel.com/dashboard
2. Find your project: `alston-analystics` (or whatever it's named)
3. Click on the project
4. Go to **Settings** (gear icon in top nav)
5. Click **General** tab
6. Scroll down to **Root Directory**
7. Click **Edit**
8. Enter: `alston-analytics-v2026`
9. Click **Save**
10. **Redeploy** (go to Deployments tab → click "..." → Redeploy)

### **Method 2: Vercel CLI**

If you have Vercel CLI installed:

```bash
cd alston-analytics-v2026
vercel login
vercel link  # Link to existing project
# When prompted for root directory, enter: alston-analytics-v2026
vercel --prod
```

---

## 🔍 How to Verify It's Fixed

After setting the root directory and redeploying:

1. Check the build logs - should show Next.js build process
2. Visit your deployment URL
3. Should see the homepage, not a 404

---

## ⚠️ Important Notes

- The `vercel.json` at the repo root can cause conflicts
- **Delete or ignore the root `vercel.json`** if you set Root Directory in dashboard
- The `vercel.json` in `alston-analytics-v2026/` is fine (that's the Next.js config)

---

## 🐛 If It Still Doesn't Work

1. Check build logs in Vercel dashboard
2. Verify the Root Directory is exactly: `alston-analytics-v2026` (no trailing slash, no spaces)
3. Make sure environment variables are set (if needed)
4. Try deleting and re-importing the project

---

## 📝 Current Configuration

- **Repository:** `alston-analystics`
- **Root Directory:** Should be `alston-analytics-v2026`
- **Framework:** Next.js (auto-detected when root directory is set)
- **Build Command:** Auto-detected (or `npm run build`)
- **Output Directory:** `.next` (auto-detected)



