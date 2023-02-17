import { Application, SCALE_MODES, settings, utils } from "pixi.js";
import define from "./define";
import socket from "../socket";
import state from "../state";
import tick from "./tick";
import gameWidth from "../constants/gameWidth";
import gameHeight from "../constants/gameHeight";

const run = async (): Promise<void> => {
  console.log(`Running coots game.`);
  define();
  settings.ROUND_PIXELS = true;
  settings.SCALE_MODE = SCALE_MODES.NEAREST;
  utils.skipHello();
  state.app = new Application({
    backgroundAlpha: 0,
    height: gameHeight,
    width: gameWidth
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
  state.app.view.style.width = `${gameWidth}px`;
  state.app.view.style.height = `${gameHeight}px`;
  document.getElementById("screen")?.addEventListener("mousedown", () => {
    document.getElementById("screen")?.classList.add("lasering")
  });
  document.getElementById("screen")?.addEventListener("mouseup", () => {
    document.getElementById("screen")?.classList.remove("lasering")
  });
  document.getElementById("screen")?.addEventListener("focusout", () => {
    document.getElementById("screen")?.classList.remove("lasering")
  });
  document.getElementById("screen")?.addEventListener("mouseleave", () => {
    document.getElementById("screen")?.classList.remove("lasering")
  });
};

export default run;