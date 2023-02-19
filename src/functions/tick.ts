import render from "./render";
import state from "../state";
import update from "./update/update";

const tick = (): void => {
  state.currentTime += state.app.ticker.deltaMS;
  update();
  render();
};

export default tick;