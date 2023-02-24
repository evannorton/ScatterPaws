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
    if (state.isAtTitle) {
      document.getElementById("screen")?.classList.remove("title");
      const titleMusic: AudioSource = getAudioSource("music/title");
      const mainMusic: AudioSource = getAudioSource("music/main");
      state.isAtTitle = false;
      titleMusic.stop();
      mainMusic.play(null, null);
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
      document.getElementById("screen")?.classList.remove("level");
      const levelIndex = levels.findIndex((level) => level === state.level);
      const newLevel = levels[levelIndex + 1];
      if (newLevel) {
        state.level = newLevel;
        startLevel();
      }
      else {
        const mainMusic = getAudioSource("music/main");
        const victoryMusic = getAudioSource("music/victory");
        mainMusic.stop();
        victoryMusic.play(null, null);
        state.won = true;
      }
    }
    else {
      attemptScratch();
    }
  }
}

export default handleAction;