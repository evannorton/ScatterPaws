import getImageSourcesCount from "./definables/getImageSourcesCount";
import state from "../state";

const assetsAreLoaded = (): boolean => state.loadedAssets === getImageSourcesCount();

export default assetsAreLoaded;