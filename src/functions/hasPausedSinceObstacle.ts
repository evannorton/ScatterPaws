import state from "../state";

const hasPausedSinceObstacle = (): boolean => {
  if (state.pauses.length > 0) {
    return state.pauses[state.pauses.length - 1].pausedAt >= state.hitObstacleAt;
  }
  return false;
};

export default hasPausedSinceObstacle;