interface TilemapDataLayer {
  readonly chunks: {
    readonly data: number[];
    readonly height: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
  }[];
  readonly name: string;
  readonly visible: boolean;
}

export default TilemapDataLayer;