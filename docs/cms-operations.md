# CMS operations and verification

The existing local branch, including `5f80685` (blog, URL wiring and hash navigation), is the release source. Public page markup was connected in reviewed component-sized changes. The public design was retained. The embedded Studio stays at `/studio`.

## Storage and credentials

`production` contains public website content. `submissions` is a separate verified private dataset in the same Sanity project. The admission, contact and Badri APIs write only to this private dataset. They validate input, origin, request identifiers, payload sizes and photo signatures, enforce a request limit and deduplicate retries. Applicant photos are stored inline in private records rather than public image assets. A failed or unconfigured save returns an error and keeps the form input.

Copy `.env.example` into local configuration and configure the same server variables in the owning Vercel project. A server read token may be supplied separately. The submission write credential must also be able to verify the dataset's private visibility. No token may use a `NEXT_PUBLIC_` name. The dashboard uses Sanity's authenticated session, never the server API token. Native Sanity project roles control access and publishing; no separate password system or custom staff roles have been invented.

Authenticated Studio origins include localhost:3000, the QA origin localhost:3020, the existing Vercel URL and https://nesariamadrasa.com. DNS and domain registration were not modified.

## Content and migrations

Native public records remain in their existing schemas. Existing code-based gallery, calendar, vacancy, routine and blog content was migrated additively. Original blog anchors are preserved by legacy IDs; new blog records use their stable Sanity IDs. Private individual result fixtures are excluded. Public result routes show approved publications and PDFs only.

`src/content/seeds.json` contains public copy defaults keyed by stable field identifiers. `node scripts/seed-content.mjs` previews missing fields; append `--apply` to add them. Existing values are never replaced. `node scripts/migrate-public-records.mjs` previews structured migration; `--apply` adds only missing records. Run migrations serially. The single-component proposal tools produce review artifacts, not direct source rewrites.

`node scripts/check-content-coverage.mjs` updates the import-based route inventory. Coverage indicates connected data paths, not proof that a person has clicked every field. Character-level selection opens the containing text field. Raster/video lettering, calculated outputs, technical controls and page structure have the limitations described in the staff guide.

## Checks

- `npm run build`, `npx tsc --noEmit`, `npm run lint`.
- `node scripts/validate-public-content.mjs`: validates actual published public records against the Studio schema.
- `node scripts/check-management.mjs`: private persistence, anonymous isolation, retries, conflicts, validation and truthful failure.
- `node scripts/check-submission-http.mjs`: actual Next HTTP submission saving and retry deduplication; supports `QA_BASE_URL` for deployment checks and cleans only its own private records.
- `node scripts/check-publishing.mjs`: actual dashboard query, draft/published filtering, archive/restore, PDF upload/replacement/download, profile image and routine reordering.
- `node scripts/check-visual-content.mjs`: punctuation, keyed repeated fields, image replacement, numeric zero, source maps and draft isolation.
- `node scripts/check-secret-boundary.mjs`: scans public bundles and source for configured server credentials.
- `scripts/check-public-ui.mjs` and `scripts/check-draft-browser.mjs` use Playwright/Chrome against a production server. Set `PLAYWRIGHT_MODULE`, `BROWSER_EXECUTABLE` and optionally `QA_BASE_URL`. Live connections make `networkidle` unsuitable for preview checks.
- `scripts/serve-management-preview.mjs` plus `scripts/check-management-ui.mjs` exercise the real dashboard component through a local Studio-context adapter. Credentials remain on its Node server; mutations are restricted to its own temporary record. This is not a replacement for native Sanity sign-in testing. Stop the QA server afterward.

The Windows Turbopack compiler repeatedly stalled. Both dev and production commands now use the verified Webpack path with Tailwind's supported PostCSS adapter. Production checks must include a computed-style assertion; a successful alternate-bundler compilation alone did not prove that Tailwind utilities were emitted.

The dependency audit reports upstream advisories in the existing Sanity/CLI dependency graph. Its suggested remediation includes major downgrades. No forced downgrade or untested override was applied. The direct dependency tree is consistent and React's patch version satisfies the installed editor's peer requirement.

## Release gate

Push the latest local commits, monitor the GitHub Vercel status, then verify the deployed custom domain, native Studio sign-in screen, published routes and server-side submissions/preview. A successful local build alone is not a live deployment check. A personal interactive Studio sign-in is still required to verify the owner's exact role and permission experience; API and adapter tests do not establish that personal session.

Production verification on 23 October 2026 passed on https://nesariamadrasa.com after configuring the server-only Sanity token and private dataset name in the owning Vercel project and redeploying. Admission/contact/Badri persistence, retry handling, authenticated draft rendering, public isolation, preview exit and the desktop/phone public-route checks passed. The checked live browser responses contained no server token. See `management-progress.md` for the tested deployment and the remaining personal-session boundary.
