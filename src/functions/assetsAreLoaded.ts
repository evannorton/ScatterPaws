import getAudioSourcesCount from "./definables/getAudioSourcesCount";
import getImageSourcesCount from "./definables/getImageSourcesCount";
import state from "../state";

const assetsAreLoaded = (): boolean => state.loadedAssets === getImageSourcesCount() + getAudioSourcesCount();

export default assetsAreLoaded;