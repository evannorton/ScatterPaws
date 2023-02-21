interface TilesetDataTile {
  readonly id: number;
  readonly properties?: {
    readonly name: string;
    readonly type: string;
    readonly value: string | number | boolean;
  }[];
}

export default TilesetDataTile;