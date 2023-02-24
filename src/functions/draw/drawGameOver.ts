import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import state from "../../state";
import drawImage from "./drawImage";

const drawGameOver = (): void => {
  const frameDuration: number = 300;
  const frame = Math.floor(state.currentTime % (frameDuration * 3) / frameDuration);
  drawImage("game-over", 1, 0, frame * gameHeight, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight, null);
}

export default drawGameOver;