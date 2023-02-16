import DefinableReference from "../interfaces/DefinableReference";
import List from "./List";
import definables from "../maps/definables";
import getDefinables from "../functions/definables/getDefinables";
import validSlugCharacters from "../constants/validSlugCharacters";

abstract class Definable {
  protected readonly _slug: string;

  public constructor(slug: string) {
    this._slug = slug;
    if (new List(this._slug.split("")).some((character: string): boolean => character !== "/" && validSlugCharacters.includes(character) === false)) {
      throw new Error(`${this.constructor.name} "${this._slug}" has an invalid slug.`);
    }
    if (definables.has(this.constructor.name) === false) {
      definables.set(this.constructor.name, new Map);
    }
    const list: Map<string, Definable> = getDefinables(this.constructor.name);
    if (list.has(this._slug)) {
      throw new Error(`${this.constructor.name} "${this._slug}" already exists.`);
    }
    list.set(this._slug, this);
  }

  public get slug(): string {
    return this._slug;
  }

  public getDefinableReference(): DefinableReference {
    return {
      className: this.constructor.name,
      slug: this._slug
    };
  }

  protected delete(): void {
    getDefinables(this.constructor.name).delete(this._slug);
  }

  protected getAccessorErrorMessage(property: string): string {
    return `Could not access ${this.constructor.name} "${this._slug}" ${property}.`;
  }
}

export default Definable;