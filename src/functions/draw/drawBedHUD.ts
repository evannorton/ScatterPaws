import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import drawRectangle from "./drawRectangle";
import drawText from "./drawText";

const drawBedHUD = (): void => {
  const offset: number = 8;
  drawRectangle("#000000", .5, gameWidth / 2 - 42, gameHeight / 2 - 26 - offset, 84, 15, 10004)
  drawText("Click to wake!", "#ffffff", gameWidth / 2, gameHeight / 2 - 24 + 2 - offset, 1, gameWidth, 1, "center", "top");
};

export default drawBedHUD;