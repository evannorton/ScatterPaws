import gameWidth from "../../constants/gameWidth";
import drawText from "./drawText";
import drawRectangle from "./drawRectangle";
import state from "../../state";
import drawImage from "./drawImage";
import HardZIndex from "../../interfaces/ZIndex/HardZIndex";
import ZIndexType from "../../enums/ZIndexType";
import levelIsCompleted from "../levelIsCompleted";
import getPausedTime from "../getPausedTime";

const drawTimer = (): void => {
  const endTime: number = levelIsCompleted() ? state.levelCompletedAt : state.currentTime;
  const offset: number = 4;
  const width: number = 26;
  const height: number = 11;
  const timeLeft: number = state.level.time - (endTime - state.levelStartedAt) + getPausedTime();
  const secondsLeft: number = Math.floor(timeLeft / 1000);
  const hungerZIndex: HardZIndex = {
    type: ZIndexType.Hard,
    value: 10003
  }
  const percent: number = 1 - secondsLeft / state.level.time * 1000;
  const frame: number = percent < 1 / 3
    ? 0
    : percent < 2 / 3
      ? 1
      : 2;
  drawImage("hunger", 1, frame * 14, 0, 14, 14, gameWidth - offset - width - 17, offset - 2, 14, 14, hungerZIndex);
  drawText(`${Math.floor(secondsLeft / 60)}:${`${secondsLeft % 60}`.padStart(2, "0")}`, frame === 2 ? "#fd3232" : "#ffffff", gameWidth - offset - 2, offset + 2, 1, gameWidth, 1, "right", "top");
  drawRectangle("#000000", .25, gameWidth - offset - width, offset, width, height, 10003);
}

export default drawTimer;