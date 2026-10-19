import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

// SECTION=team npm run ui:screenshot -> tools/screenshots/team/*.png
// (matches tools/scripts/compare.mjs convention)
const SECTION = process.env.SECTION || null;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const ROUTES = ['/', '/work'];

test.describe('visual screenshots', () => {
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      test(`${route} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route, { waitUntil: 'networkidle' });
        // Walk the page so intersection-gated/lazy sections (e.g. the playground
        // maze) initialise, then return to the top before the full-page shot.
        await page.evaluate(async () => {
          const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 50));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForLoadState('networkidle');
        // wait for fonts / images to settle
        await page.waitForTimeout(500);

        const outDir = SECTION
          ? path.join('tools', 'screenshots', SECTION)
          : path.join('tools', 'screenshots');
        await fs.mkdir(outDir, { recursive: true });

        const safeRoute = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
        const outPath = path.join(outDir, `${safeRoute}-${vp.name}.png`);
        await page.screenshot({ path: outPath, fullPage: true });
      });
    }
  }
});
