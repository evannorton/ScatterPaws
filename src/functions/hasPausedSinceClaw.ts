import state from "../state";

const hasPausedSinceClaw = (): boolean => {
  if (state.pauses.length > 0) {
    return state.pauses[state.pauses.length - 1].pausedAt >= state.recentDestruction.clawedAt;
  }
  return false;
};

export default hasPausedSinceClaw;