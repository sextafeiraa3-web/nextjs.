import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildPayloads } from "../src/payloads.ts";
import type { DayPlan, Manifest } from "../src/types.ts";

const plan = (): DayPlan => JSON.parse(readFileSync(new URL("./fixtures/day-plan.json", import.meta.url), "utf8"));
const manifest: Manifest = {
  date: "2026-10-29",
  videos: [
    { slot: "12:30", file: "v1.mp4", durationSec: 19 },
    { slot: "17:00", file: "v2.mp4", durationSec: 20 },
    { slot: "19:00", file: "v3.mp4", durationSec: 18 },
  ],
  carousel: { slot: "09:00", files: ["carousel-1.jpg", "carousel-2.jpg", "carousel-3.jpg", "carousel-4.jpg", "carousel-5.jpg"] },
};
const RAW = "https://raw.githubusercontent.com/sextafeiraa3-web/nextjs./abc/media/2026-10-29/";
const urls = () => Object.fromEntries([...manifest.videos.map((v) => v.file), ...manifest.carousel.files].map((f) => [f, RAW + f]));
type Info = Record<string, any>;
const networks = (info: Info) => info.providers.map((p: { network: string }) => p.network).sort();

test("video reel payload targets instagram, facebook, tiktok and youtube with the right data", () => {
  const reels = buildPayloads(plan(), urls(), manifest).filter((p) => p.kind === "reel");
  assert.equal(reels.length, 3);
  const reel = reels.find((r) => r.slot === "12:30")!;
  const info = reel.info as Info;
  const post = plan().videos[0];
  assert.deepEqual(networks(info), ["facebook", "instagram", "tiktok", "youtube"]);
  assert.deepEqual(info.media, [RAW + "v1.mp4"]);
  assert.equal(info.text, post.caption);
  assert.equal(info.autoPublish, true);
  assert.equal(info.instagramData.type, "REEL");
  assert.equal(info.instagramData.showReelOnFeed, true);
  assert.equal(info.instagramData.audioConfiguration.audioId, "364588399541989");
  assert.equal(info.instagramData.audioConfiguration.audioVolume, 20);
  assert.equal(info.instagramData.audioConfiguration.videoVolume, 100);
  assert.equal(info.facebookData.type, "REEL");
  assert.equal(info.tiktokData.title, post.tiktokTitle);
  assert.equal(info.tiktokData.isAigc, true);
  assert.deepEqual(info.youtubeData, { title: post.youtubeTitle, type: "short", privacy: "public", madeForKids: false, isAiGeneratedContent: true });
  assert.deepEqual(info.publicationDate, { dateTime: "2026-10-29T12:30:00", timezone: "America/Sao_Paulo" });
  assert.equal(reel.date, "2026-10-29T12:30:00-03:00");
});

test("each reel gets an instagram+facebook story 30 minutes later, without text", () => {
  const stories = buildPayloads(plan(), urls(), manifest).filter((p) => p.kind === "story");
  assert.deepEqual(stories.map((s) => s.date).sort(), ["2026-10-29T13:00:00-03:00", "2026-10-29T17:30:00-03:00", "2026-10-29T19:30:00-03:00"]);
  const info = stories[0].info as Info;
  assert.deepEqual(networks(info), ["facebook", "instagram"]);
  assert.equal(info.instagramData.type, "STORY");
  assert.equal(info.facebookData.type, "STORY");
  assert.equal("text" in info, false);
});

test("carousel payload is an instagram post plus tiktok photos with JPEGs in order", () => {
  const car = buildPayloads(plan(), urls(), manifest).find((p) => p.kind === "carousel")!;
  const info = car.info as Info;
  assert.deepEqual(networks(info), ["instagram", "tiktok"]);
  assert.equal(info.instagramData.type, "POST");
  assert.equal(info.tiktokData.title, plan().carousel.tiktokTitle);
  assert.deepEqual(info.media, manifest.carousel.files.map((f) => RAW + f));
  assert.equal(car.date, "2026-10-29T09:00:00-03:00");
});

test("throws on PNG media", () => {
  const m = structuredClone(manifest);
  m.carousel.files[0] = "carousel-1.png";
  const u = { ...urls(), "carousel-1.png": RAW + "carousel-1.png" };
  assert.throws(() => buildPayloads(plan(), u, m), /png/i);
});

test("throws when a media URL is missing", () => {
  const u = urls();
  delete u["v2.mp4"];
  assert.throws(() => buildPayloads(plan(), u, manifest), /v2\.mp4/);
});

test("the 19:00 slot goes to the video with the strongest pillar", () => {
  const p = plan();
  // Put the news video first; it must still end up at 19:00.
  p.videos = [p.videos[2], p.videos[0], p.videos[1]];
  p.videos[0].slot = "12:30";
  p.videos[1].slot = "17:00";
  p.videos[2].slot = "19:00";
  const m = structuredClone(manifest);
  const reels = buildPayloads(p, urls(), m).filter((r) => r.kind === "reel");
  const at19 = reels.find((r) => r.slot === "19:00")!;
  assert.equal((at19.info as Info).tiktokData.title, plan().videos[2].tiktokTitle);
  assert.deepEqual((at19.info as Info).media, [RAW + "v1.mp4"]);
});

test("final review: firstComment from the plan becomes firstCommentText", () => {
  const p = plan();
  p.videos[0].firstComment = "Prompt completo: ...";
  p.carousel.firstComment = "Checklist: ...";
  const all = buildPayloads(p, urls(), manifest);
  const reel = all.find((x) => x.kind === "reel" && x.slot === "12:30")!;
  assert.equal((reel.info as Info).firstCommentText, "Prompt completo: ...");
  assert.equal((all.find((x) => x.kind === "carousel")!.info as Info).firstCommentText, "Checklist: ...");
});
