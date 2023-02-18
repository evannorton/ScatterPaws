import state from "../state";

const update = (): void => {
  if (state.hasMouseX() && state.hasMouseY()) {
    console.log(`handle laser pointer at ${state.mouseX} ${state.mouseY}`);
  }
};

export default update;