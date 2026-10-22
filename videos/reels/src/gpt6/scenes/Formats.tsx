import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, fonts, pop, safeBand } from "../../theme";

const formats = ["Comparações lado a lado", "Diagramas", "Calculadoras", "Jogos"];

export const Formats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={safeBand}>
      <div style={{ ...enter(frame, fps, 0), fontFamily: fonts.display, fontSize: 92, lineHeight: 1.05, color: colors.ink }}>
        Ele escolhe o <span style={{ color: colors.accent }}>formato</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 64, width: "100%" }}>
        {formats.map((label, i) => (
          <div
            key={label}
            style={{
              ...pop(frame, fps, 0.5 + i * 0.22),
              padding: "26px 36px",
              borderRadius: 26,
              background: colors.panel,
              border: `2px solid ${colors.line}`,
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 46,
              color: colors.ink,
              textAlign: "left",
            }}
          >
            <span style={{ fontFamily: fonts.mono, color: colors.accent, marginRight: 24 }}>0{i + 1}</span>
            {label}
          </div>
        ))}
      </div>
      <div style={{ ...enter(frame, fps, 1.8), fontFamily: fonts.body, fontSize: 42, color: colors.muted, marginTop: 56, lineHeight: 1.3 }}>
        E começa a responder enquanto <span style={{ color: colors.ink }}>ainda está pensando</span>.
      </div>
    </div>
  );
};
