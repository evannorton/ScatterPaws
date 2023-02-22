import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import state from "../state";
import getTilemap from "./definables/getTilemap";

const getCootsScreenCoords = (): Coords => getTilemap(state.level.tilemapSlug).getScreenCoordsFromCoords(state.cootsCoords);

export default getCootsScreenCoords;