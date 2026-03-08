# Deploy to Vercel

This guide connects your **Cloud Remote Compute** frontend to Vercel so it’s live on the web.

## Prerequisites

- The project is pushed to GitHub (e.g. `https://github.com/Kausthub19/cloudy.ai`).
- You have a Vercel account (sign up at [vercel.com](https://vercel.com) with GitHub).

## Steps

### 1. Import the repo

1. Go to [vercel.com/new](https://vercel.com/new).
2. Under **Import Git Repository**, find **cloudy.ai** (or your repo name) and click **Import**.

### 2. Set the root directory

The app to deploy lives in the **frontend** folder.

1. Next to **Root Directory**, click **Edit**.
2. Enter: `frontend`
3. Click **Continue**.

Vercel will now run all commands (install, build) from `frontend/` and use `frontend/vercel.json` for rewrites.

### 3. Build settings (defaults are fine)

- **Framework Preset:** Vite  
- **Build Command:** `npm run build`  
- **Output Directory:** `dist`  
- **Install Command:** `npm install`

You usually don’t need to change these.

### 4. Optional: backend URL

If you deploy the **backend** somewhere (e.g. Railway, Render) and want the frontend to call it:

1. Open **Environment Variables**.
2. Add:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend.railway.app` (or your API URL, no trailing slash)
3. Apply to **Production** (and Preview if you want).

Redeploy after adding or changing env vars.

### 5. Deploy

Click **Deploy**. When the build finishes, Vercel gives you a URL like:

`https://cloudy-ai-xxxx.vercel.app`

Routes like `/`, `/auth`, `/plans`, `/app`, `/app/history` will work and won’t return NOT_FOUND on refresh, thanks to `frontend/vercel.json` rewrites.

## After connecting

- Every push to `main` (or your production branch) triggers a new deployment.
- You can add a custom domain in the Vercel project **Settings → Domains**.
- The backend in `backend/` is separate; run it locally or deploy it to another service and set `VITE_API_BASE_URL` so the frontend talks to it.
