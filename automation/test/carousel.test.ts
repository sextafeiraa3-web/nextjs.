import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderCarousel } from "../src/carousel.ts";
import type { DayPlan } from "../src/types.ts";

const plan: DayPlan = JSON.parse(readFileSync(new URL("./fixtures/day-plan.json", import.meta.url), "utf8"));

const size = (f: string) =>
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", f], { encoding: "utf8" }).trim();

test("renderCarousel writes one 1080x1350 JPEG per slide, in order", { timeout: 300_000 }, async () => {
  const out = mkdtempSync(join(tmpdir(), "car-"));
  const files = await renderCarousel(plan.carousel, out);
  assert.equal(files.length, plan.carousel.slides.length + 1); // + closing "Comente" slide
  files.forEach((f, i) => {
    assert.ok(f.endsWith(`carousel-${i + 1}.jpg`), f);
    const bytes = readFileSync(f);
    assert.deepEqual([...bytes.subarray(0, 3)], [0xff, 0xd8, 0xff]);
    assert.equal(size(f), "1080,1350");
  });
});

test("renderCarousel handles accents, %, R$ and dashes", { timeout: 300_000 }, async () => {
  const out = mkdtempSync(join(tmpdir(), "car-"));
  const post = { ...plan.carousel, slides: [{ title: "Ação: 30% mais rápido — R$ 0" }, { title: "Ç ã õ é" }, { title: "<b>não é html</b>" }] };
  const files = await renderCarousel(post, out);
  assert.equal(files.length, 4);
});
