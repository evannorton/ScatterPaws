import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import timePerCootsFrame from "../../constants/timePerCootsFrame";
import unitsPerTile from "../../constants/unitsPerTile";
import state from "../../state";
import drawImage from "./drawImage";
import drawRectangle from "./drawRectangle";

const drawCoots = (): void => {
  const frame: number = Math.floor((state.currentTime % (timePerCootsFrame * 4)) / timePerCootsFrame);
  const sourceX: number = frame * cootsWidth;
  const sourceY: number = 0;
  const tileX: number = state.cootsX / unitsPerTile;
  const tileY: number = state.cootsY / unitsPerTile;
  const tileCenterScreenX: number = state.tilemap.getCenterScreenXOfTile(tileX, tileY);
  const tileCenterScreenY: number = state.tilemap.getCenterScreenYOfTile(tileX, tileY);
  drawImage("coots", sourceX, sourceY, cootsWidth, cootsHeight, tileCenterScreenX - 9, tileCenterScreenY - 16, cootsWidth, cootsHeight);
  drawRectangle("#e03c28", tileCenterScreenX, tileCenterScreenY, 1, 1)
};

export default drawCoots;