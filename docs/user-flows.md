 # Core User Flows

 This document describes the end-to-end user journeys for the initial version of
 the cloud remote compute platform.

 ## 1. Intro and marketing walkthrough

 1. User lands on the marketing site.
 2. A short animated hero section introduces the value:
    - “Run heavy apps on our cloud, not your laptop.”
    - Example: student editing a large video on a low-spec device.
 3. Primary calls-to-action:
    - **Get started** → signup.
    - **View plans** → pricing page.
    - **Watch demo** → embedded demo session.

 ## 2. Signup, login, and social auth

 1. User clicks **Get started**.
 2. Auth page offers:
    - Email + password signup/login.
    - **Continue with Google** (OAuth).
    - **Continue with Facebook** (OAuth).
     - **Continue with GitHub** (OAuth).
 3. After successful auth:
    - First-time users go to onboarding.
    - Returning users go directly to dashboard.

 ## 3. Onboarding and plan selection

 1. On first login, the user is shown an onboarding wizard:
    - “What will you mainly use this for?”
      - Video & content.
      - Design.
      - Coding & dev.
      - Data & AI.
      - Other.
    - Optionally preselect recommended apps based on choice.
 2. Plan selection screen:
    - **Free** plan with clear limits (minutes, storage, concurrency).
    - **Pro** monthly and yearly plans.
    - **Enterprise** contact form.
    - **Student plan** CTA explaining academic credits.
 3. User can:
    - Pick a paid plan and go through payment, or
    - Stay on the Free plan and continue to dashboard.

 ## 4. Main dashboard

 1. After onboarding/plan selection, user sees the main dashboard:
    - Top bar:
      - Current plan badge (Free/Pro/Student/Enterprise).
      - Remaining credits and usage summary (minutes used this month, storage).
      - Profile menu (settings, billing, logout).
    - Left navigation:
      - **Apps** – launch remote applications.
      - **History** – view past sessions and exports.
      - **Integrations** – manage connected services.
      - **Marketplace** – discover templates and workflows.
      - **Settings** – profile, security, billing, notifications.
    - Main content:
      - “Start a new session” section with recommended app cards.
      - “Recent sessions” list for quick resume.

 ## 5. Example journey: student editing a heavy video

 1. Student signs in with Google on a low-spec laptop.
 2. Chooses “Video & content” in onboarding and selects the **Student** plan.
 3. On dashboard, they click the **Cloud Video Editor** app card (e.g., Adobe Express–style editor).
 4. “Start session” modal:
    - Shows estimated credit usage per hour.
    - Confirms they have enough free/student credits or prompts to upgrade.
 5. A cloud session is created:
    - Browser shows a full-screen editor UI streamed from the cloud.
    - Student uploads video from device or Google Drive.
 6. Student performs edits:
    - All heavy computation (render, effects, export) runs in the cloud.
    - Usage meter in the corner shows time and credits consumed.
 7. On export:
    - Video is rendered on the server and saved to cloud storage.
    - User can:
      - Download the file.
      - Publish directly to YouTube.
      - Prepare for Instagram upload.
 8. When session ends:
    - Session details are recorded in **History** with usage metrics and cost.

 ## 6. History and telemetry

 1. User opens the **History** tab.
 2. They see a list of past sessions:
    - App name and icon.
    - Start and end time.
    - Duration and estimated cost/credits.
    - Status (completed, failed, interrupted).
    - Quick actions (re-open, duplicate configuration).
 3. An **Analytics** sub-tab shows:
    - Monthly compute minutes used vs. included quota.
    - Storage used over time.
    - Breakdown by app type (video, coding, etc.).

 ## 7. Integrations flow

 1. User opens **Integrations** from the left nav.
 2. Integrations page shows:
    - Social: YouTube, Instagram (and other platforms in future).
    - Dev: GitHub (and others later).
    - Storage: Google Drive, Dropbox, S3-compatible.
 3. For each integration:
    - User clicks **Connect**.
    - OAuth flow runs in a new window or popup.
    - On success, integration status shows as “Connected”.
 4. During sessions:
    - Video tools can pull from/push to YouTube or storage providers.
    - Coding tools can clone/push repositories using GitHub integration.

 ## 8. Creator marketplace (Pinterest-inspired)

 1. User opens the **Marketplace** tab.
 2. They see a grid of cards similar to Pinterest:
    - Each card is a **template** or **workflow**:
      - Example: “4K Video Editing Setup for YouTube”.
      - Example: “Python Data Science Lab with Jupyter and VS Code”.
      - Example: “Auto-transcode & upload to YouTube”.
    - Cards show title, owner, likes, and short description.
 3. User can:
    - Click a card to open details.
    - **Like** templates to save them.
    - **Install** a template to add it to their dashboard app list.
    - For open templates, **Fork** to customize and publish their own version.
 4. Creators can:
    - Publish new templates, choosing visibility (public, team, private).
    - Add tags, preview images, and instructions.

 ## 9. Student credit flow

 1. From the **Plans** or **Settings → Billing** page, a user selects **“I am a student”**.
 2. They verify student status via:
    - Academic email domain, or
    - Third-party student verification service.
 3. On approval:
    - Account is flagged as student.
    - Monthly credits (extra compute minutes or GPU time) are granted.
    - Credits appear in the top bar and billing page.
 4. During session start:
    - The system first consumes student credits for premium features.
    - When credits run out, the UI offers options: downgrade usage, wait until next cycle, or upgrade.

 ## 10. Enterprise and team flows (future)

 1. Enterprise visitors request a demo from the pricing page.
 2. Sales/admin users can create **organizations**, invite members, and assign roles.
 3. Enterprises get:
    - Centralized billing for all team members.
    - Usage analytics at org level.
    - Optional dedicated capacity or private clusters.

