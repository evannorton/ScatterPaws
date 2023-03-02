import state from "../state";

const pause = (): void => {
  const screen = document.getElementById("screen");
  if (screen) {
    screen.classList.add("paused");
    const pauses = state.pauses;
    pauses.push(
      {
        pausedAt: state.currentTime,
        unpausedAt: null
      }
    );
    state.pauses = pauses;
  }
}

export default pause;