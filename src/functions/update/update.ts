import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import gameIsOngoing from "../gameIsOngoing";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (gameIsOngoing()) {
      updateCootsVelocity();
      updateCootsPosition();
    }
  }
};

export default update;