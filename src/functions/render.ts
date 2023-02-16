import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import drawCoots from "./draw/drawCoots";
import drawLud from "./draw/drawLud";

const render = (): void => {
  if (assetsAreLoaded()) {
    state.app.stage.removeChildren();
    drawLud();
    drawCoots();
    state.app.stage.sortChildren();
    state.app.render();
  }
};

export default render;