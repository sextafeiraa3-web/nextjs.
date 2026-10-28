import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureVoice, narrate, speakable } from "../src/narrate.ts";

const VOICES = new URL("../../voices/", import.meta.url).pathname;

test("ensureVoice prefers pt_BR-faber-medium when present (no download)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "voices-"));
  writeFileSync(join(dir, "pt_BR-faber-medium.onnx"), "dummy");
  writeFileSync(join(dir, "pt_BR-faber-medium.onnx.json"), "{}");
  assert.equal(await ensureVoice(dir), join(dir, "pt_BR-faber-medium.onnx"));
});

test("ensureVoice downloads edresson when faber is missing", { timeout: 300_000 }, async () => {
  mkdirSync(VOICES, { recursive: true });
  const path = await ensureVoice(VOICES);
  assert.ok(path.endsWith("pt-br-edresson-low.onnx"), path);
  assert.ok(existsSync(path));
  assert.ok(existsSync(path + ".json"));
});

test("speakable expands money and percent and drops emoji", () => {
  assert.equal(speakable("Custa R$ 0 e é 100% grátis! 🔒"), "Custa 0 reais e é 100 por cento grátis!");
});

test("narrate produces a wav over 1 s for text with accents, %, R$ and emoji", { timeout: 300_000 }, async () => {
  const voice = await ensureVoice(VOICES);
  const out = join(mkdtempSync(join(tmpdir(), "narr-")), "n.wav");
  const { durationSec } = await narrate("Trancar conversa no ChatGPT custa R$ 0 e já está liberado: 100% grátis! 🔒", out, voice);
  assert.ok(existsSync(out));
  assert.ok(durationSec > 1, String(durationSec));
});
