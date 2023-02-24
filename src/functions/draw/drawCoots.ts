import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import timePerCootsFrame from "../../constants/timePerCootsFrame";
import Direction from "../../enums/Direction";
import Coords from "../../interfaces/Coords";
import state from "../../state";
import getCootsScreenCoords from "../getCootsScreenCoords";
import getCootsDirection from "../getCootsDirection";
import drawImage from "./drawImage";
import getLaserPower from "../getLaserPower";
import walkingThreshold from "../../constants/walkingThreshold";
import runningThreshold from "../../constants/runningThreshold";
import YSortZIndex from "../../interfaces/ZIndex/YSortZIndex";
import ZIndexType from "../../enums/ZIndexType";
import isCootsInObstacle from "../isCootsInObstacle";

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
  const hitObstacle: boolean = isCootsInObstacle();
  const laserPower: number = getLaserPower();
  const sourceY: number = (
    state.isInBed
      ? 4
      : hitObstacle
        ? 3
        : (laserPower >= runningThreshold)
          ? 2
          : (laserPower >= walkingThreshold)
            ? 1
            : 0
  ) * cootsHeight;
  const centerScreenCoords: Coords = getCootsScreenCoords();
  const x: number = centerScreenCoords.x - 9;
  const y: number = centerScreenCoords.y - 16;
  const ySortZIndex: YSortZIndex = {
    ySortID: "coots",
    type: ZIndexType.YSort
  };
  drawImage("coots", 1, sourceX, sourceY, cootsWidth, cootsHeight, x, y, cootsWidth, cootsHeight, ySortZIndex);
};

export default drawCoots;