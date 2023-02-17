import gameWidth from "../constants/gameWidth";
import getTileset from "../functions/definables/getTileset";
import drawImage from "../functions/draw/drawImage";
import TilemapData from "../interfaces/TilemapData";
import Definable from "./Definable";
import Tileset from "./Tileset";

class Tilemap extends Definable {
  private readonly _data: TilemapData;

  public constructor(slug: string, data: TilemapData) {
    super(slug);
    this._data = data;
  }

  private get tileWidth(): number {
    return this._data.tilewidth;
  }

  private get tileHeight(): number {
    return this._data.tileheight;
  }

  public draw(): void {
    const startX: number = Math.floor(gameWidth / 2);
    const startY: number = 0;
    this._data.layers.forEach((layer) => {
      if (layer.visible) {
        layer.chunks.forEach((chunk) => {
          chunk.data.forEach((datum, datumIndex) => {
            if (datum > 0) {
              const datumX: number = datumIndex % chunk.width;
              const datumY: number = Math.floor(datumIndex / chunk.width);
              const tileset = this.getDatumTileset(datum);
              const tilesetIndex = this.getDatumTilesetIndex(datum);
              const tileSourceX = (tilesetIndex % tileset.columns) * tileset.tileWidth;
              const tileSourceY = Math.floor(tilesetIndex / tileset.columns) * tileset.tileHeight;
              const tileX = (
                startX
                + (datumX * this.tileWidth / 2)
                - (datumY * this.tileWidth / 2)
                + (chunk.x * this.tileWidth / 2)
                - (chunk.y * this.tileWidth / 2)
                - (this.tileWidth / 2)
              );
              const tileY = (
                startY
                + (datumX * this.tileHeight / 2)
                + (datumY * this.tileHeight / 2)
                + (chunk.x * this.tileHeight / 2)
                + (chunk.y * this.tileHeight / 2)
                - this.tileHeight
              );
              drawImage("tilesets/tiles", tileSourceX, tileSourceY, tileset.tileWidth, tileset.tileHeight, tileX, tileY, tileset.tileWidth, tileset.tileHeight);
            }
          });
        });
      }
    });
  }

  private getDatumTileset(datum: number): Tileset {
    const gid = datum;
    const found = this._data.tilesets.find(({ firstgid }) => gid >= firstgid);
    if (!found) {
      throw new Error(`Could not get Tileset for datum ${datum} of Tilemap "${this.slug}"`);
    }
    const tilesetSlug = found.source.substring(12, found.source.length - 5);
    return getTileset(tilesetSlug);
  }

  private getDatumTilesetIndex(datum: number): number {
    const gid = datum;
    const found = this._data.tilesets.find(({ firstgid }) => gid >= firstgid);
    if (!found) {
      throw new Error(`Could not get Tileset for datum ${datum} of Tilemap "${this.slug}"`);
    }
    return gid - found.firstgid;
  }
}

export default Tilemap;