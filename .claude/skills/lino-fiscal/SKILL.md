---
name: lino-fiscal
description: The Lino IA Checker - confirm in Metricool that each of today's scheduled posts reached every network, fix mechanical failures (PNG on TikTok, missing titles) and reschedule, and alert the owner only when it cannot fix something. Use when a routine says "Siga a skill lino-fiscal", or the owner asks whether today's posts went out.
---

# Fiscal — conferir os posts de hoje

Runs unattended several times a day. No questions. Silence means everything went out.

1. `TODAY=$(TZ=America/Sao_Paulo date +%F)`; read `content/log/$TODAY.json` and `content/plans/$TODAY.json` if present.
2. `getScheduledPosts(brandId="7384024", fromDate=$TODAY 00:00, toDate=$TODAY 23:59, timezone="America/Sao_Paulo")`.
3. **Missing day:** on the first run of the day (before 09:00), if fewer than 4 non-story posts exist for today, send a push notification and run the `lino-fabrica` skill for **today**, skipping slots already past.
4. For every post whose time has passed, check each provider's `status`:
   - `PUBLISHED` → mark `PUBLISHED` in the log.
   - `ERROR` with "image/png" (TikTok) → download the post's images from their `media` URLs into a new folder `out/fix-$TODAY/`, convert each to JPEG (`ffmpeg -i x.png -q:v 2 x.jpg`), publish with `npm --prefix automation run --silent publish-media -- out/fix-$TODAY`, and schedule that network alone 10 min from now; mark `FIXED`.
   - `ERROR` mentioning a missing or too long title → rebuild it from the plan (`tiktokTitle`/`youtubeTitle`, cut to the limit) and reschedule that network 10 min from now; mark `FIXED`.
   - Any other `ERROR`, or still `PENDING` more than 30 min after its time → reschedule once 10 min from now; if this post already has `FIXED`/retry in the log, send a push notification with post, network and `detailedStatus` instead.
5. Expected network sets, matched by date + time + media URL against `content/log/$TODAY.json` and `out/$TODAY/payloads.json` (if present):
   - Reel (mp4, has text): instagram, facebook, tiktok, youtube.
   - Story (mp4, no text, 30 min after a reel): instagram, facebook **only** — never add TikTok or YouTube to a story.
   - Carousel (JPEGs): instagram, tiktok.
   A one-network post that the log records as a Fiscal fix belongs to its original post: count it toward that post, do not "complete" it.
   Only if a network is missing from both the original post and its fixes, schedule that network alone and record it in the log as a fix.
6. Update `content/log/$TODAY.json`, commit "fiscal: $TODAY" and push to `claude/instagram-playlist-copy-gtf2ha`.
