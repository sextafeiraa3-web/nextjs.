import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureVoice, narrate } from "../src/narrate.ts";
import { renderVideo, targetDuration } from "../src/render-video.ts";
import type { DayPlan } from "../src/types.ts";

const plan: DayPlan = JSON.parse(readFileSync(new URL("./fixtures/day-plan.json", import.meta.url), "utf8"));
const VOICES = new URL("../../voices/", import.meta.url).pathname;

test("targetDuration is audio + 1.5 s, at least 15 s and at most 30 s", () => {
  assert.equal(targetDuration(10), 15);
  assert.equal(targetDuration(18), 19.5);
  assert.equal(targetDuration(40), 30);
});

test("renderVideo renders the fixture with video 1080x1920 and an audio stream", { timeout: 900_000 }, async () => {
  const dir = mkdtempSync(join(tmpdir(), "rv-"));
  const post = plan.videos[2];
  const { durationSec } = await narrate(post.narration, join(dir, "n.wav"), await ensureVoice(VOICES));
  const out = join(dir, "v.mp4");
  await renderVideo(post, join(dir, "n.wav"), durationSec, out);
  assert.ok(existsSync(out));
  const info = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", out], { encoding: "utf8" }));
  const video = info.streams.find((s: { codec_type: string }) => s.codec_type === "video");
  assert.equal(video.width, 1080);
  assert.equal(video.height, 1920);
  assert.ok(info.streams.some((s: { codec_type: string }) => s.codec_type === "audio"), "no audio stream");
  assert.ok(Math.abs(Number(info.format.duration) - targetDuration(durationSec)) <= 0.5, `${info.format.duration} vs ${targetDuration(durationSec)}`);
});

test("final review: fitsCap is false when narration plus air exceeds 30 s", async () => {
  const { fitsCap } = await import("../src/render-video.ts");
  assert.equal(fitsCap(28.5), true);
  assert.equal(fitsCap(28.6), false);
});

test("dailyProps sends an empty source when the post has none, so the fixture's default never leaks", async () => {
  const { dailyProps } = await import("../src/render-video.ts");
  const props = dailyProps(plan.videos[0], "daily/x.wav", 20);
  assert.equal(plan.videos[0].sources.length, 0);
  assert.equal(props.source, "");
  assert.equal(dailyProps(plan.videos[2], "daily/x.wav", 20).source, plan.videos[2].sources[0].name);
});
