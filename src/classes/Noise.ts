import AudioSource from "./AudioSource";
import Definable from "./Definable";
import getAudioSource from "../functions/definables/getAudioSource";

class Noise extends Definable {
  private readonly _audioSourceSlug: string;

  public constructor(slug: string, { audioSourceSlug }: { readonly audioSourceSlug: string; }) {
    super(slug);
    this._audioSourceSlug = audioSourceSlug;
  }

  private get audioSource(): AudioSource {
    return getAudioSource(this._audioSourceSlug);
  }

  public applyVolume(): void {
    const mainVolumeElement = document.getElementById("main-volume");
    const sfxVolumeElement = document.getElementById("sfx-volume");
    if (mainVolumeElement instanceof HTMLInputElement && sfxVolumeElement instanceof HTMLInputElement) {
      const audioSource: AudioSource = this.audioSource;
      const mainVolume: number = Number(mainVolumeElement.value) / 100;
      const musicVolume: number = Number(sfxVolumeElement.value) / 100;
      audioSource.applyVolume(mainVolume * musicVolume);
    }
  }
}

export default Noise;