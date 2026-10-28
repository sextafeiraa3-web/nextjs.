import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig } from "remotion";
import { CommentCta } from "../components/CommentCta";
import { Reel } from "../components/Reel";
import { Availability } from "./scenes/Availability";
import { Demo } from "./scenes/Demo";
import { Formats } from "./scenes/Formats";
import { Hook } from "./scenes/Hook";

// 22 s of scenes minus four 0.4 s transitions.
export const GPT6_DURATION = 612;

export const Gpt6: React.FC<{ readonly keyword: string }> = ({ keyword }) => {
  const { fps } = useVideoConfig();
  const cut = linearTiming({ durationInFrames: Math.round(0.4 * fps) });

  return (
    <Reel>
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
          <CommentCta question="Quer o resumo completo?" keyword={keyword} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Reel>
  );
};
