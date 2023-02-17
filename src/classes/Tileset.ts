import TilesetData from "../interfaces/TilesetData";
import Definable from "./Definable";

class Tileset extends Definable {
  private readonly _data: TilesetData;

  public constructor(slug: string, data: TilesetData) {
    super(slug);
    this._data = data;
  }

  public get tileWidth(): number {
    return this._data.tilewidth;
  }

  public get tileHeight(): number {
    return this._data.tileheight;
  }
}

export default Tileset;