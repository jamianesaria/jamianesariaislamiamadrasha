# Client delivery audit — 6 November 2026

Follow-up: see [delivery repairs](release-repairs-2026-11-06.md) for completed fixes and current deployment blockers. The findings below record the original audit snapshot.

Decision: hold final acceptance until the confirmed defects below are addressed and the remaining browser/account checks are completed. The production build passes with network access. This audit does not establish uninterrupted service or complete browser acceptance.

Scope: local source and production build, live HTTP routes/assets, Sanity configuration and document metadata, schema validation, public access boundaries, dependency advisories, domain registration/TLS, and published Free-plan limits. Vercel Hobby was confirmed by the owner; Sanity Free is the owner's intended operating plan. No production content, DNS, credentials, subscriptions, or deployment settings were changed. Valid production form submissions and editorial mutations were deliberately not performed.

## Findings requiring attention

| Priority | Finding | Evidence and action |
| --- | --- | --- |
| High | `www` HTTPS is broken | `https://www.nesariamadrasa.com` fails with `ERR_TLS_CERT_ALTNAME_INVALID`. HTTP on `www` redirects to the broken HTTPS hostname. Configure the hostname and its DNS/certificate in the owning hosting account, then verify its redirect to the canonical domain. A Next.js redirect cannot run before TLS succeeds. |
| High | Hosting eligibility must be resolved for paid client work | The account is on Vercel Hobby. Official fair-use terms explicitly classify receiving payment to create/update/host a site as commercial usage and require Pro or Enterprise for commercial use. If this is paid delivery, resolve this before handover; Free capacity alone does not establish eligibility. Asking for donations alone is explicitly excluded from the commercial definition. |
| High | Two CMS sources control academic department content | `src/app/academics/page.tsx` fetches native `academicDepartment` records and passes `initialDepartments`. `src/components/AcademicsPageSection.tsx:31` accepts but never uses that prop; its department sections come from `copy.data.academicsPageData` instead. Editing a native department therefore does not update those detailed sections. Establish and document a consistent source, preserve the richer syllabus fields, and verify the homepage and academics page together. This is a source-level finding; no editorial records were changed to demonstrate it. |
| Medium | Broken remote image across four pages | The Unsplash photo with ID `photo-1584281722573-ef8876483507` returns 404, confirmed by GET on the upstream URL and three optimized image URLs. Affected routes: `/blog`, `/blog/easy-steps-to-complete-hifz-quran`, `/functions/event-list`, `/gallery/video`. Replace the source in the relevant CMS records and fallback data together, using an owned/managed asset. |
| Medium | Cache invalidation is unauthenticated | Both GET and POST in `src/app/api/revalidate/route.ts` call `revalidateTag` without authorization or a webhook-signature check. Restrict invalidation to an authenticated admin or verified webhook and remove the state-changing GET. This is a source review; the production endpoint was not triggered. |
| Medium | Free-only Sanity operation remains a conditional acceptance item | Both datasets are public, so the storage design does not require paid private-dataset visibility. However, the project API currently advertises private-dataset and extra role features, and three API-token accounts have Developer roles. These flags do not establish the billing plan or trial expiry. Verify the Plan screen and repeat submissions, staff editing, publishing and preview once Free is actually active. Do not remove current credentials before replacements work. |
| Medium | Backups and recovery are not established | Existing operational documentation records no scheduled off-site backup or tested recovery process. No current account-level backup schedule or restore drill could be verified. Set an owner, retention schedule, encrypted backup location and restore procedure for CMS content and private applications. |
| Medium | Dependency advisories remain | `npm audit --omit=dev` returned 16 moderate affected packages, 0 high and 0 critical. The chains include `minimatch` and `uuid`/`typeid-js` through Sanity tooling. These are affected-package counts, not 16 proven exploitable website flaws. npm proposes major version changes/downgrades; do not use `npm audit fix --force` before release. Review compatible upstream fixes separately. |
| Medium | Abuse limits are best effort | Submission APIs validate inputs and count recent requests, but the count/check is not an atomic distributed limit. Direct bots can omit Origin, so Origin checking is not bot authentication. Protect admissions periods with appropriate hosting controls and usage alerts; avoid using real applications for load testing. |
| Low | Missing defense-in-depth headers | Live HTML has HSTS, but no `X-Content-Type-Options`, CSP, or `X-Frame-Options`. Introduce and test an appropriate policy carefully; Sanity Presentation needs intentional framing support, so a blanket framing ban can break preview. |
| Low | QA maintenance issues | Lint passes with 54 warnings. `scripts/check-empty-public-content.mjs` currently fails with `ReferenceError: process is not defined` because its VM sandbox omits `process` when loading the SEO data module. It is a broken QA harness, not proof of a website failure. Browser QA scripts also depend on Playwright, which is not installed in this project. |

## Verified results

| Check | Result |
| --- | --- |
| Production build with network access | PASS; compilation, TypeScript and all 46 static-generation outputs completed; build exit 0. |
| Earlier restricted build | Failed when network requests were denied (`EACCES`). The network-enabled retry passed; this is not an outstanding reproducible normal-build failure. A network-disconnected build is not supported by this observation. |
| TypeScript | `npx tsc --noEmit` passed in the preceding check; production build also passed its TypeScript phase. |
| Lint | Exit 0; 0 errors, 54 warnings. |
| Targeted existing tests | 9/9 navigation normalization and academic department mapping tests passed. |
| Live content routes | 29 distinct content pages, including all six currently published blog slugs, returned 200 with one H1 and a title. Legacy routes resolved to their canonical destinations. |
| Links/assets | 103 distinct same-origin page/asset URLs checked by HEAD; three image URLs failed and were confirmed by GET. No internal page-link failure was found in the scanned anchors. Responsive `srcset`, CSS assets, external services and browser-triggered requests were not exhaustively checked. |
| Error/SEO endpoints | A nonexistent route returned 404; sitemap and robots returned 200. Checked public page HTML included canonical metadata; Studio and error responses were noindex. This does not verify search rankings or Search Console ownership. |
| Studio | `/studio` returns 200 and noindex. Actual sign-in, staff role experience, editing and publishing were not exercised in a current browser session. |
| Form rejection | Empty payloads returned 400 on `/api/apply`, `/api/contact` and `/api/badri`; no application records were created. |
| Preview rejection | An invalid preview secret returned 401. |
| Credential scan | 439 source/generated browser files scanned; no configured server credential found. Checked live HTML also contained no configured server credential. This does not scan Git history or undisclosed credentials. |
| CMS outage smoke test | Local production server with invalid CMS credentials and a draft cookie rendered `/`, `/academics`, `/contact`, `/gallery` and `/notices` with 200 and navigation. The fallback path executed; the test credential appeared in neither response HTML nor captured logs. This does not prove every route or offline build works. |
| Public schema validation | PASS for 183 published documents across the public document types, including 23 SEO documents; validator exit 0 and no error-level issues. Warning-level editorial issues are outside this error-only validator. |

## Sanity inventory and privacy

At the audit snapshot, `production` contained 198 documents, including 52 page-copy records, 23 SEO records, one draft, and two assets totaling 29,489 bytes. The project was neither blocked nor disabled. There were no `examResult` documents and no legacy application/contact/incoming-submission document types in the public content dataset. The result-record query also found no records carrying the specifically checked legacy private fields; this is not a general arbitrary-field personal-data scanner.

The separate `submissions` dataset contained one operational record. Its type and ID matched the required `incoming.<64 hex characters>` format; no unsafe record metadata was found. Anonymous queries against both the direct API and CDN returned zero documents. Only metadata and counts were fetched; applicant fields were not included in the report.

Sanity documents with dots in their IDs require authentication even in public datasets. The protection here comes from that provider ACL, not from hiding an unguessable ID. Preserve the namespace invariant; never place private student data in root public documents or public file/image assets. Authenticated project readers can read protected records, so the Viewer role must not be given to people who should not see applications. [Sanity document access rules](https://www.sanity.io/docs/content-lake/ids).

There is one human project member with Administrator access and four API-token accounts: three Developer and one Viewer. No client/staff membership or 2FA arrangement was verified. CORS allows the production apex domain, the known Vercel deployment hostname, and four explicit localhost development origins; no wildcard was observed. The broken `www` hostname is not included as a credentialed Studio origin.

## Free-plan assessment

| Resource | Vercel Hobby | Sanity Free |
| --- | --- | --- |
| Price | $0, subject to Hobby eligibility | $0 within included limits |
| Transfer | 100 GB Fast Data Transfer; 10 GB origin transfer | 100 GB bandwidth/month |
| Requests | 1 million CDN requests; 1 million function invocations | 250,000 API and 1 million API CDN requests/month |
| Compute/images | 4 active CPU hours; 360 GB-hours memory; 5,000 image transformations | 100 GB stored assets |
| Data/users | No application datastore is provisioned by the Next.js source | 10,000 documents; 2 public datasets; up to 20 user seats; Administrator/Viewer roles |
| Current allowance remaining | Not verified from account Usage | Request/bandwidth/attribute allowance remaining not verified; observed document and asset inventory is small; both dataset slots are already used |

Limits were checked against [Vercel Hobby documentation](https://vercel.com/docs/plans/hobby) and [Sanity pricing](https://www.sanity.io/pricing). Vercel eligibility is governed by its [fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines). Sanity Free can block public API/CDN requests after applicable request/bandwidth quotas are exhausted; new documents/drafts are blocked at the document cap. See [Sanity quota behavior](https://www.sanity.io/docs/platform-management/plans-and-payments).

A paid plan is not a promise of zero failures. Staying free requires monitoring actual monthly use, limiting abuse, controlling media transfer and maintaining credentials. The currently small content inventory does not establish a safe visitor count. Sanity Growth does not automatically provide higher included API/bandwidth quotas in every category; compare the published quotas rather than assuming an upgrade removes limits.

Local public assets total about 8.48 MB. The phone intro is 121,115 bytes, desktop intro 261,075 bytes, hero clip 1,099,487 bytes and the larger drone clip 4,808,872 bytes. These are hosted with the website and consume Vercel transfer when requested. HTML size on the checked homepage was approximately 735 KB before accounting for HTTP compression; this is a payload observation, not a measured Core Web Vitals result. Many live HTML responses reported cache BYPASS; that alone does not prove the internal Next/Sanity data cache is ineffective.

## Domain and ownership

The apex HTTPS certificate validates and is issued by Let's Encrypt, with observed validity through 19 January 2027. Renewal configuration was not accessible. Registry RDAP reports the domain registration expires on 19 October 2029; confirm the registrar account, client ownership, recovery contacts and renewal method. Nameservers point to Vercel DNS. Neither billing-account ownership nor domain-transfer readiness was established.

## Remaining acceptance work

- Fix the `www` TLS setup, broken image sources, academic department data-source mismatch and unprotected invalidation endpoint; recheck the live release.
- Resolve Hobby eligibility if paid client work, and verify active Sanity Free entitlements and token behavior after any trial ends.
- Test real Chrome/Android and Safari/iPhone interactions: menu, intro skip/play, videos, search/filtering, dialogs, keyboard focus, scrolling, downloads and form error/success/retry behavior. Browser host/native automation was unavailable during this audit, so no current hydration/console/visual acceptance pass was completed.
- In an agreed test workflow, submit a synthetic valid admission/contact/Badri request, verify one protected saved record, retry deduplication, staff visibility and intentional cleanup. Source controls were reviewed, but live successful writes were not tested.
- Sign in as the client's actual staff account; edit/publish a notice, routine, teacher, department, page text and image; verify preview isolation, deletion/archive behavior and public freshness.
- Verify Vercel production environment names, latest deployed commit, deployment/runtime logs, quotas, abuse controls and rollback. API/browser access to the hosting account was not available; old local account-audit artifacts were not treated as current proof.
- Establish backups, a restore drill, quota alerts, renewal ownership and a maintenance contact. Recheck email/phone/donation details and institutional content with the client.

No qualifying Next.js framework-feedback candidate was retained: observed network denial and the broken custom QA sandbox were environment/test-harness issues, not verified framework defects.

Detailed machine reports are stored locally under ignored `.cms-work/delivery-*` paths. This report contains no credentials or applicant details.
