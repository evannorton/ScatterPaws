import state from "../state";

const isCatStarving = (): boolean => state.hasLevelStartedAt() && state.currentTime - state.levelStartedAt >= state.level.time;

export default isCatStarving;