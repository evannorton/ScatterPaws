
import state from "../../state";
import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";

const update = (): void => {
  if (assetsAreLoaded()) {
    updateCootsVelocity();
    updateCootsPosition();
  }
};

export default update;