import { Application } from "pixi.js";
import levels from "../constants/levels";
import unitsPerTile from "../constants/unitsPerTile";
import Coords from "../interfaces/Coords";
import Destruction from "../interfaces/Destruction";
import Level from "../interfaces/Level";
import Pause from "../interfaces/Pause";
import YSortEntry from "../interfaces/YSortEntry";

class State {
  private _activeDestructibleIDs: string[] = [];
  private _app: Application | null = null;
  private _bonked: boolean = false;
  private _brokenDestructibleIDs: string[] = [];
  private _cootsCoords: Coords = {
    x: levels[0].startingTileX * unitsPerTile,
    y: levels[0].startingTileY * unitsPerTile
  }
  private _cootsVelocityX: number = 0;
  private _cootsVelocityY: number = 0;
  private _currentTime: number = 0;
  private _heldKeys: string[] = [];
  private _hitObstacleAt: number | null = null;
  private _isAtTitle: boolean = false;
  private _isAwaitingFocus: boolean = true;
  private _isInBed: boolean = true;
  private _level: Level = levels[0];
  private _levelCompletedAt: number | null = null;
  private _levelStartedAt: number | null = null;
  private _loadedAssets: number = 0;
  private _mouseScreenCoords: Coords | null = null;
  private _pauses: Pause[] = [];
  private _playedDefeatMusic: boolean = false;
  private _playedLevelMusic: boolean = false;
  private _recentDestruction: Destruction | null = null;
  private _won: boolean = false;
  private _ySortEntries: YSortEntry[] = [];

  public get app(): Application {
    if (this._app !== null) {
      return this._app;
    }
    throw new Error(this.getAccessorErrorMessage("app"));
  }

  public get activeDestructibleIDs(): string[] {
    return [...this._activeDestructibleIDs];
  }

  public get bonked(): boolean {
    return this._bonked;
  }

  public get brokenDestructibleIDs(): string[] {
    return [...this._brokenDestructibleIDs];
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

  public get isAtTitle(): boolean {
    return this._isAtTitle;
  }

  public get isAwaitingFocus(): boolean {
    return this._isAwaitingFocus;
  }

  public get isInBed(): boolean {
    return this._isInBed;
  }

  public get level(): Level {
    return this._level;
  }

  public get levelCompletedAt(): number {
    if (this._levelCompletedAt !== null) {
      return this._levelCompletedAt;
    }
    throw new Error("levelCompletedAt");
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

  public get pauses(): Pause[] {
    return [...this._pauses];
  }

  public get playedDefeatMusic(): boolean {
    return this._playedDefeatMusic;
  }

  public get playedLevelMusic(): boolean {
    return this._playedLevelMusic;
  }

  public get recentDestruction(): Destruction {
    if (this._recentDestruction !== null) {
      return this._recentDestruction;
    }
    throw new Error(this.getAccessorErrorMessage("clawedAt"));
  }

  public get ySortEntries(): YSortEntry[] {
    return [...this._ySortEntries];
  }

  public get won(): boolean {
    return this._won;
  }

  public set activeDestructibleIDs(activeDestructibleIDs: string[]) {
    this._activeDestructibleIDs = [...activeDestructibleIDs];
  }

  public set app(app: Application | null) {
    this._app = app !== null ? app : null;
  }

  public set bonked(bonked: boolean) {
    this._bonked = bonked;
  }

  public set brokenDestructibleIDs(brokenDestructibleIDs: string[]) {
    this._brokenDestructibleIDs = [...brokenDestructibleIDs];
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

  public set isAtTitle(isAtTitle: boolean) {
    this._isAtTitle = isAtTitle;
  }

  public set isAwaitingFocus(isAwaitingFocus: boolean) {
    this._isAwaitingFocus = isAwaitingFocus;
  }

  public set isInBed(isInBed: boolean) {
    this._isInBed = isInBed;
  }

  public set level(level: Level) {
    this._level = level;
  }

  public set levelCompletedAt(levelCompletedAt: number | null) {
    this._levelCompletedAt = levelCompletedAt;
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

  public set pauses(pauses: Pause[]) {
    this._pauses = [...pauses];
  }

  public set playedDefeatMusic(playedDefeatMusic: boolean) {
    this._playedDefeatMusic = playedDefeatMusic;
  }

  public set playedLevelMusic(playedLevelMusic: boolean) {
    this._playedLevelMusic = playedLevelMusic;
  }

  public set recentDestruction(destruction: Destruction | null) {
    this._recentDestruction = destruction;
  }

  public set won(won: boolean) {
    this._won = won;
  }

  public set ySortEntries(ySortEntries: YSortEntry[]) {
    this._ySortEntries = [...ySortEntries];
  }

  public hasHitObstacleAt(): boolean {
    return this._hitObstacleAt !== null;
  }

  public hasLevelCompletedAt(): boolean {
    return this._levelCompletedAt !== null;
  }

  public hasLevelStartedAt(): boolean {
    return this._levelStartedAt !== null;
  }

  public hasMouseScreenCoords(): boolean {
    return this._mouseScreenCoords !== null;
  }

  public hasRecentDestruction(): boolean {
    return this._recentDestruction !== null;
  }

  private getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} ${property}.`;
  }
}

export default State;