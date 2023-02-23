import Definable from "../../classes/Definable";
import AudioSource from "../../classes/AudioSource";
import getDefinables from "./getDefinables";

const getAudioSources = (): Map<string, AudioSource> => {
  const audioSources: Map<string, AudioSource> = new Map;
  getDefinables("AudioSource").forEach((audioSource: Definable): void => {
    const slug: string = audioSource.slug;
    if (audioSource instanceof AudioSource) {
      audioSources.set(slug, audioSource);
    }
  });
  return audioSources;
};

export default getAudioSources;