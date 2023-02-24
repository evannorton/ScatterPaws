import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import gameIsOngoing from "../gameIsOngoing";
import isCatStarving from "../isCatStarving";
import getAudioSources from "../definables/getAudioSources";
import AudioSource from "../../classes/AudioSource";
import state from "../../state";
import levelIsCompleted from "../levelIsCompleted";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (gameIsOngoing()) {
      if (levelIsCompleted()) {
        document.getElementById("screen")?.classList.add("level");
      }
      else {
        updateCootsVelocity();
        updateCootsPosition();
      }
    }
    else if (isCatStarving()) {
      document.getElementById("screen")?.classList.add("defeat");
      getAudioSources().forEach((audioSource: AudioSource): void => {
        audioSource.cancelOnEnds();
      });
    }
    else if (state.won) {
      document.getElementById("screen")?.classList.add("victory");
    }
  }
};

export default update;