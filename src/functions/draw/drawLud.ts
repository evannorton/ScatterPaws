import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import drawImage from "./drawImage";

const drawLud = (): void => {
  drawImage("lud", 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight);
}

export default drawLud;