import state from "../state";

const levelIsCompleted = (): boolean => state.brokenDestructibleIDs.length === state.level.requiredDestructibles;

export default levelIsCompleted;