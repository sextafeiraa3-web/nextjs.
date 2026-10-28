import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { appendLog, readRecentLog } from "../src/log.ts";

const entry = (date: string) => ({ date, topic: `t ${date}`, keyword: "K", posts: [] });

test("appendLog writes <dir>/<date>.json and readRecentLog returns only the last N days", () => {
  const dir = mkdtempSync(join(tmpdir(), "log-"));
  for (const d of ["2026-10-01", "2026-10-20", "2026-10-27", "2026-10-29"]) appendLog(dir, entry(d));
  assert.equal(JSON.parse(readFileSync(join(dir, "2026-10-27.json"), "utf8")).date, "2026-10-27");
  const recent = readRecentLog(dir, "2026-10-29", 14).map((e) => e.date).sort();
  assert.deepEqual(recent, ["2026-10-20", "2026-10-27"]);
});

test("readRecentLog on a missing dir returns []", () => {
  assert.deepEqual(readRecentLog(join(tmpdir(), "nope-" + Date.now()), "2026-10-29", 14), []);
});
