import { off } from "process";
import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import drawRectangle from "./drawRectangle";
import drawText from "./drawText";

const drawBedHUD = (): void => {
  const offset: number = 4;
  drawRectangle("#000000", .5, gameWidth / 2 - 43, gameHeight / 2 - 26 - offset, 86, 15, 10004)
  drawText("Click to start!", "#ffffff", gameWidth / 2, gameHeight / 2 - 24 + 2 - offset, 1, gameWidth, 1, "center", "top");
};

export default drawBedHUD;