import { Application, SCALE_MODES, settings, utils } from "pixi.js";
import socket from "../socket";
import state from "../state";
import tick from "./tick";

const run = async (): Promise<void> => {
  console.log(`Running coots game.`);
  settings.ROUND_PIXELS = true;
  settings.SCALE_MODE = SCALE_MODES.NEAREST;
  utils.skipHello();
  state.app = new Application({
    backgroundAlpha: 0,
    height: 240,
    width: 304
  });
  state.app.renderer.view.style.display = "block";
  state.app.renderer.view.style.height = "100%";
  state.app.renderer.view.style.width = "100%";
  state.app.renderer.view.tabIndex = 0;
  socket.on("run-id", (runID: string) => {
    if (document.body.dataset.runId !== runID) {
      location.reload();
    }
  });
  state.app.ticker.add(tick);
  document.getElementById("screen")?.appendChild(state.app.view);
};

export default run;