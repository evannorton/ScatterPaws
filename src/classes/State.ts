import { Application } from "pixi.js";

class State {
  private _app: Application | null = null;

  public get app(): Application {
    if (this._app !== null) {
      return this._app;
    }
    throw new Error(this.getAccessorErrorMessage("app"));
  }

  public set app(app: Application | null) {
    this._app = app !== null ? app : null;
  }

  private getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} ${property}.`;
  }
}

export default State;