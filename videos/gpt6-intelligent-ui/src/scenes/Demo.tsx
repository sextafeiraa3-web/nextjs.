import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, easeOut, enter, fonts, pop } from "../theme";

const TOTAL = 240;

export const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The people stepper ticks 2 → 3 → 4, and the share follows it.
  const people = frame < 3.4 * fps ? 2 : frame < 4.2 * fps ? 3 : 4;
  const tip = interpolate(frame, [2.4 * fps, 3.2 * fps], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const share = (TOTAL * (1 + Math.round(tip) / 100)) / people;

  return (
    <div style={{ position: "absolute", top: 210, left: 80, right: 80, height: 1110, display: "flex", flexDirection: "column", gap: 34 }}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.mono, fontSize: 34, color: colors.accent, textAlign: "center" }}>
        Intelligent UI
      </div>
      <div
        style={{
          ...enter(frame, fps, 0.2),
          alignSelf: "flex-end",
          maxWidth: 760,
          padding: "26px 34px",
          borderRadius: "36px 36px 8px 36px",
          background: colors.accent2,
          color: "#0b0d12",
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.25,
        }}
      >
        Divide a conta de R$ 240 com 10% de gorjeta?
      </div>
      <div
        style={{
          ...pop(frame, fps, 1.1, 0.5),
          alignSelf: "flex-start",
          width: "100%",
          padding: 44,
          borderRadius: 40,
          background: colors.panel,
          border: `2px solid ${colors.line}`,
          display: "flex",
          flexDirection: "column",
          gap: 34,
          fontFamily: fonts.body,
          color: colors.ink,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 46 }}>Divisor de conta</div>
        <Row label="Total" value="R$ 240,00" />
        <div>
          <Row label="Gorjeta" value={`${Math.round(tip)}%`} />
          <div style={{ marginTop: 18, height: 16, borderRadius: 8, background: colors.line }}>
            <div style={{ width: `${tip * 5}%`, height: "100%", borderRadius: 8, background: colors.accent }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 40, color: colors.muted }}>Pessoas</span>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Step sign="−" />
            <span style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: 56, width: 50, textAlign: "center" }}>{people}</span>
            <Step sign="+" active={frame > 3.2 * fps && frame < 4.5 * fps} />
          </div>
        </div>
        <div
          style={{
            marginTop: 6,
            padding: "30px 0",
            borderRadius: 28,
            background: "rgba(62, 230, 168, 0.12)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 34, color: colors.muted }}>cada um paga</div>
          <div style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: 92, color: colors.accent }}>
            R$ {share.toFixed(2).replace(".", ",")}
          </div>
        </div>
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 40 }}>
    <span style={{ color: colors.muted }}>{label}</span>
    <span style={{ fontFamily: fonts.mono, fontWeight: 700 }}>{value}</span>
  </div>
);

const Step: React.FC<{ sign: string; active?: boolean }> = ({ sign, active }) => (
  <div
    style={{
      width: 72,
      height: 72,
      borderRadius: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 48,
      fontWeight: 800,
      color: active ? "#0b0d12" : colors.ink,
      background: active ? colors.accent : colors.line,
      scale: active ? 1.12 : 1,
    }}
  >
    {sign}
  </div>
);
