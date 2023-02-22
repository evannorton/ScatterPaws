import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import isCatStarving from "../isCatStarving";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (isCatStarving() === false) {
      updateCootsVelocity();
      updateCootsPosition();
    }
  }
};

export default update;