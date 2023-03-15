import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import drawImage from "./drawImage";

const drawVictory = (): void => {
  drawImage("victory", 1, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight, null);
  drawImage("buttons/again", 1, 0, 0, 74, 22, 108, 148, 74, 22, null);
}

export default drawVictory;