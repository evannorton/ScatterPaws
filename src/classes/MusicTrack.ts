import AudioSource from "./AudioSource";
import Definable from "./Definable";
import getAudioSource from "../functions/definables/getAudioSource";

class MusicTrack extends Definable {
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
    const musicVolumeElement = document.getElementById("music-volume");
    if (mainVolumeElement instanceof HTMLInputElement && musicVolumeElement instanceof HTMLInputElement) {
      const audioSource: AudioSource = this.audioSource;
      const mainVolume: number = Number(mainVolumeElement.value) / 100;
      const musicVolume: number = Number(musicVolumeElement.value) / 100;
      audioSource.applyVolume(mainVolume * musicVolume);
    }
  }
}

export default MusicTrack;