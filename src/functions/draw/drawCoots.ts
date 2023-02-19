import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import timePerCootsFrame from "../../constants/timePerCootsFrame";
import Direction from "../../enums/Direction";
import Coords from "../../interfaces/Coords";
import state from "../../state";
import getCootsScreenCoords from "../getCootsScreenCoords";
import getCootsDirection from "../getCootsDirection";
import drawImage from "./drawImage";
import drawRectangle from "./drawRectangle";
import cootsMaxVelocity from "../../constants/cootsMaxVelocity";

const drawCoots = (): void => {
  const direction: Direction = getCootsDirection();
  const frameDirectionOffset: number = (direction === Direction.DownRight
    ? 1
    : direction === Direction.UpLeft
      ? 2
      : direction === Direction.UpRight
        ? 3
        : 0) * cootsWidth * 4;
  const frameAnimationOffset: number = Math.floor((state.currentTime % (timePerCootsFrame * 4)) / timePerCootsFrame) * cootsWidth;
  const sourceX: number = frameDirectionOffset + frameAnimationOffset;
  const walkingThreshold: number = .3 * cootsMaxVelocity;
  const runningThreshold: number = .7 * cootsMaxVelocity;
  const sourceY: number = (
    (Math.abs(state.cootsVelocityX) > runningThreshold || Math.abs(state.cootsVelocityY) > runningThreshold)
      ? 2
      : (Math.abs(state.cootsVelocityX) > walkingThreshold || Math.abs(state.cootsVelocityY) > walkingThreshold)
        ? 1
        : 0
  ) * cootsHeight;
  const centerScreenCoords: Coords = getCootsScreenCoords();
  drawImage("coots", sourceX, sourceY, cootsWidth, cootsHeight, centerScreenCoords.x - 9, centerScreenCoords.y - 16, cootsWidth, cootsHeight);
  // drawRectangle("#e03c28", centerScreenCoords.x, centerScreenCoords.y, 1, 1)
};

export default drawCoots;