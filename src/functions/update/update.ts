import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import gameIsOngoing from "../gameIsOngoing";
import isCatStarving from "../isCatStarving";
import getAudioSources from "../definables/getAudioSources";
import AudioSource from "../../classes/AudioSource";
import state from "../../state";
import levelIsCompleted from "../levelIsCompleted";
import getAudioSource from "../definables/getAudioSource";
import isPaused from "../isPaused";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (gameIsOngoing()) {
      if (levelIsCompleted()) {
        const mainMusic: AudioSource = getAudioSource("music/main");
        const levelMusic: AudioSource = getAudioSource("music/level");
        if (levelMusic.isPlaying() === false && state.playedLevelMusic === false) {
          mainMusic.stop();
          levelMusic.play(null, null);
          state.playedLevelMusic = true;
        }
        document.getElementById("screen")?.classList.remove("main");
        document.getElementById("screen")?.classList.add("level");
      }
      else if (state.isInBed === false && isPaused() === false) {
        updateCootsVelocity();
        updateCootsPosition();
      }
    }
    else if (isCatStarving()) {
      document.getElementById("screen")?.classList.remove("main");
      document.getElementById("screen")?.classList.add("defeat");
      getAudioSources().forEach((audioSource: AudioSource): void => {
        audioSource.cancelOnEnds();
      });
      const mainMusic = getAudioSource("music/main");
      const defeatMusic = getAudioSource("music/defeat");
      if (mainMusic.isPlaying() && state.playedDefeatMusic === false) {
        mainMusic.stop();
        defeatMusic.play(null, null);
        state.playedDefeatMusic = true;
      }
    }
    else if (state.won) {
      document.getElementById("screen")?.classList.add("victory");
    }
  }
};

export default update;