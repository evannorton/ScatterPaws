import state from "../state";
import getRecentPausedTime from "./getRecentPausedTime";
import hasPausedSinceClaw from "./hasPausedSinceClaw";

const isClawOnCooldown = (): boolean => {
  if (state.hasRecentDestruction()) {
    let amount: number = state.currentTime - state.recentDestruction.clawedAt;
    if (hasPausedSinceClaw()) {
      amount -= getRecentPausedTime();
    }
    return amount < 1000
  }
  return false;
};

export default isClawOnCooldown;