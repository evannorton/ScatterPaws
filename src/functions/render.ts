import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import getAudioSourcesCount from "./definables/getAudioSourcesCount";
import getImageSourcesCount from "./definables/getImageSourcesCount";
import drawCoots from "./draw/drawCoots";
import drawRectangle from "./draw/drawRectangle";
import drawInteractHUD from "./draw/drawInteractHUD";
import drawTimer from "./draw/drawTimer";
import isCatStarving from "./isCatStarving";
import drawGameOver from "./draw/drawGameOver";
import getTilemap from "./definables/getTilemap";
import drawVictory from "./draw/drawVictory";
import drawTitle from "./draw/drawTitle";
import levels from "../constants/levels";
import drawTutorialHUD from "./drawTutorialHUD";
import gameIsOngoing from "./gameIsOngoing";
import drawLevelCompleteHUD from "./drawLevelCompleteHUD";

const render = (): void => {
  state.app.stage.removeChildren();
  drawRectangle("#000000", 1, 0, 0, gameWidth, gameHeight, 0);
  if (assetsAreLoaded()) {
    if (state.isAtTitle) {
      drawTitle();
    }
    else if (state.won) {
      drawVictory();
    }
    else if (isCatStarving()) {
      drawGameOver();
    }
    else if (gameIsOngoing()) {
      getTilemap(state.level.tilemapSlug).draw();
      if (state.activeDestructibleIDs.length === 0) {
        drawLevelCompleteHUD();
      }
      else {
        drawCoots();
        drawInteractHUD();
        if (state.level === levels[0]) {
          drawTutorialHUD();
        }
        drawTimer();
      }
    }
  }
  else {
    const current: number = state.loadedAssets;
    const total: number = getImageSourcesCount() + getAudioSourcesCount() + 1;
    const percent: number = current / total;
    const width: number = 192;
    const x: number = (gameWidth - width) / 2;
    const height: number = 32;
    const y: number = (gameHeight - height) / 2;
    drawRectangle("#343434", 1, x, y, width, height, 0);
    drawRectangle("#7b7b7b", 1, x, y, Math.round(width * percent), height, 0);
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