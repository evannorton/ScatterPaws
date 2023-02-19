import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import state from "../state";

const getCootsCenterScreenCoords = (): Coords => state.tilemap.getCenterScreenCoordsOfTile(state.cootsX / unitsPerTile, state.cootsY / unitsPerTile);

export default getCootsCenterScreenCoords;