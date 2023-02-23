import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import gameIsOngoing from "../gameIsOngoing";
import isCatStarving from "../isCatStarving";
import getAudioSources from "../definables/getAudioSources";
import AudioSource from "../../classes/AudioSource";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (gameIsOngoing()) {
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