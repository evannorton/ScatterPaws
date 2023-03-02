import Pause from "../interfaces/Pause";
import state from "../state";
import focusScreen from "./focusScreen";

const unpause = (): void => {
  const screen = document.getElementById("screen");
  if (screen) {
    screen.classList.remove("paused");
    const pauses = state.pauses.map((pause: Pause): Pause => ({
      pausedAt: pause.pausedAt,
      unpausedAt: pause.unpausedAt === null ? state.currentTime : pause.unpausedAt
    }));
    state.pauses = pauses;
    focusScreen();
  }
}

export default unpause;