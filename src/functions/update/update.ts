import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import isCatStarving from "../isCatStarving";
import state from "../../state";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (isCatStarving() === false && state.won === false) {
      updateCootsVelocity();
      updateCootsPosition();
    }
  }
};

export default update;