import cootsMaxVelocity from "../../constants/cootsMaxVelocity";
import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import Coords from "../../interfaces/Coords";
import state from "../../state";
import getCootsScreenCoords from "../getCootsScreenCoords";
import getMouseCoords from "../getMouseCoords";

const updateCootsVelocity = (): void => {
  if (state.hasMouseScreenCoords()) {
    const cootsScreenCoords: Coords = getCootsScreenCoords();
    const mouseCoords: Coords = getMouseCoords();
    const diffX: number = mouseCoords.x - state.cootsCoords.x;
    const diffY: number = mouseCoords.y - state.cootsCoords.y;
    const angle: number = Math.atan2(diffY, diffX);
    const xVector: number = Math.cos(angle);
    const yVector: number = Math.sin(angle);
    const distance: number = Math.sqrt(Math.pow(state.mouseScreenCoords.x - cootsScreenCoords.x, 2) + Math.pow(state.mouseScreenCoords.y - cootsScreenCoords.y, 2));
    const maxDistance: number = Math.min(gameWidth, gameHeight) / 2;
    // Increase velocity based on laser pointer
    const multiplier: number = (
      cootsMaxVelocity
      * (state.app.ticker.deltaMS / 1000)
      * Math.min(distance / maxDistance, 1)
    );
    state.cootsVelocityX += xVector * multiplier;
    state.cootsVelocityY += yVector * multiplier;
    // Decay
    // TODO
    // Cap velocity at max
    if (state.cootsVelocityX > cootsMaxVelocity) {
      state.cootsVelocityX = cootsMaxVelocity;
    }
    if (state.cootsVelocityX < -cootsMaxVelocity) {
      state.cootsVelocityX = -cootsMaxVelocity;
    }
    if (state.cootsVelocityY > cootsMaxVelocity) {
      state.cootsVelocityY = cootsMaxVelocity;
    }
    if (state.cootsVelocityY < -cootsMaxVelocity) {
      state.cootsVelocityY = -cootsMaxVelocity;
    }
  }
}

export default updateCootsVelocity;