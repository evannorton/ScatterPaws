import cootsMaxVelocity from "../../constants/cootsMaxVelocity";
import gameHeight from "../../constants/gameHeight";
import gameWidth from "../../constants/gameWidth";
import Coords from "../../interfaces/Coords";
import state from "../../state";
import getMouseCoords from "../getMouseCoords";

const updateCootsVelocity = (): void => {
  if (state.hasMouseScreenCoords()) {
    const mouseCoords: Coords = state.mouseScreenCoords;
    const diffX: number = (mouseCoords.x - gameWidth / 2) * (gameHeight / gameWidth);
    const diffY: number = 2 * (mouseCoords.y - gameHeight / 2) * (gameHeight / gameHeight);
    const angle: number = Math.atan2(diffY, diffX);
    const minDist: number = 15; // Minimum cursor distance for lowest speed
    const maxDist: number = gameHeight / 2 - 10; // Maximum cursor distance for highest speed
    const magnitude: number = (Math.max(minDist, Math.min(Math.hypot(diffX, diffY), maxDist)) - minDist) / (maxDist - minDist);
    const xVector: number = Math.cos(angle);
    const yVector: number = Math.sin(angle);
    const dir: Coords = { x: magnitude * (xVector + 0.5 * yVector), y: magnitude * (-xVector + 0.5 * yVector) };
    const maxVel: number = (1 - magnitude) * (0) + magnitude * (cootsMaxVelocity); // Scale max velocity based on pointer distance

    // Increase velocity based on laser pointer
    state.cootsVelocityX += (
      dir.x
      * (maxVel * 2.5)
      * (state.app.ticker.deltaMS / 1000)
    );
    state.cootsVelocityY += (
      dir.y
      * (maxVel * 2.5)
      * (state.app.ticker.deltaMS / 1000)
    );

    // Cap velocity at max
    const speedSquared = state.cootsVelocityX ** 2 + state.cootsVelocityY ** 2;

    if (speedSquared > maxVel ** 2) {
      const velScaleFactor = maxVel / Math.sqrt(speedSquared);
      // Interpolate towards desired velocity
      state.cootsVelocityX = 0.9 * state.cootsVelocityX + 0.1 * (velScaleFactor * state.cootsVelocityX);
      state.cootsVelocityY = 0.9 * state.cootsVelocityY + 0.1 * (velScaleFactor * state.cootsVelocityY);
    }

    // Decay
    state.cootsVelocityX *= 0.99;
    state.cootsVelocityY *= 0.99;

    if (Math.random() < 0.005) {
      console.log(state.cootsVelocityX, state.cootsVelocityY);
    }
  }
}

export default updateCootsVelocity;