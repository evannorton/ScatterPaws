import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import getAudioSourcesCount from "./definables/getAudioSourcesCount";
import getImageSourcesCount from "./definables/getImageSourcesCount";
import drawCoots from "./draw/drawCoots";
import drawRectangle from "./draw/drawRectangle";
import drawInteractHUD from "./draw/drawInteractHUD";

const render = (): void => {
  state.app.stage.removeChildren();
  drawRectangle("#000000", 0, 0, gameWidth, gameHeight);
  if (assetsAreLoaded()) {
    state.tilemap.draw();
    drawCoots();
    drawInteractHUD();
  }
  else {
    const current: number = state.loadedAssets;
    const total: number = getImageSourcesCount() + getAudioSourcesCount();
    const percent: number = current / total;
    const width: number = 192;
    const x: number = (gameWidth - width) / 2;
    const height: number = 32;
    const y: number = (gameHeight - height) / 2;
    drawRectangle("#343434", x, y, width, height);
    drawRectangle("#7b7b7b", x, y, Math.round(width * percent), height);
  }
  const entryYs: Map<string, number> = new Map;
  for (const entry of state.ySortEntries) {
    entryYs.set(entry.id, Math.max(entry.sprite.y + entry.sprite.height / 2, 0))
  }
  for (const entry of state.ySortEntries) {
    const y = entryYs.get(entry.id);
    if (typeof y !== "undefined") {
      entry.sprite.zIndex = y;
    }
  }
  state.app.stage.sortChildren();
  state.app.render();
  state.ySortEntries = [];
};

export default render;