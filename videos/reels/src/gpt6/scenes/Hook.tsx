import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, fonts, punch, safeBand } from "../../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strike = interpolate(frame, [1.3 * fps, 1.8 * fps], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={safeBand}>
      <div
        style={{
          ...punch(frame, fps),
          padding: "16px 36px",
          borderRadius: 999,
          border: `3px solid ${colors.accent}`,
          color: colors.accent,
          fontFamily: fonts.mono,
          fontWeight: 700,
          fontSize: 36,
          marginBottom: 70,
        }}
      >
        NOVO · GPT-6 no ChatGPT
      </div>
      <div style={{ ...punch(frame, fps), fontFamily: fonts.display, fontSize: 104, lineHeight: 1.04, color: colors.ink }}>
        O ChatGPT parou de responder
      </div>
      <div
        style={{
          ...punch(frame, fps),
          position: "relative",
          fontFamily: fonts.display,
          fontSize: 104,
          lineHeight: 1.1,
          color: colors.muted,
          marginTop: 10,
        }}
      >
        só com texto.
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "54%",
            height: 12,
            width: `${strike}%`,
            borderRadius: 6,
            background: colors.accent,
          }}
        />
      </div>
      <div style={{ ...enter(frame, fps, 1.9), fontFamily: fonts.body, fontWeight: 600, fontSize: 48, color: colors.ink, marginTop: 70 }}>
        Agora ele monta a <span style={{ color: colors.accent }}>tela</span> da resposta.
      </div>
    </div>
  );
};
