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
}

export default Tileset;