import gameWidth from "../constants/gameWidth";
import state from "../state";
import drawRectangle from "./draw/drawRectangle";
import drawText from "./draw/drawText";

const drawCounterHUD = (): void => {
  const width: number = 97;
  drawRectangle("#000000", .25, 18, 4, width, 11, 10003);
  drawText(`Claw ${state.level.requiredDestructibles - state.brokenDestructibleIDs.length} objects!`, "#ffffff", 20, 6, 1, gameWidth, 1, "left", "top");
};

export default drawCounterHUD;