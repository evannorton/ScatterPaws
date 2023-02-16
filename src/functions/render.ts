import state from "../state";

const render = (): void => {
  state.app.stage.removeChildren();
  state.app.stage.sortChildren();
  state.app.render();
};

export default render;