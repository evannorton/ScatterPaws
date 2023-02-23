import obstacleDuration from "../constants/obstacleDuration";
import state from "../state";

const isCootsInObstacle = (): boolean => state.hasHitObstacleAt() && state.currentTime - state.hitObstacleAt < obstacleDuration;

export default isCootsInObstacle;