import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import state from "../../state";
import drawImage from "./drawImage";
import drawRectangle from "./drawRectangle";

const drawTitle = (): void => {
  drawRectangle("#e3c7b1", 1, 0, 0, gameWidth, gameHeight, 0);
  const frameDuration: number = 50;
  const xOffset = Math.floor((state.currentTime % (gameWidth / 2 * frameDuration)) / frameDuration);
  const yOffset = Math.floor((state.currentTime % (gameHeight * frameDuration)) / frameDuration);
  for (let x: number = 0; x < 3; x++) {
    for (let y: number = 0; y < 3; y++) {
      const renderX: number = xOffset + gameWidth / 2 * x - gameWidth / 2;
      const renderY = yOffset + gameHeight * y - gameHeight;
      drawImage("pattern", .25, 0, 0, gameWidth / 2, gameHeight, renderX, renderY, gameWidth / 2, gameHeight, null);
    }
  }
  drawImage("title", 1, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight, null);
  const pressed = document.getElementById("start-button")?.classList.contains("pressed") || false;
  drawImage("buttons/play", 1, 0, pressed ? 22 : 0, 74, 22, 73, 138, 74, 22, null);
}

export default drawTitle;