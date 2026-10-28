---
name: lino-fabrica
description: The Lino IA daily Factory - research, write, render and schedule tomorrow's 4 posts (3 narrated motion videos + 1 JPEG carousel) on TikTok, Instagram, Facebook and YouTube Shorts through Metricool, with no human approval. Use when a routine says "Siga a skill lino-fabrica", or the owner asks to produce or redo a day of posts.
---

# Fábrica — posts do dia seguinte

Runs unattended in a cloud routine. Never ask questions; decide, log and move on.
Everything below is in the repo `sextafeiraa3-web/nextjs.`, default branch
`claude/instagram-playlist-copy-gtf2ha`. "Dia" = tomorrow in America/Sao_Paulo
unless the prompt names a date.

## 0. Setup (every run)
```bash
DAY=$(TZ=America/Sao_Paulo date -d tomorrow +%F)   # or the date in the prompt
pip install -q piper-tts
(cd videos/reels && npm ci --silent)
```
Read `content/manual.md` in full. It wins over anything here about tone, pillars and slots.
If `content/plans/$DAY.json` and `content/log/$DAY.json` both exist, the day is already done: check it with step 7 and stop.

## 1. Research (only real, dated, sourced items)
- Window: last 7 days. Sources: releasebot.io/updates/openai/chatgpt, releasebot.io/updates/anthropic/claude, releasebot.io/updates/anthropic/claude-code, openai.com/news, claude.com/blog, blog.google (Gemini), techcrunch.com/category/artificial-intelligence, theverge.com/ai-artificial-intelligence, aiweekly.co, plus one extended web search "AI news this week".
- Apply the manual's **regra de fonte**. Open the primary source for every fact you use.
- In the cloud, WebFetch is often blocked by the network policy (releasebot.io, help.openai.com, decrypt.co failed on 28/10). Then use WebSearch and accept a fact only when at least two trusted outlets report it the same way; drop anything a search cannot confirm (the "ChatGPT iCloud connector" rumour of 27/10 was dropped this way).
- Read `content/log/` for the last 14 days so you do not repeat topics or keywords.

## 2. Write `content/plans/$DAY.json`
Shape = `DayPlan` in `automation/src/types.ts`; example: `automation/test/fixtures/day-plan.json`.
- 3 videos + 1 carousel, pillars per the manual's "Analista: pilares e proporção".
- Video: `hook` ≤ 60 chars, a question or surprise, readable as the cover; 2–4 `scenes` (kinds: statement, list, number, steps); `narration` 25–75 words, spoken Portuguese, ends with "Comente {KEYWORD} que eu te mando ..."; `ctaQuestion`; `tiktokTitle` ≤ 90; `youtubeTitle` ≤ 100 ending with `#shorts`.
- Carousel: 3–8 slides (title + optional body); a closing "Comente {KEYWORD}" slide is added by the renderer.
- `keyword`: one capital word, specific to the topic (not PROMPT), unique for 14 days.
- `caption`: hook line; 2–3 short paragraphs of facts; caveats; "Comente {KEYWORD} que eu te mando ... no direct."; "Fonte: ..."; "Lino IA - Sua ideia. Nosso próximo projeto." and "@linoia.br"; 5 hashtags starting with #LinoIA.
- `sources`: required for pillar `noticia` (name + URL of the primary source).

## 3. Build
```bash
npm --prefix automation run build-day -- content/plans/$DAY.json
```
Exit 1 prints validator errors: fix the plan and rerun (max 3 tries). Then look at the
frame-0 still of each video and two carousel slides; fix anything unreadable:
```bash
cd videos/reels && npx remotion still DailyReel /tmp/f0.png --frame=0 --props=<the props json in public/daily> \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
```

## 4. Publish media
```bash
npm --prefix automation run publish-media -- out/$DAY > out/$DAY/published.json
```

## 5. Schedule (Metricool MCP)
```bash
npm --prefix automation run print-payloads -- content/plans/$DAY.json out/$DAY/manifest.json out/$DAY/published.json > out/$DAY/payloads.json
```
For each item: `createScheduledPost(blogId="7384024", date=item.date, info=item.info)`.
Record each returned post id. On an error, fix the cause once (e.g. title too long) and retry; if it still fails, keep going and include it in the alert.

## 6. Comment keywords
For each keyword add a rule to `src/instagram/automations.ts` (keyword, message ≤ 1000 chars with the promised content + source link + `signature`, `publicReply: "Te mandei no direct! 📩"`).

## 7. Verify
`getScheduledPosts(brandId="7384024", fromDate=$DAY 00:00, toDate=$DAY 23:59, timezone="America/Sao_Paulo")`:
expect 4 posts + 3 stories; every post lists exactly the networks of its payload. Anything missing → reschedule it now.

## 8. Log and commit
Write `content/log/$DAY.json` (`LogEntry`: topic/keyword of the day's strongest post at top level, one `posts[]` item per post with slot, topic, keyword, metricoolId, networks all `SCHEDULED`).
```bash
git add content src/instagram/automations.ts && git commit -m "fábrica: posts de $DAY" && git push origin HEAD:claude/instagram-playlist-copy-gtf2ha
```

## 9. Report
Only if something failed or fewer than 4 posts are scheduled: send the owner a push notification naming the step, the post and the error. Otherwise stay silent.
