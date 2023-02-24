import state from "../state";
import levelIsCompleted from "./levelIsCompleted";

const isCatStarving = (): boolean => levelIsCompleted() === false && state.hasLevelStartedAt() && state.hasLevelStartedAt() && state.currentTime - state.levelStartedAt >= state.level.time;

export default isCatStarving;