import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import drawImage from "./drawImage";

const drawGameOver = (): void => {
  drawImage("game-over", 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight, null);
}

export default drawGameOver;