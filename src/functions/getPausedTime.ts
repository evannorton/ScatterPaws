import state from "../state";

const getPausedTime = (): number => {
  let time: number = 0;
  state.pauses.forEach((pause): void => {
    if (pause.unpausedAt === null) {
      time += state.currentTime - pause.pausedAt;
    }
    else {
      time += pause.unpausedAt - pause.pausedAt;
    }
  });
  return time;
}

export default getPausedTime;