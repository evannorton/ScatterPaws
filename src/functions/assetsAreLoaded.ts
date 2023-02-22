import getImageSourcesCount from "./definables/getImageSourcesCount";
import state from "../state";
import getAudioSourcesCount from "./definables/getAudioSourcesCount";

const assetsAreLoaded = (): boolean => state.loadedAssets === getImageSourcesCount() + getAudioSourcesCount() + 1;

export default assetsAreLoaded;