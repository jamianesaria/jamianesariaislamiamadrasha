# Delivery repairs — 6 November 2026

This report records the repairs prepared for release; verify the deployment status for the release commit separately. The six targeted Sanity image repairs are already saved remotely. Paid plans, domain settings, active service credentials, and staff permissions were not changed.

## Completed

- Academics headings and summaries now use the native department records, including the `madani-nesab` slug alias. Detailed subdepartments, syllabus and training content remain in the existing page-copy model. Existing schema descriptions and query/mapping explain the shared source; no new document type is required. A browser check matched all four native department headings, overviews and features against Sanity.
- Replaced the deleted Unsplash photo with the existing school Hifz photo in fallback content and seed data. Uploaded that photo as a managed Sanity asset and connected six matching records to its allowlisted CDN URL/reference; absolute same-site URLs were rejected by the live image optimizer, so they were not retained. Remote patches used revision guards; originals are backed up locally. No unrelated editorial content was replaced.
- Revalidation accepts signed Sanity webhook POSTs only. Invalid signatures are rejected and GET is no longer implemented. Missing `SANITY_REVALIDATE_SECRET` fails closed; existing live/time-based content refresh continues without that optional webhook. To enable it, install the same server-only secret in the deployment and a signed Sanity webhook. Do not put secrets in query strings or public environment variables.
- Added `nosniff`, referrer and permissions policies, plus a frame-ancestors CSP that preserves same-origin and Sanity Studio previews. It does not impose an untested inline-script policy on Next.js or prevent PDF/video frames from loading.
- Scoped dependency overrides fix the vulnerable `minimatch` and `uuid` branches without changing Next.js/Sanity major versions. The full dependency audit reports zero known vulnerabilities after installation.
- Removed unused imports/state, repaired the empty-content QA sandbox and public browser suite's stale redirect/dynamic-route assumptions, and added reproducible development-only Playwright tooling and security regression tests.
- Added encrypted backup creation and archive verification. Both datasets, including assets, were exported directly to encrypted files and verified without writing plaintext application data. See [backup and recovery](backup-and-recovery.md).
- Fixed the published-content failure path: the cache boundary returns a short-lived, serializable failure result instead of throwing a rejected content read through Cache Components. Consumers raise a sanitized error outside that boundary and render their existing fallbacks. CMS read/write clients also have bounded timeouts and retries. Next.js control-flow errors are rethrown rather than swallowed.

## Verification

- Final production build completed successfully, including compilation, TypeScript and all 46 generation outputs. Lint has zero errors and zero warnings; the full dependency audit has zero known vulnerabilities.
- 13 automated tests passed, including unsigned/tampered/genuine webhook cases and native-department slug mapping.
- All 29 public content pages passed desktop/phone checks: no runtime errors or horizontal overflow. Canonical legacy redirects and the Studio sign-in screen passed.
- The native-department browser test confirmed published titles, summaries and features render while the detailed syllabus remains.
- The invalid-CMS-credential browser regression now passes for published and preview rendering, with no synthetic credential in the HTML or logs. Before the cache-boundary fix, two isolated checks timed out after 90 seconds despite fallback execution.
- Real authenticated draft preview passed, including draft/published perspective switching, refresh persistence, public isolation and preview exit. Only the unchanged test draft and its temporary preview secret were removed.
- The expanded Sanity validator passed for all 183 published content/SEO documents with no error-level issues.
- Final live checks on the four repaired image pages found no deleted source URLs and no failing rendered image requests. The local final HTTP check confirmed all added security headers, GET invalidation rejection (405) and fail-closed unsigned POST behavior (503 while the optional webhook secret is unconfigured).
- Intro regression passed all seven viewport sizes and playback/skip/session, reduced-motion, blocked-autoplay, slow-network, failure/retry, rotation, keyboard and no-JavaScript cases.
- Admission, contact and Badri HTTP submissions saved and deduplicated retries. Only those synthetic test records were removed.
- Sanity protected-document tests passed for API/CDN queries, direct document lookup, dereferencing and unauthorized mutation. The existing operational record remains protected and unchanged.
- The broken empty-content harness now passes for 12 managed lists, the gallery provider and homepage.
- Both encrypted archives passed authenticated decryption and importable archive structure verification. This does not establish scheduled off-site backups or a full live restore drill.

## Still requiring account access or an owner decision

1. The supplied Vercel token authenticates but returns an empty project list, 404 for the exact project ID (with and without the known team scope), and 403 when listing teams. It cannot repair `www` DNS/certificate configuration or directly deploy this release. No alternate hosting project was created. The connected GitHub app reports read-only repository access; publishing with this computer's Git credentials is a separate path whose push and deployment must be verified.
2. `www` HTTPS still needs configuration in the owning Vercel project. Once authorized there, check the domain's required DNS values, provision its certificate and redirect it to the apex. Do not change mail or unrelated DNS records.
3. The owner intends to keep both services free. No paid plan changes were made. Vercel Hobby eligibility for paid client development remains an owner/provider decision; code cannot remove that restriction. Confirm Sanity Free entitlements and staff/token behavior after any trial finishes; current extra feature flags do not prove the billing state.
4. Request/bandwidth usage, quota alerts, client ownership/2FA, off-site backup destination and a recurring schedule remain unverified without the relevant account access or destination.
5. Submission validation, retry deduplication, honeypot and recent-request checks remain in place. The request count is best effort across concurrent instances; a guaranteed distributed limiter still needs an agreed shared service or hosting control. No new paid datastore or billing integration was silently added.
6. Rotate the Vercel key shared in chat after this task. Coordinate any other server credential replacement with a verified production deployment; do not revoke an active production credential first.

Do not treat the earlier audit's defects as all fixed on the public deployment. The local code, remote CMS edits and hosting configuration have separate release states.
