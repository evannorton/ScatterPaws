import { Application, Loader, SCALE_MODES, settings, utils } from "pixi.js";
import define from "./define";
import socket from "../socket";
import state from "../state";
import tick from "./tick";
import gameWidth from "../constants/gameWidth";
import gameHeight from "../constants/gameHeight";
import gameScale from "../constants/gameScale";
import AudioSource from "../classes/AudioSource";
import getAudioSource from "./definables/getAudioSource";
import focusScreen from "./focusScreen";
import calculateActiveDestructibles from "./calculateActiveDestructibles";
import isRunningOnLocal from "./isRunningOnLocal";
import isCatStarving from "./isCatStarving";
import startLevel from "./startLevel";
import levels from "../constants/levels";
import getTilemap from "./definables/getTilemap";

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
    screen.addEventListener("mousedown", (e) => {
      if (isCatStarving()) {
        startLevel();
      }
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
            anchor.download = "ScatterCat Screenshot.png";
            anchor.href = state.app.renderer.plugins.extract.canvas(state.app.stage).toDataURL();
            anchor.click();
            break;
          }
          case " ": {
            const destructibleID: string | null = getTilemap(state.level.tilemapSlug).getDestructibleIDWithinRange();
            if (destructibleID !== null) {
              const brokenDestructibles: string[] = state.brokenDestructibles;
              if (brokenDestructibles.includes(destructibleID) === false && state.activeDestructibles.includes(destructibleID)) {
                state.brokenDestructibles = [...brokenDestructibles, destructibleID];
                state.activeDestructibles = state.activeDestructibles.filter((activeDestructible) => activeDestructible !== destructibleID);
                calculateActiveDestructibles();
                if (state.activeDestructibles.length === 0) {
                  const levelIndex = levels.findIndex((level) => level === state.level);
                  const newLevel = levels[levelIndex + 1];
                  if (newLevel) {
                    state.level = newLevel;
                    startLevel();
                  }
                  else {
                    state.won = true;
                  }
                }
              }
            }
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
  const music: AudioSource = getAudioSource("music/music");
  music.play(0, null);
  socket.on("run-id", (runID: string) => {
    if (document.body.dataset.runId !== runID) {
      location.reload();
    }
  });
  focusScreen();
  startLevel();
};

export default run;