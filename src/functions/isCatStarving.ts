import state from "../state";
import getPausedTime from "./getPausedTime";
import levelIsCompleted from "./levelIsCompleted";

const isCatStarving = (): boolean => levelIsCompleted() === false && state.hasLevelStartedAt() && state.hasLevelStartedAt() && state.currentTime - state.levelStartedAt - getPausedTime() >= state.level.time;

export default isCatStarving;