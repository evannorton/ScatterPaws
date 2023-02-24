import gameHeight from "../constants/gameHeight";
import gameWidth from "../constants/gameWidth";
import timePerIndicatorFrame from "../constants/timePerIndicatorFrame";
import unitsPerTile from "../constants/unitsPerTile";
import CollisionType from "../enums/CollisionType";
import ZIndexType from "../enums/ZIndexType";
import getTileset from "../functions/definables/getTileset";
import drawImage from "../functions/draw/drawImage";
import getCameraScreenCoords from "../functions/getCameraScreenCoords";
import levelIsCompleted from "../functions/levelIsCompleted";
import Coords from "../interfaces/Coords";
import Destructible from "../interfaces/Destructible";
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
              case "obstacles": {
                if (datum > 0 && datumTileX === tileX - 1 && datumTileY === tileY - 1) {
                  return CollisionType.Obstacle;
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

  public getDestructibleWithinRange(): Destructible | null {
    const tileX: number = state.cootsCoords.x / unitsPerTile;
    const tileY: number = state.cootsCoords.y / unitsPerTile;
    for (const layer of this._data.layers) {
      if (layer.visible && (layer.name === "furniture" || layer.name === "floor-furniture")) {
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
              const uninteractable = uninteractableProperty?.value;
              const destructibleNoiseProperty = tile && tile.properties?.find((property): boolean => property.name === "destructibleNoise");
              const destructibleNoise = destructibleNoiseProperty?.value;
              const scratchRange = 2;
              if (datum > 0 && Math.abs(tileX - datumTileX) <= scratchRange && Math.abs(tileY - datumTileY) <= scratchRange && typeof destructibleID === "string" && !uninteractable) {
                if (state.brokenDestructibleIDs.includes(destructibleID) === false && state.activeDestructibleIDs.includes(destructibleID)) {
                  return {
                    destructibleID,
                    tileID: tilesetIndex,
                    audioSourceSlug: typeof destructibleNoise === "string" ? `noises/destroy/${destructibleNoise}` : null
                  };
                }
              }
            }
            datumIndex++;
          }
        }
      }
    }
    return null;
  }

  public getUnbrokenDestructibles(): string[] {
    const destructibles: string[] = [];
    for (const layer of this._data.layers) {
      if (layer.visible && (layer.name === "furniture" || layer.name === "floor-furniture")) {
        for (const chunk of layer.chunks) {
          let datumIndex = 0;
          for (const datum of chunk.data) {
            if (datum > 0) {
              const tileset: Tileset = this.getDatumTileset(datum);
              const tilesetIndex = this.getDatumTilesetIndex(datum);
              const tile: TilesetDataTile | undefined = tileset.tiles.find((tile: TilesetDataTile): boolean => tile.id === tilesetIndex);
              const property = tile?.properties?.find((property) => property.name === "destructibleID");
              const destructibleID = property?.value;
              if (typeof destructibleID === "string" && destructibles.includes(destructibleID) === false && state.brokenDestructibleIDs.includes(destructibleID) === false) {
                destructibles.push(destructibleID);
              }
            }
          }
        }
      }
    }
    return destructibles;
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
            const isDestroyed: boolean = typeof destructibleID === "string" && state.brokenDestructibleIDs.includes(destructibleID);
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
            const furnitureUpperZIndex: HardZIndex = {
              value: 10000,
              type: ZIndexType.Hard
            };
            const zIndex = (layer.name === "upper-furniture") ? furnitureUpperZIndex : ySortZIndex;
            drawImage(`tilesets/${tileset.slug}`, 1, tileSourceX, tileSourceY, tileset.tileWidth, tileset.tileHeight, tileX, tileY, tileset.tileWidth, tileset.tileHeight, zIndex);
            if (layer.name === "floor") {
              if (state.level.startingTileX === datumX + chunk.x && state.level.startingTileY === datumY + chunk.y) {
                const bedZIndex: HardZIndex = {
                  type: ZIndexType.Hard,
                  value: .1,
                };
                drawImage("bed", 1, 18 * state.level.bed, 0, 18, 12, tileX + 3, tileY, 18, 12, bedZIndex);
              }
            }
            if (state.hasRecentDestruction() && state.recentDestruction.destructibleID === destructibleID && state.recentDestruction.tileID === tilesetIndex) {
              const diff = state.currentTime - state.recentDestruction.clawedAt;
              const frame: number = Math.floor(diff / 100);
              if (frame <= 4) {
                const scratchZIndex: HardZIndex = {
                  value: 10000,
                  type: ZIndexType.Hard
                };
                drawImage("scratch", 1, frame * 16, 0, 16, 16, tileX, tileY, 16, 16, scratchZIndex);
              }
            }
            if (levelIsCompleted() === false && (layer.name === "furniture" || layer.name === "floor-furniture")) {
              if (typeof destructibleID === "string" && !isDestroyed && state.activeDestructibleIDs.includes(destructibleID)) {
                const indicatorXOffsetProperty = tile && tile.properties?.find((property): boolean => property.name === "indicatorXOffset");
                const indicatorXOffset = indicatorXOffsetProperty?.value;
                const indicatorYOffsetProperty = tile && tile.properties?.find((property): boolean => property.name === "indicatorYOffset");
                const indicatorYOffset = indicatorYOffsetProperty?.value;
                if (typeof indicatorXOffset === "number" && typeof indicatorYOffset === "number") {
                  const hardZIndex: HardZIndex = {
                    value: 10001,
                    type: ZIndexType.Hard
                  };
                  const frameAnimationOffset: number = Math.floor((state.currentTime % (timePerIndicatorFrame * 4)) / timePerIndicatorFrame) * 7;
                  let indicatorX: number = tileX + indicatorXOffset;
                  let indicatorY: number = tileY + indicatorYOffset;
                  const indicatorWidth: number = 7;
                  const indicatorHeight: number = 10;
                  const arrowOffset: number = 4;
                  const minX: number = arrowOffset;
                  if (indicatorX < minX) {
                    indicatorX = minX;
                  }
                  const maxX: number = gameWidth - arrowOffset - indicatorWidth;
                  if (indicatorX > maxX) {
                    indicatorX = maxX;
                  }
                  const minY: number = arrowOffset;
                  if (indicatorY < minY) {
                    indicatorY = minY;
                  }
                  const maxY: number = gameHeight - arrowOffset - indicatorHeight;
                  if (indicatorY > maxY) {
                    indicatorY = maxY;
                  }
                  drawImage("indicator", 1, frameAnimationOffset, 0, indicatorWidth, indicatorHeight, indicatorX, indicatorY, indicatorWidth, indicatorHeight, hardZIndex);
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