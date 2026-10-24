# Live visual editing verification

Tested on **https://nesariamadrasa.com**, code release **2de644f**, completed **2026-10-24T07:33:13.948Z**. All **26 public views passed**. The four redirect routes are covered separately by the public browser check.

The browser test uses the real deployed frontend, actual Sanity visual overlays, and Sanity's official Comlink protocol. A test host receives actual field-focus messages and checks their document IDs and source paths. It does not impersonate a personal Studio login. The host exists only inside the test browser; no test route or authentication bypass was deployed.

Across the views: **4607 text annotations** and **255 image annotations** were inspected, including repeated/shared fields (these are not unique-field counts). Every inspected source path resolved. No broken sources, invisible metadata in links, unmapped visible headings, or browser runtime errors were found. Representative text and image clicks passed on all 26 views; punctuation clicks passed on 20 views where a suitable visible paragraph was present. Button and native-record clicks were exercised where applicable. Actual per-click source IDs/paths are preserved in [the machine-readable report](verification/visual-editing.json).

For every view, a temporary field edit was rendered in an authorized draft preview and absent from an independent public browser context. All 26 phone field-click checks passed at 390 × 844. Preview exit cleared the draft cookie. Event, holiday and vacancy dialogs each updated an open record after a native-document draft change without closing the dialog. Test cleanup removed only its own unchanged drafts and preview secrets; existing staff drafts would be preserved, and no check was skipped for such a draft in this run.

| Route | Text / image annotations | Text click | Punctuation | Button / native record | Private draft | Phone click |
| --- | ---: | --- | --- | --- | --- | --- |
| / | 362 / 19 | Pass | Pass | Pass / Pass | Pass | Pass |
| /about | 217 / 3 | Pass | Pass | Pass / — | Pass | Pass |
| /about/history | 217 / 3 | Pass | Pass | Pass / — | Pass | Pass |
| /about/infrastructure | 81 / 3 | Pass | Pass | — / — | Pass | Pass |
| /about/vacancy | 80 / 3 | Pass | Pass | Pass / Pass | Pass | Pass |
| /academics | 311 / 3 | Pass | Pass | Pass / — | Pass | Pass |
| /admission | 129 / 2 | Pass | Pass | Pass / Pass | Pass | Pass |
| /apply | 133 / 2 | Pass | Pass | Pass / — | Pass | Pass |
| /badri-kafila | 541 / 2 | Pass | Pass | Pass / — | Pass | Pass |
| /blog | 140 / 8 | Pass | Pass | Pass / Pass | Pass | Pass |
| /committee | 233 / 34 | Pass | Pass | Pass / Pass | Pass | Pass |
| /contact | 87 / 2 | Pass | Pass | Pass / — | Pass | Pass |
| /exam-routine | 66 / 2 | Pass | — | Pass / — | Pass | Pass |
| /faculty | 357 / 41 | Pass | Pass | Pass / Pass | Pass | Pass |
| /functions/class-routine | 67 / 2 | Pass | — | Pass / — | Pass | Pass |
| /functions/event-list | 85 / 6 | Pass | — | — / Pass | Pass | Pass |
| /functions/holiday | 80 / 2 | Pass | — | Pass / Pass | Pass | Pass |
| /gallery | 89 / 12 | Pass | Pass | Pass / Pass | Pass | Pass |
| /gallery/photo | 106 / 12 | Pass | — | — / Pass | Pass | Pass |
| /gallery/video | 101 / 9 | Pass | — | — / Pass | Pass | Pass |
| /notices | 176 / 2 | Pass | Pass | Pass / Pass | Pass | Pass |
| /orphanage | 217 / 4 | Pass | Pass | Pass / — | Pass | Pass |
| /profile/managing-committee | 233 / 34 | Pass | Pass | Pass / Pass | Pass | Pass |
| /results/academic | 71 / 2 | Pass | Pass | Pass / — | Pass | Pass |
| /results/admission | 71 / 2 | Pass | Pass | Pass / — | Pass | Pass |
| /teachers | 357 / 41 | Pass | Pass | Pass / Pass | Pass | Pass |

An em dash means the representative check was not applicable to the rendered state, not that the entire field category was exhaustively tested. For example, empty result lists do not contain a published result record to click, and routine content appears after a class search. Additional management integration checks exercise routine rows, results schema/actions, publishing, file replacement and deletion.

## Repairs verified

- Published page-copy documents are read with a server-only credential; their protected IDs no longer cause silent fallback to stale text.
- Preview honors Sanity's requested perspective and isolates adjacent editable strings, so selecting one field opens its own source rather than a neighboring quotation or label.
- Preview-only wrappers restore header/hero text and gallery image targeting through hover overlays. Public page design/wording is preserved.
- Telephone/email link values are cleaned of invisible source metadata while their visible text remains editable.
- Teacher list headings now have typed keyed copy entries with the original wording. Open dialogs derive their current record by stable ID and reflect draft updates.
- SDK failures use safe error boundaries without logging authorization-bearing request objects. A controlled invalid-credential test verified fallback status 200 and no credential in logs or HTML.

## Other release evidence and limits

The public browser pass checked all 26 views at 1440 × 1000 and 390 × 844: responses were 200, expected styles were present and no horizontal overflow or React runtime errors occurred. Native Studio's sign-in screen loaded; invalid preview authentication returned 401. Live admission/contact/Badri HTTP saving and retry deduplication passed after the Free-compatible storage configuration. The live credential-boundary check inspected 158 HTML, JavaScript and component responses without finding the production server credential.

This establishes every inventoried page's representative editing/data paths. It does **not** claim that a human has clicked every conditional field, tested every browser, or completed the owner's personal Sanity sign-in/publish permissions. Characters open their containing field; lettering embedded in images/videos requires replacing that media. Editing field values does not create arbitrary page-layout controls. See [staff instructions](staff-guide.md), [operations](cms-operations.md) and [security/capacity](security-and-capacity.md).
