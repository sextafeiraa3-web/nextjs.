import { loadFont } from "@remotion/fonts";
import { Easing, interpolate, staticFile } from "remotion";

export const colors = {
  ground: "#0b0d12",
  panel: "#161a23",
  line: "rgba(240, 244, 255, 0.14)",
  ink: "#f0f4ff",
  muted: "#8d95a8",
  accent: "#3ee6a8",
  accent2: "#7b8cff",
  warm: "#ffb547",
};

export const fonts = {
  display: "Archivo Black",
  body: "Inter",
  mono: "JetBrains Mono",
};

const font = (family: string, file: string, weight: string) =>
  loadFont({ family, url: staticFile(`fonts/${file}`), weight });

export const fontsReady = Promise.all([
  font(fonts.display, "archivo-black-latin-400-normal.woff2", "400"),
  font(fonts.body, "inter-latin-400-normal.woff2", "400"),
  font(fonts.body, "inter-latin-600-normal.woff2", "600"),
  font(fonts.body, "inter-latin-800-normal.woff2", "800"),
  font(fonts.mono, "jetbrains-mono-latin-500-normal.woff2", "500"),
  font(fonts.mono, "jetbrains-mono-latin-700-normal.woff2", "700"),
]);

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

// Fade + rise in starting at `start` seconds, over `dur` seconds.
export const enter = (frame: number, fps: number, start: number, dur = 0.45, rise = 40) => {
  const range = [start * fps, (start + dur) * fps];
  const opts = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  } as const;
  return {
    opacity: interpolate(frame, range, [0, 1], opts),
    translate: `0px ${interpolate(frame, range, [rise, 0], opts)}px`,
  };
};

// Pop in with a slight overshoot.
export const pop = (frame: number, fps: number, start: number, dur = 0.4) => {
  const range = [start * fps, (start + dur) * fps];
  return {
    opacity: interpolate(frame, range, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    scale: interpolate(frame, range, [0.6, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    }),
  };
};

// Hook text: fully visible on frame 0 (it is the thumbnail), then a small
// punch-in so the first second still moves.
export const punch = (frame: number, fps: number, start = 0, dur = 0.35) => ({
  scale: interpolate(frame, [start * fps, (start + dur) * fps], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  }),
});

// The part of `text` typed by `frame`, at `cps` characters per second.
export const typed = (text: string, frame: number, fps: number, start: number, cps = 28) =>
  text.slice(0, Math.max(0, Math.floor(((frame - start * fps) / fps) * cps)));

// Content stays inside the band Instagram leaves free on a 1080×1920 Reel.
export const safeBand: React.CSSProperties = {
  position: "absolute",
  top: 200,
  left: 80,
  right: 80,
  height: 1120,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};
