import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import gameWidth from "../../constants/gameWidth";
import timePerCootsFrame from "../../constants/timePerCootsFrame";
import state from "../../state";
import drawImage from "./drawImage";

const drawCoots = (): void => {
  const frame: number = Math.floor((state.currentTime % (timePerCootsFrame * 4)) / timePerCootsFrame);
  const sourceX: number = frame * cootsWidth;
  const sourceY: number = 0;
  const x: number = Math.floor(gameWidth / 2) - Math.floor(cootsWidth / 2);
  const y: number = 125;
  drawImage("coots", sourceX, sourceY, cootsWidth, cootsHeight, x, y, cootsWidth, cootsHeight);
};

export default drawCoots;