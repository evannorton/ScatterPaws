import { Howl } from "howler";
import Definable from "./Definable";
import FadeInAction from "../interfaces/FadeInAction";
import FadeOutAction from "../interfaces/FadeOutAction";
import state from "../state";
import isRunningOnLocal from "../functions/isRunningOnLocal";
import assetsAreLoaded from "../functions/assetsAreLoaded";

class AudioSource extends Definable {
  private _fadeVolume: number = 0.5;
  private _fadeInAction: FadeInAction | null = null;
  private _fadeOutAction: FadeOutAction | null = null;
  private _onEnds: ((() => void) | null)[] = [];
  private readonly _howl: Howl;
  private _onPlay: (() => void) | null = null;
  private _loopPoint: number | null = null;
  private _plays: number = 0;

  public constructor(slug: string, loopPoint: number | null) {
    super(slug);
    this._loopPoint = loopPoint;
    this._howl = new Howl({
      autoplay: false,
      loop: false,
      preload: true,
      src: [this.getSRC()],
      volume: 0.5
    });
    this._howl.on("end", (): void => {
      this.onHowlEnd();
    });
    this._howl.on("fade", (): void => {
      this.onHowlFade();
    });
    this._howl.on("load", (): void => {
      this.onHowlLoad();
    });
    this._howl.on("play", (): void => {
      this.onHowlPlay();
    });
  }

  public applyVolume(volume: number): void {
    if (this._fadeInAction !== null) {
      if (this._fadeInAction.startedAt !== null) {
        const percent: number = this._howl.volume() / this._fadeVolume;
        const duration: number = this._fadeInAction.duration - (state.currentTime - this._fadeInAction.startedAt);
        this._howl.fade(percent * volume, volume, duration);
      }
    }
    else if (this._fadeOutAction !== null) {
      if (this._fadeOutAction.startedAt !== null) {
        const percent: number = 1 - this._howl.volume() / this._fadeVolume;
        const duration: number = this._fadeOutAction.duration - (state.currentTime - this._fadeOutAction.startedAt);
        this._howl.fade(percent * volume, 0, duration);
      }
    }
    else {
      this._howl.volume(volume);
    }
    this._fadeVolume = volume;
  }

  public fadeIn(duration: number): void {
    this._fadeInAction = {
      duration,
      startedAt: state.currentTime
    };
    this._howl.fade(0, this._fadeVolume, duration);
  }

  public fadeOut(duration: number): void {
    this._fadeOutAction = {
      duration,
      startedAt: state.currentTime
    };
    this._howl.fade(this._fadeVolume, 0, duration);
  }

  public isPlaying(): boolean {
    return this._howl.playing();
  }

  public mute(): void {
    this._howl.mute(true);
  }

  public pause(): void {
    this._howl.pause();
  }

  public play(onPlay: (() => void) | null, onEnd: (() => void) | null): void {
    this._onPlay = onPlay;
    this._onEnds.push(onEnd);
    this._howl.play();
  }

  public resume(): void {
    if (this._howl.playing() === false) {
      this._howl.play();
    }
  }

  public stop(): void {
    this._howl.stop();
  }

  public unmute(): void {
    this._howl.mute(false);
  }

  public cancelOnEnds(): void {
    this._onEnds = [];
  }

  private getSRC(): string {
    if (isRunningOnLocal()) {
      return `./out/audio/${this._slug}.mp3`;
    }
    return `./audio/${this._slug}.mp3`;
  }

  private onHowlEnd(): void {
    if (this._loopPoint !== null) {
      this.stop();
      this._howl.seek(this._loopPoint / 1000);
      this._howl.play();
    }
    if (this._onEnds[0]) {
      this._onEnds[0]();
    }
    this._onEnds.shift();
  }

  private onHowlFade(): void {
    if (this._fadeInAction !== null) {
      this._fadeInAction = null;
    }
    if (this._fadeOutAction !== null) {
      this.stop();
      this._fadeOutAction = null;
      this._howl.volume(this._fadeVolume);
    }
  }

  private onHowlLoad(): void {
    state.loadedAssets++;
    if (assetsAreLoaded()) {
      document.getElementById("screen")?.classList.remove("loading");
      document.getElementById("screen")?.classList.add("focus");
    }
  }

  private onHowlPlay(): void {
    if (this._plays === 0 && this._onPlay !== null) {
      this._onPlay();
    }
    this._plays++;
  }
}

export default AudioSource;