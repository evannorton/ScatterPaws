import { Application, Loader, SCALE_MODES, settings, utils } from "pixi.js";
import define from "./define";
import socket from "../socket";
import state from "../state";
import tick from "./tick";
import gameWidth from "../constants/gameWidth";
import gameHeight from "../constants/gameHeight";
import gameScale from "../constants/gameScale";
import getAudioSource from "./definables/getAudioSource";
import focusScreen from "./focusScreen";
import isRunningOnLocal from "./isRunningOnLocal";
import handleAction from "./handleAction";

const run = async (): Promise<void> => {
  console.log(`Running ScatterPaws.`);
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
  state.app.renderer.view.addEventListener("contextmenu", (e: Event): void => {
    e.preventDefault();
  });
  const loader: Loader = new Loader;
  loader.add(isRunningOnLocal() ? "./out/fonts/RetroPixels.fnt" : "./fonts/RetroPixels.fnt").load((): void => {
    state.loadedAssets++;
  });
  state.app.ticker.add(tick);
  const screen = document.getElementById("screen");
  if (screen) {
    screen.appendChild(state.app.view);
    screen.style.width = `${gameWidth * gameScale}px`;
    screen.style.height = `${gameHeight * gameScale}px`;
    screen.addEventListener("mousedown", () => {
      handleAction();
    });
    screen.addEventListener("mousemove", (e) => {
      if (e.target instanceof HTMLElement) {
        state.mouseScreenCoords = {
          x: Math.round(e.offsetX / e.target.offsetWidth * gameWidth),
          y: Math.round(e.offsetY / e.target.offsetHeight * gameHeight)
        }
      }
    });
    screen.addEventListener("keydown", (e) => {
      const key: string = e.key.toLowerCase();
      const heldKeys: string[] = state.heldKeys;
      if (heldKeys.includes(key) === false) {
        heldKeys.push(key);
        switch (key) {
          case "p": {
            const anchor: HTMLAnchorElement = document.createElement("a");
            anchor.download = "ScatterPaws Screenshot.png";
            anchor.href = state.app.renderer.plugins.extract.canvas(state.app.stage).toDataURL();
            anchor.click();
            break;
          }
          case "m": {
            getAudioSource("noises/meow").play(null, null);
            break;
          }
          case " ": {
            handleAction();
            break;
          }
        }
      }
      state.heldKeys = heldKeys;
    });
    screen.addEventListener("keyup", (e) => {
      const key: string = e.key.toLowerCase();
      const heldKeys: string[] = state.heldKeys;
      const index = heldKeys.indexOf(key);
      if (index >= 0) {
        heldKeys.splice(index, 1);
      }
      state.heldKeys = heldKeys;
    });
  }
  if (socket) {
    socket.on("run-id", (runID: string) => {
      if (document.body.dataset.runId !== runID) {
        location.reload();
      }
    });
  }
  focusScreen();
};

export default run;
