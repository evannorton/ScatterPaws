import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import drawLud from "./draw/drawLud";

const render = (): void => {
  if (assetsAreLoaded()) {
    state.app.stage.removeChildren();
    drawLud();
    state.app.stage.sortChildren();
    state.app.render();
  }
};

export default render;