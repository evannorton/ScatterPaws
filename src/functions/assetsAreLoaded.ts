import getImageSourcesCount from "./definables/getImageSourcesCount";
import state from "../state";
import getAudioSourcesCount from "./definables/getAudioSourcesCount";

const assetsAreLoaded = (): boolean => state.loadedAssets === getImageSourcesCount() + getAudioSourcesCount();

export default assetsAreLoaded;