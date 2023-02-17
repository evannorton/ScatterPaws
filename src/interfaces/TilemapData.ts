interface TilemapData {
  readonly layers: {
    readonly chunks: {
      readonly data: number[];
      readonly height: number;
      readonly width: number;
      readonly x: number;
      readonly y: number;
    }[];
    readonly visible: boolean;
  }[];
  readonly tilesets: {
    firstgid: number;
    source: string;
  }[];
  readonly tilewidth: number;
  readonly tileheight: number;
}

export default TilemapData;