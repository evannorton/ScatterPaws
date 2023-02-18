import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (state.hasMouseX() && state.hasMouseY()) {
      console.log(`handle laser pointer at ${state.mouseX} ${state.mouseY}`);
    }
  }
};

export default update;