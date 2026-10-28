# Lino IA — Produção Diária Automática: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish 4 posts a day (3 narrated motion videos + 1 JPEG carousel) on TikTok and Instagram, the 3 videos also on YouTube Shorts, with no human step, plus a checker and a weekly analyst.

**Architecture:** Deterministic code does everything that can break silently (validate the day's content, narrate, render, convert, publish media, build Metricool payloads). Claude Code cloud Routines do the judgment work (research, writing) and call Metricool through MCP, following three repo skills (`lino-fabrica`, `lino-fiscal`, `lino-analista`). One data-driven Remotion composition (`DailyReel`) renders any day's video from JSON props, so the Factory never writes TSX.

**Tech Stack:** Node 22 (`node --test`, `--experimental-strip-types`, no new npm deps in `automation/`), Remotion 4.0.537 (existing `videos/reels`), Playwright + Chromium (pre-installed), Piper TTS (`pip install piper-tts`), ffmpeg/ffprobe, Metricool MCP, Claude Code Routines.

**Spec:** `docs/superpowers/specs/2026-10-27-lino-ia-producao-diaria-design.md`

## Global Constraints

- Metricool brand `7384024`, timezone `America/Sao_Paulo`.
- Videos 1080×1920, 30 fps, 15–30 s; hook text on screen from frame 0; text between y=200 and y=1330.
- Carousel slides JPEG (never PNG), 1080×1350, 3–8 slides.
- TikTok needs `tiktokData.title`; YouTube needs `youtubeData.title`, `type: "short"`, `madeForKids: false`.
- Instagram Reel music: `instagramData.audioConfiguration.audioId = "364588399541989"`, `audioVolume: 20`, `videoVolume: 100` (voice on top).
- Daily mix: 3 videos (Instagram REEL, Facebook REEL, TikTok, YouTube short) + 1 carousel (Instagram POST, TikTok photo). Story on Instagram+Facebook 30 min after each Reel.
- Initial slots (BRT): carousel 09:00; videos 12:30, 17:00, 19:00 (strongest hook at 19:00).
- Source rule: official company source or trusted press; social posts only with press confirmation; no news → tip/concept slot.
- Narration voice: `voices/pt_BR-faber-medium.onnx` if present, else `pt-br-edresson-low` downloaded from `https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-pt-br-edresson-low.tar.gz`.
- Media lives on branch `media`; URLs `https://raw.githubusercontent.com/sextafeiraa3-web/nextjs./<sha>/<path>`; files older than 30 days are pruned.
- Analyst may change only the "Analista" sections of the manual; tone, source rule, never-do list, anti-goals and daily volume are owner-only.
- No paid credits (Kairogen) in the daily flow.

## Review Focus

1. **A video whose narration is longer than its scenes** → total duration grows to fit the voice (capped at 30 s; validator rejects narration over ~75 words). Test in Task 3 and Task 4.
2. **A day plan that repeats a topic or comment keyword posted in the last 14 days** → validator rejects it with the clashing date. Test in Task 2.
3. **A PNG or oversized image reaching TikTok** → payload builder throws before scheduling. Test in Task 7.
4. **Accents and symbols in text (ã, ç, %, R$, emoji)** → narration does not crash and slides render them. Tests in Task 3 and Task 5.
5. **A Metricool post that only lists some networks** → payload builder always emits the full network set for its type; Fiscal flags any scheduled post missing one. Tests in Task 7; check in Task 8.

---

## File Structure

```
automation/                     # zero-dependency Node 22 TS package (pipeline code)
  package.json                  # scripts: test, build-day, publish-media
  src/types.ts                  # DayPlan, VideoPost, CarouselPost, Scene types
  src/validate.ts               # validateDayPlan()
  src/log.ts                    # readRecentLog(), appendLog()
  src/narrate.ts                # ensureVoice(), narrate()
  src/carousel.ts               # renderCarousel()
  src/render-video.ts           # renderVideo() -> calls remotion in videos/reels
  src/build-day.ts              # CLI: plan.json -> out/<date>/ (mp4, jpg, captions)
  src/publish-media.ts          # CLI: out/<date> -> branch media, prints URL map
  src/payloads.ts               # buildPayloads() -> Metricool createScheduledPost args
  test/*.test.ts                # node:test
  test/fixtures/day-plan.json
content/
  manual.md                     # brand manual (owner + analyst sections)
  log/YYYY-MM-DD.json           # what was scheduled/published per day
  plans/YYYY-MM-DD.json         # the Factory's day plan (input to build-day)
videos/reels/src/daily/         # DailyReel composition + scene kinds (from PR #4 base)
.claude/skills/lino-fabrica/SKILL.md
.claude/skills/lino-fiscal/SKILL.md
.claude/skills/lino-analista/SKILL.md
```

---

### Task 1: Bring the video tooling into this branch

**Files:**
- Merge: branch `origin/ccr-c33fe83d-kjjc3w` (PR #4: video skills, `videos/reels`, `src/instagram/*`)
- Modify: `.gitignore` (add `out/`, `voices/*.onnx` except committed faber, `automation/node_modules`)

- [ ] **Step 1:** `git merge origin/ccr-c33fe83d-kjjc3w`; resolve conflicts keeping both sides (`.claude/settings.json` and `CLAUDE.md` from this branch, everything else from PR #4).
- [ ] **Step 2:** Verify the root app still lints: `npm ci && npm run lint` → exit 0.
- [ ] **Step 3:** Verify the video project: `cd videos/reels && npm ci && npm run lint` → exit 0.
- [ ] **Step 4:** Smoke render: `npx remotion still LockedChats /tmp/still.png --frame=0 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-linux/headless_shell` → file exists (adjust the headless_shell path if the folder name differs; record the working path in `videos/reels/README.md`).
- [ ] **Step 5:** Commit `Merge video tooling (PR #4) into daily posting branch`.

### Task 2: Day plan types, validator and log

**Files:**
- Create: `automation/package.json`, `automation/src/types.ts`, `automation/src/validate.ts`, `automation/src/log.ts`
- Test: `automation/test/validate.test.ts`, `automation/test/log.test.ts`, `automation/test/fixtures/day-plan.json`

**Interfaces:**
- Produces:
  - `type Scene = { kind: "statement"; title: string; body?: string } | { kind: "list"; title: string; items: string[] } | { kind: "number"; value: string; label: string } | { kind: "steps"; title: string; steps: string[] }`
  - `type Source = { name: string; url: string }`
  - `type VideoPost = { slot: "12:30"|"17:00"|"19:00"; pillar: "noticia"|"dica"|"conceito"|"gancho"; topic: string; hook: string; scenes: Scene[]; narration: string; keyword: string; ctaQuestion: string; caption: string; tiktokTitle: string; youtubeTitle: string; sources: Source[] }`
  - `type CarouselPost = { slot: "09:00"; pillar: VideoPost["pillar"]; topic: string; slides: { title: string; body?: string }[]; keyword: string; caption: string; tiktokTitle: string; sources: Source[] }`
  - `type DayPlan = { date: string /* YYYY-MM-DD */; videos: [VideoPost, VideoPost, VideoPost]; carousel: CarouselPost }`
  - `validateDayPlan(plan: unknown, recent: LogEntry[]): { ok: true; plan: DayPlan } | { ok: false; errors: string[] }`
  - `type LogEntry = { date: string; topic: string; keyword: string; posts: { slot: string; metricoolId?: number; networks: Record<string, "SCHEDULED"|"PUBLISHED"|"ERROR"|"FIXED">; error?: string }[] }`
  - `readRecentLog(dir: string, today: string, days: number): LogEntry[]`; `appendLog(dir: string, entry: LogEntry): void`

- [ ] **Step 1: Write failing tests** (`node --test --experimental-strip-types automation/test/`):
  - `valid fixture passes` → `ok === true`.
  - `rejects 2 videos` → error mentions `videos`.
  - `rejects hook over 60 chars`, `tiktokTitle over 90 chars`, `youtubeTitle over 100 chars`.
  - `rejects narration over 75 words` and `under 25 words`.
  - `rejects video with < 2 or > 4 scenes`; `rejects carousel with < 3 or > 8 slides`.
  - `rejects pillar "noticia" without sources` (dica/conceito may have none).
  - `rejects duplicate keyword inside the day`; `rejects keyword not matching /^[A-Z0-9]{2,10}$/`.
  - `rejects topic or keyword used in recent log` → error names the earlier date.
  - `readRecentLog returns only the last N days`; `appendLog writes content/log/<date>.json` (temp dir).
- [ ] **Step 2:** Run → FAIL (module not found).
- [ ] **Step 3:** Implement `types.ts`, `validate.ts` (hand-written checks, collect all errors), `log.ts`. Topic clash = case/accent-insensitive equality of `topic`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `automation: day plan validator and log`.

### Task 3: Narration with Piper

**Files:**
- Create: `automation/src/narrate.ts`
- Test: `automation/test/narrate.test.ts`

**Interfaces:**
- Produces: `ensureVoice(voicesDir: string): Promise<string /* .onnx path */>`; `narrate(text: string, outWav: string, voicePath: string): Promise<{ durationSec: number }>`

- [ ] **Step 1: Write failing tests:**
  - `ensureVoice prefers voices/pt_BR-faber-medium.onnx when present` (temp dir with a dummy file → returns it, no download).
  - `ensureVoice downloads edresson when faber is missing` → returned path exists and ends with `pt-br-edresson-low.onnx` (integration; cache in `voices/`).
  - `narrate produces wav with duration > 1 s for "Trancar conversa no ChatGPT custa R$ 0 e já está liberado: 100% grátis! 🔒"` (accents, %, R$, emoji must not crash).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement: download with `fetch` + `tar xzf` via `child_process`; `narrate` strips emoji, expands `R$ X` → `X reais` and `%` → ` por cento`, pipes text to `python3 -m piper -m <voice> -f <out>`, reads duration with `ffprobe -show_entries format=duration`. Install note: `pip install piper-tts` in the routine setup step.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `automation: Piper narration`.

### Task 4: `DailyReel` data-driven composition

**Files:**
- Create: `videos/reels/src/daily/DailyReel.tsx`, `videos/reels/src/daily/scenes.tsx`, `videos/reels/src/daily/fixture.json`
- Modify: `videos/reels/src/Root.tsx` (register `DailyReel` with `calculateMetadata`)
- Create: `automation/src/render-video.ts`; Test: `automation/test/render-video.test.ts`

**Interfaces:**
- Consumes: `VideoPost` scenes/hook/keyword/ctaQuestion/sources (Task 2).
- Produces: composition id `DailyReel`, props `{ hook: string; scenes: Scene[]; keyword: string; ctaQuestion: string; source?: string; audio?: string /* staticFile path */; audioSec?: number }`; `renderVideo(post: VideoPost, wav: string, durationSec: number, outMp4: string): Promise<void>`

- [ ] **Step 1: Write failing test** `renderVideo renders fixture`: output mp4 exists; `ffprobe` shows a video stream 1080×1920 and an audio stream; duration within ±0.5 s of `max(audioSec + 1.5, 15)` capped at 30.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `DailyReel` reusing `Reel`, `CommentCta`, `Source`, `punch`, `enter`, `safeBand` from `theme.ts`: Hook (3 s, `punch` at frame 0) → scenes (remaining time split evenly) → CommentCta (4 s), 10-frame `slide`/`fade` transitions alternating. `calculateMetadata` sets `durationInFrames = round(min(30, max(15, audioSec + 1.5)) * 30)`. Audio via `<Audio src={staticFile(audio)} />`. One component per scene kind in `scenes.tsx`, text sized 76–104 px titles / ≥ 38 px body. `renderVideo` copies the wav into `videos/reels/public/daily/`, writes props JSON, runs `npx remotion render DailyReel <out> --props=<json> --browser-executable=<path from Task 1>`.
- [ ] **Step 4:** `cd videos/reels && npm run lint` → exit 0; run test → PASS. Render stills at frame 0 and mid-scene of the fixture and look at them; fix overlaps.
- [ ] **Step 5:** Commit `videos: DailyReel data-driven composition`.

### Task 5: Carousel renderer (HTML → JPEG)

**Files:**
- Create: `automation/src/carousel.ts`, `automation/src/carousel-template.ts`
- Test: `automation/test/carousel.test.ts`

**Interfaces:**
- Produces: `renderCarousel(post: CarouselPost, outDir: string): Promise<string[] /* jpg paths in order */>`

- [ ] **Step 1: Write failing tests:** fixture carousel → returns `slides.length` files; each starts with bytes `FF D8 FF`; each is 1080×1350 (`ffprobe`); a slide titled `"Ação: 30% mais rápido — R$ 0"` renders without error.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement with `require('playwright')` (pre-installed): one HTML page per slide from `carousel-template.ts` (brand colors `#070B1A`, `#2F6BFF`, `#22D3EE`, `#C6FF3D`, `#F5F7FF`; Inter/Archivo fonts from `videos/reels/public/fonts` as data URLs; slide counter "n/N"; last slide = "Comente {keyword}" + `@linoia.br`), `page.screenshot({ type: "jpeg", quality: 90 })` at viewport 1080×1350.
- [ ] **Step 4:** Run → PASS. Open two output JPEGs and look at them.
- [ ] **Step 5:** Commit `automation: carousel renderer`.

### Task 6: `build-day` and `publish-media` CLIs

**Files:**
- Create: `automation/src/build-day.ts`, `automation/src/publish-media.ts`
- Test: `automation/test/build-day.test.ts`, `automation/test/publish-media.test.ts`

**Interfaces:**
- Consumes: Tasks 2–5.
- Produces:
  - `npm --prefix automation run build-day -- content/plans/<date>.json` → `out/<date>/{v1,v2,v3}.mp4`, `carousel-1..N.jpg`, `manifest.json` = `type Manifest = { date: string; videos: { slot: string; file: string; durationSec: number }[]; carousel: { slot: string; files: string[] } }` (exported from `types.ts`); exits non-zero with the validator errors on an invalid plan.
  - `npm --prefix automation run publish-media -- out/<date>` → commits the folder to branch `media` at `media/<date>/`, pushes, prunes `media/<date older than 30 days>/` (as a new commit), prints JSON `{ sha, urls: Record<string /* local file */, string /* raw URL */> }`.
  - `publishMedia(dir: string, opts: { remote: string; branch: string; today: string }): Promise<{ sha: string; urls: Record<string,string> }>`

- [ ] **Step 1: Write failing tests:**
  - `build-day on fixture writes manifest with 3 videos and N jpgs` (integration, slow).
  - `build-day exits 1 on invalid plan and prints errors`.
  - `publishMedia pushes to a local bare repo`: urls match `^https://raw.githubusercontent.com/sextafeiraa3-web/nextjs\./[0-9a-f]{40}/media/2026-10-28/`; a folder dated 2026-09-20 present before is gone after; a folder dated 2026-10-01 stays.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. `publishMedia` uses a `git worktree` on `media` (create orphan branch if missing), copies, commits `media: <date>`, pushes; URL host/repo fixed from Global Constraints, remote injectable for tests.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `automation: build-day and publish-media`.

### Task 7: Metricool payload builder

**Files:**
- Create: `automation/src/payloads.ts`, CLI entry `automation/src/print-payloads.ts`
- Test: `automation/test/payloads.test.ts`

**Interfaces:**
- Consumes: `DayPlan`, `manifest.json`, URL map (Task 6).
- Produces: `buildPayloads(plan: DayPlan, urls: Record<string,string>, manifest: Manifest): { kind: "reel"|"story"|"carousel"; slot: string; date: string /* ISO with -03:00 */; info: object }[]` — each item is exactly the `date` + `info` arguments for `createScheduledPost` with `blogId "7384024"`. CLI prints them as JSON for the routine to send.

- [ ] **Step 1: Write failing tests:**
  - video payload: `providers` = instagram, facebook, tiktok, youtube; `instagramData.type "REEL"`, `showReelOnFeed true`, `audioConfiguration.audioId "364588399541989"`, `audioVolume 20`; `facebookData.type "REEL"`; `tiktokData.title === post.tiktokTitle`, `isAigc true`; `youtubeData = { title, type: "short", privacy: "public", madeForKids: false, isAiGeneratedContent: true }`; `publicationDate.timezone "America/Sao_Paulo"`.
  - story payload per video: instagram+facebook STORY, no `text`, 30 min after the reel.
  - carousel payload: instagram POST + tiktok, media are the JPEG URLs in order.
  - `throws on .png media` and `throws when a URL is missing`.
  - 19:00 slot goes to the video with the highest-priority pillar (`noticia` > `gancho` > `dica` > `conceito`).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement as a pure function.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `automation: Metricool payload builder`.

### Task 8: Manual, skills and routines' procedures

**Files:**
- Create: `content/manual.md`, `.claude/skills/lino-fabrica/SKILL.md`, `.claude/skills/lino-fiscal/SKILL.md`, `.claude/skills/lino-analista/SKILL.md`
- Modify: `.claude/skills/lino-reels/SKILL.md` (remove "send for approval"; point to `lino-fabrica`)

- [ ] **Step 1: `content/manual.md`** with headed sections `## Dono: público e tom`, `## Dono: regra de fonte` (verbatim from spec 5.3.2), `## Dono: nunca fazer` (spec anti-goals), `## Dono: volume e redes` (Global Constraints mix), `## Analista: pilares e proporção` (start: videos 2 notícia/gancho + 1 dica/conceito; carousel dica), `## Analista: horários`, `## Analista: o que está funcionando` (seed with the 1–27/10 findings), `## Voz` (`edresson` until faber exists).
- [ ] **Step 2: `lino-fabrica`** procedure: read manual + `readRecentLog(14)`; research (sources from `lino-reels` step 1 + Radar list); write `content/plans/<tomorrow>.json`; `pip install piper-tts`; `npm ci` in `automation` and `videos/reels`; `build-day` (fix and retry on validator errors, max 3); look at frame-0 stills; `publish-media`; `print-payloads`; call `createScheduledPost` for each; `getScheduledPosts` for tomorrow and compare network sets to payloads; `appendLog`; add DM rules for the day's keywords to `src/instagram/automations.ts`; commit + push to the default branch; on any unrecoverable failure send a push notification naming the step.
- [ ] **Step 3: `lino-fiscal`** procedure: `getScheduledPosts` for today; for each post past its time: every expected network `PUBLISHED`? Known fixes: PNG → convert with ffmpeg to JPEG and re-schedule; missing `tiktokData.title` → add from plan; `ERROR` otherwise → one re-schedule 10 min later, else push notification with post, network and `detailedStatus`. First run of the day: if fewer than 4 posts are scheduled for today, notify and run `lino-fabrica` for today. Update log statuses; commit.
- [ ] **Step 4: `lino-analista`** procedure: Metricool metrics for the last 7 days (IG posts/reels `IGPF*`, TikTok `TKPO*`, YouTube `YTEV*`), rank posts by shares+saves per reach, compare pillars/slots/hooks, rewrite only `## Analista:*` sections, commit, send the owner a ≤ 10-line summary (followers per network, top 3 posts, what changed and why).
- [ ] **Step 5:** Dry-run check: follow `lino-fabrica` by hand for **tomorrow** with real research, but stop before `createScheduledPost`; inspect the 3 MP4s and the carousel; send them to the owner. Commit `skills: fábrica, fiscal, analista + brand manual`.

### Task 9: Go live

- [ ] **Step 1:** Mark PR #6 ready, merge it into `claude/instagram-playlist-copy-gtf2ha` (routines clone the default branch).
- [ ] **Step 2:** Create routines (create_trigger, fresh session per fire, connectors Metricool + Windsor + GitHub, push notifications on):
  - `Lino IA - Fábrica`: `CRON_TZ=America/Sao_Paulo 17 2 * * *`, prompt "Siga a skill lino-fabrica para amanhã."
  - `Lino IA - Fiscal`: `CRON_TZ=America/Sao_Paulo 7 8,10,13,18,20,22 * * *`, prompt "Siga a skill lino-fiscal para hoje."
  - `Lino IA - Analista`: `CRON_TZ=America/Sao_Paulo 13 8 * * 1`, prompt "Siga a skill lino-analista."
- [ ] **Step 3:** Fire `Lino IA - Fábrica` once now for tomorrow; verify with `getScheduledPosts` that 4 posts + 3 stories exist with full network sets.
- [ ] **Step 4:** Fix the 2 already-scheduled Instagram-only PNG posts (30/10, 01/11): convert to JPEG, add TikTok.
- [ ] **Step 5:** Tell the owner what is live, the schedule, and the open items (reconnect TikTok in Metricool; faber voice PR).
