import Direction from "../enums/Direction";
import Coords from "../interfaces/Coords";
import state from "../state";
import getCootsCenterScreenCoords from "./getCootsCenterScreenCoords";

const getCootsDirection = (): Direction => {
  if (state.hasMouseScreenCoords()) {
    const centerScreenCoords: Coords = getCootsCenterScreenCoords();
    const right: boolean = state.mouseScreenCoords.x > centerScreenCoords.x;
    const up: boolean = state.mouseScreenCoords.y < centerScreenCoords.y;
    if (up && right) {
      return Direction.UpRight
    }
    if (up && right === false) {
      return Direction.UpLeft;
    }
    if (up === false && right) {
      return Direction.DownRight
    }
    if (up === false && right === false) {
      return Direction.DownLeft;
    }
  }
  return Direction.DownLeft;
}

export default getCootsDirection;