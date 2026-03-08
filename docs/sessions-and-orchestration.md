 # Session Orchestration (Concept + Prototype)

 This document explains how remote app sessions are intended to be scheduled,
 started, streamed, and terminated. The current codebase implements only a
 frontend-level mock to illustrate the user experience.

 ## Conceptual architecture

 - **Session API**
   - Backend exposes endpoints such as:
     - `POST /sessions` – request a new session for a given app type and plan.
     - `GET /sessions/:id` – retrieve status and connection details.
     - `POST /sessions/:id/end` – terminate a session.
   - Requests are validated against plan quotas and rate limits before a session
     is created.

 - **Job queue and scheduler**
   - When a session is requested:
     - A job is added to a queue (e.g., Redis-backed).
     - A scheduler service reads jobs and assigns them to Kubernetes pods/VMs
       based on:
       - App type (video editor, IDE, etc.).
       - Resource profile (CPU, RAM, GPU).
       - User plan priority (Pro and Enterprise can preempt Free).

 - **Runtime pods**
   - Each session runs in a container with:
     - The target app (e.g., video editor or IDE).
     - A thin agent exposing:
       - A web UI (noVNC/WebRTC/HTML5 app).
       - Health checks and metrics.
   - Kubernetes enforces resource requests/limits to isolate tenants.

 - **Streaming**
   - Users connect to sessions via:
     - A web gateway (e.g., a reverse proxy or dedicated stream gateway).
     - Browser-level protocol (WebRTC or websocket-based streaming).
   - The gateway authenticates requests using the API-issued session token.

 - **Termination and cleanup**
   - Sessions can end via:
     - Explicit user action.
     - Inactivity timeout.
     - Plan quota exhaustion or rate limiting.
   - Cleanup includes:
     - Persisting final state/exports to object storage.
     - Emitting a `UsageRecord` with CPU/GPU minutes and I/O.
     - Deleting the pod/VM and related ephemeral storage.

 ## Prototype behavior

 - The current prototype does **not** start real remote sessions.
 - Instead:
   - The `Apps` view in the frontend toggles a boolean `isRunning` state.
   - Starting a session:
     - Simulates consumption of 15 minutes of usage.
     - Shows a friendly message (“Live cloud session streaming here…”).
   - Rate limits are demonstrated by:
     - Preventing further session starts once the mock `minutesUsed` reaches the
       plan limit.
     - Displaying a hint that upgrading a plan would unlock more time.

 This is intentionally lightweight so the UI flows can be demoed before a full
 backend and orchestration layer are implemented.

