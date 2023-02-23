import AudioSource from "../classes/AudioSource";
import levels from "../constants/levels";
import state from "../state";
import attemptScratch from "./attemptScratch";
import getAudioSource from "./definables/getAudioSource";
import isCatStarving from "./isCatStarving";
import startLevel from "./startLevel";

const handleAction = (): void => {
  if (state.isAtTitle) {
    state.isAtTitle = false;
    const music: AudioSource = getAudioSource("music/music");
    music.play(132000, null, null);
    startLevel();
  }
  else if (isCatStarving()) {
    startLevel();
  }
  else if (state.activeDestructibleIDs.length === 0) {
    const levelIndex = levels.findIndex((level) => level === state.level);
    const newLevel = levels[levelIndex + 1];
    if (newLevel) {
      state.level = newLevel;
      startLevel();
    }
    else {
      state.won = true;
    }
  }
  else {
    attemptScratch();
  }
}

export default handleAction;