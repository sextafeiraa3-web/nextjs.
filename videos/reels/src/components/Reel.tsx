import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

type Props = {
  readonly children: React.ReactNode;
  // Tints of the two background glows.
  readonly glow?: [string, string];
};

// Shared frame for every Lino IA Reel: dark ground, two slowly drifting
// glows and the @linoia.br handle at the bottom of the safe band.
export const Reel: React.FC<Props> = ({ children, glow = ["rgba(62,230,168,0.14)", "rgba(123,140,255,0.14)"] }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 60;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(900px 700px at ${85 + drift / 20}% ${10 + drift / 30}%, ${glow[0]}, transparent 70%),
          radial-gradient(900px 900px at ${0 - drift / 20}% 90%, ${glow[1]}, transparent 70%), ${colors.ground}`,
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          top: 1336,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: 2,
          color: colors.muted,
          opacity: 0.8,
        }}
      >
        LINO IA · @linoia.br
      </div>
    </AbsoluteFill>
  );
};

// Small source credit, shown in the scene that carries the claim.
export const Source: React.FC<{ readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontFamily: fonts.mono, fontSize: 28, color: colors.muted, ...style }}>Fonte: {children}</div>
);
