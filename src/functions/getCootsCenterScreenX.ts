import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";

const getCootsCenterScreenX = (): number => state.tilemap.getCenterScreenXOfTile(state.cootsX / unitsPerTile, state.cootsY / unitsPerTile);

export default getCootsCenterScreenX;