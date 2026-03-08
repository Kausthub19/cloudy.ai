 # Auth and Billing Design (Prototype-Level)

 This document outlines how authentication, plans, billing, and student credits
 are intended to work. The codebase currently contains only a lightweight mock
 implementation suitable for demos.

 ## Authentication

 - **Goals**
   - Allow users to sign up or log in with:
     - Email/password.
     - Google, Facebook, GitHub (via OAuth 2.0 / OIDC).
   - Issue short-lived access tokens for the SPA, backed by refresh tokens or
     server-side sessions in a real deployment.

 - **Prototype**
   - The frontend auth page (`/auth`) fakes login locally:
     - Clicking any social button or submitting the form sets a demo user in
       memory and navigates to plan selection.
   - No real OAuth or password logic is executed; this exists only to showcase
     the UX and flow.

 - **Planned backend implementation**
   - Use a dedicated auth controller in the backend:
     - `/auth/email/register`, `/auth/email/login`.
     - `/auth/oauth/google`, `/auth/oauth/facebook`, `/auth/oauth/github`.
   - Store users and their auth providers in PostgreSQL.
   - Issue signed JWT access tokens with a short TTL and refresh tokens stored
     either:
     - In an HTTP-only cookie, or
     - In a server-side session store (e.g., Redis) for extra security.

 ## Plans and subscriptions

 - **Plan definitions**
   - Plans (Free, Pro, Student, Enterprise) are stored in a `plans` table:
     - `id`, `name`, `price_monthly`, `minutes_included`, `concurrent_sessions`,
       `storage_gb`, `features`.
   - The backend exposes `/api/plans` to let the frontend render the pricing UI.

 - **Subscriptions**
   - Users have an associated `subscriptions` record:
     - References a plan.
     - Contains Stripe (or other provider) customer and subscription IDs.
     - Tracks status (`active`, `past_due`, `canceled`).

 - **Prototype**
   - The `Plans` page in the frontend uses static values and updates the
     in-memory user plan.
   - No real billing or subscription state is persisted.

 - **Planned billing integration**
   - Use Stripe for SaaS subscriptions:
     - Backend exposes endpoints to create checkout sessions and billing portal
       sessions.
     - Webhooks from Stripe update subscription status and next-renewal
       metadata.
   - Enterprise plans are handled via a separate sales/support flow.

 ## Student verification and credits

 - **Goals**
   - Offer discounted pricing and additional credits to verified students
     without compromising on abuse prevention.

 - **Verification**
   - Verify students via:
     - Academic email domain (e.g., `.edu`), plus confirmation email.
     - Or a third-party student verification provider.
   - Store verification status and expiry date on the user record.

 - **Credits**
   - Represent credits as `credit_grants` records:
     - User reference.
     - Amount of credits.
     - Source (e.g., `student_monthly_drop`, `promo_code`, `hackathon`).
     - Expiry date.
   - A monthly job can issue new student credits to eligible users.

 - **Prototype**
   - The Student plan button on the Plans page simply marks the in-memory user
     as `student` with an example credit balance.
   - No real verification or recurring grants are implemented yet.

