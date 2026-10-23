# Madrasha management and visual editing plan

Status: proposed plan, based on the current repository review on 23 October 2026. This is not a claim that the features are implemented or tested. Existing uncommitted work is preserved.

## Product outcome

One staff entry point at `/studio`, with three workspaces:

1. **ব্যবস্থাপনা**: create and publish notices, routines, public results, profiles, media, and articles.
2. **ইনবক্স**: receive and process genuine website submissions, with appropriate staff access.
3. **ওয়েবসাইট সম্পাদনা**: navigate the actual website preview and click content to edit its source field.

Use the existing embedded Studio and supported Sanity authentication. Add custom tools, task screens, and inputs where they reduce work. Retain native document editing for advanced maintenance. Avoid a second disconnected publishing database or competing publication controls.

The public design, Bengali wording, layouts, existing routes, and responsive behavior are the reference. An editing overlay is visible only to authorized editors. New public visual changes beyond necessary form feedback require a concrete design reason.

## Current findings

- Installed packages include Next.js 16.4.1, React 19.3.0, Sanity 6.20.0, and next-sanity 13.3.4.
- Embedded Studio, Presentation configuration, draft routes, schemas, and draft-only overlays already exist.
- These foundations do not establish complete field mapping or functioning live preview across all routes.
- Cached query functions currently call a helper that reads draft mode inside the cached scope; repair the draft/published boundary and verify it rather than relying on a caught exception.
- The live-content module exists, but a complete live rendering/subscription path has not been established by this review. Its browser-token fallback must never expose a write-capable token.
- Admission and contact API handlers can return success without saving when a write token is absent.
- Admission UI can generate an application number after a failed response or network error. The contact UI clears the form and displays success even after failure; it also supplies a fixed phone value instead of a visitor-entered number.
- Admission form fields and its selected photo are not all persisted by the existing handler.
- Badri Kafela submission currently changes local UI state without a persistence request.
- Applications and messages are currently modeled alongside website content. Dataset access and existing stored records need a privacy audit before activating an inbox.
- Some result interfaces use sample records; they must be distinguished from genuine publication and private result lookup.
- There are local uncommitted changes, including blog/content/schema changes. These are inputs to preserve, not changes to reset.

## Staff experience

Use Bangla-first labels, readable typography, the established green/cream/gold palette, a consistent sidebar, and a compact top bar with account access and website preview. Dashboard totals must reflect stored records and each count must open the corresponding filtered list.

Suggested navigation:

- ড্যাশবোর্ড: new submissions, unread messages, drafts, recent work, quick actions.
- ওয়েবসাইট সম্পাদনা: page navigator and actual website preview.
- নোটিশ ও ঘোষণা.
- রুটিন, ছুটি ও অনুষ্ঠান.
- ফলাফল প্রকাশ.
- ভর্তি আবেদন.
- যোগাযোগ ইনবক্স.
- বদরি কাফেলা আবেদন.
- শিক্ষক ও পরিচালনা পরিষদ.
- ছবি, ভিডিও ও ব্লগ.
- সেটিংস ও কর্মীদের অনুমতি.

Management lists share search, useful filters, clear statuses, consistent row actions, pagination, empty states, and understandable error feedback. Desktop uses readable tables; narrow screens use compact record cards and drawers. Visual editing works best on a larger screen; mobile management remains usable.

## Publishing workflows

### Notices

Create → enter title/category/date/description → add content and PDF → mark urgency if needed → save draft → preview → publish.

Support replacing an attachment, editing existing notices, unpublishing, and archiving. Verify each relevant homepage/list/detail view reflects the same record. Use Sanity's draft/published state as the publishing source of truth; avoid an unrelated second publish toggle.

### Routines

Choose class/session/term → enter day/date, period/time, subject, teacher, and room as applicable → add/reorder/remove rows → validate conflicting or incomplete entries → preview in the existing public timetable → publish. Preserve printing and downloads.

### Results

Choose result category, class, year, and examination → upload the approved public document or enter approved public summary data → preview → publish.

Individual marks, private student profiles, and admission decisions belong to protected workflows. A publicly published announcement/document must be an explicit approved publication, not a public dump of internal records.

### Profiles, media, and articles

Use consistent forms for teachers, committee profiles, departments, galleries, and blog articles. Support appropriate photos, captions, display order, visibility, and previews. Make shared records editable from either their management screen or mapped preview target.

## Incoming submissions

Every submission follows: server validation → durable save → server-generated unique reference → success response → matching inbox record. Failed saves retain the visitor's input and return a truthful retry message. Handle double clicks/retries without duplicate records. Add rate limits and spam protection appropriate to each form.

Inbox tabs distinguish admissions, contact inquiries, and Badri Kafela requests. Rows show only operationally necessary summaries: reference, applicant/sender, category, received time, status, and assigned staff where useful. Details open in a focused panel with full submitted information, protected attachments, internal notes, and status history.

- Admission stages: নতুন → যাচাই চলছে → তথ্য প্রয়োজন → গৃহীত / বাতিল; archive separately.
- Contact stages: নতুন → পর্যালোচনায় → সমাধান হয়েছে; archive/spam separately.
- Badri Kafela stages: নতুন → যোগাযোগ প্রয়োজন → নিশ্চিত / বন্ধ. A pledge/request is not proof that money was received.

Staff notes and workflow changes remain private and are never published automatically. Email/SMS delivery or payment verification requires a real configured integration before its controls can be enabled.

## Data and access architecture

- Published public content uses the existing Sanity content model, extended where justified by actual page fields.
- Incoming applications, contact details, private results, attachments, and staff notes use separately protected storage. A separate private Sanity dataset is an option for suitable records if the project's available permissions support the required roles; otherwise use an authenticated private application datastore. Select the final option after checking the existing account, roles, hosting, and storage availability.
- Private files require authenticated retrieval or short-lived authorized links. A private Sanity dataset alone does not make ordinary Sanity asset URLs access-controlled.
- Never put private submission reads, broad tokens, or write credentials into public bundles. Hiding a screen or filtering a query is not authorization.
- Check existing records and privacy before any migration. Preserve source data; use a dry run, migration ledger, backups, and verified counts. Do not delete remote records during routine setup.
- Map administrator, publisher, editor, and application-processing responsibilities to real supported permissions. Enforce access on the backend; hiding buttons is insufficient. Do not invent a weak separate password system.

## Visual editing

The editor opens the actual responsive website preview with a page navigator and a focused editing panel. Clicking text opens the containing text/rich-text field; clicking an image opens its asset, alt text, and crop controls; clicking a banner or hero opens the relevant content/media fields. Repeated cards and table rows resolve to their own stable record/array item.

Clicking a comma opens the field containing that comma. Staff edit the punctuation in that field. This does not promise a separate database field for every character, or unsupported browser-native text editing.

Move intended editable hardcoded content into suitable page documents/shared settings/reusable records without changing its wording. Keep field-level source mapping through queries and rendering. Add explicit annotations for images and components where automatic text mapping is insufficient. Preserve stable IDs and array keys. Decorative shapes are not misleading edit targets.

Repair draft authentication, source maps, token handling, live updates, document-to-route resolution, and cache invalidation as one tested path. Drafts remain private, and published changes reach the website without requiring a code deployment.

## Page coverage

Build a matrix with route, component, visible field, source document/path, management or visual workflow, fallback, privacy classification, and acceptance-test status. Do not mark a page complete because only its heading is editable.

Actual route groups discovered include:

- Homepage and shared header, navigation, footer, contact details, banners, hero/intro media.
- About, history, infrastructure, vacancies, and orphanage.
- Academics, faculty/teachers, profiles, committee, and managing committee.
- Admission information, `vorti-tottho`, application page instructions, and public admission-result information.
- Notices and functions pages: class routine, examination routine, events, holidays, and result announcements.
- Main/photo/video galleries, blog, and both Badri Kafela routes.

Resolve routes that share content to the same source record. On submission/search pages, visual editing covers staff-authored instructions and labels; visitor-entered values and private records are processed through management workflows.

## Implementation sequence and completion gates

1. **Audit and screen design**: complete page/form inventory, capture public design references, identify shared routes, assess permissions/storage, and prepare dashboard/list/form/inbox/visual-editor mockups.
2. **Trustworthy submissions**: implement protected persistence, authorization, uploads, unique references, error handling, and real admission/contact/Badri inboxes. Gate: a test submission survives refresh and is visible only to permitted staff; a failed save never claims success.
3. **Publishing workspace**: finish notices, routines, and public results, then profiles/media/blog. Gate: draft, preview, publish, edit, unpublish, archive, and replacement uploads work on the same underlying records.
4. **Visual editing foundation**: repair source mapping, authenticated preview, live updates, and caching. Gate: a paragraph/comma, image, button, and repeated card can be edited on the homepage and a second page without an unrelated field opening.
5. **Complete content coverage**: migrate and map every intended field across the route matrix, including shared components and secondary pages. Gate: every field has a tested editing path or an explicitly documented limitation.
6. **Regression and deployment**: verify publishing and privacy with staff/public sessions, desktop/mobile layouts, keyboard controls, forms, attachments, printing, failure states, frontend speed, Studio, preview, and the Vercel deployment. Gate: validate the live domain and provide a staff walkthrough and completed coverage matrix.

## Evidence required before completion

- A new notice, changed PDF, reordered routine, and public result persist and appear correctly after publishing.
- Draft edits never appear to a normal public visitor.
- A genuine submission appears once in the correct inbox with all supported fields and protected attachments.
- Missing credentials, rejected validation, server failure, and duplicate retries produce correct behavior.
- Staff permissions prevent unauthorized access to private records and protected actions.
- Visual editing tests include punctuation, images, buttons, repeated items, shared content, navigation, refresh, draft preview, and publication.
- Public layouts and performance are compared against the captured baseline; private/authenticated tooling does not inflate the public path unnecessarily.

## Official references checked

- https://www.sanity.io/docs/nextjs/visual-editing-with-next-js-app-router
- https://www.sanity.io/docs/visual-editing/visual-editing-overlays
- https://www.sanity.io/docs/app-sdk/sdk-authentication
- https://www.sanity.io/docs/content-lake/datasets
- https://www.sanity.io/docs/content-lake/keeping-your-data-safe
