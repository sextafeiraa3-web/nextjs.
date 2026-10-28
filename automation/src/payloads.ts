import type { DayPlan, Manifest, Pillar, VideoPost } from "./types.ts";

// Builds the exact `date` + `info` arguments of Metricool's
// createScheduledPost (blogId 7384024) for one day. Pure: no network.
export const BLOG_ID = "7384024";
const TZ = "America/Sao_Paulo";
const OFFSET = "-03:00"; // Brazil has had no daylight saving time since 2019.
const IG_AUDIO = "364588399541989"; // "Up Down (Reels Sound - Listicle)", licensed catalog
const STORY_DELAY_MIN = 30;
const PRIORITY: Pillar[] = ["noticia", "gancho", "dica", "conceito"];

export type Payload = { kind: "reel" | "story" | "carousel"; slot: string; date: string; info: Record<string, unknown> };

const at = (date: string, hhmm: string, plusMin = 0) => {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + plusMin;
  const t = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}:00`;
  return { iso: `${date}T${t}${OFFSET}`, publicationDate: { dateTime: `${date}T${t}`, timezone: TZ } };
};

function mediaUrl(urls: Record<string, string>, file: string): string {
  if (/\.png$/i.test(file)) throw new Error(`${file}: PNG is not accepted by TikTok, use JPEG`);
  const url = urls[file];
  if (!url) throw new Error(`no published URL for ${file}`);
  return url;
}

// The strongest pillar takes 19:00; the others keep their order at 12:30 and 17:00.
function assignSlots(videos: VideoPost[]): string[] {
  const rank = (v: VideoPost) => PRIORITY.indexOf(v.pillar);
  const best = videos.reduce((b, v, i) => (rank(v) < rank(videos[b]) ? i : b), videos.length - 1);
  const rest = ["12:30", "17:00"];
  return videos.map((_, i) => (i === best ? "19:00" : rest.shift()!));
}

export function buildPayloads(plan: DayPlan, urls: Record<string, string>, manifest: Manifest): Payload[] {
  const payloads: Payload[] = [];
  const slots = assignSlots(plan.videos);

  plan.videos.forEach((post, i) => {
    const media = [mediaUrl(urls, manifest.videos[i].file)];
    const reel = at(plan.date, slots[i]);
    payloads.push({
      kind: "reel",
      slot: slots[i],
      date: reel.iso,
      info: {
        autoPublish: true,
        draft: false,
        text: post.caption,
        firstCommentText: post.firstComment ?? "",
        media,
        providers: [{ network: "instagram" }, { network: "facebook" }, { network: "tiktok" }, { network: "youtube" }],
        publicationDate: reel.publicationDate,
        instagramData: {
          type: "REEL",
          showReelOnFeed: true,
          isAiGenerated: true,
          audioConfiguration: { audioId: IG_AUDIO, audioVolume: 20, videoVolume: 100 },
        },
        facebookData: { type: "REEL" },
        tiktokData: { title: post.tiktokTitle, privacyOption: "PUBLIC_TO_EVERYONE", isAigc: true },
        youtubeData: { title: post.youtubeTitle, type: "short", privacy: "public", madeForKids: false, isAiGeneratedContent: true },
      },
    });

    const story = at(plan.date, slots[i], STORY_DELAY_MIN);
    payloads.push({
      kind: "story",
      slot: slots[i],
      date: story.iso,
      info: {
        autoPublish: true,
        draft: false,
        media,
        providers: [{ network: "instagram" }, { network: "facebook" }],
        publicationDate: story.publicationDate,
        instagramData: { type: "STORY" },
        facebookData: { type: "STORY" },
      },
    });
  });

  const c = plan.carousel;
  const when = at(plan.date, c.slot);
  payloads.push({
    kind: "carousel",
    slot: c.slot,
    date: when.iso,
    info: {
      autoPublish: true,
      draft: false,
      text: c.caption,
      firstCommentText: c.firstComment ?? "",
      media: manifest.carousel.files.map((f) => mediaUrl(urls, f)),
      providers: [{ network: "instagram" }, { network: "tiktok" }],
      publicationDate: when.publicationDate,
      instagramData: { type: "POST", isAiGenerated: true },
      tiktokData: { title: c.tiktokTitle, privacyOption: "PUBLIC_TO_EVERYONE", autoAddMusic: true, photoCoverIndex: 0 },
    },
  });

  return payloads;
}
