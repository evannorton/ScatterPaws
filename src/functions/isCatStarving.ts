import timePerLevel from "../constants/timePerLevel";
import state from "../state";

const isCatStarving = (): boolean => state.hasLevelStartedAt() && state.currentTime - state.levelStartedAt >= timePerLevel;

export default isCatStarving;