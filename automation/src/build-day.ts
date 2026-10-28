// CLI: node --experimental-strip-types src/build-day.ts <plan.json> [--out dir] [--log-dir dir]
// Validates the day plan, narrates and renders the 3 videos, renders the
// carousel JPEGs and writes manifest.json. Exits 1 with the validator's
// errors on stderr when the plan is not valid.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";
import { parseArgs } from "node:util";
import { renderCarousel } from "./carousel.ts";
import { readRecentLog } from "./log.ts";
import { ensureVoice, narrate } from "./narrate.ts";
import { renderVideo, targetDuration } from "./render-video.ts";
import type { Manifest } from "./types.ts";
import { validateDayPlan } from "./validate.ts";

const ROOT = new URL("../../", import.meta.url).pathname;

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { out: { type: "string" }, "log-dir": { type: "string" } },
});
if (positionals.length !== 1) {
  console.error("usage: build-day <plan.json> [--out dir] [--log-dir dir]");
  process.exit(2);
}

const raw = JSON.parse(readFileSync(positionals[0], "utf8"));
const logDir = values["log-dir"] ?? join(ROOT, "content", "log");
const result = validateDayPlan(raw, readRecentLog(logDir, String(raw.date), 14));
if (!result.ok) {
  console.error("Invalid day plan:\n- " + result.errors.join("\n- "));
  process.exit(1);
}
const plan = result.plan;
const out = values.out ?? join(ROOT, "out", plan.date);
mkdirSync(out, { recursive: true });

const voice = await ensureVoice(join(ROOT, "voices"));
const manifest: Manifest = { date: plan.date, videos: [], carousel: { slot: plan.carousel.slot, files: [] } };

for (const [i, post] of plan.videos.entries()) {
  const wav = join(out, `v${i + 1}.wav`);
  const { durationSec } = await narrate(post.narration, wav, voice);
  const file = `v${i + 1}.mp4`;
  await renderVideo(post, wav, durationSec, join(out, file));
  manifest.videos.push({ slot: post.slot, file, durationSec: targetDuration(durationSec) });
  console.log(`rendered ${file} (${post.slot}, ${targetDuration(durationSec).toFixed(1)} s)`);
}

const jpgs = await renderCarousel(plan.carousel, out);
manifest.carousel.files = jpgs.map((f) => basename(f));
console.log(`rendered ${jpgs.length} carousel slides`);

writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest: ${join(out, "manifest.json")}`);
