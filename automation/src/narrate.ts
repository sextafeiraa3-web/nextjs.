import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Piper text-to-speech (pip install piper-tts). The better voice (faber) is
// committed to voices/ from the owner's PC because the cloud cannot reach
// huggingface.co; until then the older edresson voice is fetched from GitHub.
const FABER = "pt_BR-faber-medium.onnx";
const EDRESSON = "pt-br-edresson-low.onnx";
const EDRESSON_URL = "https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-pt-br-edresson-low.tar.gz";

export async function ensureVoice(voicesDir: string): Promise<string> {
  const faber = join(voicesDir, FABER);
  if (existsSync(faber)) return faber;
  const edresson = join(voicesDir, EDRESSON);
  if (existsSync(edresson)) return edresson;

  mkdirSync(voicesDir, { recursive: true });
  const res = await fetch(EDRESSON_URL);
  if (!res.ok) throw new Error(`voice download failed: ${res.status} ${EDRESSON_URL}`);
  const tarball = join(voicesDir, "edresson.tar.gz");
  writeFileSync(tarball, Buffer.from(await res.arrayBuffer()));
  execFileSync("tar", ["xzf", tarball, "-C", voicesDir]);
  if (!existsSync(edresson)) throw new Error(`${EDRESSON} not found after extracting ${tarball}`);
  return edresson;
}

// Text as it should be read aloud: no emoji, money and percent spelled out.
export function speakable(text: string): string {
  return text
    .replace(/R\$\s*([\d.,]+)/g, "$1 reais")
    .replace(/(\d)\s*%/g, "$1 por cento")
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function narrate(text: string, outWav: string, voicePath: string): Promise<{ durationSec: number }> {
  const run = spawnSync("python3", ["-m", "piper", "-m", voicePath, "-f", outWav], {
    input: speakable(text),
    encoding: "utf8",
  });
  if (run.status !== 0 || !existsSync(outWav)) throw new Error(`piper failed (${run.status}): ${run.stderr}`);
  return { durationSec: probeDuration(outWav) };
}

export function probeDuration(file: string): number {
  const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" });
  return Number(out.trim());
}
