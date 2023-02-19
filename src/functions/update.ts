import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (state.hasMouseCoords()) {
      console.log(`handle laser pointer at ${state.mouseCoords.x} ${state.mouseCoords.y}`);
    }
  }
};

export default update;