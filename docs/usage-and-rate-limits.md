 # Usage Tracking and Rate Limits

 This document describes the intended metrics, quotas, and enforcement logic for
 rate limiting across different plans and student credits. The prototype
 implements a minimal, frontend-only demonstration.

 ## Dimensions to track

 - **Compute time**
   - Total session minutes per user (and per organization in future).
   - Compute minutes can be broken down by:
     - App type (video, IDE, data, etc.).
     - Resource class (CPU-only, GPU-light, GPU-heavy).

 - **Concurrent sessions**
   - Number of active sessions per user at a point in time.
   - Enforced according to plan (e.g., 1 for Free, 3 for Pro).

 - **Storage**
   - Total GB stored per user.
   - Per-file maximum size limits.

 - **Data transfer**
   - Egress bandwidth per month for streaming and file downloads.

 - **API requests**
   - Requests per minute/hour for critical endpoints to guard against abuse.

 ## Plan-based quotas

 - **Free**
   - 60 minutes/month of compute.
   - 1 concurrent session.
   - Modest storage cap.
   - Lower scheduling priority.

 - **Pro**
   - 600 minutes/month of compute.
   - 3 concurrent sessions.
   - Higher storage and bandwidth limits.
   - Higher scheduling priority.

 - **Student**
   - 240 minutes/month of compute.
   - Additional student credits (e.g., 120 units) that can be spent on premium
     resources (e.g., GPU-heavy sessions).

 ## Enforcement strategy

 - **Real backend (future)**
   - A `RateLimiter` module will:
     - Consult the user’s plan and `UsageRecord` data before granting new
       sessions.
     - Update counters in a fast store (e.g., Redis) as usage accrues.
   - Periodic jobs reconcile Redis counters with durable usage in PostgreSQL or
     a metrics store.
   - API endpoints that create sessions or export large files will:
     - Check quotas.
     - Return meaningful errors when limits are reached, allowing the frontend
       to present upgrade or wait options.

 - **Prototype**
   - The frontend keeps mock values for:
     - `minutesUsed`.
     - `minutesIncluded` per plan.
   - Starting a mock session:
     - Increases `minutesUsed`.
     - Blocks new sessions via the UI once `minutesUsed >= minutesIncluded`.
   - This gives a clear visual hint of rate limiting without needing backend
     infrastructure.

