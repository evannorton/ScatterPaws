import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";

const getCameraX = (): number => {
  return ((state.cootsX / unitsPerTile) * (state.tilemap.tileWidth / 2))
    - ((state.cootsY / unitsPerTile) * (state.tilemap.tileWidth / 2))
    - 1
};

export default getCameraX;