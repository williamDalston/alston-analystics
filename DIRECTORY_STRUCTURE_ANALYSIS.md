# Directory Structure Analysis & Confusion Fix

## 🔍 Current Structure Issues

### Problem 1: Conflicting `vercel.json` Files

**ROOT `vercel.json`** (WRONG - conflicts with Vercel Root Directory setting):
```json
{
  "buildCommand": "cd alston-analytics-v2026 && npm install --legacy-peer-deps && npm run build",
  "outputDirectory": "alston-analytics-v2026/.next",
  "installCommand": "cd alston-analytics-v2026 && npm install --legacy-peer-deps",
  "framework": null,
  "ignoreCommand": "git diff --quiet HEAD^ HEAD alston-analytics-v2026/"
}
```

**SUB `alston-analytics-v2026/vercel.json`** (CORRECT - used when Root Directory is set):
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "outputDirectory": ".next"
}
```

### Problem 2: Old Project Files in Root

The repository root contains old files from a previous project:
- `index.html`
- `bundle.js`
- `build.js`
- `app.js`
- `components/` (old JS files)
- `utils/scroll.js`
- `privacy-policy.html`
- `terms-of-service.html`

These are NOT part of the Next.js app in `alston-analytics-v2026/`.

### Problem 3: Two Different Projects

1. **Old Project (Root)**: Vanilla React/JS bundle-based site
2. **New Project (Subdirectory)**: Next.js 16 app in `alston-analytics-v2026/`

## ✅ Correct Structure (What Vercel Should See)

When Root Directory is set to `alston-analytics-v2026`, Vercel should see:

```
alston-analytics-v2026/          ← This becomes the root for Vercel
├── app/
├── components/
├── public/
├── package.json                 ← Vercel reads this
├── next.config.ts               ← Vercel reads this
├── vercel.json                  ← Vercel reads this (OPTIONAL)
└── ... (all Next.js files)
```

## 🔧 Recommended Fixes

### Option 1: Delete Root `vercel.json` (RECOMMENDED)

Since you're setting Root Directory in Vercel Dashboard to `alston-analytics-v2026`, the ROOT `vercel.json` is **conflicting** and should be **deleted**.

**Action:**
```bash
# Delete the conflicting root vercel.json
rm vercel.json  # or delete it manually
```

**Why:** When Root Directory is set, Vercel ignores the root `vercel.json` and only reads the one in the subdirectory.

### Option 2: Keep Both But Document

If you want to keep the root `vercel.json` for some reason, rename it to indicate it's deprecated:
- `vercel.json` → `vercel.json.deprecated` or `vercel.json.old`

But this is NOT recommended - just delete it.

### Option 3: Clean Up Old Files (Optional but Recommended)

The old project files in the root can be:
1. **Deleted** if no longer needed
2. **Moved to archive/** if you want to keep them
3. **Ignored** (they won't affect Next.js app, but clutter the repo)

## 🎯 Correct Vercel Configuration

### In Vercel Dashboard:

1. **Settings → General → Root Directory**: `alston-analytics-v2026` ✅
2. **Framework Preset**: Auto-detected (Next.js) ✅
3. **Build Command**: Auto-detected (`npm run build`) ✅
4. **Output Directory**: Auto-detected (`.next`) ✅
5. **Install Command**: Auto-detected (`npm install`) ✅

### What Vercel Reads:

- ✅ `alston-analytics-v2026/package.json` (detects Next.js)
- ✅ `alston-analytics-v2026/next.config.ts` (reads config)
- ✅ `alston-analytics-v2026/vercel.json` (optional overrides)
- ❌ ROOT `vercel.json` (IGNORED when Root Directory is set)

## 📋 Action Items

### Immediate (Required):
1. ✅ **Delete `vercel.json` from repository root** (conflicts with Root Directory setting)

### Optional (Recommended):
2. ⚠️ **Archive or delete old project files** from root:
   - `index.html`
   - `bundle.js`
   - `build.js`
   - `app.js`
   - `components/` (old JS files)
   - `utils/scroll.js`
   - `privacy-policy.html`
   - `terms-of-service.html`

### Verify:
3. ✅ **Confirm Vercel Root Directory is set to**: `alston-analytics-v2026`
4. ✅ **Trigger fresh deployment** after deleting root `vercel.json`

## 🚨 Key Insight

**When you set Root Directory in Vercel Dashboard to `alston-analytics-v2026`:**
- Vercel changes its working directory to that folder
- It IGNORES any `vercel.json` in the repository root
- It ONLY reads `alston-analytics-v2026/vercel.json` (if it exists)
- Having BOTH creates confusion and potential conflicts

## ✅ Summary

**The root `vercel.json` should be deleted** because:
1. It conflicts with the Root Directory setting
2. It references paths that won't work when Root Directory is set
3. Vercel ignores it anyway when Root Directory is configured
4. It causes confusion about which config is being used

The `alston-analytics-v2026/vercel.json` is correct and optional (Next.js auto-detection works without it).

