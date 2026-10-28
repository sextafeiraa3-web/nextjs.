import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateDayPlan } from "../src/validate.ts";
import type { LogEntry } from "../src/types.ts";

const fixture = () => JSON.parse(readFileSync(new URL("./fixtures/day-plan.json", import.meta.url), "utf8"));
const errorsOf = (plan: unknown, recent: LogEntry[] = []) => {
  const r = validateDayPlan(plan, recent);
  return r.ok ? [] : r.errors;
};
const has = (errors: string[], text: string) => assert.ok(errors.some((e) => e.includes(text)), `expected an error with "${text}", got: ${JSON.stringify(errors)}`);

test("valid fixture passes", () => {
  assert.equal(validateDayPlan(fixture(), []).ok, true);
});

test("rejects 2 videos", () => {
  const p = fixture();
  p.videos.pop();
  has(errorsOf(p), "videos");
});

test("rejects hook over 60 chars", () => {
  const p = fixture();
  p.videos[0].hook = "x".repeat(61);
  has(errorsOf(p), "hook");
});

test("rejects tiktokTitle over 90 chars", () => {
  const p = fixture();
  p.carousel.tiktokTitle = "x".repeat(91);
  has(errorsOf(p), "tiktokTitle");
});

test("rejects youtubeTitle over 100 chars", () => {
  const p = fixture();
  p.videos[1].youtubeTitle = "x".repeat(101);
  has(errorsOf(p), "youtubeTitle");
});

test("rejects narration over 75 words", () => {
  const p = fixture();
  p.videos[0].narration = Array(76).fill("palavra").join(" ");
  has(errorsOf(p), "narration");
});

test("rejects narration under 25 words", () => {
  const p = fixture();
  p.videos[0].narration = "Curta demais.";
  has(errorsOf(p), "narration");
});

test("rejects video with fewer than 2 or more than 4 scenes", () => {
  const p = fixture();
  p.videos[0].scenes = [p.videos[0].scenes[0]];
  has(errorsOf(p), "scenes");
  const q = fixture();
  q.videos[0].scenes = Array(5).fill(q.videos[0].scenes[0]);
  has(errorsOf(q), "scenes");
});

test("rejects carousel with fewer than 3 or more than 8 slides", () => {
  const p = fixture();
  p.carousel.slides = p.carousel.slides.slice(0, 2);
  has(errorsOf(p), "slides");
  const q = fixture();
  q.carousel.slides = Array(9).fill(q.carousel.slides[0]);
  has(errorsOf(q), "slides");
});

test("rejects news pillar without sources", () => {
  const p = fixture();
  p.videos[2].sources = [];
  has(errorsOf(p), "sources");
});

test("allows tip and concept without sources", () => {
  const p = fixture();
  assert.equal(p.videos[0].sources.length, 0);
  assert.equal(validateDayPlan(p, []).ok, true);
});

test("rejects duplicate keyword inside the day", () => {
  const p = fixture();
  p.videos[1].keyword = "ZAP";
  has(errorsOf(p), "ZAP");
});

test("rejects malformed keyword", () => {
  const p = fixture();
  p.videos[0].keyword = "zap!";
  has(errorsOf(p), "keyword");
});

test("rejects topic or keyword used in recent log, naming the date", () => {
  const recent: LogEntry[] = [{ date: "2026-10-22", topic: "chatgpt tranca CONVERSAS com senha", keyword: "OUTRA", posts: [] }];
  has(errorsOf(fixture(), recent), "2026-10-22");
  const recent2: LogEntry[] = [{ date: "2026-10-20", topic: "Outro tema", keyword: "ZAP", posts: [] }];
  has(errorsOf(fixture(), recent2), "2026-10-20");
});

test("rejects unknown scene kind", () => {
  const p = fixture();
  p.videos[0].scenes[0] = { kind: "banana", title: "x" };
  has(errorsOf(p), "kind");
});
