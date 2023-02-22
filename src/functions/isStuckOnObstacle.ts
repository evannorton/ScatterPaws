import obstacleDuration from "../constants/obstacleDuration";
import state from "../state";

const isStuckOnObstacle = (): boolean => state.hasHitObstacleAt() && state.currentTime - state.hitObstacleAt < obstacleDuration;

export default isStuckOnObstacle;