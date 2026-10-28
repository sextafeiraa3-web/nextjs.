---
name: lino-reels
description: Make and publish the Lino IA (@linoia.br) news Reels - research this week's AI news, verify it at the source, build a vertical Remotion video with a frame-0 hook and a "Comente X" closing card, add the DM keyword, write the caption, then schedule Reels (Instagram, Facebook, TikTok) and Stories through Metricool. Use when the user asks for new Reels, viral AI videos, "mais vídeos como esses", or to post the approved ones.
---

# Lino IA news Reels

The approved sequence (October 2026). Follow it for every new batch unless the user asks for something different.

## 1. Pick the topics (3 a batch)
- Read this week's AI news: aiweekly.co daily editions (`/ai-news-today/edition/YYYY-MM-DD`), the ChatGPT release notes (help.openai.com/en/articles/6825453), the Claude Code changelog (raw CHANGELOG.md in anthropics/claude-code), TechCrunch.
- Prefer stories a non-technical audience feels: something they can use today, a surprising number, or a "the AI did what?" moment.
- Skip topics already posted. Check the last 30 days of @linoia.br with Windsor.ai (`instagram` connector, fields `timestamp, media_caption, media_views, media_reach`).
- **Verify every claim at the primary source** (the company's own post, the report, the original article). Never use numbers that appear only on an aggregator. Keep caveats in the video when the source has them (risks, "rolling out gradually", "internal tests").

## 2. Build the video (`videos/reels/`, Remotion)
- One folder per Reel in `src/<slug>/Video.tsx`, registered in `src/Root.tsx`, 1080×1920 at 30 fps, about 18-20 s.
- Structure: Hook (3-3.5 s) → 2-3 body scenes (4-5 s each) → `CommentCta` (4 s). Join scenes with `TransitionSeries` and 10-frame `slide`/`fade` transitions.
- Wrap everything in `Reel` (background and @linoia.br). Credit the source with `Source` in the scene that carries the claim.
- Hook rules (from the `short-form-video` skill):
  - The hook sentence is on screen from frame 0, using `punch`, never `enter`, because frame 0 is the cover.
  - One open question, answered later.
  - Something moves every 2-4 s.
- Keep text between y = 200 and y = 1330. Headlines at 76-104 px, body text at 38 px or more.
- Check with `npm run lint` (eslint + tsc). Render stills at frame 0 and at the middle of each scene, look at them, and fix overlaps before rendering:
  `npx remotion render <Id> renders/<slug>.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`

## 3. Comment keyword → DM
- Pick one short word, in capitals, that is not part of common words.
- Add a rule to `src/instagram/automations.ts`. The message carries the promised content, the source link, and the `signature`, and stays under 1000 characters.

## 4. Caption (`renders/<slug>.txt`)
In this order:
1. the hook line;
2. 2-3 short paragraphs with the facts;
3. the caveats;
4. "Comente X que eu te mando ... no direct.";
5. "Fonte: ...";
6. "Lino IA - Sua ideia. Nosso próximo projeto." and "@linoia.br";
7. five hashtags, starting with #LinoIA.

## 5. Publishing is automatic
The owner chose fully automatic posting (28/10/2026): no approval step. The daily flow lives in the `lino-fabrica` skill (data-driven `DailyReel` composition, narration, Metricool payloads); use this skill only for a hand-made special Reel.

## 6. Publish (Metricool, brand id 7384024, timezone America/Sao_Paulo)
- Media URL: the raw GitHub URL pinned to the pushed commit SHA: `https://raw.githubusercontent.com/sextafeiraa3-web/nextjs./<sha>/videos/reels/renders/<slug>.mp4`. The repository is public.
- For each video:
  - **Reel** on `instagram` (type REEL, `showReelOnFeed: true`), `facebook` (REEL) and `tiktok`. TikTok needs `tiktokData.title`; use the hook line.
  - **Story** on `instagram` and `facebook` (type STORY, no text), 30 min after the Reel.
- Space the Reels about 2 h apart, in the afternoon and evening (e.g. 14:30, 17:00, 19:00, 21:00). Put the strongest hook at 19:00.
- Instagram music: `instagramData.audioConfiguration.audioId`.
  - Business accounts only get Meta's licensed catalog, so the mainstream songs on "trending" lists are not available. A search returns candidates; never use one whose `audioType` is `original_sound`, since those are re-uploads.
  - Current pick: `364588399541989`, "Up Down (Reels Sound - Listicle)" by GEEZ.
  - TikTok and Facebook get no music through the API.
- After the first post's time, check it with `getScheduledPosts` and the Windsor `instagram` data, and tell the user if any network failed.
