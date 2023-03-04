import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";

const sizeScreen = (): void => {
  const screen = document.getElementById("screen");
  if (screen) {

    const aspectRatio: number = gameWidth / gameHeight;
    const screenAspectRatio: number = window.innerWidth / window.innerHeight;
    const stretchedScale: number = aspectRatio >= screenAspectRatio
      ? window.innerWidth / gameWidth
      : window.innerHeight / gameHeight;
    screen.style.width = `${gameWidth * stretchedScale}px`;
    screen.style.height = `${gameHeight * stretchedScale}px`;
  }
}

export default sizeScreen;