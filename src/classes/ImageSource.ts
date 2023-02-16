import { BaseTexture, Loader, Texture } from "pixi.js";
import Definable from "./Definable";
import state from "../state";

class ImageSource extends Definable {
  private readonly _loader: Loader = new Loader;

  public constructor(slug: string) {
    super(slug);
    this._loader.add(this.getSRC()).load((): void => {
      state.loadedAssets++;
    });
  }

  public get loader(): Loader {
    return this._loader;
  }

  public getBaseTexture(): BaseTexture {
    const texture: Texture | undefined = this._loader.resources[this.getSRC()].texture;
    if (typeof texture !== "undefined") {
      return texture.baseTexture;
    }
    throw new Error(`${this.constructor.name} "${this._slug}" Texture is not loaded.`);
  }

  private getSRC(): string {
    return `./out/images/${this._slug}.png`;
  }
}

export default ImageSource;