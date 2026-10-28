// Shapes shared by the daily posting pipeline. A DayPlan is what the Factory
// routine writes to content/plans/<date>.json; everything else is derived.

export type Pillar = "noticia" | "dica" | "conceito" | "gancho";

export type Scene =
  | { kind: "statement"; title: string; body?: string }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "number"; value: string; label: string }
  | { kind: "steps"; title: string; steps: string[] };

export type Source = { name: string; url: string };

export type VideoSlot = "12:30" | "17:00" | "19:00";

export type VideoPost = {
  slot: VideoSlot;
  pillar: Pillar;
  topic: string;
  hook: string;
  scenes: Scene[];
  narration: string;
  keyword: string;
  ctaQuestion: string;
  caption: string;
  tiktokTitle: string;
  youtubeTitle: string;
  sources: Source[];
  firstComment?: string; // the promised content, in case the DM automation is down
};

export type CarouselPost = {
  slot: "09:00";
  pillar: Pillar;
  topic: string;
  slides: { title: string; body?: string }[];
  keyword: string;
  caption: string;
  tiktokTitle: string;
  sources: Source[];
  firstComment?: string;
};

export type DayPlan = {
  date: string; // YYYY-MM-DD
  videos: [VideoPost, VideoPost, VideoPost];
  carousel: CarouselPost;
};

export type NetworkStatus = "SCHEDULED" | "PUBLISHED" | "ERROR" | "FIXED";

export type LogEntry = {
  date: string;
  topic: string;
  keyword: string;
  posts: {
    slot: string;
    topic?: string;
    keyword?: string;
    metricoolId?: number;
    networks: Record<string, NetworkStatus>;
    error?: string;
  }[];
};

// Written by build-day next to the rendered files.
export type Manifest = {
  date: string;
  videos: { slot: string; file: string; durationSec: number }[];
  carousel: { slot: string; files: string[] };
};
