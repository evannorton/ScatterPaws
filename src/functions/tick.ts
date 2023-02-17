import render from "./render";
import state from "../state";
import update from "./update";

const tick = (): void => {
  if (document.getElementById("screen")?.classList.contains("lasering") && state.hasMouseX() && state.hasMouseY()) {
    console.log(`handle laser pointer at ${state.mouseX} ${state.mouseY}`);
  }
  state.currentTime += state.app.ticker.deltaMS;
  update();
  render();
};

export default tick;