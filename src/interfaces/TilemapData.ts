import TilemapDataLayer from "./TilemapDataLayer";

interface TilemapData {
  readonly layers: TilemapDataLayer[];
  readonly tilesets: {
    firstgid: number;
    source: string;
  }[];
  readonly tilewidth: number;
  readonly tileheight: number;
}

export default TilemapData;