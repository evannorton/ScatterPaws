import state from "../state";

const isClawOnCooldown = (): boolean => state.hasClawedAt() && state.currentTime - state.clawedAt < 1000;

export default isClawOnCooldown;