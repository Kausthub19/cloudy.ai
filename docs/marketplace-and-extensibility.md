 # Creator Marketplace and Extensibility

 This document describes how the Pinterest-inspired creator marketplace and
 extension model is intended to work. The current prototype includes only a
 static UI to illustrate the experience.

 ## Marketplace concept

 - The marketplace is a gallery of:
   - **Templates** – preconfigured cloud environments (apps + resources).
   - **Workflows** – automations that connect apps and integrations
     (e.g., import from Drive → edit → upload to YouTube).
 - Users can:
   - Discover, like, and save templates.
   - Install templates into their own dashboard.
   - Fork existing templates to create customized versions.

 ## Data model (conceptual)

 - `marketplace_items`
   - `id`
   - `owner_user_id`
   - `title`
   - `description`
   - `kind` (`template` or `workflow`)
   - `visibility` (`public`, `private`, `team`)
   - `tags` (array)
   - `like_count`
   - `forked_from_id` (nullable)
   - `created_at`, `updated_at`

 - `marketplace_item_assets`
   - References images, thumbnails, or demo videos stored in object storage.

 - `app_definitions`
   - Represent available apps (e.g., video editor, IDE) and their resource
     profiles.

 - `workflow_definitions`
   - Represent multi-step flows (e.g., post-processing and publishing) as a
     simple graph or sequence.

 ## Extension specification (high level)

 - A **template** can be described by a small JSON/YAML document, for example:

   ```yaml
   kind: template
   name: youtube_4k_edit
   app: cloud_video_studio
   resources:
     cpu: "4"
     memory: "16Gi"
     gpu: "1"
   integrations:
     - youtube
   presets:
     resolution: "3840x2160"
     export_profile: "youtube_4k"
   ```

 - A **workflow** can similarly define steps and triggers, referencing templates
   and integrations.

 - The backend will:
   - Validate submitted templates.
   - Store them as versioned documents.
   - Expose them via an API for the frontend and CLI tools.

 ## Prototype implementation

 - The current frontend implements:
   - A static marketplace grid with example cards (e.g., 4K workflow, student
     portfolio builder).
   - Basic “likes” and “preview” labels to give a Pinterest-style feel.
 - No real persistence or template specification is parsed yet; this is purely
   presentational to showcase the idea.

