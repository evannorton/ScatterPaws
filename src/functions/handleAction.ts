import AudioSource from "../classes/AudioSource";
import state from "../state";
import assetsAreLoaded from "./assetsAreLoaded";
import attemptScratch from "./attemptScratch";
import getAudioSource from "./definables/getAudioSource";
import isCatStarving from "./isCatStarving";
import levelIsCompleted from "./levelIsCompleted";
import startLevel from "./startLevel";

const handleAction = (): void => {
  if (state.won === false && assetsAreLoaded()) {
    if (state.isAwaitingFocus) {
      document.getElementById("screen")?.classList.remove("focus");
      document.getElementById("screen")?.classList.add("title");
      const titleMusic: AudioSource = getAudioSource("music/title");
      titleMusic.play(null, null);
      state.isAwaitingFocus = false;
      state.isAtTitle = true;
    }
    else if (state.isAtTitle) {

    }
    else if (isCatStarving()) {
    }
    else if (levelIsCompleted()) {

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