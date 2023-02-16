import { Application } from "pixi.js";

class State {
  private _app: Application | null = null;
  private _cootsX: number = 0;
  private _cootsY: number = 0;
  private _currentTime: number = performance.now();
  private _loadedAssets: number = 0;

  public get app(): Application {
    if (this._app !== null) {
      return this._app;
    }
    throw new Error(this.getAccessorErrorMessage("app"));
  }

  public get cootsX(): number {
    return this._cootsX;
  }

  public get cootsY(): number {
    return this._cootsY;
  }

  public get currentTime(): number {
    return this._currentTime;
  }

  public get loadedAssets(): number {
    return this._loadedAssets;
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

  private getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} ${property}.`;
  }
}

export default State;