import { Application } from "pixi.js";
import startingTilemapSlug from "../constants/startingTilemapSlug";
import startingTileX from "../constants/startingTileX";
import startingTileY from "../constants/startingTileY";
import unitsPerTile from "../constants/unitsPerTile";
import getTilemap from "../functions/definables/getTilemap";
import Coords from "../interfaces/Coords";
import YSortEntry from "../interfaces/YSortEntry";
import Tilemap from "./Tilemap";

class State {
  private _app: Application | null = null;
  private _brokenDestructibles: string[] = [];
  private _cootsCoords: Coords = {
    x: startingTileX * unitsPerTile,
    y: startingTileY * unitsPerTile
  }
  private _cootsVelocityX: number = 0;
  private _cootsVelocityY: number = 0;
  private _currentTime: number = 0;
  private _heldKeys: string[] = [];
  private _loadedAssets: number = 0;
  private _mouseScreenCoords: Coords | null = null;
  private _tilemapSlug: string = startingTilemapSlug;
  private _ySortEntries: YSortEntry[] = [];

  public get app(): Application {
    if (this._app !== null) {
      return this._app;
    }
    throw new Error(this.getAccessorErrorMessage("app"));
  }

  public get brokenDestructibles(): string[] {
    return [...this._brokenDestructibles];
  }

  public get cootsCoords(): Coords {
    return this._cootsCoords;
  }

  public get cootsVelocityX(): number {
    return this._cootsVelocityX;
  }

  public get cootsVelocityY(): number {
    return this._cootsVelocityY;
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  public get heldKeys(): string[] {
    return [...this._heldKeys];
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

  public get ySortEntries(): YSortEntry[] {
    return [...this._ySortEntries];
  }

  public set app(app: Application | null) {
    this._app = app !== null ? app : null;
  }

  public set brokenDestructibles(brokenDestructibles: string[]) {
    this._brokenDestructibles = [...brokenDestructibles];
  }

  public set cootsCoords(cootsCoords: Coords) {
    this._cootsCoords = cootsCoords;
  }

  public set cootsVelocityX(cootsVelocityX: number) {
    this._cootsVelocityX = cootsVelocityX;
  }

  public set cootsVelocityY(cootsVelocityY: number) {
    this._cootsVelocityY = cootsVelocityY;
  }

  public set currentTime(currentTime: number) {
    this._currentTime = currentTime;
  }

  public set heldKeys(heldKeys: string[]) {
    this._heldKeys = [...heldKeys];
  }

  public set loadedAssets(loadedAssets: number) {
    this._loadedAssets = loadedAssets;
  }

  public set mouseScreenCoords(mouseScreenCoords: Coords | null) {
    this._mouseScreenCoords = mouseScreenCoords;
  }

  public set ySortEntries(ySortEntries: YSortEntry[]) {
    this._ySortEntries = [...ySortEntries];
  }

  public hasMouseScreenCoords(): boolean {
    return this._mouseScreenCoords !== null;
  }

  private getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} ${property}.`;
  }
}

export default State;