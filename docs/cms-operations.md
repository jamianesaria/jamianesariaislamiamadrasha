# CMS operations and verification

The existing local branch, including `5f80685` (blog, URL wiring and hash navigation), is the release source. Public page markup was connected in reviewed component-sized changes. The public design was retained. The embedded Studio stays at `/studio`.

## Storage and credentials

`production` contains public website content. `submissions` is a separate container for authenticated-only records. For the owner's Free-plan requirement, privacy uses Sanity's **fixed document-path access rules**, independently of paid private-dataset ACL: every submission ID is `incoming.<64 hexadecimal characters>`. Sanity requires authentication for dot-containing IDs, including in a public dataset. Never replace these IDs with root IDs, copy these records into public content, or upload applicant photographs as public assets. See [Sanity's fixed access rules](https://www.sanity.io/docs/content-lake/ids).

The admission, contact and Badri APIs write only to this protected namespace in the separate container. They validate input, origin, request identifiers, payload sizes and photo signatures, apply a best-effort per-IP request limit and deduplicate retries. Photos are inline in the protected record. Before saving, the server verifies the dataset exists and contains no unexpected business records or public assets; an unsafe configuration fails closed. A failed or unconfigured save returns an error and keeps the form input. Dataset-level private visibility is optional extra protection, not a Free-plan dependency.

Copy `.env.example` into local configuration and configure the same server variables in the owning Vercel project. A server read token may be supplied separately. The submission write credential must also be able to verify dataset metadata and the protected-namespace invariant. No token may use a `NEXT_PUBLIC_` name. The dashboard uses Sanity's authenticated session, never the server API token. Sanity project roles control access and publishing. Free roles offer limited separation of duties; invite only trusted staff who may read private submissions.

Authenticated Studio origins include localhost:3000, the QA origin localhost:3020, the existing Vercel URL and https://nesariamadrasa.com. DNS and domain registration were not modified.

## Content and migrations

Native public records remain in their existing schemas. Existing code-based gallery, calendar, vacancy, routine and blog content was migrated additively. Original blog anchors are preserved by legacy IDs; new blog records use their stable Sanity IDs. Private individual result fixtures are excluded. Public result routes show approved publications and PDFs only.

`src/content/seeds.json` contains public copy defaults keyed by stable field identifiers. `node scripts/seed-content.mjs` previews missing fields; append `--apply` to add them. Existing values are never replaced. `node scripts/migrate-public-records.mjs` previews structured migration; `--apply` adds only missing records. Run migrations serially. The single-component proposal tools produce review artifacts, not direct source rewrites.

`node scripts/check-content-coverage.mjs` updates the import-based route inventory. Coverage indicates connected data paths, not proof that a person has clicked every field. Character-level selection opens the containing text field. Raster/video lettering, calculated outputs, technical controls and page structure have the limitations described in the staff guide.

## Checks

- `npm run build`, `npx tsc --noEmit`, `npm run lint`.
- `node scripts/validate-public-content.mjs`: validates actual published public records against the Studio schema.
- `node scripts/check-management.mjs`: private persistence, anonymous isolation, retries, conflicts, validation and truthful failure.
- `node scripts/check-management-deletion.mjs`: real deletion of synthetic published/draft pairs across 13 record types, stale-update protection, reference integrity and private-submission deletion.
- `node scripts/check-empty-public-content.mjs`: successful empty CMS lists and the actual homepage department rendering do not resurrect fixture records; no real content is mutated.
- `node scripts/check-submission-privacy.mjs`: verifies anonymous API/CDN queries, direct lookup, reference dereference and mutation denial for protected paths in an already-public dataset; audits existing submission IDs without logging their fields. `--configure-free` switches the submissions container to public only after the privacy checks and namespace audit pass. Deploy the current handler before running this option.
- `node scripts/check-cms-error-boundary.mjs`: invalid read credentials produce safe fallback pages without echoing credentials into server logs or browser HTML.
- `node scripts/check-visual-pages.mjs --drafts --modals --shard 0/2` (and `1/2`): every inventoried view's actual overlay focus messages, source paths, representative controls/media, draft isolation and phone layout. Run shards concurrently, but do not run other tests that edit the same copy documents at the same time.
- `node scripts/check-submission-http.mjs`: actual Next HTTP submission saving and retry deduplication; supports `QA_BASE_URL` for deployment checks and cleans only its own private records.
- `node scripts/check-publishing.mjs`: actual dashboard query, draft/published filtering, archive/restore, PDF upload/replacement/download, profile image and routine reordering.
- `node scripts/check-visual-content.mjs`: punctuation, keyed repeated fields, image replacement, numeric zero, source maps and draft isolation.
- `node scripts/check-secret-boundary.mjs`: scans public bundles and source for configured server credentials.
- `scripts/check-public-ui.mjs` and `scripts/check-draft-browser.mjs` use Playwright/Chrome against a production server. Set `PLAYWRIGHT_MODULE`, `BROWSER_EXECUTABLE` and optionally `QA_BASE_URL`. Live connections make `networkidle` unsuitable for preview checks.
- `scripts/serve-management-preview.mjs` plus `scripts/check-management-ui.mjs` exercise the real dashboard component through a local Studio-context adapter. Credentials remain on its Node server; mutations are restricted to its own temporary record. This is not a replacement for native Sanity sign-in testing. Stop the QA server afterward.

The Windows Turbopack compiler repeatedly stalled. Both dev and production commands now use the verified Webpack path with Tailwind's supported PostCSS adapter. Production checks must include a computed-style assertion; a successful alternate-bundler compilation alone did not prove that Tailwind utilities were emitted.

The 24 October dependency audit found three high-severity transitive dependency issues. Scoped compatible overrides update `js-yaml`, `smol-toml` and `undici`, retaining the installed Sanity/Next major versions. The follow-up production audit reports **0 critical, 0 high and 8 moderate** package advisories, centered on upstream `uuid`/`typeid-js` dependencies. Do not run `npm audit fix --force`: the suggested resolution downgrades major integration packages. Review upstream fixes regularly. Existing optional TypeScript peer warnings in Sanity CLI workflow tooling remain; the application's strict TypeScript/build checks are separate.

## Deletion and retention

Publication rows provide **মুছে ফেলুন** for notices, routines, results, galleries, teachers, committee members, departments, events, vacancies and blog posts. The inbox detail drawer provides the same action for admission/contact/Badri submissions. The dialog names the record and requires a checkbox plus a second confirmation. Cancelling changes nothing. Public deletion removes both existing draft and published versions in one transaction. A changed revision or a strong reference blocks deletion; refresh and resolve the conflict rather than retrying blindly. The signed-in user's permissions apply to the mutation.

Core website settings/copy singletons remain protected against accidental deletion; their content stays editable. Public lists respect successful empty results. Website caches may take about a minute to reflect deletion. Attached public assets are retained, since other records or URLs may use them. Deleting a record frees current document storage, not bandwidth/API quota already spent, and is not a promise of immediate purge from vendor backups/history. Review retention regularly and remove only records the office is permitted to discard. See `security-and-capacity.md` for current limits and operational risks.

## Release gate

Push the latest local commits, monitor the GitHub Vercel status, then verify the deployed custom domain, native Studio sign-in screen, published routes and server-side submissions/preview. A successful local build alone is not a live deployment check. A personal interactive Studio sign-in is still required to verify the owner's exact role and permission experience; API and adapter tests do not establish that personal session.

Production verification on 23 October 2026 passed on https://nesariamadrasa.com after configuring the server-only Sanity token and private dataset name in the owning Vercel project and redeploying. Admission/contact/Badri persistence, retry handling, authenticated draft rendering, public isolation, preview exit and the desktop/phone public-route checks passed. The checked live browser responses contained no server token. See `management-progress.md` for the tested deployment and the remaining personal-session boundary.
