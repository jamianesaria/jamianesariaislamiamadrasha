# Homepage video performance

The original intro upload is retained in Git history. The homepage uses these silent H.264/yuv420p MP4 derivatives with `faststart` metadata:

| Asset | Dimensions | Size |
| --- | --- | --- |
| `intro-mobile-v3.mp4` | 432 × 768, wider center framing and softly extended background | 121,115 bytes |
| `intro-desktop-v2.mp4` | 960 × 540 | 261,075 bytes |
| `hero-courtyard-v2.mp4` | 960 × 540 | 1,099,487 bytes |

The overlay fills the viewport using `object-cover` in both orientations. The portrait derivative keeps the complete final name inside its central safe area instead of cutting a narrow strip from the landscape source. Rotation switches source while retaining playback position.

The intro runs once per browser-tab session and video version. Updating either source resets the seen marker so existing visitors can see the corrected version. Only natural completion or an explicit Skip records it as seen. A media error reveals the homepage without recording completion, so reloading can retry. A slow JavaScript load or 2G connection no longer silently suppresses the intro. Blocked autoplay shows a Play button. Data Saver and reduced motion offer manual playback without downloading video until requested. A five-second loading/buffering deadline offers manual retry; Skip is available throughout. Studio iframes bypass the intro. No JavaScript means an accessible homepage, with no overlay or video download.

The hero waits for the intro, loads only in view, and pauses offscreen or in a hidden tab. This does not override browser autoplay policies or promise automatic playback on devices where the user or OS blocks it.

Edit desktop/portrait URLs, posters, enabled state, Play/Skip/loading labels, and the hero under **হোমপেজ ও ভিডিও (Homepage & Videos)** in `/studio`. Existing custom URLs are preserved; the old bundled portrait URL resolves to the new derivative. Public pages only load the Sanity editing overlay in authenticated draft mode.

Versioned media responses use immutable caching. Use a NEW filename when replacing a versioned asset; do not overwrite an existing `v2` file in a subsequent release.

## Verification

- `node node_modules/typescript/bin/tsc --noEmit`
- `node --test scripts/test-departments.mjs scripts/test-stega.mjs`
- `node scripts/check-intro.mjs` against a running site (`SITE_URL`; optionally `PLAYWRIGHT_MODULE`, `BROWSER_EXECUTABLE`, and `SCREENSHOT_DIR`). Tests cover seven viewport sizes, screenshots of the final name, blocked autoplay and manual recovery, slow JavaScript/media, reduced motion, Data Saver, rotation, session persistence, failure recovery, keyboard controls, and no JavaScript.
- For isolated media checks: run `node scripts/serve-media-test.mjs`, then point `SITE_URL` at `http://127.0.0.1:3015`. This uses the actual components, media, React Strict Mode, SSR/hydration and Tailwind, with only icons and clean-text decoding stubbed. It does not validate Next.js routing, Studio, caching, or deployment.
- `node scripts/audit-speed.mjs` records navigation timings, video state, resources, and runtime errors from the configured `SITE_URL`.

The local Windows production build stalled in compilation during this change. TypeScript, targeted lint, content tests, and the isolated media suite passed. Check the Vercel build and deployed homepage before treating deployment as verified.
