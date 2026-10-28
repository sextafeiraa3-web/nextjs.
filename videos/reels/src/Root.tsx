import { Composition, delayRender, continueRender } from "remotion";
import { AGENT_MONITOR_DURATION, AgentMonitor } from "./agent-monitor/Video";
import { GPT6_DURATION, Gpt6 } from "./gpt6/Video";
import { LOCKED_CHATS_DURATION, LockedChats } from "./locked-chats/Video";
import { SMART_TV_DURATION, SmartTv } from "./smart-tv/Video";
import { calculateDailyMetadata, DailyReel, DailyReelProps } from "./daily/DailyReel";
import dailyFixture from "./daily/fixture.json";
import { fontsReady } from "./theme";

const waitForFonts = delayRender("Loading fonts");
fontsReady.then(() => continueRender(waitForFonts));

// One composition per Reel, all 1080×1920 at 30 fps. `keyword` is the word the
// closing card asks people to comment; keep it in sync with
// src/instagram/automations.ts in the Next.js app.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Daily Factory videos: props come from automation/src/render-video.ts. */}
      <Composition
        id="DailyReel"
        component={DailyReel}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={dailyFixture as DailyReelProps}
        calculateMetadata={calculateDailyMetadata}
      />
      <Composition
        id="Gpt6IntelligentUi"
        component={Gpt6}
        durationInFrames={GPT6_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ keyword: "GPT6" }}
      />
      <Composition
        id="SmartTvAds"
        component={SmartTv}
        durationInFrames={SMART_TV_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ keyword: "TV" }}
      />
      <Composition
        id="AgentMonitor"
        component={AgentMonitor}
        durationInFrames={AGENT_MONITOR_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ keyword: "ALARME" }}
      />
      <Composition
        id="LockedChats"
        component={LockedChats}
        durationInFrames={LOCKED_CHATS_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ keyword: "CADEADO" }}
      />
    </>
  );
};
