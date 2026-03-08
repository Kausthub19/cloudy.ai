 # Cloud Remote Compute Platform

 This project is an open-source platform that lets users run heavy applications
 (video editors, IDEs, data tools, etc.) on powerful cloud servers through a
 browser-based interface. The user’s local device only needs to run a modern
 web browser; all compute runs in the cloud.

 ## High-level goals

 - Provide a smooth onboarding experience (intro → signup/login → plans → dashboard).
 - Let users start remote app sessions (e.g., cloud video editor, cloud IDE) from the browser.
 - Track usage and enforce plan-based rate limits so free usage is sustainable.
 - Offer special student credits via academic verification.
 - Expose integrations (Google, GitHub, YouTube, Instagram, etc.) and a creator marketplace.

 ## Monorepo layout

 - `frontend/` – Single Page Application (intro, auth, pricing, dashboard, marketplace, history).
 - `backend/` – API server (auth, billing, rate limiting, sessions, history, marketplace).
 - `docs/` – Product and architecture documentation (user flows, tech stack, orchestration).

 ## Getting started

 1. Install Node.js (LTS).
 2. In `backend/`:
    - Run `npm install`.
    - Run `npm run dev` to start the API on `http://localhost:4000`.
 3. In `frontend/`:
    - Run `npm install`.
    - Run `npm run dev` to start the SPA on `http://localhost:5173`.
 4. Open `http://localhost:5173` in your browser and walk through:
    - Landing → Auth (mock) → Plans → App dashboard (Apps, History, Integrations, Marketplace).

 More detailed instructions will be added as the implementation evolves.

