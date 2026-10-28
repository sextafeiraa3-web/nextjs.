import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import type { VideoPost } from "./types.ts";

const REELS = new URL("../../videos/reels/", import.meta.url).pathname;
// Remotion cannot download its own browser in the cloud; use the pre-installed one.
export const HEADLESS_SHELL =
  process.env.REMOTION_BROWSER ?? "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";

// Same rule as dailyDuration() in videos/reels/src/daily/DailyReel.tsx.
export const targetDuration = (audioSec: number) => Math.min(30, Math.max(15, audioSec + 1.5));
// False when the narration would be cut by the 30 s cap (its end is the spoken CTA).
export const fitsCap = (audioSec: number) => audioSec + 1.5 <= 30;

// Every field is set explicitly: a missing key would fall back to the
// composition's defaultProps (the fixture), e.g. a wrong "Fonte".
export function dailyProps(post: VideoPost, audio: string, audioSec: number) {
  return {
    hook: post.hook,
    scenes: post.scenes,
    keyword: post.keyword,
    ctaQuestion: post.ctaQuestion,
    source: post.sources[0]?.name ?? "",
    audio,
    audioSec,
  };
}

export async function renderVideo(post: VideoPost, wav: string, durationSec: number, outMp4: string): Promise<void> {
  const publicDir = join(REELS, "public", "daily");
  mkdirSync(publicDir, { recursive: true });
  const audioName = `${Date.now()}-${basename(wav)}`;
  copyFileSync(wav, join(publicDir, audioName));

  const props = dailyProps(post, `daily/${audioName}`, durationSec);
  const propsFile = join(publicDir, `${audioName}.props.json`);
  writeFileSync(propsFile, JSON.stringify(props));

  execFileSync(
    "npx",
    ["remotion", "render", "DailyReel", outMp4, `--props=${propsFile}`, `--browser-executable=${HEADLESS_SHELL}`, "--log=error"],
    { cwd: REELS, stdio: ["ignore", "ignore", "pipe"] },
  );
}
