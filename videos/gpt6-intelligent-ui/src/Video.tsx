import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Availability } from "./scenes/Availability";
import { CommentCta } from "./scenes/CommentCta";
import { Demo } from "./scenes/Demo";
import { Formats } from "./scenes/Formats";
import { Hook } from "./scenes/Hook";
import { colors } from "./theme";

export type VideoProps = {
  readonly keyword: string;
};

export const Video: React.FC<VideoProps> = ({ keyword }) => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: Math.round(0.4 * fps) });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(900px 700px at 85% 10%, rgba(62,230,168,0.14), transparent 70%),
          radial-gradient(900px 900px at 0% 90%, rgba(123,140,255,0.14), transparent 70%), ${colors.ground}`,
      }}
    >
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={3.5 * fps}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence name="Demo" durationInFrames={6 * fps}>
          <Demo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="Formats" durationInFrames={4.5 * fps}>
          <Formats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={cut} />
        <TransitionSeries.Sequence name="Availability" durationInFrames={3.5 * fps}>
          <Availability />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence name="Comment CTA" durationInFrames={4.5 * fps}>
          <CommentCta keyword={keyword} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
