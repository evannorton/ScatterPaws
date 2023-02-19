import Direction from "../enums/Direction";
import Coords from "../interfaces/Coords";
import state from "../state";
import getCootsCenterScreenCoords from "./getCootsCenterScreenCoords";

const getCootsDirection = (): Direction => {
  if (state.hasMouseCoords()) {
    const centerScreenCoords: Coords = getCootsCenterScreenCoords();
    const right: boolean = state.mouseCoords.x > centerScreenCoords.x;
    const up: boolean = state.mouseCoords.y < centerScreenCoords.y;
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