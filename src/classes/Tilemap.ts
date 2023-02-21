import timePerIndicatorFrame from "../constants/timePerIndicatorFrame";
import unitsPerTile from "../constants/unitsPerTile";
import CollisionType from "../enums/CollisionType";
import ZIndexType from "../enums/ZIndexType";
import getTileset from "../functions/definables/getTileset";
import drawImage from "../functions/draw/drawImage";
import getCameraScreenCoords from "../functions/getCameraScreenCoords";
import Coords from "../interfaces/Coords";
import TilemapData from "../interfaces/TilemapData";
import TilemapDataLayer from "../interfaces/TilemapDataLayer";
import TilesetDataTile from "../interfaces/TilesetDataTile";
import HardZIndex from "../interfaces/ZIndex/HardZIndex";
import YSortZIndex from "../interfaces/ZIndex/YSortZIndex";
import state from "../state";
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
      if (layer.name !== "collision") {
        this.drawLayer(layer);
      }
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

  public getCollisionAtCoords(coords: Coords): CollisionType | null {
    const tileX: number = Math.round(coords.x / unitsPerTile);
    const tileY: number = Math.round(coords.y / unitsPerTile);
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
                  return CollisionType.Bonk;
                }
                break;
              }
              case "collision": {
                if (datum > 0 && datumTileX === tileX && datumTileY === tileY) {
                  return CollisionType.Bonk;
                }
                break;
              }
            }
            datumIndex++;
          }
        }
      }
    }
    return null;
  }

  public getDestructibleIDWithinRange(): string | null {
    const tileX: number = Math.round(state.cootsCoords.x / unitsPerTile);
    const tileY: number = Math.round(state.cootsCoords.y / unitsPerTile);
    for (const layer of this._data.layers) {
      if (layer.visible && layer.name === "furniture") {
        for (const chunk of layer.chunks) {
          let datumIndex = 0;
          for (const datum of chunk.data) {
            if (datum > 0) {
              const datumX: number = datumIndex % chunk.width + 1;
              const datumY: number = Math.floor(datumIndex / chunk.width) + 1;
              const datumTileX: number = chunk.x + datumX;
              const datumTileY: number = chunk.y + datumY;
              const tileset: Tileset = this.getDatumTileset(datum);
              const tilesetIndex = this.getDatumTilesetIndex(datum);
              const tile: TilesetDataTile | undefined = tileset.tiles.find((tile: TilesetDataTile): boolean => tile.id === tilesetIndex);
              const destructibleIDProperty = tile && tile.properties?.find((property): boolean => property.name === "destructibleID");
              const destructibleID = destructibleIDProperty?.value;
              const uninteractableProperty = tile && tile.properties?.find((property): boolean => property.name === "uninteractable");
              const uninteractable = uninteractableProperty?.value
              if (datum > 0 && Math.abs(tileX - datumTileX) <= 1 && Math.abs(tileY - datumTileY) <= 1 && typeof destructibleID === "string" && !uninteractable) {
                return destructibleID;
              }
            }
            datumIndex++;
          }
        }
      }
    }
    return null;
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
            const tile: TilesetDataTile | undefined = tileset.tiles.find((tile: TilesetDataTile): boolean => tile.id === tilesetIndex);
            const destructibleIDProperty = tile && tile.properties?.find((property): boolean => property.name === "destructibleID");
            const destructibleID = destructibleIDProperty?.value;
            const brokenIDProperty = tile && tile.properties?.find((property): boolean => property.name === "brokenID");
            const brokenID = brokenIDProperty?.value;
            const isDestroyed: boolean = typeof destructibleID === "string" && state.brokenDestructibles.includes(destructibleID);
            const calculatedTilesetIndex: number = isDestroyed && typeof brokenID === "number"
              ? brokenID
              : this.getDatumTilesetIndex(datum);
            const tileSourceX = (calculatedTilesetIndex % tileset.columns) * tileset.tileWidth;
            const tileSourceY = Math.floor(calculatedTilesetIndex / tileset.columns) * tileset.tileHeight;
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
            const ySortID: string | null = layer.name === "furniture" ? `${layer.name}/${tileX}/${tileY}` : null;
            const ySortZIndex: YSortZIndex | null = ySortID
              ? {
                ySortID,
                type: ZIndexType.YSort
              }
              : null;
            drawImage(`tilesets/${tileset.slug}`, tileSourceX, tileSourceY, tileset.tileWidth, tileset.tileHeight, tileX, tileY, tileset.tileWidth, tileset.tileHeight, ySortZIndex);
            if (layer.name === "furniture") {
              if (typeof destructibleID === "string" && !isDestroyed && state.activeDestructibles.includes(destructibleID)) {
                const indicatorXOffsetProperty = tile && tile.properties?.find((property): boolean => property.name === "indicatorXOffset");
                const indicatorXOffset = indicatorXOffsetProperty?.value;
                const indicatorYOffsetProperty = tile && tile.properties?.find((property): boolean => property.name === "indicatorYOffset");
                const indicatorYOffset = indicatorYOffsetProperty?.value;
                if (typeof indicatorXOffset === "number" && typeof indicatorYOffset === "number") {
                  const hardZIndex: HardZIndex = {
                    value: 10000,
                    type: ZIndexType.Hard
                  };
                  const frameAnimationOffset: number = Math.floor((state.currentTime % (timePerIndicatorFrame * 4)) / timePerIndicatorFrame) * 7;
                  drawImage("indicator", frameAnimationOffset, 0, 7, 10, tileX + indicatorXOffset, tileY + indicatorYOffset, 7, 10, hardZIndex);
                }
              }
            }
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