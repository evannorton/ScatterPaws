import Coords from "../interfaces/Coords";
import state from "../state";
import getTilemap from "./definables/getTilemap";

const getMouseCoords = (): Coords => getTilemap(state.level.tilemapSlug).getCoordsFromScreenCoords(state.mouseScreenCoords);

export default getMouseCoords;