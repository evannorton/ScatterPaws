import cootsMaxVelocity from "../../constants/cootsMaxVelocity";
import walkingThreshold from "../../constants/walkingThreshold";
import Coords from "../../interfaces/Coords";
import state from "../../state";
import getLaserPower from "../getLaserPower";
import getMouseCoords from "../getMouseCoords";

const updateCootsVelocity = (): void => {
  if (state.hasMouseScreenCoords()) {
    const mouseCoords: Coords = getMouseCoords();
    const diffX: number = mouseCoords.x - state.cootsCoords.x;
    const diffY: number = mouseCoords.y - state.cootsCoords.y;
    const angle: number = Math.atan2(diffY, diffX);
    const xVector: number = Math.cos(angle);
    const yVector: number = Math.sin(angle);
    // Increase velocity based on laser pointer
    const laserPower: number = getLaserPower();
    if (laserPower >= walkingThreshold) {
      const multiplier: number = (
        cootsMaxVelocity
        * (state.app.ticker.deltaMS / 1000)
        * laserPower
      );
      state.cootsVelocityX += xVector * multiplier;
      state.cootsVelocityY += yVector * multiplier;
    }
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