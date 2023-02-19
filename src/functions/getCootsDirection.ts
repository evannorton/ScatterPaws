import Direction from "../enums/Direction";
import state from "../state";
import getCootsCenterScreenX from "./getCootsCenterScreenX";
import getCootsCenterScreenY from "./getCootsCenterScreenY";

const getCootsDirection = (): Direction => {
  if (state.hasMouseX() && state.hasMouseY()) {
    const right: boolean = state.mouseX > getCootsCenterScreenX();
    const up: boolean = state.mouseY < getCootsCenterScreenY();
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