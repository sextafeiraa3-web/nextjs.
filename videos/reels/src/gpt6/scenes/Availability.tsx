import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, fonts, pop, safeBand } from "../../theme";

export const Availability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={safeBand}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.display, fontSize: 92, color: colors.ink }}>Quem já tem?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 64, width: "100%" }}>
        <Plan frame={frame} fps={fps} start={0.35} plans="Plus · Pro · Business" model="GPT-6 Sol" color={colors.accent} />
        <Plan frame={frame} fps={fps} start={0.6} plans="Free · Go" model="GPT-6 Luna" color={colors.accent2} />
      </div>
      <div style={{ ...enter(frame, fps, 1.1), fontFamily: fonts.mono, fontSize: 36, color: colors.muted, marginTop: 56 }}>
        liberando desde 7 de outubro · aba Chat
      </div>
    </div>
  );
};

const Plan: React.FC<{ frame: number; fps: number; start: number; plans: string; model: string; color: string }> = ({
  frame,
  fps,
  start,
  plans,
  model,
  color,
}) => (
  <div
    style={{
      ...pop(frame, fps, start),
      padding: "34px 40px",
      borderRadius: 30,
      background: colors.panel,
      borderLeft: `12px solid ${color}`,
      textAlign: "left",
    }}
  >
    <div style={{ fontFamily: fonts.body, fontSize: 40, color: colors.muted }}>{plans}</div>
    <div style={{ fontFamily: fonts.display, fontSize: 70, color }}>{model}</div>
  </div>
);
