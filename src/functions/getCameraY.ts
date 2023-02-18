import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";

const getCameraY = (): number => {
  return ((state.cootsX / unitsPerTile) * (state.tilemap.tileHeight / 2))
    + ((state.cootsY / unitsPerTile) * (state.tilemap.tileHeight / 2))
    - 3;
};

export default getCameraY;