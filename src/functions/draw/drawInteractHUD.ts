import gameHeight from "../../constants/gameHeight";
import ZIndexType from "../../enums/ZIndexType";
import HardZIndex from "../../interfaces/ZIndex/HardZIndex";
import state from "../../state";
import drawImage from "./drawImage";

const drawInteractHUD = (): void => {
  if (state.tilemap.cootsIsNextToDestructable()) {
    const hardZIndex: HardZIndex = {
      value: 10001,
      type: ZIndexType.Hard
    };
    drawImage("interact-hud", 0, 0, 16, 16, 4, gameHeight - 20, 16, 16, hardZIndex);
  }
};

export default drawInteractHUD;