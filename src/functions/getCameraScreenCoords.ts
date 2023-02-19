import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import state from "../state";

const getCameraScreenCoords = (): Coords => ({
  x: (gameWidth / 2)
    - (
      ((state.cootsCoords.x / unitsPerTile) * (state.tilemap.tileWidth / 2))
      - ((state.cootsCoords.y / unitsPerTile) * (state.tilemap.tileWidth / 2))
      - 1
    ),
  y: (gameHeight / 2)
    - (
      ((state.cootsCoords.x / unitsPerTile) * (state.tilemap.tileHeight / 2))
      + ((state.cootsCoords.y / unitsPerTile) * (state.tilemap.tileHeight / 2))
      - 3
    )
});

export default getCameraScreenCoords;