import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, fonts, pop, safeBand } from "../theme";

type Props = {
  readonly keyword: string;
};

// Closing card: asks for the comment keyword that triggers the automatic DM
// (see src/app/api/instagram/webhook in the Next.js app).
export const CommentCta: React.FC<Props> = ({ keyword }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + 0.04 * Math.sin(Math.max(0, frame - 1.2 * fps) / 5);
  const glow = interpolate(frame, [0.8 * fps, 1.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={safeBand}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.display, fontSize: 96, lineHeight: 1.05, color: colors.ink }}>
        Quer o resumo completo?
      </div>
      <div style={{ ...enter(frame, fps, 0.35), fontFamily: fonts.body, fontWeight: 600, fontSize: 48, color: colors.muted, marginTop: 60 }}>
        Comente
      </div>
      <div style={{ ...pop(frame, fps, 0.6, 0.5), marginTop: 26 }}>
        <div
          style={{
            scale: pulse,
            padding: "28px 70px",
            borderRadius: 30,
            background: colors.accent,
            color: "#0b0d12",
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: 120,
            letterSpacing: 4,
            boxShadow: `0 0 ${80 * glow}px rgba(62, 230, 168, ${0.55 * glow})`,
          }}
        >
          {keyword}
        </div>
      </div>
      <div style={{ ...enter(frame, fps, 1.1), fontFamily: fonts.body, fontWeight: 600, fontSize: 52, color: colors.ink, marginTop: 60, lineHeight: 1.25 }}>
        que eu te mando
        <br />
        <span style={{ color: colors.accent }}>no direct</span>.
      </div>
    </div>
  );
};
