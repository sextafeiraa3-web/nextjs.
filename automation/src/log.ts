import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { LogEntry } from "./types.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

// One file per day: <dir>/<date>.json. Entries strictly before `today` and
// within `days` days of it.
export function readRecentLog(dir: string, today: string, days: number): LogEntry[] {
  if (!existsSync(dir)) return [];
  const end = Date.parse(today);
  return readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .filter((f) => {
      const t = Date.parse(f.slice(0, 10));
      return t < end && end - t <= days * DAY_MS;
    })
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")) as LogEntry);
}

export function appendLog(dir: string, entry: LogEntry): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${entry.date}.json`), JSON.stringify(entry, null, 2) + "\n");
}
