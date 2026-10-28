import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { publishMedia } from "../src/publish-media.ts";

const git = (cwd: string, ...args: string[]) =>
  execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...args], { cwd, encoding: "utf8" }).trim();

test("publishMedia pushes to the media branch, returns pinned raw URLs and prunes folders older than 30 days", () => {
  const root = mkdtempSync(join(tmpdir(), "pm-"));
  const remote = join(root, "remote.git");
  git(root, "init", "-q", "--bare", remote);

  // Seed the media branch with an old and a recent day.
  const seed = join(root, "seed");
  git(root, "clone", "-q", remote, seed);
  git(seed, "checkout", "-q", "--orphan", "media");
  for (const d of ["2026-09-20", "2026-10-01"]) {
    mkdirSync(join(seed, "media", d), { recursive: true });
    writeFileSync(join(seed, "media", d, "x.jpg"), d);
  }
  git(seed, "add", "-A");
  git(seed, "commit", "-qm", "seed");
  git(seed, "push", "-q", "origin", "media");

  const day = join(root, "out");
  mkdirSync(day);
  writeFileSync(join(day, "v1.mp4"), "video");
  writeFileSync(join(day, "carousel-1.jpg"), "img");
  writeFileSync(join(day, "manifest.json"), "{}");

  const { sha, urls } = publishMedia(day, { remote, branch: "media", today: "2026-10-28" });
  assert.match(sha, /^[0-9a-f]{40}$/);
  assert.equal(urls["v1.mp4"], `https://raw.githubusercontent.com/sextafeiraa3-web/nextjs./${sha}/media/2026-10-28/v1.mp4`);
  assert.ok(urls["carousel-1.jpg"]);

  const files = git(root, "--git-dir", remote, "ls-tree", "-r", "--name-only", "media").split("\n");
  assert.ok(files.includes("media/2026-10-28/v1.mp4"));
  assert.ok(files.includes("media/2026-10-01/x.jpg"));
  assert.ok(!files.some((f) => f.startsWith("media/2026-09-20/")));
  assert.equal(git(root, "--git-dir", remote, "rev-parse", "media"), sha);
});

test("publishMedia creates the media branch when it does not exist", () => {
  const root = mkdtempSync(join(tmpdir(), "pm-"));
  const remote = join(root, "remote.git");
  git(root, "init", "-q", "--bare", remote);
  const day = join(root, "out");
  mkdirSync(day);
  writeFileSync(join(day, "v1.mp4"), "video");
  const { urls } = publishMedia(day, { remote, branch: "media", today: "2026-10-28" });
  assert.ok(urls["v1.mp4"].endsWith("/media/2026-10-28/v1.mp4"));
});

test("publishMedia keeps a vercel.json that disables Vercel deployments of the media branch", () => {
  const root = mkdtempSync(join(tmpdir(), "pm-"));
  const remote = join(root, "remote.git");
  git(root, "init", "-q", "--bare", remote);
  const day = join(root, "out");
  mkdirSync(day);
  writeFileSync(join(day, "v1.mp4"), "video");
  publishMedia(day, { remote, branch: "media", today: "2026-10-28" });
  const config = JSON.parse(git(root, "--git-dir", remote, "show", "media:vercel.json"));
  assert.deepEqual(config, { git: { deploymentEnabled: false } });
});
