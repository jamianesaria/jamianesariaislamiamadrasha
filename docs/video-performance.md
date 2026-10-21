# Homepage video performance

The original uploads are preserved. The homepage uses these silent H.264/yuv420p MP4 derivatives with `faststart` metadata:

| Asset | Dimensions | Size |
| --- | --- | --- |
| `intro-mobile-v2.mp4` | 432 × 768, centered portrait crop | 98,030 bytes |
| `intro-desktop-v2.mp4` | 960 × 540 | 261,075 bytes |
| `hero-courtyard-v2.mp4` | 960 × 540 | 1,099,487 bytes |

The intro is shown only after playback starts. The homepage remains accessible during preparation and without JavaScript. A 1.5-second startup/buffering deadline and a 6-second overall deadline prevent a stalled intro from blocking navigation. Hydration taking over 3 seconds, Data Saver, 2G, reduced motion, Studio iframes, and completed sessions bypass the intro. The hero waits for the intro, loads only in view, and pauses offscreen or in a hidden tab.

Edit desktop/portrait URLs, posters, enabled state, and the hero under **হোমপেজ ও ভিডিও (Homepage & Videos)** in `/studio`. Existing custom URLs are preserved; the original bundled intro URL resolves to its optimized derivative. Public pages only load the Sanity editing overlay in authenticated draft mode.

Versioned media responses use immutable caching. Use a NEW filename when replacing a versioned asset; do not overwrite an existing `v2` file in a subsequent release.

## Verification

- `node node_modules/typescript/bin/tsc --noEmit`
- `node --test scripts/test-departments.mjs scripts/test-stega.mjs`
- `node scripts/check-intro.mjs` against a running site (`SITE_URL`; optionally `PLAYWRIGHT_MODULE` and `BROWSER_EXECUTABLE`).
- For isolated media checks: run `node scripts/serve-media-test.mjs`, then point `SITE_URL` at `http://127.0.0.1:3015`. This uses the actual components, media, React Strict Mode, SSR/hydration and Tailwind, with only icons and clean-text decoding stubbed. It does not validate Next.js routing, Studio, caching, or deployment.
- `node scripts/audit-speed.mjs` records navigation timings, video state, resources, and runtime errors from the configured `SITE_URL`.

The local Windows production build stalled in compilation during this change. TypeScript, targeted lint, content tests, and the isolated media suite passed. Check the Vercel build and deployed homepage before treating deployment as verified.
