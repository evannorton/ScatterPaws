import state from "../state";

const focusScreen = (): void => {
  state.app.renderer.view.focus();
};

export default focusScreen;