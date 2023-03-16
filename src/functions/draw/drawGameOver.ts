import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import state from "../../state";
import drawImage from "./drawImage";

const drawGameOver = (): void => {
  const frameDuration: number = 300;
  const frame = Math.floor(state.currentTime % (frameDuration * 3) / frameDuration);
  drawImage("game-over", 1, 0, frame * gameHeight, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight, null);
  const pressed = document.getElementById("defeat-button")?.classList.contains("pressed") || false;
  drawImage("buttons/game-over", 1, 0, pressed ? 21 : 0, 73, 21, 124, 51, 73, 21, null);
}

export default drawGameOver;