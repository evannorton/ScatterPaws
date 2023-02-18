import { Application, SCALE_MODES, settings, utils } from "pixi.js";
import define from "./define";
import socket from "../socket";
import state from "../state";
import tick from "./tick";
import gameWidth from "../constants/gameWidth";
import gameHeight from "../constants/gameHeight";
import gameScale from "../constants/gameScale";

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
  state.app.view.style.width = `${gameWidth * gameScale}px`;
  state.app.view.style.height = `${gameHeight * gameScale}px`;
  document.getElementById("screen")?.addEventListener("mousemove", (e) => {
    if (e.target instanceof HTMLElement) {
      state.mouseX = e.offsetX / e.target.offsetWidth * gameWidth;
      state.mouseY = e.offsetY / e.target.offsetHeight * gameHeight;
    }
  });
  document.getElementById("screen")?.addEventListener("keydown", (e) => {
    const key: string = e.key.toLowerCase();
    switch (key) {
      case "p": {
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.download = "Teleport Tower Screenshot.png";
        anchor.href = state.app.renderer.plugins.extract.canvas(state.app.stage).toDataURL();
        anchor.click();
      }
        break;
    }
  });
  state.app.renderer.view.addEventListener("contextmenu", (e: Event): void => {
    e.preventDefault();
  });
};

export default run;