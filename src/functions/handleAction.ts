import AudioSource from "../classes/AudioSource";
import levels from "../constants/levels";
import state from "../state";
import attemptScratch from "./attemptScratch";
import getAudioSource from "./definables/getAudioSource";
import isCatStarving from "./isCatStarving";
import levelIsCompleted from "./levelIsCompleted";
import startLevel from "./startLevel";

const handleAction = (): void => {
  if (state.won === false) {
    if (state.isAwaitingFocus) {
      document.getElementById("screen")?.classList.remove("focus");
      document.getElementById("screen")?.classList.add("title");
      const titleMusic: AudioSource = getAudioSource("music/title");
      titleMusic.play(null, null);
      state.isAwaitingFocus = false;
      state.isAtTitle = true;
    }
    else if (state.isAtTitle) {
      document.getElementById("screen")?.classList.remove("title");
      const titleMusic: AudioSource = getAudioSource("music/title");
      const mainMusic: AudioSource = getAudioSource("music/main");
      state.isAtTitle = false;
      titleMusic.stop();
      // mainMusic.play(null, null);
      startLevel();
    }
    else if (isCatStarving()) {
      const mainMusic = getAudioSource("music/main");
      const defeatMusic = getAudioSource("music/defeat");
      defeatMusic.stop();
      mainMusic.play(null, null);
      document.getElementById("screen")?.classList.remove("defeat");
      startLevel();
    }
    else if (levelIsCompleted()) {
      const mainMusic = getAudioSource("music/main");
      document.getElementById("screen")?.classList.remove("level");
      const levelIndex = levels.findIndex((level) => level === state.level);
      const newLevel = levels[levelIndex + 1];
      const levelMusic: AudioSource = getAudioSource("music/level");
      levelMusic.stop();
      if (newLevel) {
        mainMusic.play(null, null);
        state.level = newLevel;
        startLevel();
      }
      else {
        const victoryMusic = getAudioSource("music/victory");
        victoryMusic.play(null, null);
        state.won = true;
      }
    }
    else if (state.isInBed) {
      getAudioSource("noises/meow").play(null, null);
      state.isInBed = false;
      state.levelStartedAt = state.currentTime;
    }
    else {
      attemptScratch();
    }
  }
}

export default handleAction;