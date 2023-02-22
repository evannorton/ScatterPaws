import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import drawImage from "./drawImage";

const drawVictory = (): void => {
  drawImage("victory", 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight, null);
}

export default drawVictory;