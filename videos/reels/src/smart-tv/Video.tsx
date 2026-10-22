import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CommentCta } from "../components/CommentCta";
import { Reel, Source } from "../components/Reel";
import { colors, easeOut, enter, fonts, pop, punch, safeBand, typed } from "../theme";

// Scenes of 3 + 4.5 + 4.5 + 4 + 4 s, joined by four 10-frame transitions.
export const SMART_TV_DURATION = 600 - 40;

export const SmartTv: React.FC<{ readonly keyword: string }> = ({ keyword }) => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: 10 });

  return (
    <Reel>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={3 * fps}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence name="Terminal" durationInFrames={4.5 * fps}>
          <Terminal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="Result" durationInFrames={4.5 * fps}>
          <Result />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
        <TransitionSeries.Sequence name="Warning" durationInFrames={4 * fps}>
          <Warning />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="CTA" durationInFrames={4 * fps}>
          <CommentCta question="Quer os 2 projetos?" keyword={keyword} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Reel>
  );
};

const ads = [
  { x: 40, y: 40, w: 300, label: "ANÚNCIO", at: 0 },
  { x: 380, y: 210, w: 260, label: "PATROCINADO", at: 0 },
  { x: 80, y: 250, w: 230, label: "ANÚNCIO", at: 0.5 },
  { x: 400, y: 50, w: 220, label: "OFERTA", at: 0.9 },
];

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shake = frame > 1.4 * fps && frame < 1.8 * fps ? Math.sin(frame * 2.5) * 6 : 0;

  return (
    <div style={safeBand}>
      <div style={{ ...punch(frame, fps), fontFamily: fonts.display, fontSize: 100, lineHeight: 1.03, color: colors.ink }}>
        Sua Smart TV tá <span style={{ color: colors.warm }}>cheia de anúncio</span>?
      </div>
      <div style={{ position: "relative", width: 720, height: 420, marginTop: 70, translate: `${shake}px 0px` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: `14px solid #2a2f3b`, background: "#151922" }} />
        {ads.map((ad, i) => (
          <div
            key={i}
            style={{
              ...(ad.at === 0 ? {} : pop(frame, fps, ad.at, 0.3)),
              position: "absolute",
              left: ad.x,
              top: ad.y,
              width: ad.w,
              padding: "26px 0",
              borderRadius: 14,
              background: colors.warm,
              color: "#0b0d12",
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            {ad.label}
          </div>
        ))}
        <div style={{ position: "absolute", left: 300, right: 300, bottom: -46, height: 16, borderRadius: 8, background: "#2a2f3b" }} />
      </div>
      <div style={{ ...enter(frame, fps, 1.5), fontFamily: fonts.body, fontWeight: 600, fontSize: 52, color: colors.ink, marginTop: 90 }}>
        Tem gente resolvendo <span style={{ color: colors.accent }}>com IA</span>.
      </div>
    </div>
  );
};

const steps = ["TV encontrada no Wi-Fi", "25 apps de fábrica desativados", "Tela inicial nova instalada"];

const Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prompt = "tira os anúncios da minha TV";

  return (
    <div style={{ ...safeBand, justifyContent: "center" }}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.display, fontSize: 76, lineHeight: 1.08, color: colors.ink }}>
        Um dev pediu pro <span style={{ color: colors.accent }}>Claude Code</span>:
      </div>
      <div
        style={{
          ...enter(frame, fps, 0.2),
          marginTop: 60,
          width: "100%",
          padding: "34px 40px",
          borderRadius: 28,
          background: "#0f1218",
          border: `2px solid ${colors.line}`,
          fontFamily: fonts.mono,
          fontSize: 38,
          textAlign: "left",
          color: colors.ink,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <div>
          <span style={{ color: colors.accent }}>&gt; </span>
          {typed(prompt, frame, fps, 0.4)}
          <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>▍</span>
        </div>
        {steps.map((step, i) => (
          <div key={step} style={{ ...enter(frame, fps, 1.7 + i * 0.55, 0.3, 20), color: colors.ink }}>
            <span style={{ color: colors.accent }}>✓ </span>
            {step}
          </div>
        ))}
      </div>
      <Source style={{ marginTop: 40 }}>TechCrunch, 19/out</Source>
    </div>
  );
};

const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = (start: number) =>
    interpolate(frame, [start * fps, (start + 0.8) * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  return (
    <div style={safeBand}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.display, fontSize: 84, color: colors.ink }}>Uma tarde depois:</div>
      <div style={{ width: "100%", marginTop: 60, display: "flex", flexDirection: "column", gap: 34, textAlign: "left" }}>
        <Bar label="Tela inicial de fábrica" value="192 MB" width={100 * grow(0.3)} color={colors.warm} />
        <Bar label="Tela inicial nova" value="83 MB" width={43 * grow(0.9)} color={colors.accent} />
      </div>
      <div style={{ ...enter(frame, fps, 1.8), fontFamily: fonts.body, fontWeight: 600, fontSize: 46, color: colors.ink, marginTop: 64, lineHeight: 1.3 }}>
        Sem anúncio da própria TV
        <br />e sem rastrear <span style={{ color: colors.accent }}>o que você assiste</span>.
      </div>
      <div style={{ ...enter(frame, fps, 2.8), fontFamily: fonts.body, fontSize: 38, color: colors.muted, marginTop: 40 }}>
        Milhares de pessoas repetiram em 2 dias.
      </div>
    </div>
  );
};

const Bar: React.FC<{ label: string; value: string; width: number; color: string }> = ({ label, value, width, color }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fonts.body, fontSize: 38, color: colors.muted, marginBottom: 14 }}>
      <span>{label}</span>
      <span style={{ fontFamily: fonts.mono, fontWeight: 700, color }}>{value}</span>
    </div>
    <div style={{ height: 44, borderRadius: 22, background: colors.line }}>
      <div style={{ width: `${width}%`, height: "100%", borderRadius: 22, background: color }} />
    </div>
  </div>
);

const warnings = ["Tem gente que travou a TV", "Os projetos ainda estão em teste", "Faça só na sua própria TV"];

const Warning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={safeBand}>
      <div style={{ ...pop(frame, fps, 0, 0.35), fontFamily: fonts.display, fontSize: 92, color: colors.warm }}>Antes de tentar</div>
      <div style={{ width: "100%", marginTop: 56, display: "flex", flexDirection: "column", gap: 26 }}>
        {warnings.map((text, i) => (
          <div
            key={text}
            style={{
              ...enter(frame, fps, 0.4 + i * 0.35, 0.35, 30),
              padding: "30px 36px",
              borderRadius: 26,
              background: colors.panel,
              borderLeft: `12px solid ${colors.warm}`,
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 44,
              color: colors.ink,
              textAlign: "left",
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};
