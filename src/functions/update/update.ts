import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import gameIsOngoing from "../gameIsOngoing";
import isCatStarving from "../isCatStarving";
import getAudioSources from "../definables/getAudioSources";
import AudioSource from "../../classes/AudioSource";
import state from "../../state";
import levelIsBeaten from "../levelIsCompleted";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (gameIsOngoing() && levelIsBeaten() === false) {
      updateCootsVelocity();
      updateCootsPosition();
    }
    else if (isCatStarving()) {
      getAudioSources().forEach((audioSource: AudioSource): void => {
        audioSource.cancelOnEnds();
      });
    }
  }
};

export default update;