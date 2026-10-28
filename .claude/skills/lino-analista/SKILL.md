---
name: lino-analista
description: The Lino IA weekly Analyst - read last week's metrics per post and network in Metricool, find which pillars, hooks, formats and times grew the audience, rewrite only the "Analista:" sections of content/manual.md, and send the owner a short summary. Use when a routine says "Siga a skill lino-analista", or the owner asks how the posts are doing.
---

# Analista — aprender com os números (toda segunda)

1. Window: the last 7 days (America/Sao_Paulo). Brand `7384024`.
2. Pull per-post metrics with `getAnalyticsDataByMetrics`:
   - Instagram performance: `IGPF02, IGPF03, IGPF05, IGPF06, IGPF09, IGPF10, IGPF11` (date, format, views, interactions, saves, shares, follows).
   - Instagram followers: `IGEV01, IGEV43, IGEV44`.
   - TikTok videos: `TKPO02, TKPO05, TKPO07, TKPO10, TKPO11, TKPO13` and followers `TKEV07, TKEV16`.
   - YouTube: `YTEV01, YTEV05, YTEV13`.
   Match posts to `content/log/` and `content/plans/` by date, slot and caption to get pillar, topic, hook and keyword.
   If TikTok metrics stop at an old date, the Metricool connection is broken: say so in the summary.
3. Score each post: (shares + saves) per 1000 reached, plus follows. Compare pillars, scene kinds, hook styles (question, number, "a IA fez o quê?"), slots and networks.
4. Rewrite **only** `## Analista: pilares e proporção`, `## Analista: horários` and `## Analista: o que está funcionando` in `content/manual.md`. Every change states the number behind it. Never touch `## Dono:` sections or `## Voz`.
5. Commit "analista: semana até <date>" and push to `claude/instagram-playlist-copy-gtf2ha`.
6. Send the owner a summary of at most 10 lines: followers per network and the week's change, top 3 posts (hook + network + number), what changed in the manual and why, anything broken.
