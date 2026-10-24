# Management implementation progress

## 24 October 2026 update

Release `2de644f` deployed successfully to the custom domain. Added confirmed deletion to publication lists and private inbox details; real transactions passed for 13 public record types and authenticated submissions. Draft/published versions delete together. Changed revisions, anonymous access and strong references are protected; unrelated user documents/assets were not deleted. Desktop and phone management browser checks passed cancellation, checkbox confirmation and actual persisted removal.

The owner's Free-plan requirement supersedes the earlier reliance on paid private datasets. Both dataset containers are now public-compatible; **submission documents remain authenticated-only** under Sanity's fixed dotted-ID access rules. All existing business records in the submissions container were audited for the required protected namespace, with no public assets. Anonymous API/CDN, exact-ID and reference tests passed; live admission/contact/Badri HTTP saves and retry deduplication passed after the ACL change. No billing subscription was changed. See `security-and-capacity.md` and the updated operations guide.

The new build/strict TypeScript checks passed for all 41 generated routes. Root lint passed with 0 errors and 51 existing warnings. Schema validation passed for 179 public documents. The credential scan checked 418 source/public artifacts with no configured server credential found, and controlled CMS failure tests confirmed that raw SDK credentials do not enter logs or browser HTML. Targeted compatible dependency patches removed the three high-severity findings; 8 moderate upstream package advisories remain.

The live public browser pass verified all 26 views at desktop/phone widths, no horizontal overflow and no React runtime errors. Native Studio sign-in loaded, and invalid preview access returned 401. Full live visual editing verification is recorded separately in `visual-editing-verification.md`; personal Studio sign-in/role testing remains explicitly outside the automated test identity.

The completed live visual audit passed 26/26 views, 26 private draft checks, 26 phone/text clicks, 26 image clicks, 20 punctuation checks, 22 button checks and 14 native-record clicks. All three open-modal refresh checks passed. The 4,607 text and 255 image annotations inspected across views had no broken source paths, unsafe links or unmapped visible headings. Four actual browser redirects also passed. The final live response scan checked 158 responses with no production server credential. Post-test inventory remains 179 business content documents and 1 protected incoming submission, no page-copy drafts, no assets and zero anonymously readable submissions. An expired preview secret from this audit's earlier failed run was removed; staff content was preserved.

## Earlier implementation record

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
- The deployment configuration blocker is resolved. The owning project's environment-variable list was empty. With authorized project access, `SANITY_API_TOKEN` was configured as a sensitive, Production-only variable and `SANITY_SUBMISSIONS_DATASET` was set to the verified private `submissions` dataset. No token was added to source code or a public variable.
- Production deployment `dpl_HjE98KYYzc3rfhYjiYqC3qPU4dh9` of `a6299e6` reached READY and was assigned to https://nesariamadrasa.com.
- Live HTTP tests passed admission, contact and Badri saving, private persistence and retry deduplication. Only the run's own private records were removed.
- The live browser pass verified all 26 public views at desktop and phone widths: 200 responses, compiled styles, no horizontal overflow and zero browser runtime errors. The native Studio sign-in screen loaded, and an invalid preview secret returned 401.
- The full live draft test passed authenticated access, the rendered field edit and image source annotation, refresh persistence, isolation from public visitors and preview exit. An initial navigation timeout did not recur in a focused check and the successful full retry. Only the unchanged test draft and its own preview secret were removed.
- A live browser-response scan checked 173 HTML, JavaScript and component responses across the homepage, contact, blog and Studio; the configured server token was absent from all checked responses.
- No DNS or domain-registration changes were made. The owner's personal Studio session and role-specific permissions still require their own sign-in, as described above.
