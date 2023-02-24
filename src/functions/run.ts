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
import credits from "../constants/credits";
import assetsAreLoaded from "./assetsAreLoaded";

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
    if (assetsAreLoaded()) {
      document.getElementById("screen")?.classList.remove("loading");
      document.getElementById("screen")?.classList.add("focus");
    }
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
    for (const credit of credits) {
      const element = document.createElement("a");
      element.href = credit.link;
      element.target = "_blank";
      screen.appendChild(element);
      element.style.position = "absolute";
      element.style.left = `${credit.x * gameScale}px`;
      element.style.top = `${credit.y * gameScale}px`;
      element.style.width = `${credit.width * gameScale}px`;
      element.style.height = `${credit.height * gameScale}px`;
      element.className = "credit";
    }
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
