import gameHeight from "../constants/gameHeight";
import getCameraY from "./getCameraY";

const getDrawStartY = (): number => gameHeight / 2 - getCameraY();

export default getDrawStartY;