import assetsAreLoaded from "../assetsAreLoaded";
import updateCootsVelocity from "./updateCootsVelocity";
import updateCootsPosition from "./updateCootsPosition";
import gameIsOngoing from "../gameIsOngoing";
import isCatStarving from "../isCatStarving";
import getAudioSources from "../definables/getAudioSources";
import AudioSource from "../../classes/AudioSource";
import state from "../../state";

const update = (): void => {
  if (assetsAreLoaded()) {
    if (gameIsOngoing() && state.activeDestructibleIDs.length > 0) {
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