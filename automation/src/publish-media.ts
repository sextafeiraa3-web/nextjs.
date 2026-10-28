// Puts a rendered day (out/<date>) on the `media` branch so Metricool can
// fetch it from raw.githubusercontent.com, pinned to the commit SHA.
// CLI: node --experimental-strip-types src/publish-media.ts out/<date>
//   prints {"sha": "...", "urls": {"v1.mp4": "https://raw..."}}
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

const RAW_BASE = "https://raw.githubusercontent.com/sextafeiraa3-web/nextjs.";
const KEEP_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
// Only what a post needs; narration wavs and the manifest stay local.
const PUBLISHED = /\.(mp4|jpg)$/;

type Options = { remote: string; branch: string; today: string };

const git = (cwd: string, ...args: string[]) =>
  execFileSync("git", ["-c", "user.name=Lino IA Bot", "-c", "user.email=bot@linoia.br", ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

export function publishMedia(dir: string, { remote, branch, today }: Options): { sha: string; urls: Record<string, string> } {
  const work = mkdtempSync(join(tmpdir(), "media-"));
  const hasBranch = git(work, "ls-remote", "--heads", remote, branch) !== "";
  if (hasBranch) {
    git(work, "clone", "-q", "--depth", "1", "--branch", branch, remote, "repo");
  } else {
    git(work, "init", "-q", "repo");
    git(join(work, "repo"), "checkout", "-q", "--orphan", branch);
    git(join(work, "repo"), "remote", "add", "origin", remote);
  }
  const repo = join(work, "repo");
  const mediaRoot = join(repo, "media");

  // Prune days older than KEEP_DAYS.
  if (existsSync(mediaRoot)) {
    for (const d of readdirSync(mediaRoot)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(d) && Date.parse(today) - Date.parse(d) > KEEP_DAYS * DAY_MS) {
        rmSync(join(mediaRoot, d), { recursive: true, force: true });
      }
    }
  }

  const target = join(mediaRoot, today);
  mkdirSync(target, { recursive: true });
  const files = readdirSync(dir).filter((f) => PUBLISHED.test(f));
  for (const f of files) cpSync(join(dir, f), join(target, f));

  // The media branch holds only files; stop Vercel from trying to deploy it.
  writeFileSync(join(repo, "vercel.json"), JSON.stringify({ git: { deploymentEnabled: false } }, null, 2) + "\n");

  git(repo, "add", "-A");
  git(repo, "commit", "-q", "--allow-empty", "-m", `media: ${today}`);
  git(repo, "push", "-q", "origin", `HEAD:refs/heads/${branch}`);
  const sha = git(repo, "rev-parse", "HEAD");
  rmSync(work, { recursive: true, force: true });

  const urls = Object.fromEntries(files.map((f) => [f, `${RAW_BASE}/${sha}/media/${today}/${f}`]));
  return { sha, urls };
}

if (import.meta.filename === resolve(process.argv[1])) {
  const arg = process.argv[2];
  const dir = arg && resolve(process.env.INIT_CWD ?? process.cwd(), arg);
  if (!dir) {
    console.error("usage: publish-media <out/YYYY-MM-DD>");
    process.exit(2);
  }
  const root = new URL("../../", import.meta.url).pathname;
  const remote = git(root, "remote", "get-url", "origin");
  console.log(JSON.stringify(publishMedia(dir, { remote, branch: "media", today: basename(dir) }), null, 2));
}
