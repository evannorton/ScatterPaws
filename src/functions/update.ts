import Coords from "../interfaces/Coords";
import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (state.hasMouseScreenCoords()) {
      const mouseCoords: Coords = state.tilemap.getCoordsFromScreenCoords(state.mouseScreenCoords);
      console.log(`coots at ${state.cootsCoords.x} ${state.cootsCoords.y} | as laser pointer at ${mouseCoords.x} ${mouseCoords.y}`);
    }
  }
};

export default update;