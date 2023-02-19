import { Application } from "pixi.js";
import startingTilemapSlug from "../constants/startingTilemapSlug";
import startingTileX from "../constants/startingTileX";
import startingTileY from "../constants/startingTileY";
import unitsPerTile from "../constants/unitsPerTile";
import getTilemap from "../functions/definables/getTilemap";
import Coords from "../interfaces/Coords";
import Tilemap from "./Tilemap";

class State {
  private _app: Application | null = null;
  private _cootsCoords: Coords = {
    x: startingTileX * unitsPerTile,
    y: startingTileY * unitsPerTile
  }
  private _currentTime: number = performance.now();
  private _loadedAssets: number = 0;
  private _mouseScreenCoords: Coords | null = null;
  private _tilemapSlug: string = startingTilemapSlug;

  public get app(): Application {
    if (this._app !== null) {
      return this._app;
    }
    throw new Error(this.getAccessorErrorMessage("app"));
  }

  public get cootsCoords(): Coords {
    return this._cootsCoords;
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  public get loadedAssets(): number {
    return this._loadedAssets;
  }

  public get mouseScreenCoords(): Coords {
    if (this._mouseScreenCoords !== null) {
      return this._mouseScreenCoords;
    }
    throw new Error(this.getAccessorErrorMessage("mouseCoords"));
  }

  public get tilemap(): Tilemap {
    return getTilemap(this._tilemapSlug);
  }

  public set app(app: Application | null) {
    this._app = app !== null ? app : null;
  }

  public set currentTime(currentTime: number) {
    this._currentTime = currentTime;
  }

  public set loadedAssets(loadedAssets: number) {
    this._loadedAssets = loadedAssets;
  }

  public set mouseScreenCoords(mouseScreenCoords: Coords | null) {
    this._mouseScreenCoords = mouseScreenCoords;
  }

  public hasMouseScreenCoords(): boolean {
    return this._mouseScreenCoords !== null;
  }

  private getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} ${property}.`;
  }
}

export default State;