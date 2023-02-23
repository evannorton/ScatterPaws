import state from "../state";

const isCatStarving = (): boolean => state.activeDestructibleIDs.length > 0 && state.hasLevelStartedAt() && state.currentTime - state.levelStartedAt >= state.level.time;

export default isCatStarving;