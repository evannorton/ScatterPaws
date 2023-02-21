import gameHeight from "../../constants/gameHeight";
import ZIndexType from "../../enums/ZIndexType";
import HardZIndex from "../../interfaces/ZIndex/HardZIndex";
import state from "../../state";
import drawImage from "./drawImage";

const drawInteractHUD = (): void => {
  const destructibleID: string | null = state.tilemap.getDestructibleIDWithinRange();
  const canDestroy: boolean = destructibleID !== null && state.brokenDestructibles.includes(destructibleID) === false;
  const hardZIndex: HardZIndex = {
    value: 10001,
    type: ZIndexType.Hard
  };
  const width: number = 36;
  const height: number = 30;
  const offset: number = 4;
  drawImage("interact-hud", canDestroy ? 0 : width, 0, width, height, offset, gameHeight - height - offset, width, height, hardZIndex);
};

export default drawInteractHUD;