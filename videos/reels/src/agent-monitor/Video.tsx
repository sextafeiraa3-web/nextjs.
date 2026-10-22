import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CommentCta } from "../components/CommentCta";
import { Reel, Source } from "../components/Reel";
import { colors, easeOut, enter, fonts, pop, punch, safeBand } from "../theme";

const red = "#ff5d5d";

// Scenes of 3.5 + 4.5 + 5 + 4 + 4 s, joined by four 10-frame transitions.
export const AGENT_MONITOR_DURATION = 630 - 40;

export const AgentMonitor: React.FC<{ readonly keyword: string }> = ({ keyword }) => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: 10 });

  return (
    <Reel glow={["rgba(255,93,93,0.16)", "rgba(123,140,255,0.12)"]}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={3.5 * fps}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence name="Case 1" durationInFrames={4.5 * fps}>
          <CaseAlerts />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
        <TransitionSeries.Sequence name="Case 2" durationInFrames={5 * fps}>
          <CaseLie />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="Response" durationInFrames={4 * fps}>
          <Response />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="CTA" durationInFrames={4 * fps}>
          <CommentCta question="Quer o relatório completo?" keyword={keyword} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Reel>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const off = frame > 1 * fps;
  const ring = 1 + 0.06 * Math.sin(frame / 3);

  return (
    <div style={safeBand}>
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: 110,
          border: `14px solid ${off ? colors.muted : red}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.display,
          fontSize: 130,
          color: off ? colors.muted : red,
          scale: off ? 1 : ring,
          boxShadow: off ? "none" : `0 0 70px rgba(255,93,93,0.5)`,
          marginBottom: 60,
        }}
      >
        !
      </div>
      <div style={{ ...punch(frame, fps), fontFamily: fonts.display, fontSize: 88, lineHeight: 1.05, color: colors.ink }}>
        Uma IA da OpenAI desligou o próprio <span style={{ color: red }}>alarme de segurança</span>.
      </div>
      <div style={{ ...pop(frame, fps, 1.7, 0.35), fontFamily: fonts.display, fontSize: 88, color: red, marginTop: 40 }}>
        E depois mentiu.
      </div>
    </div>
  );
};

const CaseLabel: React.FC<{ n: number; date: string; model: string }> = ({ n, date, model }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.mono, fontSize: 36, color: colors.muted }}>
      CASO {n} · {date} · <span style={{ color: colors.ink }}>{model}</span>
    </div>
  );
};

const CaseAlerts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flip = interpolate(frame, [2 * fps, 2.3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });

  return (
    <div style={safeBand}>
      <CaseLabel n={1} date="3/out" model="GPT-6.1 Sol" />
      <div
        style={{
          ...enter(frame, fps, 0.3),
          marginTop: 50,
          alignSelf: "flex-end",
          padding: "26px 34px",
          borderRadius: "36px 36px 8px 36px",
          background: colors.accent2,
          color: "#0b0d12",
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 44,
        }}
      >
        “Não mande nenhuma mensagem.”
      </div>
      <div
        style={{
          ...enter(frame, fps, 0.9),
          marginTop: 50,
          width: "100%",
          padding: "34px 40px",
          borderRadius: 30,
          background: colors.panel,
          border: `2px solid ${colors.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 40,
          color: colors.ink,
          textAlign: "left",
        }}
      >
        <span>
          Alertas para a
          <br />
          equipe de segurança
        </span>
        <div style={{ width: 150, height: 80, borderRadius: 40, background: flip > 0.5 ? colors.line : colors.accent, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 8 + 70 * (1 - flip), width: 64, height: 64, borderRadius: 32, background: colors.ink }} />
        </div>
      </div>
      <div style={{ ...enter(frame, fps, 2.5), fontFamily: fonts.body, fontWeight: 600, fontSize: 46, color: colors.ink, marginTop: 56, lineHeight: 1.3 }}>
        Ela usou essa ordem como desculpa
        <br />
        pra <span style={{ color: red }}>silenciar os alertas</span>.
      </div>
    </div>
  );
};

const CaseLie: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stamp = interpolate(frame, [3.4 * fps, 3.7 * fps], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  const stampOpacity = interpolate(frame, [3.4 * fps, 3.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={safeBand}>
      <CaseLabel n={2} date="6/out" model="GPT-6 Astra" />
      <div
        style={{
          ...enter(frame, fps, 0.3),
          marginTop: 44,
          width: "100%",
          padding: "28px 36px",
          borderRadius: 26,
          background: "#0f1218",
          border: `2px solid ${colors.line}`,
          fontFamily: fonts.mono,
          fontSize: 36,
          textAlign: "left",
        }}
      >
        <div style={{ color: red, textDecoration: frame > 1.1 * fps ? "line-through" : "none" }}>- monitor = Monitor(...)</div>
        <div style={{ color: colors.muted, marginTop: 10 }}>  # monitoramento removido</div>
      </div>
      <div
        style={{
          ...enter(frame, fps, 1.5),
          marginTop: 44,
          alignSelf: "flex-end",
          padding: "24px 32px",
          borderRadius: "34px 34px 8px 34px",
          background: colors.accent2,
          color: "#0b0d12",
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 42,
        }}
      >
        Você removeu o monitoramento?
      </div>
      <div style={{ alignSelf: "flex-start", marginTop: 30, display: "flex", alignItems: "center", gap: 36 }}>
        <div
          style={{
            ...enter(frame, fps, 2.4),
            padding: "24px 32px",
            borderRadius: "34px 34px 34px 8px",
            background: colors.panel,
            border: `2px solid ${colors.line}`,
            color: colors.ink,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 42,
          }}
        >
          Não, não removi.
        </div>
        <div
          style={{
            opacity: stampOpacity,
            scale: stamp,
            rotate: "-12deg",
            padding: "10px 26px",
            border: `8px solid ${red}`,
            borderRadius: 16,
            color: red,
            fontFamily: fonts.display,
            fontSize: 64,
          }}
        >
          FALSO
        </div>
      </div>
    </div>
  );
};

const fixes = ["A revisão automática agora bloqueia isso", "Ainda não sabem explicar o porquê"];

const Response: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={safeBand}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.display, fontSize: 84, color: colors.ink }}>E a OpenAI?</div>
      <div style={{ width: "100%", marginTop: 54, display: "flex", flexDirection: "column", gap: 26 }}>
        {fixes.map((text, i) => (
          <div
            key={text}
            style={{
              ...pop(frame, fps, 0.4 + i * 0.4),
              padding: "30px 36px",
              borderRadius: 26,
              background: colors.panel,
              borderLeft: `12px solid ${i === 0 ? colors.accent : red}`,
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
      <div style={{ ...enter(frame, fps, 1.5), fontFamily: fonts.body, fontSize: 36, color: colors.muted, marginTop: 50, lineHeight: 1.35 }}>
        Foram testes internos, e nenhum
        <br />
        caso foi classificado como grave.
      </div>
      <Source style={{ marginTop: 36 }}>relatório da OpenAI, 20/out</Source>
    </div>
  );
};
