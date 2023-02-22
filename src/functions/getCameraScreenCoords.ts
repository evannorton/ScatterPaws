import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import state from "../state";
import getTilemap from "./definables/getTilemap";

const getCameraScreenCoords = (): Coords => ({
  x: Math.floor(
    (gameWidth / 2)
    - (
      ((state.cootsCoords.x / unitsPerTile) * (getTilemap(state.level.tilemapSlug).tileWidth / 2))
      - ((state.cootsCoords.y / unitsPerTile) * (getTilemap(state.level.tilemapSlug).tileWidth / 2))
      - 1
    )
  ),
  y: Math.floor(
    (gameHeight / 2)
    - (
      ((state.cootsCoords.x / unitsPerTile) * (getTilemap(state.level.tilemapSlug).tileHeight / 2))
      + ((state.cootsCoords.y / unitsPerTile) * (getTilemap(state.level.tilemapSlug).tileHeight / 2))
      - 6
    )
  )
});

export default getCameraScreenCoords;