import TilesetData from "../interfaces/TilesetData";
import TilesetDataTile from "../interfaces/TilesetDataTile";
import state from "../state";
import Definable from "./Definable";

class Tileset extends Definable {
  private readonly _data: TilesetData;

  public constructor(slug: string, data: TilesetData) {
    super(slug);
    this._data = data;
  }

  public get columns(): number {
    return this._data.columns
  }

  public get tiles(): TilesetDataTile[] {
    if (this._data.tiles) {
      return this._data.tiles;
    }
    return [];
  }

  public get tileWidth(): number {
    return this._data.tilewidth;
  }

  public get tileHeight(): number {
    return this._data.tileheight;
  }

  public getUnbrokenDestructibles(): string[] {
    const destructibles: string[] = [];
    for (const tile of this.tiles) {
      const property = tile.properties?.find((property) => property.name === "destructibleID");
      const destructibleID = property?.value;
      if (typeof destructibleID === "string" && destructibles.includes(destructibleID) === false && state.brokenDestructibles.includes(destructibleID) === false) {
        destructibles.push(destructibleID);
      }
    }
    return destructibles;
  }
}

export default Tileset;