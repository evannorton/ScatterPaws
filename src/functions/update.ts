import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (state.hasMouseScreenCoords()) {
      console.log(`handle laser pointer at ${state.mouseScreenCoords.x} ${state.mouseScreenCoords.y}`);
    }
  }
};

export default update;