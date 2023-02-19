import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import state from "../state";

const getCootsCenterScreenCoords = (): Coords => state.tilemap.getCenterScreenCoordsOfTile(state.cootsCoords.x / unitsPerTile, state.cootsCoords.y / unitsPerTile);

export default getCootsCenterScreenCoords;