import unitsPerTile from "../constants/unitsPerTile";
import getTileset from "../functions/definables/getTileset";
import drawImage from "../functions/draw/drawImage";
import getCameraScreenCoords from "../functions/getCameraScreenCoords";
import Coords from "../interfaces/Coords";
import TilemapData from "../interfaces/TilemapData";
import TilemapDataLayer from "../interfaces/TilemapDataLayer";
import TilesetData from "../interfaces/TilesetData";
import TilesetDataTile from "../interfaces/TilesetDataTile";
import Definable from "./Definable";
import Tileset from "./Tileset";

class Tilemap extends Definable {
  private readonly _data: TilemapData;

  public constructor(slug: string, data: TilemapData) {
    super(slug);
    this._data = data;
  }

  public get tileWidth(): number {
    return this._data.tilewidth;
  }

  public get tileHeight(): number {
    return this._data.tileheight;
  }

  public draw(): void {
    for (const layer of this._data.layers) {
      this.drawLayer(layer);
    }
  }

  public getScreenCoordsFromCoords(coords: Coords): Coords {
    const cameraScreenCoords: Coords = getCameraScreenCoords();
    return {
      x: Math.floor(
        cameraScreenCoords.x
        + (coords.x / unitsPerTile * this.tileWidth / 2)
        - (coords.y / unitsPerTile * this.tileWidth / 2)
        - 1
      ),
      y: Math.floor(
        cameraScreenCoords.y
        + (coords.x / unitsPerTile * this.tileHeight / 2)
        + (coords.y / unitsPerTile * this.tileHeight / 2)
        - 6
      )
    };
  }

  public getCoordsFromScreenCoords(screenCoords: Coords): Coords {
    const cameraScreenCoords: Coords = getCameraScreenCoords();
    return {
      x:
        Math.round(
          (screenCoords.x - cameraScreenCoords.x + 1) / this.tileWidth * unitsPerTile
          + (screenCoords.y - cameraScreenCoords.y + 6) / this.tileHeight * unitsPerTile
        ),
      y:
        Math.round(
          (screenCoords.y - cameraScreenCoords.y + 6) / this.tileHeight * unitsPerTile
          - (screenCoords.x - cameraScreenCoords.x + 1) / this.tileWidth * unitsPerTile
        )
    };
  }

  public hasCollisionAtCoords(coords: Coords): boolean {
    const tileX: number = Math.floor(coords.x / unitsPerTile);
    const tileY: number = Math.floor(coords.y / unitsPerTile);
    for (const layer of this._data.layers) {
      if (layer.visible) {
        for (const chunk of layer.chunks) {
          let datumIndex = 0;
          for (const datum of chunk.data) {
            const datumX: number = datumIndex % chunk.width;
            const datumY: number = Math.floor(datumIndex / chunk.width);
            const datumTileX: number = chunk.x + datumX;
            const datumTileY: number = chunk.y + datumY;
            switch (layer.name) {
              case "floor": {
                if (datum === 0 && datumTileX === tileX && datumTileY === tileY) {
                  return true;
                }
                break;
              }
              case "collidables-bottom": {
                if (datum > 0 && datumTileX + 1 === tileX && datumTileY + 1 === tileY) {
                  return true;
                }
                break;
              }
            }
            datumIndex++;
          }
        }
      }
    }
    return false;
  }

  private drawLayer(layer: TilemapDataLayer): void {
    const cameraScreenCoords: Coords = getCameraScreenCoords();
    if (layer.visible) {
      for (const chunk of layer.chunks) {
        let datumIndex = 0;
        for (const datum of chunk.data) {
          if (datum > 0) {
            const datumX: number = datumIndex % chunk.width;
            const datumY: number = Math.floor(datumIndex / chunk.width);
            const tileset: Tileset = this.getDatumTileset(datum);
            const tilesetIndex = this.getDatumTilesetIndex(datum);
            const tileSourceX = (tilesetIndex % tileset.columns) * tileset.tileWidth;
            const tileSourceY = Math.floor(tilesetIndex / tileset.columns) * tileset.tileHeight;
            const tile: TilesetDataTile | undefined = tileset.tiles.find((tile: TilesetDataTile): boolean => tile.id === tilesetIndex);
            const property = tile && tile.properties?.find((property): boolean => property.name === "collidableID");
            const collidableID = property?.value;
            const tileX = Math.floor(
              cameraScreenCoords.x
              + (datumX * this.tileWidth / 2)
              - (datumY * this.tileWidth / 2)
              + (chunk.x * this.tileWidth / 2)
              - (chunk.y * this.tileWidth / 2)
              - (this.tileWidth / 2)
            );
            const tileY = Math.floor(
              cameraScreenCoords.y
              + (datumX * this.tileHeight / 2)
              + (datumY * this.tileHeight / 2)
              + (chunk.x * this.tileHeight / 2)
              + (chunk.y * this.tileHeight / 2)
              - this.tileHeight
            );
            drawImage(`tilesets/${tileset.slug}`, tileSourceX, tileSourceY, tileset.tileWidth, tileset.tileHeight, tileX, tileY, tileset.tileWidth, tileset.tileHeight, typeof collidableID !== "undefined");
          }
          datumIndex++;
        };
      }
    }
  }

  private getDatumTileset(datum: number): Tileset {
    const gid = datum;
    const found = [...this._data.tilesets].reverse().find(({ firstgid }) => gid >= firstgid);
    if (!found) {
      throw new Error(`Could not get Tileset for datum ${datum} of Tilemap "${this.slug}"`);
    }
    const tilesetSlug = found.source.substring(12, found.source.length - 5);
    return getTileset(tilesetSlug);
  }

  private getDatumTilesetIndex(datum: number): number {
    const gid = datum;
    const found = [...this._data.tilesets].reverse().find(({ firstgid }) => gid >= firstgid);
    if (!found) {
      throw new Error(`Could not get Tileset for datum ${datum} of Tilemap "${this.slug}"`);
    }
    return gid - found.firstgid;
  }
}

export default Tilemap;