import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import state from "../state";

const getCootsScreenCoords = (): Coords => state.tilemap.getScreenCoordsFromCoords(state.cootsCoords);

export default getCootsScreenCoords;