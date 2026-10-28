import { readFileSync } from "node:fs";

// Brand palette from the design (Noite, Elétrico, Ciano, Lima, Gelo).
const C = { night: "#070B1A", electric: "#2F6BFF", cyan: "#22D3EE", lime: "#C6FF3D", ice: "#F5F7FF" };

const FONTS = new URL("../../videos/reels/public/fonts/", import.meta.url);
const font = (file: string) => `data:font/woff2;base64,${readFileSync(new URL(file, FONTS)).toString("base64")}`;

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type SlideInput = { title: string; body?: string; index: number; total: number; closing?: { keyword: string } };

export function slideHtml({ title, body, index, total, closing }: SlideInput): string {
  const first = index === 1;
  const content = closing
    ? `<div class="title">${escapeHtml(title)}</div>
       <div class="label">Comente</div>
       <div class="keyword">${escapeHtml(closing.keyword)}</div>
       <div class="body">que eu te mando no direct.</div>`
    : `<div class="title ${first ? "cover" : ""}">${escapeHtml(title)}</div>
       ${body ? `<div class="body">${escapeHtml(body)}</div>` : ""}
       ${first ? `<div class="swipe">Arraste para o lado →</div>` : ""}`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: "Archivo Black"; src: url(${font("archivo-black-latin-400-normal.woff2")}); }
    @font-face { font-family: "Inter"; font-weight: 600; src: url(${font("inter-latin-600-normal.woff2")}); }
    @font-face { font-family: "JetBrains Mono"; font-weight: 700; src: url(${font("jetbrains-mono-latin-700-normal.woff2")}); }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1350px; overflow: hidden; color: ${C.ice};
      background: radial-gradient(800px 600px at 90% 5%, ${C.electric}40, transparent 70%),
                  radial-gradient(700px 700px at 0% 100%, ${C.cyan}26, transparent 70%), ${C.night};
      font-family: "Inter", sans-serif; display: flex; flex-direction: column; justify-content: center; padding: 120px 100px; }
    .title { font-family: "Archivo Black", sans-serif; font-size: 84px; line-height: 1.08; }
    .title.cover { font-size: 104px; }
    .body { font-weight: 600; font-size: 46px; line-height: 1.35; margin-top: 48px; color: ${C.ice}cc; }
    .swipe, .label { font-weight: 600; font-size: 40px; margin-top: 64px; color: ${C.cyan}; }
    .keyword { display: inline-block; align-self: flex-start; margin-top: 24px; padding: 24px 56px; border-radius: 28px;
      background: ${C.lime}; color: ${C.night}; font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 88px; }
    .footer { position: absolute; left: 100px; right: 100px; bottom: 70px; display: flex; justify-content: space-between;
      font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 30px; color: ${C.ice}99; }
    .bar { position: absolute; top: 0; left: 0; height: 12px; width: ${Math.round((index / total) * 1080)}px; background: ${C.lime}; }
  </style></head><body>
    <div class="bar"></div>
    ${content}
    <div class="footer"><span>LINO IA · @linoia.br</span><span>${index}/${total}</span></div>
  </body></html>`;
}
