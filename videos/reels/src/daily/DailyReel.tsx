import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Fragment } from "react";
import { Audio, CalculateMetadataFunction, staticFile } from "remotion";
import { CommentCta } from "../components/CommentCta";
import { Reel, Source } from "../components/Reel";
import { HookScene, Scene, SceneView } from "./scenes";

// Data-driven Reel used by the daily Factory: every day's video is this
// composition with different props, so no TSX is written per video.
export type DailyReelProps = {
  hook: string;
  scenes: Scene[];
  keyword: string;
  ctaQuestion: string;
  source?: string;
  audio?: string; // path inside public/, e.g. "daily/v1.wav"
  audioSec?: number;
};

const FPS = 30;
const HOOK_SEC = 3;
const CTA_SEC = 4;
const CUT = 10; // frames per transition

// Narration + 1.5 s of air, never shorter than 15 s or longer than 30 s.
export const dailyDuration = (audioSec = 0) => Math.min(30, Math.max(15, audioSec + 1.5));

export const calculateDailyMetadata: CalculateMetadataFunction<DailyReelProps> = ({ props }) => ({
  durationInFrames: Math.round(dailyDuration(props.audioSec) * FPS),
});

export const DailyReel: React.FC<DailyReelProps> = ({ hook, scenes, keyword, ctaQuestion, source, audio, audioSec }) => {
  const total = Math.round(dailyDuration(audioSec) * FPS);
  const cuts = scenes.length + 1;
  // Transitions overlap neighbours, so their frames are added back.
  const sceneFrames = Math.floor((total + cuts * CUT - (HOOK_SEC + CTA_SEC) * FPS) / scenes.length);
  const ctaFrames = total + cuts * CUT - HOOK_SEC * FPS - sceneFrames * scenes.length;
  const timing = linearTiming({ durationInFrames: CUT });

  return (
    <Reel>
      {audio ? <Audio src={staticFile(audio)} /> : null}
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={HOOK_SEC * FPS}>
          <HookScene text={hook} />
        </TransitionSeries.Sequence>
        {scenes.map((scene, i) => (
          <Fragment key={i}>
            <TransitionSeries.Transition presentation={i % 2 === 0 ? slide({ direction: "from-bottom" }) : fade()} timing={timing} />
            <TransitionSeries.Sequence name={`Scene ${i + 1}`} durationInFrames={sceneFrames}>
              <SceneView scene={scene} />
              {source && i === 0 ? <Source style={{ position: "absolute", top: 1260, left: 0, right: 0, textAlign: "center" }}>{source}</Source> : null}
            </TransitionSeries.Sequence>
          </Fragment>
        ))}
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence name="CTA" durationInFrames={ctaFrames}>
          <CommentCta question={ctaQuestion} keyword={keyword} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Reel>
  );
};
