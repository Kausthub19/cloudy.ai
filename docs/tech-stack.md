 # Tech Stack and Cloud Choices

 This document specifies the concrete technologies used to implement the
 platform, chosen to balance developer productivity, scalability, and an
 open-source friendly setup.

 ## Frontend

 - **Framework**: React (TypeScript) – widely adopted, strong ecosystem, good for
   building a modern SPA with routing and state management.
 - **Routing**: React Router.
 - **Styling/UI**:
   - Tailwind CSS for rapid, consistent styling.
   - A small headless component library (e.g., Radix UI patterns) can be layered
     in later if needed.
 - **Build tooling**: Vite – fast dev server and simple configuration suitable
   for open-source projects.

 ## Backend

 - **Language/runtime**: Node.js (TypeScript) – good ecosystem for APIs,
   integrations, and async workloads.
 - **Framework**: Express.js with a modular route/controller structure.
 - **Auth**:
   - JWT-based session tokens for the SPA.
   - OAuth 2.0 / OpenID Connect for Google, Facebook, GitHub sign-in.
 - **Payments/Billing**: Stripe (or a similar provider) for subscriptions and
   usage-based billing in later iterations.

 ## Data and Storage

 - **Primary database**: PostgreSQL
   - Stores users, plans, subscriptions, sessions, history, marketplace items,
     and integrations.
 - **Caching & rate limiting state**: Redis
   - Stores short-lived counters and quota state for rate limiting and queues.
 - **Object storage**: S3-compatible (e.g., AWS S3, MinIO)
   - Stores user files, exported videos, thumbnails, and marketplace assets.

 ## Compute and orchestration

 - **Container orchestration**: Kubernetes
   - Schedules remote app sessions as pods with per-session resource limits.
 - **Session runner**:
   - Each session runs inside a container image that exposes a browser-accessible
     UI.
   - Access is streamed to the user via a web gateway (e.g., noVNC/WebRTC-based
     solution) in a separate component.
 - **Job queue**:
   - Redis-backed queue or a dedicated queue system (e.g., RabbitMQ, AWS SQS)
     for session start/stop jobs and background tasks (billing, analytics).

 ## Observability and telemetry

 - **Metrics**: Prometheus-compatible metrics exported from backend and workers.
 - **Logs**: Structured logs (JSON) for API and workers, consumable by any log
   aggregation system.
 - **Usage analytics store**: PostgreSQL initially, with the option to introduce
   a columnar store such as ClickHouse later if needed.

 ## Development and tooling

 - **Monorepo**:
   - `frontend/` (React/Vite/Tailwind).
   - `backend/` (Express/TypeScript).
   - `docs/` for product and architecture documentation.
 - **Package management**: npm or pnpm (either works; npm is assumed by default).
 - **Linting/formatting**:
   - ESLint and Prettier for both frontend and backend TypeScript.
 - **Testing**:
   - Jest or Vitest for unit tests.
   - Playwright or Cypress for end-to-end tests in later stages.

 This stack is intentionally mainstream and approachable so contributors can
 easily understand and extend it, while still supporting the long-term goals of
 high performance and cloud portability.

