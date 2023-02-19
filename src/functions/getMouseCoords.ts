import Coords from "../interfaces/Coords";
import state from "../state";

const getMouseCoords = (): Coords => state.tilemap.getCoordsFromScreenCoords(state.mouseScreenCoords);

export default getMouseCoords;