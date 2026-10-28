import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, fonts, pop, punch, safeBand } from "../theme";

// One component per scene kind of the daily plan (automation/src/types.ts).
export type Scene =
  | { kind: "statement"; title: string; body?: string }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "number"; value: string; label: string }
  | { kind: "steps"; title: string; steps: string[] };

const title: React.CSSProperties = { fontFamily: fonts.display, fontSize: 88, lineHeight: 1.06, color: colors.ink };
const body: React.CSSProperties = { fontFamily: fonts.body, fontWeight: 600, fontSize: 48, lineHeight: 1.25, color: colors.muted };

// Hook: on screen from frame 0 (it is the cover), with a small punch-in.
export const HookScene: React.FC<{ readonly text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={safeBand}>
      <div style={{ ...punch(frame, fps), ...title, fontSize: 104 }}>{text}</div>
      <div style={{ ...pop(frame, fps, 0.5), width: 160, height: 12, borderRadius: 6, background: colors.accent, marginTop: 70 }} />
    </div>
  );
};

export const SceneView: React.FC<{ readonly scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  switch (scene.kind) {
    case "statement":
      return (
        <div style={safeBand}>
          <div style={{ ...enter(frame, fps, 0), ...title }}>{scene.title}</div>
          {scene.body ? <div style={{ ...enter(frame, fps, 0.5), ...body, marginTop: 50 }}>{scene.body}</div> : null}
        </div>
      );
    case "number":
      return (
        <div style={safeBand}>
          <div style={{ ...pop(frame, fps, 0, 0.5), fontFamily: fonts.display, fontSize: 260, lineHeight: 1, color: colors.accent }}>{scene.value}</div>
          <div style={{ ...enter(frame, fps, 0.5), ...body, color: colors.ink, marginTop: 40 }}>{scene.label}</div>
        </div>
      );
    case "list":
    case "steps": {
      const lines = scene.kind === "list" ? scene.items : scene.steps;
      return (
        <div style={safeBand}>
          <div style={{ ...enter(frame, fps, 0), ...title, fontSize: 80 }}>{scene.title}</div>
          <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 28, alignItems: "stretch", width: "100%" }}>
            {lines.map((line, i) => (
              <div
                key={line}
                style={{
                  ...enter(frame, fps, 0.4 + i * 0.35),
                  ...body,
                  color: colors.ink,
                  textAlign: "left",
                  padding: "26px 34px",
                  borderRadius: 24,
                  background: colors.panel,
                  border: `2px solid ${colors.line}`,
                }}
              >
                <span style={{ color: colors.accent, fontFamily: fonts.mono, fontWeight: 700 }}>{scene.kind === "steps" ? `${i + 1}.` : "•"}</span> {line}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
};
