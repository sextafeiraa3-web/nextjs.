import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CommentCta } from "../components/CommentCta";
import { Reel, Source } from "../components/Reel";
import { colors, easeIn, easeOut, enter, fonts, pop, punch, safeBand } from "../theme";

// Scenes of 3 + 4.5 + 4 + 4.5 + 4 s, joined by four 10-frame transitions.
export const LOCKED_CHATS_DURATION = 600 - 40;

export const LockedChats: React.FC<{ readonly keyword: string }> = ({ keyword }) => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: 10 });

  return (
    <Reel>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={3 * fps}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence name="Hidden" durationInFrames={4.5 * fps}>
          <Hidden />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="Unlock" durationInFrames={4 * fps}>
          <Unlock />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
        <TransitionSeries.Sequence name="How" durationInFrames={4.5 * fps}>
          <How />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="CTA" durationInFrames={4 * fps}>
          <CommentCta question="Quer o passo a passo?" keyword={keyword} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Reel>
  );
};

// A padlock drawn with divs; `closed` goes from 0 (open shackle) to 1.
const Padlock: React.FC<{ closed: number; size?: number; color?: string }> = ({ closed, size = 1, color = colors.accent }) => (
  <div style={{ position: "relative", width: 200 * size, height: 230 * size }}>
    <div
      style={{
        position: "absolute",
        left: 40 * size,
        width: 120 * size,
        height: 130 * size,
        top: (1 - closed) * -40 * size,
        borderRadius: `${60 * size}px ${60 * size}px 0 0`,
        border: `${20 * size}px solid ${color}`,
        borderBottom: "none",
      }}
    />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 130 * size, borderRadius: 26 * size, background: color }} />
  </div>
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const closed = interpolate(frame, [0.6 * fps, 0.9 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn });

  return (
    <div style={safeBand}>
      <Padlock closed={closed} />
      <div style={{ ...punch(frame, fps), fontFamily: fonts.display, fontSize: 100, lineHeight: 1.04, color: colors.ink, marginTop: 70 }}>
        Agora dá pra <span style={{ color: colors.accent }}>trancar</span> conversa no ChatGPT.
      </div>
      <div style={{ ...enter(frame, fps, 1.2), fontFamily: fonts.body, fontWeight: 600, fontSize: 50, color: colors.muted, marginTop: 50 }}>
        Com senha.
      </div>
    </div>
  );
};

const chats = ["Ideias de post", "Viagem de dezembro", "Exames médicos", "Presente da Ana"];
const SECRET = 2;

const Hidden: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(frame, [1.6 * fps, 2.2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn });

  return (
    <div style={safeBand}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.mono, fontSize: 36, color: colors.muted, alignSelf: "flex-start" }}>Histórico</div>
      <div style={{ width: "100%", marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        {chats.map((title, i) => {
          const secret = i === SECRET;
          return (
            <div
              key={title}
              style={{
                ...enter(frame, fps, 0.1 + i * 0.12, 0.3, 24),
                ...(secret ? { opacity: 1 - out, translate: `${out * 900}px 0px`, marginTop: -18 * out } : {}),
                height: secret ? 112 * (1 - out) : 112,
                overflow: "hidden",
                padding: "0 36px",
                borderRadius: 24,
                background: colors.panel,
                border: `2px solid ${secret && frame > 0.9 * fps ? colors.accent : colors.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: 42,
                color: colors.ink,
              }}
            >
              {title}
              {secret ? (
                <div style={{ ...pop(frame, fps, 0.9, 0.3) }}>
                  <Padlock closed={1} size={0.28} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ ...enter(frame, fps, 2.4), fontFamily: fonts.body, fontWeight: 600, fontSize: 48, color: colors.ink, marginTop: 64, lineHeight: 1.3 }}>
        Some do <span style={{ color: colors.accent }}>histórico</span>,
        <br />
        dos fixados e da busca.
      </div>
    </div>
  );
};

const Unlock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const digits = Math.min(4, Math.max(0, Math.floor((frame - 0.5 * fps) / (0.25 * fps)) + 1));
  const opened = interpolate(frame, [1.8 * fps, 2.1 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  return (
    <div style={safeBand}>
      <Padlock closed={opened} size={0.7} />
      <div style={{ display: "flex", gap: 34, marginTop: 60 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              border: `5px solid ${colors.accent}`,
              background: i < digits ? colors.accent : "transparent",
            }}
          />
        ))}
      </div>
      <div style={{ ...enter(frame, fps, 0.2), fontFamily: fonts.display, fontSize: 76, lineHeight: 1.1, color: colors.ink, marginTop: 64 }}>
        Abre com PIN de 4 dígitos
      </div>
      <div style={{ ...enter(frame, fps, 1.4), fontFamily: fonts.body, fontWeight: 600, fontSize: 48, color: colors.muted, marginTop: 30 }}>
        ou com a biometria do celular.
      </div>
    </div>
  );
};

const facts = [
  { label: "Como", value: "••• na conversa → Trancar" },
  { label: "Planos", value: "Free, Go, Plus e Pro" },
  { label: "Onde", value: "Web, iPhone, Android e desktop" },
];

const How: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={safeBand}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
        {facts.map((f, i) => (
          <div
            key={f.label}
            style={{
              ...pop(frame, fps, 0.1 + i * 0.3),
              padding: "26px 36px",
              borderRadius: 26,
              background: colors.panel,
              border: `2px solid ${colors.line}`,
              textAlign: "left",
            }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 32, color: colors.accent }}>{f.label}</div>
            <div style={{ fontFamily: fonts.body, fontWeight: 600, fontSize: 46, color: colors.ink, marginTop: 6 }}>{f.value}</div>
          </div>
        ))}
      </div>
      <div style={{ ...enter(frame, fps, 1.3), fontFamily: fonts.body, fontSize: 38, color: colors.muted, marginTop: 44, lineHeight: 1.35 }}>
        Chegando aos poucos. O nome do
        <br />
        botão pode variar na sua versão.
      </div>
      <Source style={{ marginTop: 32 }}>OpenAI, 20/out</Source>
    </div>
  );
};
