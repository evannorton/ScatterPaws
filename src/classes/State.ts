import { Application } from "pixi.js";
import levels from "../constants/levels";
import unitsPerTile from "../constants/unitsPerTile";
import getTilemap from "../functions/definables/getTilemap";
import Coords from "../interfaces/Coords";
import Level from "../interfaces/Level";
import YSortEntry from "../interfaces/YSortEntry";
import Tilemap from "./Tilemap";

class State {
  private _activeDestructibles: string[] = [];
  private _app: Application | null = null;
  private _brokenDestructibles: string[] = [];
  private _cootsCoords: Coords = {
    x: levels[0].startingTileX * unitsPerTile,
    y: levels[0].startingTileY * unitsPerTile
  }
  private _cootsVelocityX: number = 0;
  private _cootsVelocityY: number = 0;
  private _currentTime: number = 0;
  private _heldKeys: string[] = [];
  private _hitObstacleAt: number | null = null;
  private _level: Level = levels[0];
  private _levelStartedAt: number | null = null;
  private _loadedAssets: number = 0;
  private _mouseScreenCoords: Coords | null = null;
  private _tilemapSlug: string = levels[0].tilemapSlug;
  private _ySortEntries: YSortEntry[] = [];

  public get app(): Application {
    if (this._app !== null) {
      return this._app;
    }
    throw new Error(this.getAccessorErrorMessage("app"));
  }

  public get activeDestructibles(): string[] {
    return [...this._activeDestructibles];
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

  public get hitObstacleAt(): number {
    if (this._hitObstacleAt !== null) {
      return this._hitObstacleAt;
    }
    throw new Error(this.getAccessorErrorMessage("hitObstacleAt"));
  }

  public get level(): Level {
    return this._level;
  }

  public get levelStartedAt(): number {
    if (this._levelStartedAt !== null) {
      return this._levelStartedAt;
    }
    throw new Error("levelStartedAt");
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

  public set activeDestructibles(activeDestructibles: string[]) {
    this._activeDestructibles = [...activeDestructibles];
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

  public set hitObstacleAt(hitObstacleAt: number | null) {
    this._hitObstacleAt = hitObstacleAt;
  }

  public set level(level: Level) {
    this._level = level;
  }

  public set levelStartedAt(levelStartedAt: number | null) {
    this._levelStartedAt = levelStartedAt;
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

  public hasHitObstacleAt(): boolean {
    return this._hitObstacleAt !== null;
  }

  public hasLevelStartedAt(): boolean {
    return this._levelStartedAt !== null;
  }

  public hasMouseScreenCoords(): boolean {
    return this._mouseScreenCoords !== null;
  }

  private getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} ${property}.`;
  }
}

export default State;