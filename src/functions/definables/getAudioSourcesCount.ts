import getDefinablesCount from "./getDefinablesCount";

const getAudioSourcesCount = (): number => getDefinablesCount("AudioSource");

export default getAudioSourcesCount;