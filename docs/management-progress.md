# Management implementation progress

23 October 2026. The latest local blog, URL wiring and navigation commit (`5f80685`) is preserved in the release branch.

## Verified foundations

- Created `submissions` with private visibility; the existing public dataset and its records were preserved.
- Admission, contact, and Badri API handlers now validate input and save to private storage. They fail closed without credentials or a verified private dataset.
- Idempotent retries, origin checks, payload/photo validation, request limits, unique references, private notes and revision-checked status changes are implemented.
- Applicant photos are resized and stored in the private record, not as publicly accessible asset URLs.
- All three forms now depend on actual saved responses; failure retains input. The contact form no longer invents a sender phone number.
- Integration tests against Sanity passed: actual private records, anonymous access denial by empty result, retry deduplication, missing-credential failure, validation, staff changes and conflicts, and draft/publish/unpublish isolation.
- Tests removed only their own temporary QA documents.

## Management interface

- Custom Bangla dashboard is registered as the first Studio tool, with publishing, inbox and visual-editing entry points.
- Real dashboard counts, publication lists, search, filters, pagination, private detail drawers, notes and status history are implemented.
- An isolated browser harness verified the actual UI against live Sanity through a server-only QA proxy: desktop and phone layout, counts, detail opening, saving/reopening notes, publication links and visual-tool navigation. No browser runtime errors were recorded.
- The harness adapts Studio context; it does not prove the native Studio login/editor flow. Full embedded Studio verification remains required.

## Public content and visual editing

- Public routines, calendar, vacancies, galleries, profiles, notices and blog now use their native management records. Existing content was migrated additively, including all six original blog articles and their anchors. Native schema validation passed for 179 public documents.
- Sample individual result screens have been replaced on the result routes with approved public result publications. No private sample records are being migrated to public content.
- Published fetching is cached separately from request-specific draft access. Server credentials are excluded from browser bundles.
- The import-graph inventory covers 30 routes including aliases and 26 public views. Text, image and numeric field mappings are connected. Punctuation edits, keyed repeated fields, image replacement, numeric zero and draft isolation passed source/data tests.
- A real Next browser test verified authenticated preview, the rendered source field, image annotation, refresh persistence, public isolation and preview exit.
- Actual Sanity tests passed draft/published filters, archive/restore, PDF upload/replacement/download, profile images and routine reordering. Only their own QA data was removed.
- Local gallery videos now use the correct player on the dedicated video page, and gallery IDs remain stable when reordered.

## Release verification

- The production build and strict TypeScript passed. Root lint passed with 51 warnings and no errors. Dependency consistency and the public credential scan passed.
- The final public browser pass verified 200 responses, compiled Tailwind styles and no horizontal overflow for all 26 views on desktop and phone. Studio loaded its native sign-in screen with zero browser runtime errors, and invalid preview access returned 401.
- Management browser checks passed saved notes/status, reopening, counts, content intents and visual navigation on desktop and phone. Reduced-motion handling was corrected and tested.
- The native Studio sign-in screen loads. A personal interactive sign-in remains necessary to verify the owner's exact Sanity role and editor session; API and adapter tests cannot establish that personal session.
- Browser testing exposed a cached-load race in Sanity's bridge script: its async module could append to document.body before the body existed. Studio now uses the supported client-component export and loads the same bridge with Next Script afterInteractive. Website scrolling, hash handling and preview runtime are excluded from Studio. The final browser pass confirmed no recurrence.
- Real HTTP tests passed admission, contact and Badri persistence and retry deduplication through the built Next server. Only their own private QA records were removed.
- Windows Turbopack compilation repeatedly stalled. Development and release scripts now use the verified Webpack/PostCSS pipeline.
- Commit `90d9416` and the preceding local blog/navigation commit were pushed to main. GitHub's Vercel status reports a successful deployment, and the custom domain serves the new API implementation.
- Live HTTP saving currently returns 503, and authenticated preview returns 500. Both passed against the same code locally. The owning Vercel project's server credentials/configuration must be checked before live submissions and preview can be accepted.
- The saved Vercel login cannot access the owning team/project. Project access or a Production server-only Sanity token configuration and redeployment has been requested. No DNS or domain-registration changes were made.
