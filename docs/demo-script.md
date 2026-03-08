 # Demo Script: Cloud Remote Compute Prototype

 This script helps you narrate a short demo that shows the vision of the
 platform end-to-end.

 ## 1. Landing page – set the story

 - Open `http://localhost:5173`.
 - Say: “Imagine a student with a low-spec laptop who wants to edit a big 4K
   video. Instead of upgrading hardware, they open this app.”
 - Point out:
   - Tagline: “Edit big videos on tiny laptops.”
   - Student scenario card on the right.
   - CTAs: *Get started* and *View plans*.

 ## 2. Auth – simple mocked sign-in

 - Click **Get started – it’s free**.
 - Explain:
   - “Here you could sign in with Google, Facebook, GitHub, or email/password.
     For this prototype, all the buttons do a mocked login.”
 - Click **Continue with Google (mock)**.
 - Mention:
   - “Under the hood in a real system, this would be OAuth. For the prototype,
     it just calls a tiny backend `/api/demo-user` endpoint and stores a demo
     user in memory.”

 ## 3. Plans – free, pro, and student

 - After login, the app navigates to **Plans**.
 - Explain:
   - “Plan data here is coming from the backend `/api/plans` endpoint so we have
     a real API boundary, even though everything is still in-memory.”
 - Walk through tiles:
   - **Free** – tight but useful minutes, good for trying the service.
   - **Pro** – higher minutes and priority.
   - **Student** – discounted price plus extra credits.
 - Click **I’m a student (mock)** or **Continue with Free**, depending on the
   story you want to highlight.
 - Note:
   - “In production this would be backed by Stripe and student verification;
     here it just updates the in-memory user.”

 ## 4. Dashboard – apps and usage limits

 - You’re now on `/app` with the left navigation.
 - Highlight:
   - **Apps** tab selected.
   - Header showing the current plan and usage (minutes used vs included).
 - Point to **Cloud Video Studio** card:
   - “This represents an Adobe Express–style video editor running in the cloud.”
 - Click **Start cloud session**:
   - The preview text switches to “Live cloud session streaming here…”.
   - Explain:
     - “In a real system this would launch a container or VM on Kubernetes and
       stream the UI back to the browser. For the prototype, we simulate a
       session and consume 15 minutes of your quota.”
 - Click the button a few times until the usage nears or hits the limit.
 - Show:
   - “Once we hit the free limit, the button disables and we suggest upgrading.
     That’s our rate-limiting concept in action.”

 ## 5. History – past sessions and telemetry

 - Click **History** in the left nav.
 - Explain:
   - “This shows a simple table of past sessions: what app was used, when, how
     long, and a notional credit cost.”
   - “In production, this would come from a usage store that tracks CPU/GPU
     minutes and I/O for billing and analytics.”

 ## 6. Integrations – future connectivity

 - Click **Integrations**.
 - Highlight:
   - Cards for **YouTube**, **Instagram**, and **GitHub**.
 - Say:
   - “These are placeholders showing where one-click connections would live.
     Think: export edited videos directly to YouTube, prepare reels for
     Instagram, or connect a cloud IDE to GitHub.”

 ## 7. Marketplace – Pinterest-style creator space

 - Click **Marketplace**.
 - Explain:
   - “This is a Pinterest-inspired grid of templates. Each card is a template or
     workflow – for example, a YouTube 4K workflow, student portfolio builder,
     or data science lab.”
   - “In the full version, creators could publish, like, and fork these
     templates, and each template would define a cloud environment and optional
     automations.”

 ## 8. Wrap up – why this matters

 - Return to the header where the plan and usage are shown.
 - Conclude:
   - “This prototype already walks through the core story: landing → auth →
     plans → cloud app usage with rate limits → history → integrations →
     marketplace.”
   - “Underneath, we have a small backend serving plans and a demo user,
     ready to be expanded into real auth, billing, and Kubernetes-backed remote
     sessions.”

