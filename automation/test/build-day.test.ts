import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Manifest } from "../src/types.ts";

const FIXTURE = new URL("./fixtures/day-plan.json", import.meta.url).pathname;
const CLI = new URL("../src/build-day.ts", import.meta.url).pathname;
const run = (plan: string, out: string) =>
  spawnSync("node", ["--experimental-strip-types", "--no-warnings", CLI, plan, "--out", out, "--log-dir", join(out, "no-log")], { encoding: "utf8" });

test("build-day exits 1 on an invalid plan and prints the errors", () => {
  const dir = mkdtempSync(join(tmpdir(), "bd-"));
  const bad = JSON.parse(readFileSync(FIXTURE, "utf8"));
  bad.videos[0].hook = "x".repeat(80);
  writeFileSync(join(dir, "bad.json"), JSON.stringify(bad));
  const r = run(join(dir, "bad.json"), join(dir, "out"));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /hook/);
});

test("build-day on the fixture writes 3 videos, the carousel JPEGs and a manifest", { timeout: 1_800_000 }, () => {
  const out = join(mkdtempSync(join(tmpdir(), "bd-")), "out");
  const r = run(FIXTURE, out);
  assert.equal(r.status, 0, r.stderr);
  const manifest: Manifest = JSON.parse(readFileSync(join(out, "manifest.json"), "utf8"));
  assert.equal(manifest.date, "2026-10-29");
  assert.deepEqual(manifest.videos.map((v) => v.slot), ["12:30", "17:00", "19:00"]);
  manifest.videos.forEach((v) => {
    assert.ok(existsSync(join(out, v.file)), v.file);
    assert.ok(v.durationSec >= 15 && v.durationSec <= 30, String(v.durationSec));
  });
  assert.equal(manifest.carousel.files.length, 5);
  manifest.carousel.files.forEach((f) => assert.ok(existsSync(join(out, f)) && f.endsWith(".jpg"), f));
});

test("final review: build-day resolves a relative plan path from the caller's folder when run through npm --prefix", () => {
  const repo = new URL("../../", import.meta.url).pathname;
  const dir = mkdtempSync(join(repo, "out", "rel-"));
  const bad = JSON.parse(readFileSync(FIXTURE, "utf8"));
  bad.videos[0].hook = "x".repeat(80);
  writeFileSync(join(dir, "bad.json"), JSON.stringify(bad));
  const rel = join("out", dir.split("/out/")[1], "bad.json");
  const r = spawnSync("npm", ["--prefix", "automation", "run", "--silent", "build-day", "--", rel, "--log-dir", join(dir, "nolog")], { cwd: repo, encoding: "utf8" });
  assert.equal(r.status, 1, r.stderr);
  assert.match(r.stderr, /hook/);
  assert.doesNotMatch(r.stderr, /ENOENT/);
});
