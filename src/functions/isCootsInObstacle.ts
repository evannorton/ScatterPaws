import obstacleDuration from "../constants/obstacleDuration";
import state from "../state";
import getRecentPausedTime from "./getRecentPausedTime";
import hasPausedSinceObstacle from "./hasPausedSinceObstacle";

const isCootsInObstacle = (): boolean => {
  if (state.hasHitObstacleAt()) {
    let amount: number = state.currentTime - state.hitObstacleAt;
    if (hasPausedSinceObstacle()) {
      amount -= getRecentPausedTime();
    }
    return amount < obstacleDuration;
  }
  return false;
};

export default isCootsInObstacle;