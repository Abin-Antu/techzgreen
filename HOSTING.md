# Hosting Setup — TechzGreen

Deploy target: **Vercel** (recommended) or **Netlify**.

## Vercel

### 1. Push to GitHub
Ensure repo is on GitHub. Do **not** commit `env` or `.env` files (already in `.gitignore`).

### 2. Import project
- Go to [vercel.com/new](https://vercel.com/new)
- Sign in with GitHub
- Select the `techzgreen` repo
- Click **Import**

### 3. Build settings (auto-detected)
Vercel detects Vite automatically. Verify these:

| Setting           | Value             |
|-------------------|-------------------|
| Framework Preset  | Vite              |
| Build Command     | `npm run build`   |
| Output Directory  | `dist`            |
| Install Command   | `npm install`     |
| Node Version      | 20.x              |

### 4. Environment variables
Add in **Project Settings → Environment Variables**:

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Apply to **Production**, **Preview**, and **Development**.

### 5. SPA rewrites (important)
React Router uses client-side routing. Without rewrites, refreshing `/about` or `/shop` returns 404.

Create `vercel.json` in repo root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 6. Deploy
Click **Deploy**. Auto-redeploys on every push to `main`.

---

## Netlify (alternative)

Same env vars. Add `_redirects` file to `public/` folder:

```
/*    /index.html   200
```

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`

---

## Supabase config

After deploy, update Supabase Auth settings:

1. **Supabase Dashboard → Authentication → URL Configuration**
2. Add your Vercel URL (e.g. `https://techzgreen.vercel.app`) to:
   - **Site URL**
   - **Redirect URLs** (for Google OAuth callback)

Otherwise Google sign-in returns "redirect URI mismatch".

---

## Custom domain (optional)

Vercel: **Project → Settings → Domains** → add your domain → follow DNS instructions.

Remember to update Supabase Auth **Site URL** to the custom domain.

---

## Troubleshooting

**Build fails with peer dep error (ERESOLVE):**
Add `.npmrc` in repo root:
```
legacy-peer-deps=true
```

**Page refresh returns 404:**
Missing SPA rewrite. Add `vercel.json` or `_redirects` (see above).

**Google OAuth fails:**
Supabase Auth redirect URL doesn't match deployed URL. Update in Supabase dashboard.

**Images from `/src/assets/` don't load in production:**
Import images in JS/TS code (`import logo from './logo.png'`) — don't reference `/src/` paths directly in HTML.

**Blank page after deploy:**
Check browser console. Usually missing env vars — verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Vercel.
