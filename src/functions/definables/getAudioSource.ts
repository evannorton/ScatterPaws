import AudioSource from "../../classes/AudioSource";
import getDefinable from "./getDefinable";

const getAudioSource = (slug: string): AudioSource => getDefinable({
  className: "AudioSource",
  slug
}) as AudioSource;

export default getAudioSource;