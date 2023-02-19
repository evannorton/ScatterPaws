import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";

const getCootsCenterScreenY = (): number => state.tilemap.getCenterScreenYOfTile(state.cootsX / unitsPerTile, state.cootsY / unitsPerTile);

export default getCootsCenterScreenY;