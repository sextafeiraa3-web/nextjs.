import { Composition, delayRender, continueRender } from "remotion";
import { fontsReady } from "./theme";
import { Video } from "./Video";

const waitForFonts = delayRender("Loading fonts");
fontsReady.then(() => continueRender(waitForFonts));

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Gpt6IntelligentUi"
      component={Video}
      // 22 s of scenes minus four 0.4 s transitions.
      durationInFrames={612}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ keyword: "GPT6" }}
    />
  );
};
