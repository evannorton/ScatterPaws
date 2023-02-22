import gameWidth from "../../constants/gameWidth";
import drawText from "./drawText";
import drawRectangle from "./drawRectangle";
import state from "../../state";
import timePerLevel from "../../constants/timePerLevel";

const drawTimer = (): void => {
  const offset: number = 4;
  const width: number = 26;
  const height: number = 11;
  const timeLeft: number = timePerLevel - (state.currentTime - state.levelStartedAt);
  const secondsLeft: number = Math.floor(timeLeft / 1000);
  drawText(`${Math.floor(secondsLeft / 60)}:${`${secondsLeft % 60}`.padStart(2, "0")}`, "#ffffff", gameWidth - offset - 2, offset + 2, 1, gameWidth, 1, "right", "top");
  drawRectangle("#000000", .25, gameWidth - offset - width, offset, width, height, 10002);
}

export default drawTimer;