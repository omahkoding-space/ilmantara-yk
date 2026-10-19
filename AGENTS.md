## Reference site (the original design)

This project is a pixel-faithful Astro port of a React/Framer site. The
in-repo static Framer export (`orange-property-949925.framer.app/`) has been
removed. The permanent source of truth for visual comparison is now the
snapshot set under `tools/reference/<section>/<viewport>.png`
(desktop 1440×900, mobile 390×844) — see the UI check loop below.

The React source this Astro app was ported from still lives at
`/Users/mm/Project/orange-property-template` (sibling directory, outside this
repo). Read it when porting a component, but **never edit it** — it's the
source of truth to diff against, not a working copy.

`npm run dev` serves the Astro app only:

- Astro app → `http://localhost:4321`

## Styling: Tailwind first, minimal CSS

Always style with Tailwind utility classes in markup, not custom CSS:

- Default to Tailwind classes (including arbitrary-value utilities like
  `text-[56px]`, `top-[17px]`, `[animation:clients-marquee_32s_linear_infinite]`)
  for layout, spacing, color, typography — everything that can be expressed
  as a utility class, should be.
- Reach for `src/styles/global.css` (or a `<style>` block) only for what
  Tailwind genuinely can't express: `@font-face` declarations, `@theme`
  tokens, true keyframe `@keyframes` definitions (the class that *uses* the
  keyframe is still a Tailwind arbitrary-value utility, as above), and
  one-off effects like the footer's "Noor Castell" mark (`-webkit-text-stroke`,
  the fit-to-width script) that have no utility-class equivalent.
- Before adding a new custom CSS rule or `<style>` block, check whether an
  existing Tailwind utility (including an arbitrary value) already covers
  it. Porting a component from the reference's inline `style="..."` attributes
  should produce Tailwind classes, not a 1:1 copy of those inline styles,
  except for values that are genuinely dynamic/computed (per-item colors,
  computed positions) or have no utility equivalent.
- Keep `global.css` small and auditable — it should stay limited to design
  tokens, fonts, and the handful of effects noted above, not grow into a
  parallel stylesheet.

## UI check loop

After any change that affects markup, styles, or layout, don't just eyeball
it once — loop until the diff is clean:

1. `npm run dev` (background) so the Astro app is up at `http://localhost:4321`.
2. Capture the current app: `npm run ui:screenshot` → writes
   `tools/screenshots/*.png` at desktop/mobile viewports.
3. If `tools/reference/<section>/<viewport>.png` doesn't exist yet for the
   section you're working on, capture a reference screenshot (same viewport
   sizes as `tests/visual.spec.ts`: 1440×900 desktop, 390×844 mobile) and
   save it there — that becomes the permanent source of truth for that
   section, not a self-regression baseline.
4. `npm run ui:compare` → pixelmatch diff against `tools/reference/` (falls
   back to `tools/screenshots/baseline/` only when no reference exists yet),
   diffs in `tools/diffs/`, report in `tools/visual-report/test-result.json`.
5. Read the report. On `FAIL`, open the matching `tools/diffs/*-diff.png`,
   fix the markup/styles, and go back to step 2.
6. Only report the task done once `ui:compare` prints `Overall: PASS` (or
   the remaining diff is an intentional, explained deviation from the
   reference — e.g. placeholder sections the source React app itself hasn't
   built out yet).

`npm run ui:test` runs steps 2 and 4 back to back as a single command once
references are in place.

## Development

Start the Astro dev server:

```
npm run dev
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
