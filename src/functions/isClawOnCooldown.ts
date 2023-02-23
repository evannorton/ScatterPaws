import state from "../state";

const isClawOnCooldown = (): boolean => state.hasRecentDestruction() && state.currentTime - state.recentDestruction.clawedAt < 1000;

export default isClawOnCooldown;