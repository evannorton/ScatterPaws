import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import Coords from "../interfaces/Coords";
import state from "../state";
import getCootsScreenCoords from "./getCootsScreenCoords";

const getLaserPower = (): number => {
  if (state.hasMouseScreenCoords()) {
    const cootsScreenCoords: Coords = getCootsScreenCoords();
    const distance: number = Math.sqrt(Math.pow(state.mouseScreenCoords.x - cootsScreenCoords.x, 2) + Math.pow(state.mouseScreenCoords.y - cootsScreenCoords.y, 2));
    const maxDistance: number = Math.min(gameWidth, gameHeight) / 2;
    return Math.min(distance / maxDistance, 1);
  }
  return 0;
};

export default getLaserPower;