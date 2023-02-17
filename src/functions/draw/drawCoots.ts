import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import gameWidth from "../../constants/gameWidth";
import timePerCootsFrame from "../../constants/timePerCootsFrame";
import state from "../../state";
import drawImage from "./drawImage";

const drawCoots = (): void => {
  const frame: number = Math.floor((state.currentTime % (timePerCootsFrame * 4)) / timePerCootsFrame);
  drawImage("coots", frame * cootsWidth, 0, cootsWidth, cootsHeight, Math.floor(gameWidth / 2) - Math.floor(cootsWidth / 2), 125, cootsWidth, cootsHeight);
};

export default drawCoots;