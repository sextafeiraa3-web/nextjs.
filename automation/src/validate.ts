import type { CarouselPost, DayPlan, LogEntry, VideoPost } from "./types.ts";

const SCENE_KINDS = ["statement", "list", "number", "steps"];
const PILLARS = ["noticia", "dica", "conceito", "gancho"];
const VIDEO_SLOTS = ["12:30", "17:00", "19:00"];
const KEYWORD = /^[A-Z0-9]{2,10}$/;
// Max narration so it fits the 30 s cap at ~2.3 words/s (measured on 28/10).
const MAX_WORDS = 60;
// DM rules match a keyword as a whole word in any comment, so everyday words
// would fire on unrelated comments.
const COMMON_WORDS = new Set(["SIM", "NAO", "QUERO", "IA", "PROMPT", "SEGURO", "VERSOES", "AJUDA", "INFO", "LINK", "DICA", "DICAS", "MAIS", "TOP", "BOM", "AMEI", "OBRIGADO", "VALEU", "COMO", "QUANTO", "PRECO", "ONDE", "QUAL", "AQUI", "EU", "VOCE"]);

// Lowercase, no accents, single spaces: how topics are compared across days.
export const normalizeTopic = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const isStr = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

export function validateDayPlan(plan: unknown, recent: LogEntry[], existingKeywords: string[] = []): { ok: true; plan: DayPlan } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const p = plan as DayPlan;

  if (!p || typeof p !== "object") return { ok: false, errors: ["plan must be an object"] };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(p.date))) errors.push("date must be YYYY-MM-DD");
  if (!Array.isArray(p.videos) || p.videos.length !== 3) errors.push("videos must have exactly 3 items");
  if (!p.carousel || typeof p.carousel !== "object") errors.push("carousel is required");

  const videos = Array.isArray(p.videos) ? p.videos : [];
  videos.forEach((v, i) => checkVideo(v, `videos[${i}]`, errors));
  if (p.carousel) checkCarousel(p.carousel, errors);

  // Keywords unique inside the day.
  const posts: (VideoPost | CarouselPost)[] = [...videos, ...(p.carousel ? [p.carousel] : [])];
  const seen = new Map<string, string>();
  posts.forEach((post, i) => {
    const where = i < videos.length ? `videos[${i}]` : "carousel";
    if (seen.has(post.keyword)) errors.push(`keyword ${post.keyword} repeated in ${seen.get(post.keyword)} and ${where}`);
    else seen.set(post.keyword, where);
  });

  // Keywords already answered by a DM rule, or too common to be safe.
  posts.forEach((post) => {
    if (existingKeywords.includes(post.keyword)) errors.push(`keyword ${post.keyword} already has a DM rule in src/instagram/automations.ts`);
    if (COMMON_WORDS.has(post.keyword)) errors.push(`keyword ${post.keyword} is a common word; pick one specific to the topic`);
  });

  // No topic or keyword reused from the recent log.
  for (const entry of recent) {
    const usedTopics = [entry.topic, ...entry.posts.map((x) => x.topic)].filter(isStr).map(normalizeTopic);
    const usedKeywords = [entry.keyword, ...entry.posts.map((x) => x.keyword)].filter(isStr);
    posts.forEach((post) => {
      if (isStr(post.topic) && usedTopics.includes(normalizeTopic(post.topic)))
        errors.push(`topic "${post.topic}" already posted on ${entry.date}`);
      if (usedKeywords.includes(post.keyword)) errors.push(`keyword ${post.keyword} already used on ${entry.date}`);
    });
  }

  return errors.length ? { ok: false, errors } : { ok: true, plan: p };
}

function checkCommon(post: VideoPost | CarouselPost, at: string, errors: string[]) {
  if (!PILLARS.includes(post.pillar)) errors.push(`${at}.pillar must be one of ${PILLARS.join(", ")}`);
  if (!isStr(post.topic)) errors.push(`${at}.topic is required`);
  if (!isStr(post.caption)) errors.push(`${at}.caption is required`);
  if (!KEYWORD.test(String(post.keyword))) errors.push(`${at}.keyword must match ${KEYWORD}`);
  if (!isStr(post.tiktokTitle) || post.tiktokTitle.length > 90) errors.push(`${at}.tiktokTitle must be 1-90 chars`);
  const sources = Array.isArray(post.sources) ? post.sources : [];
  if (!Array.isArray(post.sources)) errors.push(`${at}.sources must be a list`);
  if (post.pillar === "noticia" && sources.length === 0) errors.push(`${at}.sources required for pillar noticia`);
  sources.forEach((s, j) => {
    if (!isStr(s?.name) || !/^https?:\/\//.test(String(s?.url))) errors.push(`${at}.sources[${j}] needs name and http(s) url`);
  });
}

function checkVideo(v: VideoPost, at: string, errors: string[]) {
  if (!v || typeof v !== "object") return void errors.push(`${at} must be an object`);
  checkCommon(v, at, errors);
  if (!VIDEO_SLOTS.includes(v.slot)) errors.push(`${at}.slot must be one of ${VIDEO_SLOTS.join(", ")}`);
  if (!isStr(v.hook) || v.hook.length > 60) errors.push(`${at}.hook must be 1-60 chars`);
  if (!isStr(v.ctaQuestion)) errors.push(`${at}.ctaQuestion is required`);
  if (!isStr(v.youtubeTitle) || v.youtubeTitle.length > 100) errors.push(`${at}.youtubeTitle must be 1-100 chars`);
  const n = isStr(v.narration) ? words(v.narration) : 0;
  if (n < 25 || n > MAX_WORDS) errors.push(`${at}.narration must have 25-${MAX_WORDS} words (has ${n})`);
  if (!Array.isArray(v.scenes) || v.scenes.length < 2 || v.scenes.length > 4) errors.push(`${at}.scenes must have 2-4 items`);
  (Array.isArray(v.scenes) ? v.scenes : []).forEach((s, j) => {
    const where = `${at}.scenes[${j}]`;
    if (!SCENE_KINDS.includes(s?.kind)) return void errors.push(`${where}.kind must be one of ${SCENE_KINDS.join(", ")}`);
    const lines = (v: unknown, field: string) => {
      if (!Array.isArray(v) || v.length < 1 || v.length > 4 || !v.every(isStr)) errors.push(`${where}.${field} must have 1-4 texts`);
      else v.forEach((t, k) => t.length > 40 && errors.push(`${where}.${field}[${k}] must be at most 40 chars`));
    };
    const text = (v: unknown, field: string, max: number, required = true) => {
      if (v === undefined && !required) return;
      if (!isStr(v) || v.length > max) errors.push(`${where}.${field} must be 1-${max} chars`);
    };
    if (s.kind === "statement") { text(s.title, "title", 60); text(s.body, "body", 110, false); }
    if (s.kind === "number") { text(s.value, "value", 8); text(s.label, "label", 60); }
    if (s.kind === "list") { text(s.title, "title", 40); lines(s.items, "items"); }
    if (s.kind === "steps") { text(s.title, "title", 40); lines(s.steps, "steps"); }
  });
}

function checkCarousel(c: CarouselPost, errors: string[]) {
  checkCommon(c, "carousel", errors);
  if (c.slot !== "09:00") errors.push("carousel.slot must be 09:00");
  if (!Array.isArray(c.slides) || c.slides.length < 3 || c.slides.length > 8) errors.push("carousel.slides must have 3-8 items");
  (Array.isArray(c.slides) ? c.slides : []).forEach((s, j) => {
    if (!isStr(s?.title) || s.title.length > 80) errors.push(`carousel.slides[${j}].title must be 1-80 chars`);
    if (s?.body !== undefined && (!isStr(s.body) || s.body.length > 160)) errors.push(`carousel.slides[${j}].body must be 1-160 chars`);
  });
}
