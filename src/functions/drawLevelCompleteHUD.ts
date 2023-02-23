import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import ZIndexType from "../enums/ZIndexType";
import HardZIndex from "../interfaces/ZIndex/HardZIndex";
import state from "../state";
import drawImage from "./draw/drawImage";
import drawRectangle from "./draw/drawRectangle";
import drawText from "./draw/drawText";

const drawLevelCompleteHUD = (): void => {
  const nextZIndex: HardZIndex = {
    value: 10000,
    type: ZIndexType.Hard
  };
  const x: number = 110;
  const height: number = 81;
  const y: number = gameHeight / 2 - height / 2;
  drawRectangle("#000000", .5, x, y, gameWidth - x * 2, height, 10000);
  drawText("Level Complete!", "#ffffff", gameWidth / 2, y + 6, 1, gameWidth, 1, "center", "top");
  const frameDuration: number = 65;
  const frame = Math.floor(state.currentTime % (frameDuration * 4) / frameDuration);
  drawImage("eating", 1, frame * 32, 0, 32, 26, gameWidth / 2 - 16, y + 19, 32, 26, nextZIndex);
  drawImage("buttons/next", 1, 0, 0, 47, 24, gameWidth / 2 - 24, y + 51, 47, 24, nextZIndex);
};

export default drawLevelCompleteHUD;