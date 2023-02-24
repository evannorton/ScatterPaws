import gameHeight from "../../constants/gameHeight";
import ZIndexType from "../../enums/ZIndexType";
import Destructible from "../../interfaces/Destructible";
import HardZIndex from "../../interfaces/ZIndex/HardZIndex";
import state from "../../state";
import getTilemap from "../definables/getTilemap";
import isClawOnCooldown from "../isClawOnCooldown";
import isCootsInObstacle from "../isCootsInObstacle";
import drawImage from "./drawImage";

const drawInteractHUD = (): void => {
  const destructible: Destructible | null = getTilemap(state.level.tilemapSlug).getDestructibleWithinRange();
  const canDestroy: boolean = destructible !== null;
  const hardZIndex: HardZIndex = {
    value: 10002,
    type: ZIndexType.Hard
  };
  const width: number = 36;
  const height: number = 30;
  const offset: number = 4;
  const sourceX: number = (
    (isCootsInObstacle() || isClawOnCooldown())
      ? width * 2
      : 0
  ) + (
      canDestroy
        ? 0
        : width
    );
  drawImage("interact-hud", 1, sourceX, 0, width, height, offset, gameHeight - height - offset, width, height, hardZIndex);
};

export default drawInteractHUD;