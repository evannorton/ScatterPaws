import state from "../state";

const levelIsBeaten = (): boolean => state.brokenDestructibleIDs.length === state.level.requiredDestructibles;

export default levelIsBeaten;