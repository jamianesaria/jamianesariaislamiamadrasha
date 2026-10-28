# SEO implementation and release notes

## Scope

The audit found 26 content URLs, three duplicate pairs, four temporary legacy redirects, missing canonical URLs and structured data, 12 pages without H1 headings, missing crawler files, article content behind hash-linked modals, and a broken paper-form link.

The implementation consolidates the duplicates into 23 canonical information pages and adds individual server-rendered pages for the six currently published articles. Published articles added later are discovered through Sanity without hardcoding their slugs into the application.

## Implemented

- One production origin, `https://nesariamadrasa.com`, for canonical URLs, social metadata and sitemap entries. Preview and local hosts cannot accidentally become public canonical URLs.
- Bengali page titles and descriptions with institution-name defaults, optional editorial overrides, Open Graph and Twitter cards, and a branded 1200×630 sharing image using the existing logo. Existing favicon and Apple icons are retained through Next.js file conventions, removing duplicate manual icon declarations.
- Accessible breadcrumbs on every canonical inner page, with linked ancestors, a current-page indicator and matching `BreadcrumbList` JSON-LD. Existing decorative breadcrumb links were removed where the shared trail replaces them.
- `WebSite` and `EducationalOrganization` JSON-LD with the institution's existing public name, address, telephone, logo and social profile. Generic placeholder YouTube URLs are excluded. Structured data is escaped before HTML serialization.
- Visible main headings on all 12 pages previously missing them; the academics H1 now describes the page rather than repeating the institution name.
- Permanent 308 redirects for `/about/history`, `/faculty`, `/profile/managing-committee`, `/profile`, `/313-badri-kafila`, `/functions/notices`, and `/vorti-tottho`. Internal article links now use article slugs. One obsolete CMS link was repaired.
- `/blog/[slug]` pages with full article text, author, publication label, image, metadata, breadcrumbs and `BlogPosting` data. Existing hash article links resolve to their full article page. Actual CMS timestamps are used where available; no dates or author credentials are invented by the new SEO code.
- Unknown article slugs return HTTP 404 with `noindex`. Metadata resolves before response headers for all clients, so a late article existence check cannot accidentally turn a missing article into a streamed HTTP 200. This makes uncached article responses wait for their metadata; the existing public-query cache and request memoization limit duplicate work.
- Automatically maintained `/sitemap.xml` containing canonical public pages and published, non-archived, indexable article slugs. Private records, Studio, APIs, aliases and filter variants are excluded. Article modification dates come from CMS records; static pages do not receive fabricated freshness dates.
- `/robots.txt` with a sitemap reference. Studio keeps its `noindex` directive and remains crawlable so engines can read it. API responses receive `X-Robots-Tag: noindex, nofollow`. Draft previews are not indexable.
- The missing Badri paper-form download is replaced by an office-contact link. A CMS field can supply the real PDF when available; no unofficial document was manufactured.

## Sanity controls

Open **সার্চ ও ব্রেডক্রাম্ব (Page SEO & Breadcrumbs)** in Studio to edit each route's search title, description, sharing image, breadcrumb label, applicable main heading, and search visibility. The Blog entry also controls labels on article pages. Defaults work when records or fields are missing.

Global institution settings expose the preferred short site name, default description/sharing image, breadcrumb labels, optional Google Search Console verification value, and paper-form URL/contact label. Blog records expose article-specific SEO overrides. Presentation locations link article records to their new full pages.

`node scripts/seed-seo.mjs` previews missing SEO singletons and obsolete link repairs. `--apply` adds missing records with revision guards for link changes and preserves existing editorial values. This release added 23 route records. The subsequent dry run reported zero missing records and zero outstanding link repairs.

## Validation

- Final production-build browser run: **29 pages passed** (23 information pages and six articles), **seven permanent redirects passed**, and **zero browser runtime errors**. Every tested page had one main H1, its preferred canonical URL, sharing metadata and valid JSON-LD; all inner pages had the shared breadcrumb. Missing articles returned HTTP 404 with noindex. Legacy hash article navigation also passed.
- TypeScript and production build checks.
- Full-project ESLint: no errors; existing warnings remain.
- Existing department/content tests and submission-privacy checks.
- `scripts/check-seo.mjs` verifies rendered metadata, one H1 per page, canonical URLs, breadcrumbs and JSON-LD, mobile overflow, crawlable article links, redirects, Studio noindex, crawler files, icon/share-image delivery, API indexing headers, filtered-page canonicals, and missing articles.
- Browser QA uses the installed Playwright-compatible browser tooling via `PLAYWRIGHT_MODULE` and `BROWSER_EXECUTABLE`. `QA_BASE_URL` selects the running production build. The regression report is written to ignored `.cms-work/seo/checks.json`.
- Sharing image and representative mobile/desktop layouts are visually inspected. This work does not claim a Lighthouse score or improved field Core Web Vitals without measurement.

## Hosting and account work still required

The local Vercel login returned a team-access error, so the release has not been published. A Vercel connection with access to the owning project is required. Do not describe these code changes as live until a deployment is verified.

The `www` hostname failed TLS hostname verification during the audit. A permanent host redirect is prepared in Next.js, but a certificate covering `www.nesariamadrasa.com` must be provisioned in hosting before HTTPS requests can reach that redirect. Verify the domain and certificate in the owning Vercel project; do not disable TLS verification.

After publishing, verify the live site with `QA_BASE_URL=https://nesariamadrasa.com`, submit the sitemap through the owner's verified Search Console property, and inspect representative URLs. Business Profile ownership, opening hours, pin accuracy and genuine reviews require the owner's Google account; this release does not claim those external account tasks were performed.

## Expected benefit

These changes improve page discovery, preferred-URL consistency, institution recognition, search-result relevance and social sharing. Six articles become independently addressable and eligible for indexing, rather than sharing a single hash-driven listing page. Breadcrumbs help visitors navigate and can support Google's desktop breadcrumb appearance.

Search engines control indexing and presentation. A traffic or admissions uplift cannot be promised without Search Console and conversion baselines. After deployment, compare impressions, organic clicks, search click-through rate, indexed canonical pages and completed admission enquiries over successive periods, accounting for admission seasonality. Code improvements do not substitute for useful current content, reputation and relevant local demand.

References: [Google site names](https://developers.google.com/search/docs/appearance/site-names), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [JavaScript URLs](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
