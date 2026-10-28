import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { slideHtml } from "./carousel-template.ts";
import type { CarouselPost } from "./types.ts";

// Playwright is pre-installed globally in the cloud image.
const require = createRequire(import.meta.url);

// One JPEG per slide (TikTok refuses PNG), plus a closing "Comente X" slide.
export async function renderCarousel(post: CarouselPost, outDir: string): Promise<string[]> {
  const { chromium } = require("playwright");
  mkdirSync(outDir, { recursive: true });
  const total = post.slides.length + 1;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
    const files: string[] = [];
    for (let i = 0; i < total; i++) {
      const slide = post.slides[i];
      const html = slide
        ? slideHtml({ title: slide.title, body: slide.body, index: i + 1, total })
        : slideHtml({ title: "Quer os detalhes?", index: total, total, closing: { keyword: post.keyword } });
      await page.setContent(html, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const file = join(outDir, `carousel-${i + 1}.jpg`);
      await page.screenshot({ path: file, type: "jpeg", quality: 90 });
      files.push(file);
    }
    return files;
  } finally {
    await browser.close();
  }
}
