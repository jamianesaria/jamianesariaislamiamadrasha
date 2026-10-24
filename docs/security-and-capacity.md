# Security, deletion and Free-plan capacity

Reviewed 24 October 2026. This is a code/configuration and regression-test assessment, not a penetration-test certificate or a guarantee of uninterrupted service for a year.

## Private submissions on Free

Sanity Free includes two public datasets, but paid private-dataset visibility is not included. This project uses `production` for public content and `submissions` for protected operational records. Every operational document ID is `incoming.<64 hex characters>`. Sanity's fixed access rule requires an authenticated user or token with read permission for **every ID containing a dot**, even when the dataset container is public. This is access control, not security through guessing a random identifier. [Sanity document access rules](https://www.sanity.io/docs/content-lake/ids), [plan comparison](https://www.sanity.io/pricing).

The server enforces the ID format, keeps writes in the separate container, audits for unexpected record types/root documents/assets, validates submissions, and fails closed if configuration is unsafe. Applicant photos stay inline in protected documents. Staff read and delete through their own authenticated Sanity session. Public frontend fetches never query the submission container. Do not add a generic document-creation form for submissions or upload private documents as public Sanity assets. New submission types must preserve these invariants and repeat the anonymous-access tests.

`check-submission-privacy.mjs` tests API and CDN queries, exact-ID document lookup, references and anonymous mutations using synthetic values in an already-public container. The existing operational records are audited by metadata only. The optional `--configure-free` switch changes container ACL only after these checks. This implementation does not alter billing subscriptions or accept paid charges.

## Controls and remaining risks

- Public pages request published content; authorized preview uses verified preview secrets and request cookies. Draft markers are tested against an independent public browser context.
- Tokens remain server-only. Public bundles/responses and controlled failing CMS reads are scanned for credential leaks. SDK request objects are not logged by the application fallback path.
- Submission APIs validate fields, origin when supplied, request identifiers, payload size and photo signatures. Retries deduplicate. Honeypots and a best-effort per-IP request count reduce simple spam; they are not a CAPTCHA or an atomic distributed abuse limit. Determined concurrent/bot traffic remains an operational risk.
- Staff changes and deletion use revision conditions. Deletion is confirmed, respects the authenticated user's permissions, and Sanity rejects strong-reference violations. Core settings/copy documents are protected from dashboard deletion.
- Free's Administrator/Viewer roles provide limited separation of duties. Authenticated project readers can read protected submission records; invite only people entitled to access applicant information. The owner's personal sign-in, 2FA status, precise role and organization membership have not been impersonated or verified.
- Credentials were supplied in the conversation. Rotate these exposed credentials in the service dashboards and replace the corresponding server environment variables in a coordinated release. Do not revoke a currently used token before installing and checking its replacement.
- The production dependency audit now reports **0 critical, 0 high, 8 moderate package advisories**. Three high-severity transitive issues were patched with scoped compatible overrides; remaining advisories center on `uuid`/`typeid-js` within Sanity tooling. Avoid forced major downgrades. Review upstream fixes and audit monthly.
- No scheduled off-site backup or tested disaster-recovery schedule has been established by this work. Keep encrypted, access-controlled backups according to the institution's retention policy; never commit form exports to Git or place them in `public`.

## Capacity and a year of operation

There is no automatic one-year expiry in this application. Continued service depends on current quotas, traffic, retention, account/domain renewal and maintenance. A free deployment can hit a monthly limit long before a year. A traffic forecast and actual account usage are required to estimate how long the remaining allowance will last.

| Resource | Current published Free allowance |
| --- | --- |
| Sanity datasets | 2 (both slots used here) |
| Sanity documents | 10,000 |
| Sanity API / API CDN requests | 250,000 / 1,000,000 per month |
| Sanity assets / bandwidth | 100 GB stored / 100 GB per month |
| Vercel Hobby transfer / origin transfer | 100 GB / 10 GB per month |
| Vercel Hobby CDN requests / function invocations | 1,000,000 / 1,000,000 per month |
| Vercel Hobby compute | 4 active CPU hours; 360 GB memory-hours |
| Vercel Hobby image transformations | 5,000 per month |

Sanity figures: [official pricing](https://www.sanity.io/pricing). Vercel figures are **conditional on Hobby**: the project token can read project/deployment settings, but the team endpoint returned 403 and billing usage was unavailable. The actual Vercel plan and remaining usage are not verified. Hobby is restricted to personal, non-commercial use; institutional suitability must be checked against the account's applicable terms. Exceeding Hobby limits can pause a feature until its allowance recovers. [Official Hobby limits and eligibility](https://vercel.com/docs/plans/hobby).

The post-test inventory at **07:36 UTC on 24 October** contained **179 business content documents and 1 incoming submission**, excluding vendor system records; no Sanity assets or page-copy drafts remained. Anonymous submission queries returned zero records, and all submission IDs met the protected-path invariant. About 9,820 documents of headroom would represent roughly 26 new records/day for a year if nothing were deleted and no extra drafts were retained. This is an illustrative storage calculation, not a traffic or uptime guarantee. API usage, new drafts and other content also matter. Document/storage counts are current stock; request and bandwidth allowances renew by the provider's usage period. [Sanity quota behavior](https://www.sanity.io/docs/help/understanding-quotas).

The intro files are 121,115 bytes on phones and 261,075 bytes on desktop. The homepage hero clip is 1,099,487 bytes. A first intro-plus-hero playback therefore transfers about 1.22–1.36 MB before other assets. At a hypothetical 2 MB total transfer per visit, 100 GB permits about 50,000 such visits/month; actual images, JavaScript, bots, replaying media and caches change that substantially. Those files are hosted on Vercel, so deleting Sanity records does not reduce their transfer cost.

## Retention and space

Deleting an incoming record removes its inline photo, notes and history from the active inbox. Deleting public content removes the record's existing draft and published versions. It does not undo bandwidth/API usage already consumed, promise erasure from vendor backups/history, or automatically delete shared public assets. The dashboard warns about retained assets. Remove unused assets separately only after confirming they are not referenced or used by direct URLs elsewhere.

Review Sanity usage and Vercel **Usage** monthly, more frequently during admissions. Review closed/spam submissions against the office's record-retention requirements, archive only when records must remain, and delete unnecessary records intentionally. Archive hides content but retains storage. Keep package/security updates and domain renewal reminders on the maintenance schedule. No paid plan change, DNS change or automatic destructive retention job was made.
