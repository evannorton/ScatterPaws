import state from "../state";

const getRecentPausedTime = (): number => {
  let time: number = 0;
  if (state.pauses.length > 0) {
    const pause = state.pauses[state.pauses.length - 1];
    if (pause.unpausedAt === null) {
      time += state.currentTime - pause.pausedAt;
    }
    else {
      time += pause.unpausedAt - pause.pausedAt;
    }
  }
  return time;
}

export default getRecentPausedTime;