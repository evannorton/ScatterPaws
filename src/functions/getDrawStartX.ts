import gameWidth from "../constants/gameWidth";
import getCameraX from "./getCameraX";

const getDrawStartX = (): number => gameWidth / 2 - getCameraX();

export default getDrawStartX;